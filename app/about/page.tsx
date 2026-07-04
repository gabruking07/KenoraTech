import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Kenora Tech, a modern technology agency focused on clean strategy, thoughtful design and reliable engineering."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kenora Tech"
        title="A focused product team for founders, local brands and growing companies."
        description="We combine crisp design, pragmatic engineering and growth-aware strategy to help businesses launch digital products that feel premium and work beautifully."
      />
      <section className="container grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How we work</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Clear scope, elegant execution, measurable outcomes.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-muted-foreground">
          <p>
            Kenora Tech was built for clients who want a senior digital partner without the slow layers of a traditional agency. Every project begins with a sharp discovery sprint, moves through visual direction and prototyping, then ships with performance, accessibility and conversion in mind.
          </p>
          <p>
            Our process is collaborative but calm. You get clear checkpoints, honest recommendations, reusable components and a site or app that is ready to grow with your business.
          </p>
        </div>
      </section>
      <section className="section-band bg-card/45 py-16">
        <div className="container grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-lg border bg-background/80 p-6 shadow-inner-border">
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{value.description}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
