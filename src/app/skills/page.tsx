import type { Metadata } from "next";
import jd from "@/data/jd-skills.json";
import { mySkills, mySkillSet } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills Dashboard",
  description: "채용공고 데이터 기반 시장 수요 대비 내 역량",
};

export default function SkillsPage() {
  const skills = [...jd.skills].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(1, ...skills.map((s) => s.count));
  const haveInDemand = skills.filter((s) => mySkillSet.has(s.name.toLowerCase()));
  const matchRate = skills.length
    ? Math.round((haveInDemand.length / skills.length) * 100)
    : 0;
  const hasData = jd.totalPostings > 0;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Skills Dashboard</h1>
        <p className="mt-2 text-foreground/60">
          {jd.role} 채용공고를 크롤링해 요구 기술스택을 집계하고, 내 역량과 비교합니다.
        </p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          <Stat label="분석한 공고" value={hasData ? `${jd.totalPostings}건` : "—"} />
          <Stat label="수요 스킬 보유율" value={hasData ? `${matchRate}%` : "—"} />
          <Stat label="업데이트" value={jd.updatedAt} />
        </div>
        {!hasData && (
          <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
            아직 크롤러 데이터가 없습니다. <code className="font-mono">crawler/</code>를 실행하면
            채워집니다.
          </p>
        )}
      </header>

      {/* In-demand skills */}
      <section>
        <h2 className="text-lg font-semibold">시장 수요 (채용공고 언급 빈도)</h2>
        <ul className="mt-5 space-y-3">
          {skills.map((s) => {
            const have = mySkillSet.has(s.name.toLowerCase());
            const pct = (s.count / maxCount) * 100;
            return (
              <li key={s.name} className="text-sm">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono">
                    {s.name}
                    {have && (
                      <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                        ✓ 보유
                      </span>
                    )}
                  </span>
                  <span className="text-foreground/40">{s.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/5">
                  <div
                    className={`h-full rounded-full ${
                      have ? "bg-emerald-500/70" : "bg-foreground/25"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* My skills */}
      <section>
        <h2 className="text-lg font-semibold">내 역량</h2>
        <div className="mt-5 space-y-6">
          {Object.entries(mySkills).map(([category, list]) => (
            <div key={category}>
              <h3 className="font-mono text-xs uppercase tracking-wide text-foreground/40">
                {category}
              </h3>
              <ul className="mt-2 space-y-2">
                {list.map((s) => (
                  <li key={s.name} className="flex items-center gap-3 text-sm">
                    <span className="w-28 shrink-0">{s.name}</span>
                    <span className="flex gap-1" aria-label={`level ${s.level} of 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-6 rounded-full ${
                            i < s.level ? "bg-foreground/70" : "bg-foreground/10"
                          }`}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-foreground/50">{label}</div>
    </div>
  );
}
