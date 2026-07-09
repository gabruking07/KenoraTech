"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, ExternalLink, Star, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { EmptyState } from "@/components/admin/EmptyState";
import { Loading } from "@/components/admin/Loading";
import type { PortfolioProject } from "@/lib/portfolio";

export function ProjectsTable() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  async function loadProjects() {
    setLoading(true);
    const response = await fetch("/api/portfolio", { cache: "no-store" });
    const body = await response.json().catch(() => null);
    setProjects(response.ok ? body?.projects || [] : []);
    setLoading(false);
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  async function deleteProject(id: string) {
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(`/api/portfolio/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setStatus(body?.error || "Project could not be deleted.");
      return;
    }

    setStatus("Project deleted.");
    await loadProjects();
  }

  if (loading) {
    return <Loading />;
  }

  if (projects.length === 0) {
    return <EmptyState title="No projects yet" description="Projects you add from the admin panel will appear here." />;
  }

  return (
    <div className="grid gap-3">
      {status ? <p className="rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 py-3 text-sm text-white/70">{status}</p> : null}
      <DataTable>
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-white/48">
              {["Image", "Title", "Category", "Tags", "Status", "Featured", "Order", "Actions"].map((heading) => (
                <th key={heading} className="px-5 py-4 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="border-b border-white/[0.06] text-white/72 transition hover:bg-white/[0.035] last:border-b-0"
              >
                <td className="px-5 py-4">
                  {project.imageUrl ? (
                    <Image src={project.imageUrl} alt="" width={96} height={56} className="h-14 w-24 rounded-xl border border-white/[0.08] object-cover" />
                  ) : (
                    <div className="grid h-14 w-24 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs text-white/38">No image</div>
                  )}
                </td>
                <td className="px-5 py-4 font-bold text-white">{project.title}</td>
                <td className="px-5 py-4">{project.category}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-white/62">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/12 px-3 py-1 text-xs font-bold text-emerald-300">Published</span>
                </td>
                <td className="px-5 py-4">
                  <Star className="h-5 w-5 text-white/28" />
                </td>
                <td className="px-5 py-4 font-bold text-white">#{project.sortOrder}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/projects/${project.id}`} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white">
                      <Edit3 className="h-4 w-4" />
                    </Link>
                    {project.liveUrl ? (
                      <Link href={project.liveUrl} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : null}
                    <button onClick={() => void deleteProject(project.id)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-red-400/50 hover:text-red-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
