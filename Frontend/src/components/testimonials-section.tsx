import { testimonials } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-12 bg-honey-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-leaf uppercase tracking-wide">
            Customer Reviews
          </p>
          <h2 className="mt-2 text-4xl font-bold text-ink">What customers say</h2>
          <p className="mt-4 text-lg text-stone-600">
            Trusted by hundreds of honey lovers across India
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={`${testimonial.name}-${testimonial.location}`}
              className="rounded-lg border border-honey-100 bg-white p-6 shadow-soft"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-bold text-ink">{testimonial.name}</p>
                  <p className="text-sm text-stone-500">{testimonial.location}</p>
                </div>
                {testimonial.verified && (
                  <CheckCircle2 size={20} className="text-leaf flex-shrink-0 ml-2" />
                )}
              </div>
              <p className="mt-4 leading-relaxed text-stone-700">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/testimonials"
            className="inline-flex items-center justify-center rounded-md border border-leaf px-6 py-3 font-semibold text-leaf hover:bg-leaf hover:text-white transition"
          >
            See all reviews
          </a>
        </div>
      </div>
    </section>
  );
}
