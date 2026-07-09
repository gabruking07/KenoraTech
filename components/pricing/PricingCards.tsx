"use client";

import { PricingCard } from "@/components/pricing/PricingCard";
import { pricingPlans } from "@/components/pricing/pricing-data";

interface PricingCardsProps {
  billingCycle: "monthly" | "yearly";
}

export function PricingCards({ billingCycle }: PricingCardsProps) {
  return (
    <section className="container relative z-10 pb-5">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} index={index} />
        ))}
      </div>
    </section>
  );
}
