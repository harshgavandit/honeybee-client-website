import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Pure Honey Jars",
  "Choose from 100ml, 200ml, or 500ml jars of 100% pure honey. All products available with UPI and Cash on Delivery payment options.",
  "/products",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Pure Honey in Three Sizes"
        text="Choose the jar size that fits your needs. 100% pure honey. No additives. No processing. Simple pricing, easy ordering."
      />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg text-stone-600 mb-12 max-w-2xl mx-auto">
            100% pure, raw honey from our farm. No additives. No processing. Same quality. Three sizes.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
