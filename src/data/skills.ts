// 내 보유 스킬 — level 1~5
//
// 기준: 5 = 실무에서 주도적으로 설계·운영 / 4 = 실무 상시 사용 / 3 = 실무 사용 경험
//       2 = 개인 프로젝트 수준 / 1 = 개념만
// ⚠️ 실무 경험이 없는 것은 넣지 않는다. 면접에서 바로 드러난다.

export type Skill = { name: string; level: number };

export const mySkills: Record<string, Skill[]> = {
  BI: [
    { name: "Tableau", level: 5 },
    { name: "Tableau Server", level: 4 },
    { name: "Tableau Prep", level: 4 },
    { name: "Tableau Next", level: 2 },
  ],
  "Data Modeling": [
    { name: "차원 모델링", level: 4 },
    { name: "SCD2", level: 4 },
    { name: "ODS/DW/DM 계층 설계", level: 4 },
  ],
  Data: [
    { name: "SQL", level: 5 },
    { name: "dbt", level: 4 },
    { name: "AWS Athena", level: 4 },
    { name: "Oracle", level: 3 },
    { name: "MSSQL", level: 3 },
    { name: "Salesforce Data Cloud", level: 3 },
    { name: "Pandas", level: 3 },
  ],
  Infra: [
    { name: "Docker", level: 4 },
    { name: "Docker Compose", level: 4 },
    { name: "Linux", level: 3 },
    { name: "AWS Lambda", level: 3 },
    { name: "S3", level: 3 },
    { name: "GitHub Actions", level: 3 },
    { name: "Cloudflare Tunnel", level: 3 },
  ],
  Language: [
    { name: "Python", level: 4 },
    { name: "TypeScript", level: 2 },
  ],
  AI: [
    { name: "Claude Code", level: 4 },
    { name: "MCP", level: 3 },
    { name: "Agentforce", level: 2 },
  ],
};

/** 실무 경험은 없고 학습 중인 것 — 정직하게 구분해서 표기한다 */
export const learning: string[] = ["Kafka", "Spark", "Airflow", "Snowflake"];

// 스킬 이름 집합 (대시보드 매칭용, 소문자 정규화)
export const mySkillSet = new Set(
  Object.values(mySkills)
    .flat()
    .map((s) => s.name.toLowerCase())
);
