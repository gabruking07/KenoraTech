import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchBar } from "@/components/admin/SearchBar";
import { MessagesTable } from "@/components/admin/messages/MessagesTable";

export const metadata: Metadata = {
  title: "Contact Messages",
  description: "Manage KenoraTech contact messages."
};

export default function MessagesPage() {
  return (
    <div className="grid gap-7">
      <PageHeader
        title="Contact Messages"
        description="Review, reply and manage inbound project inquiries."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_190px]">
        <SearchBar placeholder="Search messages..." />
        <select className="h-11 rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 text-sm text-white/70 outline-none">
          <option>Status Filter</option>
          <option>New</option>
          <option>Read</option>
          <option>Replied</option>
        </select>
      </div>
      <MessagesTable />
      <div className="flex items-center justify-between text-sm text-white/46">
        <span>Showing 1-6 of 24 messages</span>
        <div className="flex gap-2">
          <button className="rounded-xl border border-white/[0.08] px-3 py-2">Previous</button>
          <button className="rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/14 px-3 py-2 text-white">1</button>
          <button className="rounded-xl border border-white/[0.08] px-3 py-2">Next</button>
        </div>
      </div>
    </div>
  );
}
