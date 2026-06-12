import Link from "next/link";
import { business } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-honey-100 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* About */}
        <div>
          <p className="text-lg font-bold">{business.name}</p>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Pure honey directly from our farm in {business.location.split(",")[0]}. 100% natural, no additives, delivered fresh.
          </p>
          <div className="mt-4 flex gap-3">
            <span className="inline-block rounded-full bg-leaf/20 px-3 py-1 text-xs font-semibold text-leaf">
              Direct from Farm
            </span>
            <span className="inline-block rounded-full bg-honey-500/20 px-3 py-1 text-xs font-semibold text-honey-400">
              100% Pure Honey
            </span>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="font-semibold">Shop</p>
          <div className="mt-4 grid gap-3 text-sm text-stone-300">
            <Link href="/products" className="hover:text-white transition">
              Products
            </Link>
            <Link href="/buy-honey" className="hover:text-white transition">
              Order Now
            </Link>
            <Link href="/faq" className="hover:text-white transition">
              FAQ
            </Link>
            <Link href="/bee-hive" className="hover:text-white transition">
              Our Process
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <p className="font-semibold">Legal</p>
          <div className="mt-4 grid gap-3 text-sm text-stone-300">
            <Link href="/legal/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-service" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/legal/returns-refund" className="hover:text-white transition">
              Returns & Refunds
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="font-semibold">Get in Touch</p>
          <div className="mt-4 space-y-3 text-sm text-stone-300">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">Email</p>
              <a
                href={`mailto:${business.email}`}
                className="hover:text-white transition"
              >
                {business.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">WhatsApp</p>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                {business.phone}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">Phone</p>
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition"
              >
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800 bg-black/30 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm text-stone-400">
            © 2026 {business.name}. All rights reserved. Made with care for honey lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
