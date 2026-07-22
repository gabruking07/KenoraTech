"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

type TeamMember = { id: string; title: string; description: string; imageId?: string };

export function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    void fetch("/api/admin/content/team", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setMembers(Array.isArray(body?.items) ? body.items : []))
      .catch(() => setMembers([]));
  }, []);

  if (members.length === 0) return null;

  return <section className="section-band bg-card/45 py-20"><div className="container"><SectionHeading eyebrow="Our Team" title="The people behind Kenora Tech." description="A focused team that brings strategy, design and engineering together for every project." /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{members.map((member) => <article key={member.id} className="overflow-hidden rounded-lg border bg-background shadow-inner-border"><div className="aspect-[4/3] bg-secondary">{member.imageId ? <Image src={`/api/team-image/${member.imageId}`} alt={member.title} width={720} height={540} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-primary"><Users className="h-14 w-14" /></div>}</div><div className="p-6"><h3 className="text-lg font-semibold">{member.title}</h3><p className="mt-1 text-sm text-primary">{member.description}</p></div></article>)}</div></div></section>;
}
