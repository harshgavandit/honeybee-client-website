import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/data";
import { Leaf, Heart, Droplets } from "lucide-react";
import { generateMetadata, generateOrganizationSchema } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Meet Ansh Koli - Beekeeper at HoneyBee Farm",
  "Learn about Ansh Koli and our sustainable beekeeping practices in Raigad. Discover how we produce pure, raw honey without additives or shortcuts.",
  "/about",
  "https://honeybeefarm.in/images/bee-flower-1.jpg"
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Pure honey from our farm to your home."
        text="Meet Ansh Koli, a beekeeper committed to producing the freshest, purest honey through sustainable farming practices."
      />

      {/* Founder Story */}
      <section className="py-12 bg-honey-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[400px] overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/images/bee-flower-1.jpg"
                alt="Ansh Koli at the apiary with honeybees"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-leaf">
                Meet the beekeeper
              </p>
              <h2 className="mt-3 text-4xl font-bold text-ink">Ansh Koli</h2>
              <p className="mt-4 text-lg text-stone-600">
                Founder & Beekeeper, HoneyBee Farm
              </p>
              <p className="mt-6 leading-8 text-stone-700">
                I started beekeeping because I believed in creating something pure and honest. Every jar of honey from HoneyBee Farm is a result of my commitment to the bees, the environment, and my customers.
              </p>
              <p className="mt-4 leading-8 text-stone-700">
                Located in Dighode, Raigad, our farm is positioned in an area rich with natural flowering plants. This ensures our bees have access to diverse, pesticide-free pollen sources throughout the year.
              </p>
              <p className="mt-4 leading-8 text-stone-700">
                I take pride in every batch of honey we produce. No shortcuts, no additives, just pure honey packed with care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ink">What drives us</h2>
            <p className="mt-4 text-lg text-stone-600">
              Our core values guide every decision we make
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf/10">
                <Leaf className="text-leaf" size={24} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink">Sustainability</h3>
              <p className="mt-3 leading-6 text-stone-700">
                We maintain healthy bee colonies and protect the environment. Our beekeeping practices support biodiversity and local ecosystems.
              </p>
            </div>
            <div className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf/10">
                <Droplets className="text-leaf" size={24} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink">Purity</h3>
              <p className="mt-3 leading-6 text-stone-700">
                100% pure honey with no additives, no processing, no shortcuts. What you get is exactly what comes from our hives.
              </p>
            </div>
            <div className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf/10">
                <Heart className="text-leaf" size={24} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink">Care</h3>
              <p className="mt-3 leading-6 text-stone-700">
                We care about our bees, our land, and most importantly, our customers. Every jar is packed with attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Details */}
      <section className="py-12 bg-honey-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-bold text-ink">Our farm in Raigad</h2>
              <p className="mt-4 leading-8 text-stone-700">
                Located in Dighode, Uran, our apiary sits in one of the most biodiverse regions of Maharashtra. The local flora provides year-round blooms for our bees to forage from.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-white">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Pesticide-free environment</p>
                    <p className="text-sm text-stone-600">Natural flowering plants and organic farming practices</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-white">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Low-disturbance hives</p>
                    <p className="text-sm text-stone-600">Bees are handled with minimal stress for maximum productivity</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-white">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Small-batch production</p>
                    <p className="text-sm text-stone-600">Limited production ensures freshness for every customer</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-lg bg-white border border-honey-100 p-4">
                <p className="text-sm font-semibold text-stone-600">Farm Location</p>
                <p className="mt-2 font-semibold text-lg text-ink">{business.location}</p>
                <p className="mt-3 text-sm text-stone-600">
                  <strong>Get in touch:</strong> {business.phone}
                </p>
              </div>
            </div>
            <div className="relative min-h-[400px] overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/images/honeycomb-1.jpg"
                alt="Honeycomb frames from our apiary"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-ink text-center mb-12">Our apiary</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative min-h-[300px] overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/images/bee-flower-2.jpg"
                alt="Bee collecting pollen from flower"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/images/honeycomb-2.jpg"
                alt="Golden honeycomb filled with honey"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
