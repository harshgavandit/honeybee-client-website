"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/bee-hive", label: "Bee hive" },
  { href: "/products", label: "Products" },
  { href: "/buy-honey", label: "Buy honey" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-honey-100 bg-[#fffaf0]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-honey-500 text-lg text-white">
            HB
          </span>
          <span>HoneyBee Farm</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-700 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-leaf">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/buy-honey"
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-soft"
          >
            <ShoppingBag size={18} />
            Order now
          </Link>
        </div>

        <button
          className="focus-ring rounded-md p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-honey-100 bg-[#fffaf0] px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-honey-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
