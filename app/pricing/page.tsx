import type { Metadata } from "next";
import { PricingPage as PricingPageContent } from "@/components/pricing/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Premium INR pricing plans for KenoraTech websites, SaaS interfaces, CMS builds and custom digital products."
};

export default function PricingPage() {
  return <PricingPageContent />;
}
