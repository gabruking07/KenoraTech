"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/components/portfolio/projects";

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.48, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#071020]/78 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-500 hover:border-[#1aa8ff]/75 hover:shadow-[0_0_52px_rgba(139,49,255,0.32)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(0,168,255,0.18),transparent_10rem),radial-gradient(circle_at_8%_100%,rgba(139,28,255,0.22),transparent_12rem)]" />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#050816]">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          width={960}
          height={560}
          className="aspect-[1.72] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="relative z-10 px-1 pb-1 pt-5">
        <h3 className="text-xl font-bold tracking-normal text-white">{project.title}</h3>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-white/72">{project.description}</p>
        <Link
          href={project.link}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c062ff] transition hover:text-[#37b8ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa8ff]"
          aria-label={`View ${project.title} project`}
        >
          View Project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
