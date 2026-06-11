import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/data";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Questions before ordering? Send a quick message."
        text="Customers can ask about delivery, jar sizes, payment, and order status through WhatsApp, phone, email, or the contact form."
      />
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="grid gap-4">
            <ContactLine icon={<Phone size={22} />} label="Phone" value={business.phone} />
            <ContactLine icon={<Mail size={22} />} label="Email" value={business.email} />
            <ContactLine icon={<MapPin size={22} />} label="Location" value={business.location} />
            <Link
              href={`https://wa.me/${business.whatsapp}`}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white"
            >
              <MessageCircle size={19} />
              Open WhatsApp
            </Link>
          </div>
          <form className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" />
              <Field label="Phone" />
            </div>
            <div className="mt-4">
              <Field label="Email" type="email" />
            </div>
            <label className="mt-4 block text-sm font-semibold">
              Message
              <textarea className="focus-ring mt-2 min-h-32 w-full rounded-md border border-stone-200 p-3" />
            </label>
            <button className="focus-ring mt-5 rounded-md bg-honey-500 px-5 py-3 font-semibold text-ink">
              Submit form
            </button>
            <p className="mt-3 text-sm text-stone-500">
              Demo form for v1 UI. Connect to email provider during backend setup.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function ContactLine({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-honey-100 bg-white p-5 shadow-soft">
      <div className="text-leaf">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-stone-500">{label}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input className="focus-ring mt-2 w-full rounded-md border border-stone-200 p-3" type={type} />
    </label>
  );
}
