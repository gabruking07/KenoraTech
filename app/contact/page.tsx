import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free consultation with Kenora Tech for your next website, web application or digital product."
};

export default function ContactPage() {
  const channels = [
    { icon: Mail, label: "Email", value: "kenoratech.in@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 7383530982" },
    { icon: MessageCircle, label: "WhatsApp", value: "Fast replies for project queries" },
    { icon: MapPin, label: "Location", value: "Serving clients worldwide" }
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to build."
        description="Share a few details and we will respond with a practical next step, timeline and recommendation for your budget."
      />
      <section className="container grid gap-10 pb-20 md:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          {channels.map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-5 shadow-inner-border">
              <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-muted-foreground">{item.label}</p>
              <p className="mt-1 font-medium">{item.value}</p>
            </div>
          ))}
        </div>
        <ContactForm />
      </section>
    </>
  );
}
