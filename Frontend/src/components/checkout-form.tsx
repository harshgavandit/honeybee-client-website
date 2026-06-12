"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Mail, MessageCircle, AlertCircle } from "lucide-react";
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

type FormErrors = Partial<Record<keyof FormState, string>>;
type CheckoutStep = "details" | "payment" | "confirmation";

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

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ""));
}

function validatePincode(pincode: string): boolean {
  return /^[0-9]{6}$/.test(pincode);
}

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const selectedProduct = searchParams.get("product");
  const [step, setStep] = useState<CheckoutStep>("details");
  const [form, setForm] = useState<FormState>({
    ...initialState,
    productId:
      products.find((product) => product.id === selectedProduct)?.id ||
      initialState.productId,
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = products.find((item) => item.id === form.productId) || products[0];
  const estimate = getDeliveryEstimate(form.pincode);
  const total = useMemo(
    () => product.price * Math.max(1, form.quantity),
    [form.quantity, product.price],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function validateDetailsStep(): boolean {
    const newErrors: FormErrors = {};

    if (!form.customerName.trim()) {
      newErrors.customerName = "Full name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!validatePincode(form.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleDetailsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validateDetailsStep()) {
      setStep("payment");
    }
  }

  function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
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
      setStep("confirmation");
      setIsSubmitting(false);
    }, 800);
  }

  if (step === "confirmation" && order) {
    const message = getOrderMessage(order, "placed");
    return (
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-leaf text-white">
              <CheckCircle2 size={30} />
            </div>
            <h2 className="mt-5 text-3xl font-bold">Order placed successfully!</h2>
            <p className="mt-3 leading-7 text-stone-700">
              Your order number is <strong>{order.id}</strong>. A confirmation has been sent to your email and WhatsApp. We'll process your order and send you delivery updates shortly.
            </p>
            <div className="mt-5 rounded-lg bg-honey-50 p-4 text-sm leading-6">
              <p>
                <strong>Order Total:</strong> {formatPrice(order.total)}
              </p>
              <p>
                <strong>Expected Delivery:</strong> {order.deliveryEstimate}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : "UPI Transfer"}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getWhatsAppUrl(order.phone, message)}
                target="_blank"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white"
              >
                <MessageCircle size={19} />
                Continue on WhatsApp
              </Link>
              <Link
                href={getMailTo(order.email, `Order ${order.id} placed`, message)}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-5 py-3 font-semibold"
              >
                <Mail size={19} />
                Send to Email
              </Link>
              <Link
                href="/"
                className="focus-ring inline-flex items-center justify-center rounded-md bg-honey-500 px-5 py-3 font-semibold text-ink"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (step === "details") {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleDetailsSubmit}
            className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft"
          >
            <h2 className="text-2xl font-bold">Order details</h2>

            {Object.keys(errors).length > 0 && (
              <div className="mt-4 rounded-lg border border-error bg-red-50 p-4 flex gap-3">
                <AlertCircle className="text-error flex-shrink-0" size={20} />
                <div className="text-sm text-red-800">
                  <p className="font-semibold">Please fix the errors below:</p>
                  <ul className="mt-2 space-y-1">
                    {Object.entries(errors).map(([key, message]) => (
                      <li key={key} className="text-xs">• {message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

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
              <Field
                label="Full name"
                value={form.customerName}
                onChange={(value) => update("customerName", value)}
                error={errors.customerName}
                required
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(value) => update("phone", value)}
                error={errors.phone}
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => update("email", value)}
                error={errors.email}
                required
              />
              <Field
                label="Pincode"
                value={form.pincode}
                onChange={(value) => update("pincode", value)}
                error={errors.pincode}
                required
                maxLength={6}
              />
            </div>

            <label className="mt-4 block text-sm font-semibold">
              Delivery address
              <textarea
                className={`focus-ring mt-2 min-h-28 w-full rounded-md border p-3 ${errors.address ? 'border-error bg-red-50' : 'border-stone-200'}`}
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                required
              />
              {errors.address && <p className="mt-1 text-xs text-error">{errors.address}</p>}
            </label>

            <div className="mt-6 rounded-lg bg-honey-50 p-4">
              <p className="text-sm font-semibold text-stone-500">Delivery estimate</p>
              <p className="mt-1 font-bold">
                {estimate.label}: {estimate.days}
              </p>
            </div>

            <button className="focus-ring mt-6 w-full rounded-md bg-leaf px-5 py-3 font-semibold text-white transition hover:bg-leaf/90">
              Continue to payment
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (step === "payment") {
    return (
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <form onSubmit={submitOrder} className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
            <button
              type="button"
              onClick={() => setStep("details")}
              className="mb-4 text-sm text-leaf font-semibold hover:underline"
            >
              ← Back to details
            </button>
            <h2 className="text-2xl font-bold">Payment method</h2>

            <div className="mt-6">
              <div className="grid gap-3 sm:grid-cols-2">
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
                <div className="flex flex-col items-center gap-6">
                  <div className="grid h-64 w-64 shrink-0 place-items-center rounded-md border-2 border-stone-300 bg-white overflow-hidden shadow-md">
                    <Image
                      src="/images/qr-payment.png"
                      alt="UPI Payment QR Code"
                      width={256}
                      height={256}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Scan to Pay</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      Scan with any UPI app (Google Pay, PhonePe, Paytm, BHIM)
                    </p>
                    <p className="mt-3 text-sm font-semibold">
                      UPI ID: <span className="text-leaf">{business.upiId}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <button
              disabled={isSubmitting}
              className="focus-ring mt-6 w-full rounded-md bg-leaf px-5 py-3 font-semibold text-white transition hover:bg-leaf/90 disabled:opacity-75 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isSubmitting && <span className="spinner" />}
              {form.paymentMethod === "UPI_BANK_TRANSFER"
                ? isSubmitting ? "Processing..." : "Payment Complete"
                : isSubmitting ? "Placing order..." : `Place order - ${formatPrice(total)}`}
            </button>
          </form>

          <aside className="h-fit rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <SummaryRow label="Product" value={`${product.name} ${product.size}`} />
              <SummaryRow label="Quantity" value={String(form.quantity)} />
              <SummaryRow label="Customer" value={form.customerName} />
              <SummaryRow label="Address" value={form.address} />
              <SummaryRow label="Pincode" value={form.pincode} />
              <SummaryRow label="Delivery" value={`${estimate.label}: ${estimate.days}`} />
              <SummaryRow label="Payment" value={form.paymentMethod === "COD" ? "Cash on Delivery" : "UPI / bank transfer"} />
              <SummaryRow label="Total" value={formatPrice(total)} strong />
            </div>
            <p className="mt-5 rounded-md bg-honey-50 p-3 text-sm leading-6 text-stone-700">
              UPI payments are confirmed after verification of the bank
              transaction. COD is available for all serviceable pincodes.
            </p>
          </aside>
        </div>
      </section>
    );
  }
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  maxLength,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <input
        className={`focus-ring mt-2 w-full rounded-md border p-3 transition ${error ? 'border-error bg-red-50' : 'border-stone-200'}`}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
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
