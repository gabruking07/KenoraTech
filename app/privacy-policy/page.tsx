import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy explaining how Kenora Tech collects, uses and protects information."
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect information you provide through contact forms, consultation requests, emails, calls or project discussions, including your name, business details, email address, phone number and project requirements.",
      "We may also collect basic technical information such as browser type, device information, pages visited and referral source to improve website performance and user experience."
    ]
  },
  {
    title: "How We Use Information",
    body: [
      "We use collected information to respond to inquiries, provide quotes, deliver services, manage client communication, improve our website and maintain business records.",
      "We do not sell your personal information."
    ]
  },
  {
    title: "Sharing of Information",
    body: [
      "We may share limited information with trusted service providers when required for hosting, analytics, communication, payment processing or project delivery.",
      "We may also disclose information if required by law, legal process or to protect our rights, users, clients or business operations."
    ]
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable safeguards to protect information from unauthorized access, loss, misuse or disclosure.",
      "No online transmission or storage system is completely secure, so we cannot guarantee absolute security."
    ]
  },
  {
    title: "Data Retention",
    body: [
      "We keep personal and project information only as long as needed for business, legal, tax, support and operational purposes.",
      "You may request deletion or correction of your information by contacting us."
    ]
  },
  {
    title: "Your Choices",
    body: [
      "You may contact Kenora Tech to request access, updates, corrections or deletion of personal information we hold about you.",
      "For privacy-related questions, email kenoratech.in@gmail.com."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Kenora Tech collects, uses, protects and manages information shared with us."
      />
      <LegalPage updatedAt="June 24, 2026" sections={sections} />
    </>
  );
}
