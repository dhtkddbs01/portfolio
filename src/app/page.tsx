import Link from "next/link";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { mySkills } from "@/data/skills";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section>
        <p className="font-mono text-sm text-foreground/50">{profile.role}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg text-foreground/80">{profile.tagline}</p>
        <div className="mt-6 space-y-3 text-foreground/70 leading-relaxed">
          {profile.bio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="mt-6 flex gap-4 text-sm">
          <Link
            href="/projects"
            className="rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90"
          >
            프로젝트 보기
          </Link>
          <Link
            href="/skills"
            className="rounded-lg border border-black/15 dark:border-white/15 px-4 py-2 font-medium transition-colors hover:border-foreground/40"
          >
            스킬 대시보드
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-foreground/50 hover:text-foreground">
            전체 보기 →
          </Link>
        </div>
        <div className="mt-6 grid gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Skills preview */}
      <section>
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {Object.values(mySkills)
            .flat()
            .map((s) => (
              <span
                key={s.name}
                className="rounded-md border border-black/10 dark:border-white/10 px-2.5 py-1 font-mono text-xs text-foreground/70"
              >
                {s.name}
              </span>
            ))}
        </div>
        <p className="mt-4 text-sm text-foreground/50">
          채용공고 데이터로 시장 수요 대비 역량을 비교한{" "}
          <Link href="/skills" className="underline underline-offset-2 hover:text-foreground">
            스킬 대시보드
          </Link>
          를 확인하세요.
        </p>
      </section>
    </div>
  );
}
