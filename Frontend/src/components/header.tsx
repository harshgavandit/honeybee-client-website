"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/bee-hive", label: "Bee Hive" },
  { href: "/products", label: "Products" },
];

const helpLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/legal/returns-refund", label: "Returns & Refunds" },
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-honey-100 bg-[#fffaf0]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-honey-500 text-lg text-white">
            HB
          </span>
          <span className="hidden sm:inline">HoneyBee Farm</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-700 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-leaf transition">
              {item.label}
            </Link>
          ))}

          {/* Help Dropdown */}
          <div className="relative">
            <button
              onClick={() => setHelpOpen(!helpOpen)}
              className="flex items-center gap-1 hover:text-leaf transition"
              aria-expanded={helpOpen}
            >
              Help
              <ChevronDown size={16} className={`transition ${helpOpen ? "rotate-180" : ""}`} />
            </button>
            {helpOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-honey-100 bg-white shadow-soft">
                {helpLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-honey-50 hover:text-leaf first:rounded-t-lg last:rounded-b-lg transition"
                    onClick={() => setHelpOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/buy-honey"
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-leaf/90 transition hidden sm:flex"
          >
            <ShoppingBag size={18} />
            <span className="hidden md:inline">Order now</span>
          </Link>

          <button
            className="focus-ring rounded-md p-2 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-honey-100 bg-[#fffaf0] px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-honey-50 transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-honey-100 pt-2 mt-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase text-stone-500">Help</p>
              {helpLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-honey-50 transition block"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/buy-honey"
              className="focus-ring mt-3 inline-flex items-center justify-center gap-2 w-full rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-leaf/90 transition"
              onClick={() => setOpen(false)}
            >
              <ShoppingBag size={18} />
              Order now
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
