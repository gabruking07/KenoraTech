"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/admin/EmptyState";

type Request = { id: string; name?: string; email: string; phone: string; projectTitle: string; status: string; createdAt: string; };
const statusStyle: Record<string, string> = { PENDING: "bg-amber-400/10 text-amber-300", APPROVED: "bg-emerald-400/10 text-emerald-300", DECLINED: "bg-red-400/10 text-red-300" };

export function DemoRequestsPanel() {
  const [items, setItems] = useState<Request[]>([]);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");
  const token = () => localStorage.getItem("kenora-admin-token") || "";
  const load = async () => { try { const response = await fetch("/api/demo-requests", { headers: { Authorization: `Bearer ${token()}` }, cache: "no-store" }); const body = await response.json().catch(() => null); if (response.ok) setItems(body?.requests || []); else setError(body?.error || "Unable to load demo requests."); } catch { setError("Unable to load demo requests."); } };
  useEffect(() => { void load(); }, []);
  const review = async (id: string, status: "APPROVED" | "DECLINED") => { setUpdating(id); setError(""); try { const response = await fetch("/api/demo-requests", { method: "PATCH", headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); const body = await response.json().catch(() => null); if (!response.ok) throw new Error(body?.error || "Unable to update request."); setItems((current) => current.map((item) => item.id === id ? body.request : item)); } catch (reviewError) { setError(reviewError instanceof Error ? reviewError.message : "Unable to update request."); } finally { setUpdating(""); } };

  return <section className="grid gap-4"><div><h2 className="text-xl font-black text-white">Demo Access Requests</h2><p className="mt-1 text-sm text-white/55">Approve or decline requests for protected project demos.</p></div>{error ? <p className="rounded-xl bg-red-400/10 p-3 text-sm text-red-200">{error}</p> : null}{items.length ? <div className="grid gap-3">{items.map((item) => <article key={item.id} className="rounded-2xl border border-white/[.08] bg-[#0D1323]/78 p-4"><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-bold text-white">{item.name || "Unnamed visitor"}</h3><p className="mt-1 text-sm text-white/60">{item.email} · {item.phone} · {item.projectTitle}</p></div><span className={`h-fit rounded-full px-3 py-1 text-xs font-bold ${statusStyle[item.status] || "bg-white/10 text-white/70"}`}>{item.status}</span></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-white/40">{new Date(item.createdAt).toLocaleString()}</p>{item.status === "PENDING" ? <div className="flex gap-2"><button onClick={() => void review(item.id, "DECLINED")} disabled={updating === item.id} className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-red-400/25 px-3 text-xs font-bold text-red-200 transition hover:bg-red-400/10 disabled:opacity-50"><X className="h-3.5 w-3.5" />Decline</button><button onClick={() => void review(item.id, "APPROVED")} disabled={updating === item.id} className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-emerald-400/15 px-3 text-xs font-bold text-emerald-200 transition hover:bg-emerald-400/25 disabled:opacity-50"><Check className="h-3.5 w-3.5" />{updating === item.id ? "Saving..." : "Accept"}</button></div> : null}</div></article>)}</div> : <EmptyState title="No demo requests yet" description="Protected-demo requests will appear here below your portfolio projects." />}</section>;
}
