import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CheckCircle2 } from "lucide-react";
import { business } from "@/lib/data";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Returns & Refund Policy",
  "HoneyBee Farm's 7-day money-back guarantee. Learn about our return process, refund timeline, and satisfaction guarantee.",
  "/legal/returns-refund",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

export default function ReturnsRefundPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Returns & Refund Policy"
        text="We want you to be completely satisfied with your purchase."
      />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-stone max-w-none">
            {/* Satisfaction Guarantee Banner */}
            <div className="mb-8 rounded-lg border-2 border-leaf bg-green-50 p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="text-leaf" size={32} />
                </div>
                <div>
                  <h3 className="mt-0 text-lg font-bold text-leaf">7-Day Money-Back Guarantee</h3>
                  <p className="mt-2 text-stone-700">
                    Not satisfied with your honey? We'll refund your money, no questions asked.
                    Your satisfaction is our guarantee.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-stone-500">
              Last updated: June 2026 | Effective date: June 2026
            </p>

            <h2>1. Return Window</h2>
            <p>
              You may return unused, unopened products within <strong>7 days of delivery</strong> for
              a full refund. The return window starts from the date the product is delivered to your
              address, not the date of order placement.
            </p>

            <h2>2. Conditions for Returns</h2>
            <p>To be eligible for a return, products must meet ALL of the following conditions:</p>
            <ul>
              <li>
                <strong>Unopened and Unused:</strong> The honey jar must be sealed and unopened
              </li>
              <li>
                <strong>Original Packaging:</strong> Product must be in original packaging with
                labels intact
              </li>
              <li>
                <strong>Within Return Window:</strong> Return request must be made within 7 days
                of delivery
              </li>
              <li>
                <strong>Original Condition:</strong> No damage caused by customer mishandling
              </li>
              <li>
                <strong>With Receipt/Proof:</strong> Include order number and delivery proof
              </li>
            </ul>

            <h2>3. How to Initiate a Return</h2>
            <p>To request a return:</p>
            <ol>
              <li>
                Contact us within 7 days of delivery via WhatsApp: <strong>{business.phone}</strong>
              </li>
              <li>Provide your order number and reason for return</li>
              <li>
                Send clear photos of the unopened jar with label visible (if applicable)
              </li>
              <li>Wait for return authorization and shipping instructions</li>
              <li>Ship the product back to us at the provided address (prepaid label if applicable)</li>
            </ol>

            <h2>4. Product Quality Guarantee</h2>
            <h3>4.1 Damaged Products</h3>
            <p>
              If your honey arrives damaged, leaked, or defective, report it <strong>within 24 hours of delivery</strong> with:
            </p>
            <ul>
              <li>Photos of the damaged jar</li>
              <li>Order number and delivery details</li>
              <li>Description of the damage</li>
            </ul>
            <p>
              We will provide a <strong>free replacement or full refund</strong> immediately for
              damaged products. No return shipment required.
            </p>

            <h3>4.2 Incorrect Product</h3>
            <p>
              If you received the wrong product or size, report it within 24 hours. We will
              immediately send the correct product and provide a prepaid return label for the
              incorrect item.
            </p>

            <h2>5. Non-Returnable Products</h2>
            <p>The following items are NOT eligible for return:</p>
            <ul>
              <li>Opened, partially used, or consumed products</li>
              <li>Products purchased more than 7 days ago</li>
              <li>Products damaged due to customer mishandling</li>
              <li>Products without original packaging or labels</li>
              <li>Products purchased during clearance or final sale events (if applicable)</li>
            </ul>

            <h2>6. Refund Processing</h2>
            <h3>6.1 Refund Timeline</h3>
            <ul>
              <li>
                <strong>Approval:</strong> Return requests reviewed within 2-3 business days
              </li>
              <li>
                <strong>Return Shipping:</strong> Please ship the item within 5 days of approval
              </li>
              <li>
                <strong>Receipt & Processing:</strong> We process returns within 5 business days
                of receiving the product
              </li>
              <li>
                <strong>Refund Credit:</strong> Refunds are credited to the original payment
                method within 5-7 business days after processing
              </li>
            </ul>
            <p>
              <em>Total refund timeline: 15-20 business days from return request to refund credit.</em>
            </p>

            <h3>6.2 Refund Methods</h3>
            <ul>
              <li>
                <strong>UPI Payments:</strong> Refunded to the same UPI ID used for the original
                purchase
              </li>
              <li>
                <strong>Cash on Delivery:</strong> Refund issued via bank transfer (provide
                account details)
              </li>
            </ul>

            <h2>7. Return Shipping</h2>
            <p>
              <strong>For unopened products:</strong> Customer bears return shipping costs unless
              the return is due to our error (wrong product, damage in transit).
            </p>
            <p>
              <strong>For defective/damaged products:</strong> We provide a prepaid return label.
              No shipping cost to you.
            </p>

            <h2>8. Exceptions and Special Cases</h2>
            <h3>8.1 Crystallized Honey</h3>
            <p>
              Natural honey crystallizes over time. This is a sign of purity, not defect. We do
              not accept returns for crystallization. To liquify, gently warm the jar in warm
              water (do not microwave).
            </p>

            <h3>8.2 Seasonal Variations</h3>
            <p>
              Honey color and texture vary by season. These natural variations are not grounds
              for return.
            </p>

            <h2>9. Exchanges</h2>
            <p>
              We do not offer direct exchanges. However, you can return a product for refund and
              place a new order. Use your refund credit for the new purchase.
            </p>

            <h2>10. Customer Satisfaction</h2>
            <p>
              If you are unsatisfied with your purchase for any reason, please reach out to us.
              We will work with you to find a solution. Our goal is your complete satisfaction.
            </p>

            <h2>11. Contact Information for Returns</h2>
            <div className="rounded-lg bg-honey-50 p-4">
              <p>
                <strong>To initiate a return, contact us via:</strong>
              </p>
              <p className="mt-2">
                <strong>WhatsApp:</strong> {business.phone}
              </p>
              <p>
                <strong>Email:</strong> {business.email}
              </p>
              <p>
                <strong>Phone:</strong> {business.phone}
              </p>
              <p className="mt-4 text-sm">
                <strong>Business Address:</strong>
                <br />
                {business.location}
              </p>
            </div>

            <h2>12. Questions?</h2>
            <p>
              If you have any questions about our returns and refund policy, please don't hesitate
              to contact us. We're here to help!
            </p>

            <p className="mt-8 text-sm text-stone-500">
              This Returns and Refund Policy is provided "as is". For professional legal advice,
              consult with a legal professional. This policy is subject to modification without
              notice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
