"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { products } from "@/lib/data";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type FormState = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  items: Array<{ productId: string; quantity: number }>;
};

type FormErrors = Partial<Record<keyof FormState | "items", string>>;

const initialState: FormState = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  items: [{ productId: products[1]?.id || "", quantity: 1 }],
};

export function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProduct = searchParams.get("product");
  const [form, setForm] = useState<FormState>({
    ...initialState,
    items: [
      {
        productId:
          products.find((p) => p.id === selectedProduct)?.id ||
          initialState.items[0].productId,
        quantity: 1,
      },
    ],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function updateItem(index: number, key: keyof FormState["items"][0], value: any) {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!form.customerName.trim()) newErrors.customerName = "Name required";
    if (!form.customerEmail.trim()) newErrors.customerEmail = "Email required";
    if (!/^[6-9]\d{9}$/.test(form.customerPhone.replace(/\D/g, "")))
      newErrors.customerPhone = "Valid 10-digit phone required";
    if (!form.addressLine1.trim()) newErrors.addressLine1 = "Address required";
    if (!form.city.trim()) newErrors.city = "City required";
    if (!form.state.trim()) newErrors.state = "State required";
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "6-digit pincode required";
    if (form.items.some((item) => !item.productId || item.quantity < 1))
      newErrors.items = "Valid items required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm() || !scriptLoaded) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const { razorpayOrderId, amount, key } = await response.json();

      const options = {
        key,
        amount,
        currency: "INR",
        order_id: razorpayOrderId,
        prefill: {
          name: form.customerName,
          email: form.customerEmail,
          contact: form.customerPhone,
        },
        handler: () => {
          router.push(`/order-success?razorpay_order_id=${razorpayOrderId}`);
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      setErrors({ items: "Payment initialization failed" });
      setIsSubmitting(false);
    }
  }

  const selectedProductData = products.find((p) => p.id === form.items[0]?.productId);
  const total = (selectedProductData?.price || 0) * form.items[0]?.quantity || 0;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold">Checkout</h2>

          {Object.keys(errors).length > 0 && (
            <div className="mt-4 rounded-lg border border-error bg-red-50 p-4 flex gap-3">
              <AlertCircle className="text-error flex-shrink-0" size={20} />
              <div className="text-sm text-red-800">
                <p className="font-semibold">Please fix errors:</p>
                <ul className="mt-2 space-y-1">
                  {Object.entries(errors).map(([key, msg]) => (
                    <li key={key} className="text-xs">- {msg}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Product
              <select
                className="focus-ring mt-2 w-full rounded-md border border-stone-200 p-3"
                value={form.items[0].productId}
                onChange={(e) => updateItem(0, "productId", e.target.value)}
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.size} - ₹{p.price}
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
                value={form.items[0].quantity}
                onChange={(e) => updateItem(0, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
              />
            </label>

            <Field
              label="Full Name"
              value={form.customerName}
              onChange={(val) => update("customerName", val)}
              error={errors.customerName}
            />
            <Field
              label="Email"
              type="email"
              value={form.customerEmail}
              onChange={(val) => update("customerEmail", val)}
              error={errors.customerEmail}
            />
            <Field
              label="Phone"
              value={form.customerPhone}
              onChange={(val) => update("customerPhone", val)}
              error={errors.customerPhone}
            />
            <Field
              label="Pincode"
              value={form.pincode}
              onChange={(val) => update("pincode", val)}
              error={errors.pincode}
              maxLength={6}
            />
            <Field
              label="City"
              value={form.city}
              onChange={(val) => update("city", val)}
              error={errors.city}
            />
            <Field
              label="State"
              value={form.state}
              onChange={(val) => update("state", val)}
              error={errors.state}
            />
          </div>

          <label className="mt-4 block text-sm font-semibold">
            Address Line 1
            <input
              className={`focus-ring mt-2 w-full rounded-md border p-3 ${
                errors.addressLine1 ? "border-error bg-red-50" : "border-stone-200"
              }`}
              value={form.addressLine1}
              onChange={(e) => update("addressLine1", e.target.value)}
            />
            {errors.addressLine1 && <p className="mt-1 text-xs text-error">{errors.addressLine1}</p>}
          </label>

          <label className="mt-4 block text-sm font-semibold">
            Address Line 2 (Optional)
            <input
              className="focus-ring mt-2 w-full rounded-md border border-stone-200 p-3"
              value={form.addressLine2}
              onChange={(e) => update("addressLine2", e.target.value)}
            />
          </label>

          <div className="mt-6 rounded-lg bg-honey-50 p-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-lg">₹{total}</span>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className="focus-ring mt-6 w-full rounded-md bg-leaf px-5 py-3 font-semibold text-white transition hover:bg-leaf/90 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : `Pay ₹${total} with Razorpay`}
          </button>

          <p className="mt-4 text-center text-sm text-stone-600">
            Secure payment powered by Razorpay
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  error?: string;
  maxLength?: number;
}) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <input
        className={`focus-ring mt-2 w-full rounded-md border p-3 ${
          error ? "border-error bg-red-50" : "border-stone-200"
        }`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </label>
  );
}
