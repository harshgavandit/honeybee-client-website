import { Order, OrderItem } from "@prisma/client";

export function generateInvoiceHTML(
  order: Order & { items: OrderItem[] }
): string {
  const amountInRupees = (order.totalPaise / 100).toFixed(2);
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td>${item.productName} (${item.productSize})</td>
      <td>${item.quantity}</td>
      <td>₹${(item.unitPaise / 100).toFixed(2)}</td>
      <td>₹${(item.totalPaise / 100).toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .header { margin-bottom: 30px; }
        .footer { margin-top: 30px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${process.env.BUSINESS_NAME}</h1>
        <p>Invoice for Order #${order.id}</p>
        <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      <div class="customer-info">
        <h3>Bill To:</h3>
        <p>${order.customerName}</p>
        <p>${order.addressLine1}${order.addressLine2 ? ", " + order.addressLine2 : ""}</p>
        <p>${order.city}, ${order.state} - ${order.pincode}</p>
        <p>Email: ${order.customerEmail}</p>
        <p>Phone: ${order.customerPhone}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div style="text-align: right; margin-top: 20px;">
        <h3>Total Amount: ₹${amountInRupees}</h3>
      </div>

      <div class="footer">
        <p>Thank you for your purchase!</p>
        <p>${process.env.BUSINESS_NAME} | Phone: ${process.env.BUSINESS_PHONE} | Email: ${process.env.BUSINESS_EMAIL}</p>
      </div>
    </body>
    </html>
  `;
}
