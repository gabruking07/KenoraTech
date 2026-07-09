import type { Metadata } from "next";
import { PortfolioPage as PortfolioPageContent } from "@/components/portfolio/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore KenoraTech portfolio projects across SaaS, AI, analytics, cloud, branding and digital products."
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
