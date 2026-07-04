import type { Metadata } from "next";
import { BlogSection } from "@/components/sections/blog-section";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Kenora Tech blog with practical notes on websites, performance, SEO and digital product planning."
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas for cleaner websites and smarter digital launches."
        description="Practical notes on strategy, performance, UX, SEO and choosing the right digital product path for your business."
      />
      <BlogSection />
    </>
  );
}
