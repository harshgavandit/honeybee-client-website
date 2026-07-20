import crypto from "crypto";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export { razorpay };

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const key = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const message = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", key)
    .update(message)
    .digest("hex");

  return expectedSignature === signature;
}

export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const key = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const expectedSignature = crypto
    .createHmac("sha256", key)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

export async function createRazorpayOrder(
  amountPaise: number,
  orderId: string,
  customerName: string,
  customerEmail: string,
  customerPhone: string
) {
  return razorpay.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: orderId,
    notes: {
      customerName,
      customerEmail,
      customerPhone,
    },
  });
}
