import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { DeliveryChecker } from "@/components/delivery-checker";
import { ProductCard } from "@/components/product-card";
import { processSteps, products, trustPoints } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="bg-[#fffaf0]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-wide text-leaf">
              Pure local honey from a beekeeper
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-6xl">
              Order fresh honey jars with UPI, COD, and delivery updates.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
              Choose 100 ml, 200 ml, or 500 ml honey, check your pincode,
              place your order, and receive WhatsApp plus email updates from
              order placed to payment verification.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/buy-honey"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white shadow-soft"
              >
                Buy honey
                <ArrowRight size={19} />
              </Link>
              <Link
                href="/bee-hive"
                className="focus-ring inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-5 py-3 font-semibold"
              >
                See our process
              </Link>
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
              <h2 className="mt-2 text-3xl font-bold">Honey sizes for every home</h2>
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
