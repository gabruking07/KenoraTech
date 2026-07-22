import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Manage testimonials."
};

export default function TestimonialsPage() {
  return <AdminContentManager type="testimonials" title="Testimonials" description="Add and manage client reviews." titleLabel="Client name" descriptionLabel="Testimonial" defaults={[
    { title: "Rhea Sharma", description: "Kenora Tech turned our scattered ideas into a polished website that instantly made our brand feel more credible." },
    { title: "Arjun Mehta", description: "The team understood product thinking, not just page design. Our client portal is cleaner and much faster." },
    { title: "Neha Iyer", description: "They shipped quickly, communicated clearly and cared about details that usually get missed before launch." }
  ]} />;
}
