// 프로필 정보
//
// 내용은 GitHub 프로필 README(github.com/dhtkddbs01)와 맞춰 유지한다.
// 한쪽만 고치면 어긋난다.

export const profile = {
  name: "오상윤",
  role: "BI Engineer · Data Mart",
  tagline:
    "이종 원천을 하나의 분석 모델로 수렴시키고, 지표 정의를 원천과 대조해 검증합니다.",
  bio: [
    "MILVUS DX2본부에서 데이터 마트 구축과 Tableau 기반 시각화를 담당합니다. 전자·제조·미디어·금융·유통·비영리 등 여러 산업에서 대시보드를 기획·구축·운영하고, 고객사 교육과 POC 설계를 함께 수행합니다.",
    "화면 위만 보지 않습니다. 대시보드가 올라갈 데이터 마트와 Tableau Server 인프라까지 직접 다루기 때문에, 원천 데이터부터 사용자가 보는 화면까지 한 흐름으로 설계할 수 있습니다.",
    "구축 프로젝트 8건 중 4건이 데이터 마트 구축입니다. ODS/DW/DM 계층 설계, dbt 기반 멀티채널 정규화, 웹 로그 파이프라인, 다중 원천 SQL 통합을 맡았습니다.",
  ],
  location: "Seongnam, Korea",
  email: "dhtkddbs2@gmail.com",
  links: {
    github: "https://github.com/dhtkddbs01",
    linkedin: "",
    resume: "",
  },
  site: "https://portfolio.sangyoun.com",
};

/** 재직 이력 */
export const experience = {
  company: "MILVUS",
  team: "DX2본부 2팀",
  title: "BI Engineer",
  since: "2024-07-08",
  sinceLabel: "2024.07",
};

/** 재직 기간 — "2년 2개월" 형태. 빌드 시점 기준으로 계산된다. */
export function tenure(from: string = experience.since, to: Date = new Date()): string {
  const start = new Date(from);
  let months =
    (to.getFullYear() - start.getFullYear()) * 12 + (to.getMonth() - start.getMonth());
  if (to.getDate() < start.getDate()) months -= 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y && m) return `${y}년 ${m}개월`;
  if (y) return `${y}년`;
  return `${m}개월`;
}

/** 홈 상단 요약 지표 */
export const careerStats = [
  { label: "구축 프로젝트", value: "8건", note: "데이터 마트 4건 포함" },
  { label: "POC", value: "9건", note: "고객 일정에 맞춘 프로토타이핑" },
  { label: "교육 · 세미나", value: "30회", note: "19개 고객사" },
];

/** 하는 일 */
export const whatIDo = [
  {
    area: "데이터 엔지니어링",
    detail:
      "dbt · Athena · Oracle · Salesforce Data Cloud 기반 데이터 마트 구축. 멀티채널 · 웹 로그 등 이종 원천을 공통 분석 모델로 정규화",
  },
  {
    area: "BI 컨설팅",
    detail: "Tableau 대시보드 기획 · 구축 · 운영. 고객 요구 변화에 맞춘 설계 반복",
  },
  {
    area: "교육",
    detail: "기업 대상 Tableau 교육 · 세미나. 단순 기능 설명이 아닌 활용 사례 중심 커리큘럼 설계",
  },
  {
    area: "인프라",
    detail: "Tableau Server 로그 분석 기반 오류 원인 파악, 운영 환경 장애 대응",
  },
  {
    area: "AI 에이전트",
    detail: "Agentforce 에이전트 메타데이터 as code, MCP · Claude Code 기반 워크플로 자동화",
  },
];
