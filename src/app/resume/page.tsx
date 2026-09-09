import type { Metadata } from "next";
import { profile, careerStats, whatIDo } from "@/data/profile";
import { projects } from "@/data/projects";
import { mySkills, learning } from "@/data/skills";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: "경력 · 프로젝트 · 기술 스택 한 페이지 요약",
};

export default function ResumePage() {
  const work = projects.filter((p) => p.kind === "실무");
  const personal = projects.filter((p) => p.kind === "개인");

  return (
    <div className="resume space-y-10">
      {/* 헤더 */}
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-1 font-mono text-sm text-foreground/60">{profile.role}</p>
          <p className="mt-3 text-foreground/80">{profile.tagline}</p>
          <p className="mt-2 font-mono text-xs text-foreground/50">
            {profile.email} · {profile.links.github.replace("https://", "")} ·{" "}
            {profile.site.replace("https://", "")} · {profile.location}
          </p>
        </div>
        <PrintButton className="shrink-0 rounded-lg border border-black/15 dark:border-white/15 px-3 py-2 text-sm font-medium transition-colors hover:border-foreground/40 print:hidden">
          PDF로 저장
        </PrintButton>
      </header>

      {/* 요약 지표 */}
      <section>
        <div className="grid grid-cols-3 gap-3">
          {careerStats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-black/10 dark:border-white/10 px-4 py-3"
            >
              <p className="text-xs text-foreground/50">{s.label}</p>
              <p className="mt-0.5 text-xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-foreground/45">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 소개 */}
      <section className="resume-block">
        <h2 className="resume-h2">About</h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/75">
          {profile.bio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </section>

      {/* 하는 일 */}
      <section className="resume-block">
        <h2 className="resume-h2">What I Do</h2>
        <dl className="mt-3 space-y-2">
          {whatIDo.map((w) => (
            <div key={w.area} className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
              <dt className="text-sm font-medium">{w.area}</dt>
              <dd className="text-sm leading-relaxed text-foreground/65">{w.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 고객사 구축 */}
      <section>
        <h2 className="resume-h2">고객사 구축</h2>
        <div className="mt-3 space-y-5">
          {work.map((p) => (
            <article key={p.slug} className="resume-block">
              <div className="flex flex-wrap items-baseline gap-2">
                {p.client && <span className="text-sm font-semibold">{p.client}</span>}
                <span className="text-sm text-foreground/80">{p.title}</span>
                <span className="font-mono text-xs text-foreground/45">{p.period}</span>
              </div>
              {p.metric && (
                <p className="mt-1.5 text-sm font-semibold text-foreground/90">{p.metric}</p>
              )}
              <p className="mt-1 text-sm text-foreground/65">{p.summary}</p>
              <ul className="mt-2 space-y-0.5">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-sm text-foreground/60 before:content-['·_']"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-mono text-xs text-foreground/45">
                {p.stack.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 개인 프로젝트 */}
      <section>
        <h2 className="resume-h2">개인 프로젝트</h2>
        <div className="mt-3 space-y-5">
          {personal.map((p) => (
            <article key={p.slug} className="resume-block">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold">{p.title}</span>
                <span className="font-mono text-xs text-foreground/45">{p.period}</span>
                <span className="rounded-full border border-black/15 dark:border-white/20 px-2 py-0.5 text-[11px] text-foreground/50">
                  {p.status}
                </span>
              </div>
              {p.metric && (
                <p className="mt-1.5 text-sm font-semibold text-foreground/90">{p.metric}</p>
              )}
              <p className="mt-1 text-sm text-foreground/65">{p.summary}</p>
              <ul className="mt-2 space-y-0.5">
                {p.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="text-sm text-foreground/60 before:content-['·_']">
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-mono text-xs text-foreground/45">
                {p.stack.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 스킬 */}
      <section className="resume-block">
        <h2 className="resume-h2">Skills</h2>
        <dl className="mt-3 space-y-2">
          {Object.entries(mySkills).map(([group, skills]) => (
            <div key={group} className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
              <dt className="text-sm font-medium">{group}</dt>
              <dd className="font-mono text-sm text-foreground/65">
                {skills.map((s) => s.name).join(" · ")}
              </dd>
            </div>
          ))}
          <div className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
            <dt className="text-sm font-medium text-foreground/50">학습 중</dt>
            <dd className="font-mono text-sm text-foreground/45">{learning.join(" · ")}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
