import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Flower2, Droplets, Sparkles, AlertCircle } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Our Honey Production Process",
  "See how we produce pure, raw honey through sustainable practices. From hive preparation to gentle extraction—complete transparency about our 6-step process.",
  "/bee-hive",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

export default function BeeHivePage() {
  const detailedSteps = [
    {
      number: "1",
      title: "Hive Preparation & Maintenance",
      description:
        "We maintain healthy, low-stress bee colonies in clean boxes positioned near flowering areas. Regular hive inspections ensure the bees are healthy and productive.",
      icon: Flower2,
    },
    {
      number: "2",
      title: "Seasonal Foraging",
      description:
        "Throughout the year, our bees collect nectar from diverse flowers in our pesticide-free area. Different seasons bring different floral sources, creating unique honey characteristics.",
      icon: Droplets,
    },
    {
      number: "3",
      title: "Nectar Processing",
      description:
        "Bees concentrate the nectar by evaporating water, transforming it into honey. They cap honeycomb cells with wax when the honey reaches the right consistency (below 18% water content).",
      icon: Sparkles,
    },
    {
      number: "4",
      title: "Careful Harvesting",
      description:
        "We harvest honeycomb frames only when they're fully capped. This ensures we collect only mature, shelf-stable honey. We never rush the process or take immature honey.",
      icon: Droplets,
    },
    {
      number: "5",
      title: "Gentle Extraction",
      description:
        "Honey is extracted from honeycomb using a gentle centrifuge. We filter out debris and wax particles while preserving the honey's natural nutrients and enzymes.",
      icon: Sparkles,
    },
    {
      number: "6",
      title: "Direct Packing",
      description:
        "Freshly extracted honey is carefully packed into jars with minimal delay. No heating, no processing, no added ingredients. Just pure honey from our farm to your kitchen.",
      icon: Sparkles,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Process"
        title="From hive to home: our honey production process."
        text="Transparency matters. Here's exactly how we produce pure honey and get it to you fresh."
      />

      {/* Hero Images */}
      <section className="py-12 bg-honey-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/images/honeycomb-1.jpg"
                alt="Honey comb frame from the hive"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/images/honeycomb-2.jpg"
                alt="Golden honey comb with honey"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-soft bg-black">
            <video
              width={1400}
              height={600}
              controls
              preload="metadata"
              className="w-full h-auto object-cover"
              poster="/images/honeycomb-1.jpg"
            >
              <source src="/videos/bee-video-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mt-3 text-center text-sm text-stone-500">
            See our honey production process in action
          </p>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-ink mb-12">6-step honey production</h2>
          <div className="space-y-8">
            {detailedSteps.map((step) => {
              const Icon = step.icon;
              const isEven = parseInt(step.number) % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                    isEven ? "lg:auto-cols-max lg:auto-flow-dense" : ""
                  }`}
                >
                  <div
                    className={`rounded-lg border border-honey-100 bg-white p-6 shadow-soft ${
                      isEven ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf text-white text-xl font-bold">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-ink">{step.title}</h3>
                    </div>
                    <p className="leading-8 text-stone-700">{step.description}</p>
                  </div>
                  <div
                    className={`relative min-h-[300px] overflow-hidden rounded-lg shadow-soft ${
                      isEven ? "lg:order-1" : ""
                    }`}
                  >
                    <Image
                      src={parseInt(step.number) % 2 === 1 ? "/images/bee-flower-1.jpg" : "/images/bee-flower-2.jpg"}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Controls */}
      <section className="py-12 bg-honey-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-ink mb-4">Quality Assurance</h2>
          <p className="text-center text-lg text-stone-600 mb-12 max-w-2xl mx-auto">
            Every batch is checked to ensure it meets our purity and freshness standards
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white border border-honey-100 p-6 shadow-soft">
              <AlertCircle className="text-leaf mb-3" size={28} />
              <h3 className="font-bold text-ink mb-2">Moisture Content</h3>
              <p className="text-sm text-stone-600">
                We only harvest honey below 18% water content for long shelf life and proper crystallization characteristics.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-honey-100 p-6 shadow-soft">
              <AlertCircle className="text-leaf mb-3" size={28} />
              <h3 className="font-bold text-ink mb-2">Purity Check</h3>
              <p className="text-sm text-stone-600">
                No additives, no processing, no heating. What's in the jar is 100% honey from our bees, nothing more.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-honey-100 p-6 shadow-soft">
              <AlertCircle className="text-leaf mb-3" size={28} />
              <h3 className="font-bold text-ink mb-2">Freshness Guarantee</h3>
              <p className="text-sm text-stone-600">
                Small-batch production and direct packing ensures every jar is as fresh as possible when it reaches you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-12 bg-leaf text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Why transparency matters</h2>
          <p className="text-lg leading-8 opacity-90">
            Honey is easier to trust when the process is easy to understand.
            We show how the hives are cared for, how honey is extracted, and
            how jars are packed so customers can make a confident decision.
          </p>
          <p className="mt-6 text-lg leading-8 opacity-90">
            This is why we keep the process visible before asking you to order.
          </p>
        </div>
      </section>
    </>
  );
}
