import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { generateUniqueOrderId } from "@/lib/order-id";
import { sendOrderNotifications } from "@/lib/notifications";
import { RazorpayWebhookPayload } from "@/types/razorpay";

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    const body = await request.text();
    const isValid = verifyWebhookSignature(body, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const payload: RazorpayWebhookPayload = JSON.parse(body);

    if (payload.event !== "payment.captured") {
      return NextResponse.json({ received: true });
    }

    const payment = payload.payload.payment.entity;
    const eventId = request.headers.get("x-razorpay-event-id") || "";

    const existingPayment = await prisma.payment.findFirst({
      where: {
        OR: [
          { razorpayPaymentId: payment.id },
          { webhookEventId: eventId },
        ],
      },
    });

    if (existingPayment) {
      return NextResponse.json({
        received: true,
        message: "Duplicate webhook, order already created",
      });
    }

    const dbPayment = await prisma.payment.findUnique({
      where: { razorpayOrderId: payment.order_id },
    });

    if (!dbPayment) {
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }

    if (dbPayment.order) {
      return NextResponse.json({
        received: true,
        message: "Order already exists for this payment",
      });
    }

    const orderId = generateUniqueOrderId(process.env.ORDER_ID_PREFIX || "HB");
    const checkoutPayload = dbPayment.checkoutPayload as any;

    const productIds = checkoutPayload.items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          id: orderId,
          status: "CONFIRMED",
          paymentMethod: "RAZORPAY",
          customerName: checkoutPayload.customerName,
          customerEmail: checkoutPayload.customerEmail,
          customerPhone: checkoutPayload.customerPhone,
          addressLine1: checkoutPayload.addressLine1,
          addressLine2: checkoutPayload.addressLine2,
          city: checkoutPayload.city,
          state: checkoutPayload.state,
          pincode: checkoutPayload.pincode,
          totalPaise: dbPayment.amountPaise,
          paymentId: dbPayment.id,
          items: {
            create: checkoutPayload.items.map((item: any) => ({
              productId: item.productId,
              productName: item.productName,
              productSize: productMap.get(item.productId)?.size || "N/A",
              quantity: item.quantity,
              unitPaise: item.unitPaise,
              totalPaise: item.unitPaise * item.quantity,
            })),
          },
        },
        include: {
          items: true,
          payment: true,
        },
      });

      await tx.payment.update({
        where: { id: dbPayment.id },
        data: {
          status: "CAPTURED",
          razorpayPaymentId: payment.id,
          razorpaySignature: signature,
          webhookEventId: eventId,
          rawWebhook: payload as any,
        },
      });

      return createdOrder;
    });

    const emailResult = await sendOrderNotifications(order);

    if (emailResult.success) {
      await prisma.order.update({
        where: { id: order.id },
        data: { emailSent: true },
      });
    }

    return NextResponse.json({
      received: true,
      orderId: order.id,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
