import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Website Settings",
  description: "Manage website settings."
};

export default function SettingsPage() {
  return (
    <AdminPlaceholderPage
      title="Website Settings"
      description="Manage global website settings, SEO defaults and contact details."
      items={[]}
    />
  );
}
