import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Kenora Tech website packages, project timelines, content and maintenance."
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Quick answers before we start building."
        description="Find answers about timelines, pricing, content, maintenance, custom web applications and the Kenora Tech process."
      />
      <FaqSection />
    </>
  );
}
