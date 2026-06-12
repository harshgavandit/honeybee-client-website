import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/data";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(
  "Privacy Policy",
  "How HoneyBee Farm collects, uses, and protects your personal information. Learn about data security and your rights.",
  "/legal/privacy-policy",
  "https://honeybeefarm.in/images/honeycomb-1.jpg"
);

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        text="How we collect, use, and protect your personal information."
      />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-stone max-w-none rounded-lg border border-honey-100 bg-white p-8 shadow-soft">
            <p className="text-sm text-stone-500">
              Last updated: June 2026 | Effective date: June 2026
            </p>

            <h2>1. Introduction</h2>
            <p>
              HoneyBee Farm ("we," "our," "us," or "Company") operates the website
              www.honeybeefarm.in and related services. We are committed to protecting your
              privacy and ensuring you have a positive experience on our website.
            </p>
            <p>
              This Privacy Policy explains our information collection, use, and protection
              practices. By accessing or using our website, you agree to the terms of this
              Privacy Policy.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect information you provide directly and automatically when you use our services:</p>

            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>
                <strong>Contact Information:</strong> Name, email address, phone number, and
                delivery address when you place an order
              </li>
              <li>
                <strong>Payment Information:</strong> UPI ID, payment method, and transaction
                details (processed securely)
              </li>
              <li>
                <strong>Communication:</strong> Messages you send us via contact form, email,
                WhatsApp, or other channels
              </li>
              <li>
                <strong>Feedback:</strong> Reviews, testimonials, and suggestions about our
                products
              </li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent, links clicked, and
                browsing patterns
              </li>
              <li>
                <strong>Device Information:</strong> Device type, browser, operating system,
                and IP address
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies to enhance your experience and
                remember your preferences
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use collected information for the following purposes:</p>
            <ul>
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations, tracking updates, and delivery notifications</li>
              <li>Communicating with you via WhatsApp, email, or phone about your order</li>
              <li>Improving our website, products, and services</li>
              <li>Responding to your inquiries and customer support requests</li>
              <li>Compliance with legal obligations</li>
              <li>Marketing communications (with your consent)</li>
            </ul>

            <h2>4. How We Protect Your Information</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
              This includes:
            </p>
            <ul>
              <li>Secure payment processing through encrypted channels</li>
              <li>Restricted access to personal information</li>
              <li>Regular security assessments</li>
              <li>Secure backup procedures</li>
            </ul>
            <p>
              While we strive to protect your information, no method of transmission over the
              internet is completely secure. We cannot guarantee absolute security.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this Privacy Policy, including:
            </p>
            <ul>
              <li>Order and transaction records: Retained for 7 years for accounting purposes</li>
              <li>
                Customer communication records: Retained for 2 years or as required by law
              </li>
              <li>Promotional information: Retained until you unsubscribe</li>
            </ul>

            <h2>6. Sharing Your Information</h2>
            <p>
              We do not sell your personal information. We may share your information only in
              these circumstances:
            </p>
            <ul>
              <li>
                <strong>Logistics Partners:</strong> Delivery address and phone number with
                shipping providers
              </li>
              <li>
                <strong>Payment Processors:</strong> Payment information with secure payment
                gateways
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or
                government requests
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party services that assist us in
                operations (under confidentiality agreements)
              </li>
            </ul>

            <h2>7. WhatsApp and Email Communications</h2>
            <p>
              By providing your phone number and email, you consent to receive order updates,
              delivery notifications, and customer support messages via WhatsApp and email. You
              can opt out at any time by contacting us.
            </p>

            <h2>8. Your Privacy Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of personal information we hold about
                you
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal data (subject to
                legal obligations)
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing communications
              </li>
            </ul>

            <h2>9. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 18 years old. We do not knowingly
              collect personal information from children. If we learn that we have collected
              information from a child, we will delete it promptly.
            </p>

            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated effective date. Your continued use of our website
              indicates acceptance of the updated Privacy Policy.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please
              contact us:
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
              This Privacy Policy is provided "as is" and does not create any legally binding
              obligation for {business.name}. For professional legal advice, consult with a legal
              professional.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
