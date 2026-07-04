import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { ServicesSection } from "@/components/sections/services-section";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Kenora Tech services for websites, web applications, e-commerce, UI/UX, SEO and maintenance."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Digital execution across the full product lifecycle."
        description="From first landing page to mature web platform, we build the foundations, interfaces and growth systems your business needs."
      />
      <ServicesSection compact />
      <CtaSection />
    </>
  );
}
