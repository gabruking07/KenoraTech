import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingSection } from "@/components/sections/pricing-section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple website and web application pricing plans from Kenora Tech, including Starter, Business and Premium packages."
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Straightforward packages for serious digital growth."
        description="Choose a lean launch package, a business-ready build or a custom premium engagement shaped around your product roadmap."
      />
      <PricingSection compact />
      <FaqSection />
    </>
  );
}
