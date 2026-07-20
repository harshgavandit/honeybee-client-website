import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/data";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Contact HoneyBee Farm",
  "Get in touch with us via WhatsApp, phone, email, or contact form. Ask about delivery, jar sizes, payment options, and more.",
  "/contact",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

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
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white"
            >
              <MessageCircle size={19} />
              Open WhatsApp
            </Link>
          </div>
          <div className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-wide text-leaf">
              Fastest support
            </p>
            <h2 className="mt-2 text-3xl font-bold">Message us before ordering.</h2>
            <p className="mt-4 leading-8 text-stone-700">
              For delivery, bulk orders, payment verification, or product
              questions, WhatsApp is the quickest way to get a clear answer.
              Email is available for formal order or refund communication.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hi HoneyBee Farm, I have a question before ordering honey.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white"
              >
                <MessageCircle size={19} />
                Ask on WhatsApp
              </Link>
              <Link
                href={`mailto:${business.email}?subject=${encodeURIComponent("Honey order enquiry")}`}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-5 py-3 font-semibold"
              >
                <Mail size={19} />
                Send email
              </Link>
            </div>
            <div className="mt-6 rounded-lg bg-honey-50 p-4 text-sm leading-6 text-stone-700">
              <p className="font-semibold text-ink">What to include</p>
              <p className="mt-1">
                Jar size, quantity, delivery pincode, and any payment reference
                if you already paid by UPI.
              </p>
            </div>
          </div>
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
