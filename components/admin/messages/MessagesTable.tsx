"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, Reply, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { EmptyState } from "@/components/admin/EmptyState";
import { Loading } from "@/components/admin/Loading";
import { cn } from "@/lib/utils";

type AdminMessage = {
  id: string;
  name: string;
  email: string;
  project: string;
  message: string;
  createdAt: string;
};

function statusClass(status: "New" | "Read" | "Replied") {
  if (status === "New") return "bg-[#8B5CF6]/14 text-[#C7A8FF] border-[#8B5CF6]/20";
  if (status === "Read") return "bg-[#3B82F6]/14 text-[#8EC5FF] border-[#3B82F6]/20";
  return "bg-emerald-400/12 text-emerald-300 border-emerald-400/20";
}

export function MessagesTable() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  async function loadMessages() {
    setLoading(true);
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch("/api/contact", {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    });
    const body = await response.json().catch(() => null);
    setMessages(response.ok ? body?.messages || [] : []);
    if (!response.ok) {
      setStatus(body?.error || "Messages could not be loaded.");
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadMessages();
  }, []);

  async function deleteMessage(id: string) {
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(`/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setStatus(body?.error || "Message could not be deleted.");
      return;
    }

    setStatus("Message deleted.");
    await loadMessages();
  }

  if (loading) {
    return <Loading />;
  }

  if (messages.length === 0) {
    return <EmptyState title="No messages yet" description={status || "Contact form submissions will appear here."} />;
  }

  return (
    <div className="grid gap-3">
      {status ? <p className="rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 py-3 text-sm text-white/70">{status}</p> : null}
      <DataTable>
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-white/48">
              {["", "Name", "Email", "Project", "Message", "Date", "Status", "Actions"].map((heading) => (
                <th key={heading} className="px-5 py-4 font-semibold">
                  {heading || <span className="sr-only">Select</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => {
              const rowStatus = index === 0 ? "New" : "Read";

              return (
                <motion.tr
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="border-b border-white/[0.06] text-white/72 transition hover:bg-white/[0.035] last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <input type="checkbox" aria-label={`Select message from ${message.name}`} className="h-4 w-4 rounded border-white/20 bg-transparent" />
                  </td>
                  <td className="px-5 py-4 font-bold text-white">{message.name}</td>
                  <td className="px-5 py-4">{message.email}</td>
                  <td className="px-5 py-4">{message.project}</td>
                  <td className="max-w-[260px] truncate px-5 py-4">{message.message}</td>
                  <td className="px-5 py-4">{new Date(message.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-4">
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-bold", statusClass(rowStatus))}>{rowStatus}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button title={message.message} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </button>
                      <a href={`mailto:${message.email}`} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white">
                        <Reply className="h-4 w-4" />
                      </a>
                      <button onClick={() => void deleteMessage(message.id)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-red-400/50 hover:text-red-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
