import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "Team Members",
  description: "Manage team members."
};

export default function TeamPage() {
  return <AdminContentManager type="team" title="Team Members" description="Add and manage team member profiles." titleLabel="Name and role" descriptionLabel="Profile details" />;
}
