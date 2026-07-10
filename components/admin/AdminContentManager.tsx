"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/admin/EmptyState";

type Item = { id: string; title: string; description: string };

export function AdminContentManager({ type, title, description, titleLabel = "Title", descriptionLabel = "Description", defaults = [] }: { type: string; title: string; description: string; titleLabel?: string; descriptionLabel?: string; defaults?: Array<Omit<Item, "id">> }) {
  const [items, setItems] = useState<Item[]>([]);
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(`/api/admin/content/${type}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    const body = await response.json().catch(() => null);
    setItems(response.ok ? body.items || [] : []);
    if (!response.ok) setStatus(body?.error || "Unable to load saved items.");
  }, [type]);

  useEffect(() => { void load(); }, [load]);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("");
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(`/api/admin/content/${type}`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ title: itemTitle, description: itemDescription }) });
    const body = await response.json().catch(() => null);
    if (!response.ok) return setStatus(body?.error || "Unable to save.");
    setItemTitle("");
    setItemDescription("");
    setStatus("Saved.");
    await load();
  };

  const remove = async (id: string) => {
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(`/api/admin/content/${type}?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (response.ok) await load();
    else setStatus("Unable to delete.");
  };

  const addDefaults = async () => {
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    await Promise.all(defaults.map((item) => fetch(`/api/admin/content/${type}`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(item) })));
    setStatus("Default services added.");
    await load();
  };

  return (
    <div className="grid gap-7">
      <div><h1 className="text-3xl font-black text-white">{title}</h1><p className="mt-2 text-sm text-white/55">{description}</p></div>
      {type === "services" && items.length === 0 && defaults.length ? <button onClick={() => void addDefaults()} className="w-fit rounded-xl border border-[#8B5CF6]/45 bg-[#8B5CF6]/12 px-4 py-2 text-sm font-bold text-[#d2b7ff]">Add the six default services</button> : null}
      <form onSubmit={save} className="grid gap-4 rounded-3xl border border-white/[0.08] bg-[#0D1323]/78 p-6">
        <input value={itemTitle} onChange={(event) => setItemTitle(event.target.value)} placeholder={titleLabel} className="h-11 rounded-xl border border-white/[0.08] bg-[#050816] px-4 text-sm text-white outline-none focus:border-[#3B82F6]/70" />
        <textarea value={itemDescription} onChange={(event) => setItemDescription(event.target.value)} placeholder={descriptionLabel} rows={4} className="rounded-xl border border-white/[0.08] bg-[#050816] px-4 py-3 text-sm text-white outline-none focus:border-[#3B82F6]/70" />
        <button className="inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold text-white"><Plus className="h-4 w-4" />Save</button>
        {status ? <p className="text-sm text-white/60">{status}</p> : null}
      </form>
      {items.length === 0 ? <EmptyState title={`No ${title.toLowerCase()} yet`} description="Add your first item above." /> : <div className={type === "services" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "grid gap-3"}>{items.map((item) => <article key={item.id} className={type === "services" ? "group relative min-h-[230px] overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" : "flex items-start justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0D1323]/70 p-5"}>{type === "services" ? <Sparkles className="h-8 w-8 rounded-full border border-[#8B5CF6]/55 p-1.5 text-[#c7a8ff] shadow-[0_0_22px_rgba(139,92,246,0.34)]" /> : null}<div className={type === "services" ? "mt-5" : ""}><h2 className="font-bold text-white">{item.title}</h2><p className="mt-2 text-sm leading-6 text-white/60">{item.description}</p></div><button onClick={() => void remove(item.id)} aria-label={`Delete ${item.title}`} className={type === "services" ? "absolute right-4 top-4 rounded-xl p-2 text-white/50 hover:bg-red-400/10 hover:text-red-200" : "rounded-xl p-2 text-white/50 hover:bg-red-400/10 hover:text-red-200"}><Trash2 className="h-4 w-4" /></button></article>)}</div>}
    </div>
  );
}
