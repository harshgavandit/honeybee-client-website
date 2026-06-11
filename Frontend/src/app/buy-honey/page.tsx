import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { CheckoutForm } from "@/components/checkout-form";

export default function BuyHoneyPage() {
  return (
    <>
      <PageHero
        eyebrow="Buy honey"
        title="Place your order with UPI QR or Cash on Delivery."
        text="Select your jar, check delivery, and submit the order. UPI payments are verified by admin before final payment confirmation is sent."
      />
      <Suspense>
        <CheckoutForm />
      </Suspense>
    </>
  );
}
