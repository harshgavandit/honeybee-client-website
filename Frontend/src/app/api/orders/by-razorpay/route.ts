import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const razorpayOrderId = request.nextUrl.searchParams.get("razorpay_order_id");

    if (!razorpayOrderId) {
      return NextResponse.json(
        { error: "razorpay_order_id is required" },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.findUnique({
      where: { razorpayOrderId },
      include: { order: true },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    if (!payment.order) {
      return NextResponse.json(
        { order: null, status: "pending" }
      );
    }

    return NextResponse.json({
      order: payment.order,
      status: "confirmed",
    });
  } catch (error) {
    console.error("Fetch order error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
