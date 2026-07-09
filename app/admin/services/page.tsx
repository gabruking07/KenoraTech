import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Services",
  description: "Manage service sections."
};

export default function ServicesPage() {
  return <AdminPlaceholderPage title="Services" description="Manage service cards and website service content." items={[]} />;
}
