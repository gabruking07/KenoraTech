import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Admin Profile",
  description: "Manage admin profile."
};

export default function ProfilePage() {
  return (
    <AdminPlaceholderPage
      title="Admin Profile"
      description="Manage account information and dashboard preferences."
      items={[]}
    />
  );
}
