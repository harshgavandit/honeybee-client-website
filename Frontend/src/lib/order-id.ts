import crypto from "crypto";

export function generateOrderId(prefix: string): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}${date}-${random}`;
}

export function generateUniqueOrderId(prefix: string, maxRetries: number = 3): string {
  for (let i = 0; i < maxRetries; i++) {
    const orderId = generateOrderId(prefix);
    return orderId;
  }
  throw new Error("Failed to generate unique order ID after retries");
}
