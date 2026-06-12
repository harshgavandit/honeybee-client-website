"use client";

import { faqs } from "@/lib/data";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection({ limit = 3 }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const displayFaqs = faqs.slice(0, limit);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-leaf uppercase tracking-wide">
            Questions?
          </p>
          <h2 className="mt-2 text-4xl font-bold text-ink">Frequently asked</h2>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-honey-100 bg-white shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-honey-50 transition text-left"
              >
                <span className="font-semibold text-ink pr-4">{faq.q}</span>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 text-leaf transition ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-honey-100 px-6 py-4 bg-honey-50">
                  <p className="text-stone-700 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {limit < faqs.length && (
          <div className="mt-8 text-center">
            <a
              href="/faq"
              className="inline-flex items-center justify-center rounded-md border border-leaf px-6 py-3 font-semibold text-leaf hover:bg-leaf hover:text-white transition"
            >
              View all {faqs.length} questions
            </a>
          </div>
        )}

        <div className="mt-12 rounded-lg bg-leaf text-white p-8 text-center">
          <p className="text-lg font-semibold">Can't find your answer?</p>
          <p className="mt-2 opacity-90">
            Contact us via WhatsApp, email, or phone. We're here to help!
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white text-leaf px-6 py-2 font-semibold hover:bg-honey-50 transition"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
