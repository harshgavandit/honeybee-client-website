import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Shipping Policy | HoneyBee",
  description: "Our shipping policy and delivery information",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <PageHero title="Shipping Policy" />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-sm max-w-none rounded-lg border border-honey-100 bg-white p-8 shadow-soft">
          <h2>Shipping & Delivery</h2>

          <h3>Delivery Areas</h3>
          <p>
            We deliver to all serviceable pincodes across India. Delivery timelines vary based on your location.
          </p>

          <h3>Delivery Timeline</h3>
          <ul>
            <li><strong>Metro Cities:</strong> 2-3 working days</li>
            <li><strong>Tier 2 Cities:</strong> 3-5 working days</li>
            <li><strong>Tier 3 & Rural:</strong> 5-7 working days</li>
          </ul>

          <h3>Shipping Charges</h3>
          <p>
            Free shipping on orders above ₹500. Orders below ₹500 may incur a flat shipping charge as calculated at checkout.
          </p>

          <h3>Order Processing</h3>
          <p>
            Orders are processed within 24-48 hours of successful payment confirmation. We may contact you via email or phone if we need to verify any details.
          </p>

          <h3>Tracking</h3>
          <p>
            Once your order ships, you will receive a tracking link via email. You can use it to monitor your delivery.
          </p>

          <h3>Damaged or Lost Shipments</h3>
          <p>
            In case of damage or loss during transit, please report it within 48 hours of delivery. We will arrange a replacement or refund.
          </p>

          <h3>Contact Us</h3>
          <p>
            For any shipping-related queries, please contact us at support@honeybee.com or call us at the number provided in the footer.
          </p>
        </div>
      </div>
    </>
  );
}
