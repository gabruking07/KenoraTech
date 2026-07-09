import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Manage pricing plans."
};

export default function PricingAdminPage() {
  return (
    <AdminPlaceholderPage
      title="Pricing Plans"
      description="Manage plan names, pricing, feature lists and highlighted packages."
      items={[]}
    />
  );
}
