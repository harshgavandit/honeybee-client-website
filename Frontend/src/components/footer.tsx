import Link from "next/link";
import { business } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-honey-100 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold">{business.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-300">
            Pure local honey packed by a commercial beekeeper, with UPI, COD,
            WhatsApp updates, and clear delivery estimates.
          </p>
        </div>
        <div>
          <p className="font-semibold">Pages</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-300">
            <Link href="/products">Products</Link>
            <Link href="/buy-honey">Buy honey</Link>
            <Link href="/bee-hive">Bee hive process</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-300">
            <span>{business.phone}</span>
            <span>{business.email}</span>
            <span>{business.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
