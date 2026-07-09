"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects } from "@/components/portfolio/projects";

export function ProjectsGrid() {
  return (
    <section className="container relative z-10 pb-5">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-7 text-center md:text-left"
      >
        <h2 className="text-[28px] font-black leading-tight tracking-normal text-white md:text-[32px]">
          Featured Projects
        </h2>
        <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#8B1CFF] to-[#1AA8FF] shadow-[0_0_14px_rgba(139,92,246,0.75)] md:mx-0" />
        <p className="mt-4 text-sm leading-6 text-white/70">A selection of our latest work.</p>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
