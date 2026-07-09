import type { Metadata } from "next";
import { ProcessPageContent } from "@/components/sections/process-page-content";

export const metadata: Metadata = {
  title: "Process",
  description: "Explore KenoraTech's simple, transparent process from discovery to launch and ongoing growth."
};

export default function ProcessPage() {
  return <ProcessPageContent />;
}
