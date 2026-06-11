import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Simple honey jars with clear prices."
        text="Choose the bottle size that fits your home. Every order can be paid by UPI QR or Cash on Delivery."
      />
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
