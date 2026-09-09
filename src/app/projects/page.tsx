import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "여태 진행한 프로젝트 모음",
};

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 text-foreground/60">여태 진행한 프로젝트를 정리했습니다.</p>
      <div className="mt-8 grid gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
