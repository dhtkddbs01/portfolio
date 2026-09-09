import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "고객사 구축 프로젝트와 개인 프로젝트",
};

export default function ProjectsPage() {
  const work = projects.filter((p) => p.kind === "실무");
  const personal = projects.filter((p) => p.kind === "개인");

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 text-foreground/60">
        고객사 구축 프로젝트와 개인 프로젝트를 나눠 정리했습니다.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">고객사 구축</h2>
        <p className="mt-1 text-sm text-foreground/50">
          데이터 마트 설계·구축을 맡은 프로젝트. 고객사 내부 정보는 제외하고 범위와 규모만 적었습니다.
        </p>
        <div className="mt-5 grid gap-4">
          {work.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">개인 프로젝트</h2>
        <p className="mt-1 text-sm text-foreground/50">
          직접 운영하거나 만들어 본 것. 설계까지만 한 것은 상태로 구분했습니다.
        </p>
        <div className="mt-5 grid gap-4">
          {personal.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
