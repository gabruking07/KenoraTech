"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/admin/EmptyState";

type Request = { id: string; name: string; email: string; projectTitle: string; reason: string; status: string; createdAt: string };

export function DemoRequestsPanel() {
  const [items, setItems] = useState<Request[]>([]); const [error, setError] = useState("");
  useEffect(() => { const token = localStorage.getItem("kenora-admin-token") || ""; void fetch("/api/demo-requests", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }).then(async (response) => { const body = await response.json().catch(() => null); if (response.ok) setItems(body?.requests || []); else setError(body?.error || "Unable to load demo requests."); }).catch(() => setError("Unable to load demo requests.")); }, []);
  return <section className="grid gap-4"><div><h2 className="text-xl font-black text-white">Demo Access Requests</h2><p className="mt-1 text-sm text-white/55">Requests for protected project demos appear here for review and approval.</p></div>{error ? <p className="rounded-xl bg-red-400/10 p-3 text-sm text-red-200">{error}</p> : null}{items.length ? <div className="grid gap-3">{items.map((item) => <article key={item.id} className="rounded-2xl border border-white/[.08] bg-[#0D1323]/78 p-4"><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-bold text-white">{item.name}</h3><p className="text-sm text-white/60">{item.email} · {item.projectTitle}</p></div><span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">{item.status}</span></div><p className="mt-3 text-sm text-white/70">{item.reason}</p><p className="mt-3 text-xs text-white/40">{new Date(item.createdAt).toLocaleString()}</p></article>)}</div> : <EmptyState title="No demo requests yet" description="Protected-demo requests will appear here below your portfolio projects." />}</section>;
}
