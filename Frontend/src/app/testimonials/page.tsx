import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { testimonials } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Customer Reviews",
  "See what real customers say about HoneyBee Farm honey. Verified reviews from customers across India who've switched to pure, fresh honey.",
  "/testimonials",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What customers say"
        text="Hear from real customers who've switched to pure, fresh honey from HoneyBee Farm."
      />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={`${testimonial.name}-${testimonial.location}`}
                className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="font-bold text-lg text-ink">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.location}</p>
                  </div>
                  {testimonial.verified && (
                    <CheckCircle2 size={24} className="text-leaf flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="leading-relaxed text-stone-700">
                  "{testimonial.text}"
                </p>
                <p className="mt-4 text-xs text-stone-400 font-medium">
                  ✓ Verified Customer
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-honey-50 border border-honey-100 p-8 text-center">
            <p className="text-lg font-semibold text-ink">
              Have you ordered from us? Share your experience!
            </p>
            <p className="mt-2 text-stone-600">
              Your feedback helps us improve and helps other customers discover pure honey.
            </p>
            <a
              href="mailto:anshkoli0101@gmail.com?subject=My%20HoneyBee%20Farm%20Review"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-leaf text-white px-6 py-2 font-semibold hover:bg-leaf/90 transition"
            >
              Send your review
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
