import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { DeliveryChecker } from "@/components/delivery-checker";
import { ProductCard } from "@/components/product-card";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { processSteps, products, trustPoints } from "@/lib/data";
import { generateOrganizationSchema } from "@/lib/metadata";

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <section className="bg-[#fffaf0]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-wide text-leaf">
              Direct from our farm to your table
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-6xl">
              Pure honey. No compromise.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
              100% raw honey from our farm in Raigad, harvested with care and packed fresh. Choose your size, verify delivery to your pincode, and order today with UPI or Cash on Delivery. Track your order on WhatsApp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/buy-honey"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white shadow-soft hover:bg-leaf/90 transition"
              >
                Order Now
                <ArrowRight size={19} />
              </Link>
              <Link
                href="/bee-hive"
                className="focus-ring inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-5 py-3 font-semibold hover:bg-honey-50 transition"
              >
                See Our Process
              </Link>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-leaf" />
                <span>No added sugar or flavours</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-leaf" />
                <span>UPI, COD, and WhatsApp support</span>
              </div>
            </div>
            <div className="mt-8 max-w-xl">
              <DeliveryChecker />
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-lg shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80"
              alt="Golden honey being poured into a jar"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <p className="max-w-sm text-xl font-bold">
                Small-batch jars packed for direct customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="rounded-lg border border-honey-100 p-5">
                <Icon className="text-leaf" size={25} />
                <h2 className="mt-4 font-bold">{point.title}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">{point.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-leaf">
                Choose your jar
              </p>
                <h2 className="mt-2 text-3xl font-bold">Choose the right jar size</h2>
            </div>
            <Link href="/products" className="font-semibold text-leaf">
              View all products
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection />

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-honey-100 text-honey-900">
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="font-bold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-honey-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-leaf">
                Why customers trust us
              </p>
              <h2 className="mt-2 text-3xl font-bold">Clear sourcing, simple payment, human support.</h2>
              <p className="mt-4 leading-8 text-stone-700">
                Honey is a trust product. We make the buying decision easier by
                showing where the honey comes from, what each jar costs, how
                delivery works, and how to reach us before or after ordering.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Farm location shared", "UPI and COD available", "Order help on WhatsApp"].map((item) => (
                <div key={item} className="rounded-lg border border-honey-100 bg-white p-5 text-center shadow-soft">
                  <CheckCircle2 className="mx-auto text-leaf" size={24} />
                  <p className="mt-3 text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-ink p-6 text-white shadow-soft md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Ready to place an order?</h2>
                <p className="mt-2 max-w-2xl text-stone-300">
                  Pay with UPI QR or choose COD. You will get order updates by
                  email and WhatsApp.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/buy-honey"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-honey-500 px-5 py-3 font-semibold text-ink"
                >
                  <CheckCircle2 size={19} />
                  Start order
                </Link>
                <Link
                  href="/contact"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 font-semibold"
                >
                  <MessageCircle size={19} />
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
