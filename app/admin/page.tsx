import type { Metadata } from "next";
import { AdminPortfolioManager } from "@/components/admin-portfolio-manager";

export const metadata: Metadata = {
  title: "Admin",
  description: "Kenora Tech admin tools."
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="container py-12">
      <AdminPortfolioManager />
    </main>
  );
}
