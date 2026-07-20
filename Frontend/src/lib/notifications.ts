import { Order, OrderItem, Payment } from "@prisma/client";
import { sendCustomerEmail, sendOwnerEmail } from "./resend";

export async function sendOrderNotifications(
  order: Order & { items: OrderItem[]; payment: Payment }
) {
  const paymentStatus =
    order.payment.status === "CAPTURED" ? "Confirmed" : order.payment.status;

  const orderData = {
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    addressLine1: order.addressLine1,
    addressLine2: order.addressLine2,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    items: order.items.map((item) => ({
      productName: item.productName,
      productSize: item.productSize,
      quantity: item.quantity,
      totalPaise: item.totalPaise,
    })),
    totalPaise: order.totalPaise,
    paymentStatus,
    createdAt: order.createdAt,
  };

  try {
    await Promise.all([
      sendCustomerEmail(order.customerEmail, order.id, {
        customerName: order.customerName,
        items: orderData.items,
        totalPaise: orderData.totalPaise,
        paymentStatus,
      }),
      sendOwnerEmail(order.id, orderData),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
