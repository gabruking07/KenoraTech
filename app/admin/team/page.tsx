import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Team Members",
  description: "Manage team members."
};

export default function TeamPage() {
  return <AdminPlaceholderPage title="Team Members" description="Manage team profiles, roles and ordering." items={[]} />;
}
