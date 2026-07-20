import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkoutFormSchema } from "@/lib/validators";
import { createRazorpayOrder } from "@/lib/razorpay";
import { generateOrderId } from "@/lib/order-id";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validated = checkoutFormSchema.parse(body);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: validated.items.map((item) => item.productId),
        },
      },
    });

    if (products.length !== validated.items.length) {
      return NextResponse.json(
        { error: "Some products not found" },
        { status: 400 }
      );
    }

    let totalPaise = 0;
    const cartItems = validated.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const itemTotal = product.pricePaise * item.quantity;
      totalPaise += itemTotal;
      return { product, quantity: item.quantity, itemTotal };
    });

    const tempOrderId = generateOrderId(process.env.ORDER_ID_PREFIX || "HB");

    const razorpayOrder = await createRazorpayOrder(
      totalPaise,
      tempOrderId,
      validated.customerName,
      validated.customerEmail,
      validated.customerPhone
    );

    const payment = await prisma.payment.create({
      data: {
        razorpayOrderId: razorpayOrder.id,
        status: "CREATED",
        amountPaise: totalPaise,
        currency: "INR",
        checkoutPayload: {
          customerName: validated.customerName,
          customerEmail: validated.customerEmail,
          customerPhone: validated.customerPhone,
          addressLine1: validated.addressLine1,
          addressLine2: validated.addressLine2,
          city: validated.city,
          state: validated.state,
          pincode: validated.pincode,
          items: cartItems.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            unitPaise: item.product.pricePaise,
          })),
        },
      },
    });

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: totalPaise,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
