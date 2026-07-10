"use client";

import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects } from "@/components/portfolio/projects";

export function ProjectsGrid() {
  return (
    <section className="container relative z-10 pb-5">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
