"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Mail, MessageCircle, QrCode } from "lucide-react";
import {
  business,
  formatPrice,
  getDeliveryEstimate,
  products,
} from "@/lib/data";
import {
  addOrder,
  getMailTo,
  getOrderMessage,
  getWhatsAppUrl,
  type Order,
  type PaymentMethod,
} from "@/lib/orders";

type FormState = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  productId: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  proofFileName: string;
};

const initialState: FormState = {
  customerName: "",
  email: "",
  phone: "",
  address: "",
  pincode: "",
  productId: products[1].id,
  quantity: 1,
  paymentMethod: "UPI_BANK_TRANSFER",
  transactionId: "",
  proofFileName: "",
};

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const selectedProduct = searchParams.get("product");
  const [form, setForm] = useState<FormState>({
    ...initialState,
    productId:
      products.find((product) => product.id === selectedProduct)?.id ||
      initialState.productId,
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  const product = products.find((item) => item.id === form.productId) || products[0];
  const estimate = getDeliveryEstimate(form.pincode);
  const total = useMemo(
    () => product.price * Math.max(1, form.quantity),
    [form.quantity, product.price],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next = addOrder({
      customerName: form.customerName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      pincode: form.pincode,
      productId: form.productId,
      quantity: form.quantity,
      paymentMethod: form.paymentMethod,
      paymentStatus:
        form.paymentMethod === "COD" ? "cod_due" : "pending_verification",
      orderStatus: form.paymentMethod === "COD" ? "confirmed" : "placed",
      deliveryEstimate: estimate.days,
      transactionId: form.transactionId || undefined,
      proofFileName: form.proofFileName || undefined,
      total,
    });
    setOrder(next);
  }

  if (order) {
    const message = getOrderMessage(order, "placed");
    return (
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-leaf text-white">
              <CheckCircle2 size={30} />
            </div>
            <h2 className="mt-5 text-3xl font-bold">Order placed</h2>
            <p className="mt-3 leading-7 text-stone-700">
              Your order number is <strong>{order.id}</strong>. Use the buttons
              below to send the prepared email and WhatsApp confirmation in this
              local v1 build.
            </p>
            <div className="mt-5 rounded-lg bg-honey-50 p-4 text-sm leading-6">
              <p>
                <strong>Total:</strong> {formatPrice(order.total)}
              </p>
              <p>
                <strong>Delivery estimate:</strong> {order.deliveryEstimate}
              </p>
              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : "UPI/bank payment pending verification"}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getWhatsAppUrl(order.phone, message)}
                target="_blank"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white"
              >
                <MessageCircle size={19} />
                Send WhatsApp
              </Link>
              <Link
                href={getMailTo(order.email, `Order ${order.id} placed`, message)}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-5 py-3 font-semibold"
              >
                <Mail size={19} />
                Send email
              </Link>
              <Link
                href="/admin"
                className="focus-ring inline-flex items-center justify-center rounded-md bg-honey-500 px-5 py-3 font-semibold text-ink"
              >
                View admin
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <form onSubmit={submitOrder} className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold">Order details</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Jar size
              <select
                className="focus-ring mt-2 w-full rounded-md border border-stone-200 p-3"
                value={form.productId}
                onChange={(event) => update("productId", event.target.value)}
              >
                {products.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} {item.size} - {formatPrice(item.price)}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Quantity
              <input
                className="focus-ring mt-2 w-full rounded-md border border-stone-200 p-3"
                type="number"
                min={1}
                max={20}
                value={form.quantity}
                onChange={(event) =>
                  update("quantity", Number(event.target.value) || 1)
                }
              />
            </label>
            <Field label="Full name" value={form.customerName} onChange={(value) => update("customerName", value)} required />
            <Field label="Phone" value={form.phone} onChange={(value) => update("phone", value)} required />
            <Field label="Email" type="email" value={form.email} onChange={(value) => update("email", value)} required />
            <Field label="Pincode" value={form.pincode} onChange={(value) => update("pincode", value)} required maxLength={6} />
          </div>

          <label className="mt-4 block text-sm font-semibold">
            Delivery address
            <textarea
              className="focus-ring mt-2 min-h-28 w-full rounded-md border border-stone-200 p-3"
              value={form.address}
              onChange={(event) => update("address", event.target.value)}
              required
            />
          </label>

          <div className="mt-6 rounded-lg bg-honey-50 p-4">
            <p className="text-sm font-semibold text-stone-500">Delivery estimate</p>
            <p className="mt-1 font-bold">
              {estimate.label}: {estimate.days}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold">Payment method</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <PaymentButton
                active={form.paymentMethod === "UPI_BANK_TRANSFER"}
                title="UPI / bank transfer"
                text="Pay now with QR and upload proof."
                onClick={() => update("paymentMethod", "UPI_BANK_TRANSFER")}
              />
              <PaymentButton
                active={form.paymentMethod === "COD"}
                title="Cash on Delivery"
                text="Pay when the order arrives."
                onClick={() => update("paymentMethod", "COD")}
              />
            </div>
          </div>

          {form.paymentMethod === "UPI_BANK_TRANSFER" ? (
            <div className="mt-6 rounded-lg border border-honey-100 bg-[#fffaf0] p-5">
              <div className="flex items-start gap-4">
                <div className="grid h-28 w-28 shrink-0 place-items-center rounded-md border border-stone-300 bg-white">
                  <QrCode size={72} className="text-ink" />
                </div>
                <div>
                  <p className="font-bold">Scan UPI QR</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    Placeholder QR for now. Replace this with your real UPI QR
                    image in production.
                  </p>
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(business.upiId);
                      setCopied(true);
                    }}
                    className="focus-ring mt-3 inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-semibold"
                  >
                    <Copy size={16} />
                    {copied ? "Copied" : business.upiId}
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="UPI transaction ID"
                  value={form.transactionId}
                  onChange={(value) => update("transactionId", value)}
                />
                <label className="text-sm font-semibold">
                  Payment screenshot
                  <input
                    className="focus-ring mt-2 w-full rounded-md border border-stone-200 bg-white p-3"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      update(
                        "proofFileName",
                        event.target.files?.[0]?.name || "",
                      )
                    }
                  />
                </label>
              </div>
            </div>
          ) : null}

          <button className="focus-ring mt-6 w-full rounded-md bg-leaf px-5 py-3 font-semibold text-white">
            Place order - {formatPrice(total)}
          </button>
        </form>

        <aside className="h-fit rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <SummaryRow label="Product" value={`${product.name} ${product.size}`} />
            <SummaryRow label="Quantity" value={String(form.quantity)} />
            <SummaryRow label="Payment" value={form.paymentMethod === "COD" ? "Cash on Delivery" : "UPI / bank transfer"} />
            <SummaryRow label="Total" value={formatPrice(total)} strong />
          </div>
          <p className="mt-5 rounded-md bg-honey-50 p-3 text-sm leading-6 text-stone-700">
            UPI payments are confirmed only after admin verifies the bank
            transaction or screenshot. COD is available for all serviceable
            pincodes in this v1.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <input
        className="focus-ring mt-2 w-full rounded-md border border-stone-200 p-3"
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function PaymentButton({
  active,
  title,
  text,
  onClick,
}: {
  active: boolean;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring rounded-lg border p-4 text-left ${
        active ? "border-leaf bg-[#eef7f2]" : "border-stone-200 bg-white"
      }`}
    >
      <span className="font-bold">{title}</span>
      <span className="mt-1 block text-sm text-stone-600">{text}</span>
    </button>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
      <span className="text-stone-500">{label}</span>
      <span className={strong ? "text-lg font-bold" : "font-semibold"}>{value}</span>
    </div>
  );
}
