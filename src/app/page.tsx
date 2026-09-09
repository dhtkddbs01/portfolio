import Link from "next/link";
import { profile, careerStats, whatIDo } from "@/data/profile";
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
            href="/resume"
            className="rounded-lg border border-black/15 dark:border-white/15 px-4 py-2 font-medium transition-colors hover:border-foreground/40"
          >
            이력서 (PDF 저장 가능)
          </Link>
          <Link
            href="/skills"
            className="rounded-lg border border-black/15 dark:border-white/15 px-4 py-2 font-medium transition-colors hover:border-foreground/40"
          >
            스킬 대시보드
          </Link>
        </div>
      </section>

      {/* Career stats */}
      <section>
        <div className="grid gap-4 sm:grid-cols-3">
          {careerStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-black/10 dark:border-white/10 p-5"
            >
              <p className="text-sm text-foreground/50">{s.label}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-foreground/45">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What I do */}
      <section>
        <h2 className="text-xl font-semibold">What I Do</h2>
        <dl className="mt-6 space-y-4">
          {whatIDo.map((w) => (
            <div
              key={w.area}
              className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4"
            >
              <dt className="font-medium">{w.area}</dt>
              <dd className="text-sm leading-relaxed text-foreground/65">
                {w.detail}
              </dd>
            </div>
          ))}
        </dl>
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

      {/* Contact */}
      <section className="rounded-xl border border-black/10 dark:border-white/10 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">데이터가 결정에 닿는 구조를 만듭니다</h2>
        <p className="mt-3 text-foreground/70 leading-relaxed">
          원천 설계부터 대시보드까지 한 흐름으로 맡길 사람이 필요하시면 편하게 연락 주세요.
          채용·협업 모두 환영합니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-black/15 dark:border-white/15 px-4 py-2 font-medium transition-colors hover:border-foreground/40"
          >
            GitHub
          </a>
          <Link
            href="/resume"
            className="rounded-lg border border-black/15 dark:border-white/15 px-4 py-2 font-medium transition-colors hover:border-foreground/40"
          >
            이력서
          </Link>
        </div>
      </section>
    </div>
  );
}
