import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { formatPrice, getProductBySlug, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-leaf">
          <ArrowLeft size={17} />
          Back to products
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg shadow-soft">
            <Image
              src={product.image}
              alt={`${product.name} ${product.size}`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              unoptimized
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-wide text-leaf">
              Fresh honey jar
            </p>
            <h1 className="mt-3 text-4xl font-bold">
              {product.name} {product.size}
            </h1>
            <p className="mt-3 text-3xl font-bold text-honey-700">
              {formatPrice(product.price)}
            </p>
            <p className="mt-5 text-lg leading-8 text-stone-700">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.bestFor.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-honey-100 bg-white px-3 py-2 text-sm font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href={`/buy-honey?product=${product.id}`}
              className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white shadow-soft sm:w-auto"
            >
              <ShoppingBag size={19} />
              Order this jar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
