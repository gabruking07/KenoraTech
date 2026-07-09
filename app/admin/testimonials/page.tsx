import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Manage testimonials."
};

export default function TestimonialsPage() {
  return (
    <AdminPlaceholderPage
      title="Testimonials"
      description="Manage client testimonials, review snippets and featured quotes."
      items={[]}
    />
  );
}
