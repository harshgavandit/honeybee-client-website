import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-honey-100 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-52">
        <Image
          src={product.image}
          alt={`${product.name} ${product.size}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
          unoptimized
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-sm font-semibold text-leaf">{product.size}</p>
          </div>
          <p className="rounded-md bg-honey-50 px-3 py-1 font-bold text-honey-900">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          {product.short}
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-stone-700">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2">
              <Check size={16} className="shrink-0 text-leaf" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="focus-ring flex-1 rounded-md border border-stone-200 px-4 py-2 text-center text-sm font-semibold hover:bg-honey-50"
          >
            Details
          </Link>
          <Link
            href={`/buy-honey?product=${product.id}`}
            className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white hover:bg-leaf/90"
          >
            <ShoppingBag size={17} />
            Order
          </Link>
        </div>
      </div>
    </article>
  );
}
