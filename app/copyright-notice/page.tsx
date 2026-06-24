import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Copyright Notice",
  description: "Copyright notice for Aurex Technologies content, code, designs, graphics and digital assets."
};

const sections = [
  {
    title: "Ownership",
    body: [
      "All content, code, design systems, graphics, images, layouts, branding, copy, and digital assets displayed on this website are owned by Aurex Technologies unless otherwise stated.",
      "These materials are protected by applicable copyright, trademark, and intellectual property laws."
    ]
  },
  {
    title: "Restrictions",
    body: [
      "Unauthorized reproduction, copying, modification, publication, distribution, resale, or commercial use of any website content, code, design, or assets is prohibited.",
      "You may not remove copyright notices, ownership labels, or other proprietary markings from any Aurex Technologies material."
    ]
  },
  {
    title: "Permitted Use",
    body: [
      "You may view and share links to public pages on this website for informational purposes.",
      "Any other use requires prior written permission from Aurex Technologies."
    ]
  },
  {
    title: "Contact",
    body: [
      "For licensing, permissions, or copyright-related questions, contact Aurex Technologies at aurextechnologies.in@gmail.com."
    ]
  }
];

export default function CopyrightNoticePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Copyright Notice"
        description="Important ownership and usage terms for Aurex Technologies content, code, designs and digital assets."
      />
      <LegalPage updatedAt="June 24, 2026" sections={sections} />
    </>
  );
}
