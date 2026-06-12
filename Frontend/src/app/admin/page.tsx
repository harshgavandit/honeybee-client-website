import { AdminDashboard } from "@/components/admin-dashboard";
import { PageHero } from "@/components/page-hero";

export default function AdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Order Management"
        title="Manage and track orders."
        text="View all orders, verify payments, and monitor delivery status."
      />
      <AdminDashboard />
    </>
  );
}
