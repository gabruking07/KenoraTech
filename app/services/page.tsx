import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/services-page-content";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore KenoraTech services for web development, mobile apps and UI/UX design."
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
