import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendCustomerEmail(
  customerEmail: string,
  orderId: string,
  orderData: {
    customerName: string;
    items: Array<{ productName: string; productSize: string; quantity: number; totalPaise: number }>;
    totalPaise: number;
    paymentStatus: string;
  }
) {
  const amountInRupees = (orderData.totalPaise / 100).toFixed(2);
  const itemsList = orderData.items
    .map(
      (item) =>
        `${item.productName} (${item.productSize}) - Qty: ${item.quantity} - ₹${(item.totalPaise / 100).toFixed(2)}`
    )
    .join("\n");

  const html = `
    <h2>Payment Successful!</h2>
    <p>Dear ${orderData.customerName},</p>
    <p>Thank you for your purchase. Your order has been confirmed.</p>

    <h3>Order Details</h3>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Status:</strong> ${orderData.paymentStatus}</p>

    <h3>Items</h3>
    <pre>${itemsList}</pre>

    <p><strong>Total Amount:</strong> ₹${amountInRupees}</p>

    <p>Our team will process your order shortly and you'll receive a shipping update.</p>

    <p>Thank you for choosing HoneyBee!</p>
    <p>
      ${process.env.BUSINESS_NAME}<br />
      Phone: ${process.env.BUSINESS_PHONE}<br />
      Email: ${process.env.BUSINESS_EMAIL}
    </p>
  `;

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: customerEmail,
    subject: `Order Confirmed - ${orderId}`,
    html,
  });
}

export async function sendOwnerEmail(
  orderId: string,
  orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    items: Array<{ productName: string; productSize: string; quantity: number; totalPaise: number }>;
    totalPaise: number;
    paymentStatus: string;
    createdAt: Date;
  }
) {
  const amountInRupees = (orderData.totalPaise / 100).toFixed(2);
  const address = `${orderData.addressLine1}${orderData.addressLine2 ? ", " + orderData.addressLine2 : ""}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}`;
  const itemsList = orderData.items
    .map(
      (item) =>
        `${item.productName} (${item.productSize}) - Qty: ${item.quantity} - ₹${(item.totalPaise / 100).toFixed(2)}`
    )
    .join("\n");

  const html = `
    <h2>New Order Alert</h2>

    <h3>Order Details</h3>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Time:</strong> ${orderData.createdAt.toLocaleString()}</p>

    <h3>Customer Information</h3>
    <p><strong>Name:</strong> ${orderData.customerName}</p>
    <p><strong>Email:</strong> ${orderData.customerEmail}</p>
    <p><strong>Phone:</strong> ${orderData.customerPhone}</p>

    <h3>Delivery Address</h3>
    <p>${address}</p>

    <h3>Items Ordered</h3>
    <pre>${itemsList}</pre>

    <p><strong>Total Amount:</strong> ₹${amountInRupees}</p>
    <p><strong>Payment Status:</strong> ${orderData.paymentStatus}</p>
  `;

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.OWNER_EMAIL!,
    subject: `New Order - ${orderId}`,
    html,
  });
}
