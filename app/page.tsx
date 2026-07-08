import { CtaSection } from "@/components/sections/cta-section";
import { HomeThreeHero } from "@/components/sections/home-three-hero";
import { ServicesSection } from "@/components/sections/services-section";

export default function Home() {
  return (
    <>
      <HomeThreeHero />
      <ServicesSection />
      <CtaSection />
    </>
  );
}
