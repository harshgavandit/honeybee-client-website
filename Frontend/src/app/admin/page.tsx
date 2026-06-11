import { AdminDashboard } from "@/components/admin-dashboard";
import { PageHero } from "@/components/page-hero";

export default function AdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Manage orders, UPI verification, and COD status."
        text="This local v1 dashboard reads orders from browser storage. Replace it with protected database-backed admin after production setup."
      />
      <AdminDashboard />
    </>
  );
}
