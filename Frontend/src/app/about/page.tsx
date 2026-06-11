import Image from "next/image";
import { PageHero } from "@/components/page-hero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A beekeeper-owned honey business built on trust."
        text="This site is designed for direct customers who want to know where their honey comes from, how it is packed, and when it will arrive."
      />
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?auto=format&fit=crop&w=1200&q=80"
              alt="Beekeeper inspecting honey frames"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Direct from farm to family.</h2>
            <p className="mt-4 leading-8 text-stone-700">
              HoneyBee Farm is a commercial beekeeping business focused on
              producing practical jar sizes for everyday homes. The first goal
              is simple: help customers order fresh honey online without a
              confusing checkout.
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              The website keeps the buying journey clear with fixed jar sizes,
              pincode delivery estimates, UPI QR payment, COD availability, and
              WhatsApp/email updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
