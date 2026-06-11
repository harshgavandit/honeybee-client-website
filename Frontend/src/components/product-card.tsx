import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-honey-100 bg-white shadow-soft">
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
        <p className="mt-3 min-h-16 text-sm leading-6 text-stone-600">
          {product.short}
        </p>
        <div className="mt-5 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="focus-ring flex-1 rounded-md border border-stone-200 px-4 py-2 text-center text-sm font-semibold"
          >
            Details
          </Link>
          <Link
            href={`/buy-honey?product=${product.id}`}
            className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white"
          >
            <ShoppingBag size={17} />
            Order
          </Link>
        </div>
      </div>
    </article>
  );
}
