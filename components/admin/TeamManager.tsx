"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import { ImagePlus, Plus, Trash2, Users } from "lucide-react";
import { EmptyState } from "@/components/admin/EmptyState";

type TeamMember = { id: string; title: string; description: string; imageId?: string };

export function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const token = () => window.localStorage.getItem("kenora-admin-token") || "";
  const load = useCallback(async () => {
    const response = await fetch("/api/admin/content/team", { headers: { Authorization: `Bearer ${token()}` }, cache: "no-store" });
    const body = await response.json().catch(() => null);
    setMembers(response.ok && Array.isArray(body?.items) ? body.items : []);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !role.trim()) return setStatus("Name and role are required.");
    setSaving(true);
    setStatus("");
    try {
      let imageId: string | undefined;
      if (image) {
        const formData = new FormData();
        formData.set("image", image);
        const upload = await fetch("/api/admin/team-image", { method: "POST", headers: { Authorization: `Bearer ${token()}` }, body: formData });
        const body = await upload.json().catch(() => null);
        if (!upload.ok) throw new Error(body?.error || "Unable to upload image.");
        imageId = body.imageId;
      }
      const response = await fetch("/api/admin/content/team", { method: "POST", headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" }, body: JSON.stringify({ title: name, description: role, imageId }) });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.error || "Unable to save team member.");
      setName(""); setRole(""); setImage(null); setStatus("Saved.");
      await load();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save team member.");
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    const response = await fetch(`/api/admin/content/team?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
    if (response.ok) await load(); else setStatus("Unable to delete team member.");
  };

  return <div className="grid gap-7"><div><h1 className="text-3xl font-black text-white">Team Members</h1><p className="mt-2 text-sm text-white/55">Add the people featured on your About page.</p></div><form onSubmit={save} className="grid gap-4 rounded-3xl border border-white/[0.08] bg-[#0D1323]/78 p-6"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Member name" className="h-11 rounded-xl border border-white/[0.08] bg-[#050816] px-4 text-sm text-white outline-none focus:border-[#3B82F6]/70" /><input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Role or job title" className="h-11 rounded-xl border border-white/[0.08] bg-[#050816] px-4 text-sm text-white outline-none focus:border-[#3B82F6]/70" /><label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-[#050816] text-sm text-white/60 hover:border-[#8B5CF6]/70"><ImagePlus className="h-5 w-5 text-[#b995ff]" /><span>{image ? image.name : "Upload profile image (max 2 MB)"}</span><input type="file" accept="image/*" className="sr-only" onChange={(event) => setImage(event.target.files?.[0] || null)} /></label><button disabled={saving} className="inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold text-white disabled:opacity-60"><Plus className="h-4 w-4" />{saving ? "Saving..." : "Add team member"}</button>{status ? <p className="text-sm text-white/60">{status}</p> : null}</form>{members.length === 0 ? <EmptyState title="No team members yet" description="Add your first member above." /> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{members.map((member) => <article key={member.id} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 p-5"><div className="flex items-center gap-4">{member.imageId ? <img src={`/api/team-image/${member.imageId}`} alt="" className="h-16 w-16 rounded-full object-cover" /> : <div className="grid h-16 w-16 place-items-center rounded-full bg-[#8B5CF6]/20 text-[#c7a8ff]"><Users className="h-7 w-7" /></div>}<div><h2 className="font-bold text-white">{member.title}</h2><p className="mt-1 text-sm text-white/60">{member.description}</p></div></div><button onClick={() => void remove(member.id)} aria-label={`Delete ${member.title}`} className="absolute right-3 top-3 rounded-xl p-2 text-white/50 hover:bg-red-400/10 hover:text-red-200"><Trash2 className="h-4 w-4" /></button></article>)}</div>}</div>;
}
