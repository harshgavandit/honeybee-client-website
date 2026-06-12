import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/data";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Terms of Service",
  "Read the terms and conditions for ordering from HoneyBee Farm. Learn about payment, delivery, returns, and liability.",
  "/legal/terms-of-service",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        text="Please read these terms carefully before placing an order."
      />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-stone max-w-none rounded-lg border border-honey-100 bg-white p-8 shadow-soft">
            <p className="text-sm text-stone-500">
              Last updated: June 2026 | Effective date: June 2026
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using www.honeybeefarm.in (the "Website"), you agree to
              be bound by these Terms of Service. If you do not agree to these terms, please do
              not use the Website.
            </p>

            <h2>2. Products and Services</h2>
            <p>
              HoneyBee Farm offers pure honey products in various sizes for direct sale to
              customers. All product descriptions, prices, and availability are provided "as is"
              without warranty.
            </p>
            <p>
              Product images and descriptions are for informational purposes. While we strive for
              accuracy, variations in color, appearance, or packaging may occur due to natural
              product characteristics or photographic differences.
            </p>

            <h2>3. Ordering and Payments</h2>
            <h3>3.1 Order Acceptance</h3>
            <p>
              Placing an order does not constitute an acceptance by {business.name}. We reserve
              the right to reject any order at our sole discretion. Orders are subject to
              verification and acceptance. You will receive confirmation via email and WhatsApp.
            </p>

            <h3>3.2 Payment Methods</h3>
            <p>
              We accept UPI transfers and Cash on Delivery (COD). By selecting a payment method,
              you agree to the associated payment terms. Payment must be completed as instructed
              during checkout.
            </p>

            <h3>3.3 Pricing</h3>
            <p>
              Prices are stated in Indian Rupees (INR) and are subject to change without notice.
              The price charged will be the price in effect at the time of order placement. We
              reserve the right to adjust prices or apply promotional discounts.
            </p>

            <h2>4. Delivery and Risk of Loss</h2>
            <h3>4.1 Delivery Zones</h3>
            <p>
              We deliver to serviceable areas based on pincode verification. Estimated delivery
              times are provided at checkout but are not guaranteed. Actual delivery times may
              vary based on location, weather, logistics, or unforeseen circumstances.
            </p>

            <h3>4.2 Risk of Loss</h3>
            <p>
              Risk of loss and title to products pass to you upon delivery to your specified
              address. {business.name} is not liable for loss, damage, or theft after delivery.
            </p>

            <h3>4.3 Failed Delivery</h3>
            <p>
              If delivery is not completed due to incomplete address, customer unavailability, or
              refusal, we will attempt redelivery. After two failed attempts, the order may be
              considered abandoned.
            </p>

            <h2>5. Returns and Refunds</h2>
            <p>
              Please see our dedicated Returns and Refund Policy for complete information about
              returns, refunds, and satisfaction guarantees.
            </p>

            <h2>6. Product Quality and Shelf Life</h2>
            <p>
              Our honey is 100% pure with no additives. Honey naturally crystallizes over time,
              which does not affect quality or purity. Store honey in a cool, dry place away from
              direct sunlight.
            </p>
            <p>
              If you receive damaged, defective, or incorrect products, contact us within 24
              hours of delivery with photos for resolution.
            </p>

            <h2>7. Payment Security</h2>
            <p>
              We do not store payment information on our servers. All payments are processed
              through secure payment gateways. We are not responsible for payment failures, fraud,
              or unauthorized transactions. Report any payment issues immediately.
            </p>

            <h2>8. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate, complete, and truthful information during checkout</li>
              <li>
                Maintain the confidentiality of your account information and payment details
              </li>
              <li>
                Not use the Website for illegal, fraudulent, or unauthorized purposes
              </li>
              <li>
                Not harass, abuse, or threaten {business.name} staff or other customers
              </li>
              <li>Not attempt to hack, modify, or disrupt the Website</li>
              <li>
                Not post misleading, defamatory, or offensive content on the Website
              </li>
            </ul>

            <h2>9. Intellectual Property</h2>
            <p>
              All content on the Website, including text, images, logos, and designs, is the
              intellectual property of {business.name} or its licensors. You may not reproduce,
              distribute, or transmit any content without express written permission.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {business.name} shall not be liable for
              indirect, incidental, special, consequential, or punitive damages arising from your
              use of the Website or products.
            </p>
            <p>
              In no event shall {business.name}'s total liability exceed the amount paid by you
              for the product in question.
            </p>

            <h2>11. Disclaimer of Warranties</h2>
            <p>
              Products are provided "as is" without warranties. {business.name} does not make
              any express or implied warranties regarding product fitness, merchantability, or
              specific purpose. All implied warranties are disclaimed to the extent permitted by
              law.
            </p>

            <h2>12. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms of Service are governed by the laws of India. Any disputes arising from
              your use of the Website or purchase of products shall be subject to the exclusive
              jurisdiction of courts in Maharashtra, India.
            </p>
            <p>
              Before initiating legal proceedings, we encourage attempting resolution through
              direct communication with us at {business.email}.
            </p>

            <h2>13. Modifications to Terms</h2>
            <p>
              {business.name} reserves the right to modify these Terms of Service at any time
              without notice. Your continued use of the Website following changes constitutes
              acceptance of the modified terms.
            </p>

            <h2>14. Severability</h2>
            <p>
              If any provision of these Terms of Service is found to be invalid or unenforceable,
              that provision shall be removed, and the remaining provisions shall continue in
              full force.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="rounded-lg bg-honey-50 p-4">
              <p>
                <strong>{business.name}</strong>
              </p>
              <p>
                <strong>Email:</strong> {business.email}
              </p>
              <p>
                <strong>Phone:</strong> {business.phone}
              </p>
              <p>
                <strong>WhatsApp:</strong> {business.phone}
              </p>
              <p>
                <strong>Location:</strong> {business.location}
              </p>
            </div>

            <p className="mt-8 text-sm text-stone-500">
              These Terms of Service are provided "as is" and do not create any legally binding
              obligation for {business.name}. For professional legal advice, consult with a legal
              professional.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
