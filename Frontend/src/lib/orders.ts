"use client";

import { business, products } from "@/lib/data";

export type PaymentMethod = "UPI_BANK_TRANSFER" | "COD";
export type PaymentStatus =
  | "pending_proof"
  | "pending_verification"
  | "verified"
  | "cod_due"
  | "cod_collected";
export type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "dispatched"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  productId: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryEstimate: string;
  transactionId?: string;
  proofFileName?: string;
  total: number;
  paymentVerifiedAt?: string;
};

const STORAGE_KEY = "honeybee-orders-v1";

export function readOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedOrders();
  try {
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function addOrder(order: Omit<Order, "id" | "createdAt">) {
  const next: Order = {
    ...order,
    id: `HB-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  };
  const orders = [next, ...readOrders()];
  saveOrders(orders);
  return next;
}

export function updateOrder(id: string, patch: Partial<Order>) {
  const orders = readOrders().map((order) =>
    order.id === id ? { ...order, ...patch } : order,
  );
  saveOrders(orders);
  return orders;
}

export function getProductLabel(productId: string) {
  const product = products.find((item) => item.id === productId);
  return product ? `${product.name} ${product.size}` : productId;
}

export function getOrderMessage(order: Order, mode: "placed" | "verified") {
  const product = getProductLabel(order.productId);
  if (mode === "verified") {
    return `Hello ${order.customerName}, your bank/UPI payment for order ${order.id} has been verified. We will pack ${order.quantity} x ${product}. Estimated delivery: ${order.deliveryEstimate}. - ${business.name}`;
  }

  const payment =
    order.paymentMethod === "COD"
      ? "Payment mode: Cash on Delivery."
      : "Payment proof received. We will verify the bank/UPI payment shortly.";
  return `Hello ${order.customerName}, your order ${order.id} is placed for ${order.quantity} x ${product}. ${payment} Estimated delivery: ${order.deliveryEstimate}. - ${business.name}`;
}

export function getWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const target = digits.length >= 10 ? digits : business.whatsapp;
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}

export function getMailTo(email: string, subject: string, message: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

function seedOrders(): Order[] {
  const seeded: Order[] = [
    {
      id: "HB-100001",
      createdAt: new Date().toISOString(),
      customerName: "Sample Customer",
      email: "customer@example.com",
      phone: "+91 90000 00000",
      address: "Sample address, India",
      pincode: "560001",
      productId: "jar-500",
      quantity: 1,
      paymentMethod: "UPI_BANK_TRANSFER",
      paymentStatus: "pending_verification",
      orderStatus: "placed",
      deliveryEstimate: "2-4 working days",
      transactionId: "UPI123456789",
      proofFileName: "sample-upi-proof.jpg",
      total: 499,
    },
  ];
  saveOrders(seeded);
  return seeded;
}
