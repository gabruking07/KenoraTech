import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Kenora Tech website and services."
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By accessing this website or engaging Kenora Tech for services, you agree to these Terms & Conditions.",
      "If you do not agree with these terms, please do not use this website or request services through it."
    ]
  },
  {
    title: "Services",
    body: [
      "Kenora Tech provides website development, web applications, e-commerce development, UI/UX design, SEO optimization and maintenance services.",
      "Project scope, timelines, deliverables, pricing, revisions and support terms are confirmed separately in written proposals, invoices or agreements."
    ]
  },
  {
    title: "Client Responsibilities",
    body: [
      "Clients are responsible for providing accurate information, timely feedback, approved content, access credentials and any required third-party materials.",
      "Delays in approvals, content, payments or access may affect project timelines and delivery dates."
    ]
  },
  {
    title: "Payments and Revisions",
    body: [
      "Payments, deposits, milestone terms and refund eligibility are defined in the project proposal or invoice shared with the client.",
      "Revision rounds are limited to the agreed project scope. Additional work, feature changes or new pages may require a separate quote."
    ]
  },
  {
    title: "Intellectual Property",
    body: [
      "Kenora Tech retains ownership of its pre-existing tools, internal processes, reusable code, templates and know-how.",
      "Client-specific final deliverables transfer according to the written project agreement after full payment is received, except for third-party assets governed by their own licenses."
    ]
  },
  {
    title: "Limitation of Liability",
    body: [
      "Kenora Tech is not liable for indirect, incidental, consequential or loss-of-profit damages arising from website use, third-party platforms, hosting providers, plugins, integrations or client-supplied materials.",
      "We aim to deliver reliable work, but cannot guarantee uninterrupted website availability or third-party service performance."
    ]
  },
  {
    title: "Updates",
    body: [
      "Kenora Tech may update these Terms & Conditions from time to time. Continued use of the website after updates means you accept the revised terms."
    ]
  }
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms that govern use of the Kenora Tech website and our client service engagements."
      />
      <LegalPage updatedAt="June 24, 2026" sections={sections} />
    </>
  );
}
