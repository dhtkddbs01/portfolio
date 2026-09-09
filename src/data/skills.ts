// 내 보유 스킬 — 실제로 조정하세요. level: 1~5
export type Skill = { name: string; level: number };

export const mySkills: Record<string, Skill[]> = {
  "Language": [
    { name: "Python", level: 5 },
    { name: "SQL", level: 5 },
    { name: "TypeScript", level: 2 },
  ],
  "Data": [
    { name: "dbt", level: 4 },
    { name: "BigQuery", level: 4 },
    { name: "Kafka", level: 3 },
    { name: "Spark", level: 3 },
    { name: "Pandas", level: 4 },
    { name: "Airflow", level: 2 },
  ],
  "Infra": [
    { name: "Docker", level: 4 },
    { name: "Linux", level: 3 },
    { name: "Cloudflare", level: 2 },
    { name: "AWS", level: 2 },
  ],
};

// 스킬 이름 집합 (대시보드 매칭용, 소문자 정규화)
export const mySkillSet = new Set(
  Object.values(mySkills)
    .flat()
    .map((s) => s.name.toLowerCase())
);
