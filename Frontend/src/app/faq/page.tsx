import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FAQSection } from "@/components/faq-section";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Frequently Asked Questions",
  "Find answers about our pure honey, ordering process, delivery times, payment options, returns, and product safety.",
  "/faq",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        title="Frequently Asked Questions"
        text="Find answers to common questions about our honey, ordering, delivery, and more."
      />
      <FAQSection limit={999} />
    </>
  );
}
