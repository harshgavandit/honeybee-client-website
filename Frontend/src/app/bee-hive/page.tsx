import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { processSteps } from "@/lib/data";

export default function BeeHivePage() {
  return (
    <>
      <PageHero
        eyebrow="Bee hive process"
        title="How honey moves from hive care to packed jars."
        text="Customers trust honey more when the process is visible. This page explains the practical steps without overcomplicating the buying experience."
      />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=1400&q=80"
              alt="Honey bees on a hive frame"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft">
                  <Icon className="text-leaf" size={28} />
                  <h2 className="mt-4 text-xl font-bold">{step.title}</h2>
                  <p className="mt-3 leading-7 text-stone-700">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
