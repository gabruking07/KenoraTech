import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Kenora Tech portfolio of websites, applications, commerce systems and conversion-focused digital experiences."
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected builds with strategy, speed and craft."
        description="A sample of project directions we create for SaaS startups, service businesses, commerce brands and operational teams."
      />
      <PortfolioSection compact />
      <CtaSection />
    </>
  );
}
