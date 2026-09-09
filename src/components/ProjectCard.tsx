import type { Project, ProjectStatus } from "@/data/projects";

const statusStyle: Record<ProjectStatus, string> = {
  "운영 중": "border-emerald-600/30 text-emerald-700 dark:text-emerald-400",
  "진행 중": "border-amber-600/30 text-amber-700 dark:text-amber-400",
  "완료": "border-sky-600/30 text-sky-700 dark:text-sky-400",
  "설계": "border-black/15 dark:border-white/20 text-foreground/50",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-xl border border-black/10 dark:border-white/10 p-5 transition-colors hover:border-black/25 dark:hover:border-white/25">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-2">
          {project.client && (
            <span className="shrink-0 rounded-md bg-foreground/10 px-2 py-0.5 text-xs font-medium">
              {project.client}
            </span>
          )}
          <h3 className="font-semibold">{project.title}</h3>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${statusStyle[project.status]}`}
          >
            {project.status}
          </span>
        </div>
        <span className="shrink-0 font-mono text-xs text-foreground/40">
          {project.period}
        </span>
      </div>
      <p className="mt-2 text-sm text-foreground/70">{project.summary}</p>
      <ul className="mt-3 space-y-1">
        {project.highlights.map((h) => (
          <li key={h} className="text-sm text-foreground/60 before:content-['·_']">
            {h}
          </li>
        ))}
      </ul>
      {project.roadmap && project.roadmap.length > 0 && (
        <div className="mt-3 border-t border-black/5 dark:border-white/10 pt-3">
          <p className="font-mono text-xs text-foreground/40">예정</p>
          <ul className="mt-1 space-y-1">
            {project.roadmap.map((r) => (
              <li key={r} className="text-sm text-foreground/45 before:content-['·_']">
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-xs text-foreground/60"
          >
            {s}
          </span>
        ))}
      </div>
      {project.links && project.links.length > 0 && (
        <div className="mt-3 flex gap-3 text-sm">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/70 underline underline-offset-2 hover:text-foreground"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
