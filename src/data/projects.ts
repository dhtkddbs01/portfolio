// 프로젝트 목록.
//
// status 로 "실제로 돌아가는 것"과 "설계까지 한 것"을 구분한다.
// roadmap 에 적은 항목은 실제로 만든 뒤 highlights 로 옮기고 status 를 올린다.
//
// ⚠️ 공개 사이트다. 고객사 내부 정보(실제 테이블명·매출액·시스템 구조 상세)는 쓰지 않는다.
//    규모·건수는 내가 한 작업량을 나타내므로 안전하다.

export type ProjectStatus = "운영 중" | "진행 중" | "완료" | "설계";
export type ProjectKind = "실무" | "개인";

export type Project = {
  slug: string;
  title: string;
  period: string;
  status: ProjectStatus;
  kind: ProjectKind;
  /** 실무 프로젝트의 고객사 (개인 프로젝트는 없음) */
  client?: string;
  summary: string;
  description: string[];
  stack: string[];
  highlights: string[];
  /** 아직 만들지 않은 것. 완료되면 highlights 로 옮긴다. */
  roadmap?: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  // ───────────────────────── 실무 ─────────────────────────
  {
    slug: "s1-nextgen-bi",
    title: "차세대 ERP 연계 BI · 데이터 마트 설계",
    client: "에스원",
    period: "2026.09 – 현재",
    status: "진행 중",
    kind: "실무",
    summary: "SSAS 큐브 기반 레거시 BI를 Tableau 파이프라인으로 전환하는 신규 구축",
    description: [
      "큐브가 담당하던 사전집계를 마트 계층의 집계 테이블로 대체하는 구조를 설계했다. 큐브가 사라지면 상세 데이터를 통째로 추출해 화면에서 집계하게 되는데, 그러면 추출 크기와 배치 시간이 함께 터진다.",
      "ODS/DW/DM 3계층과 단일 DB 네이밍 표준(스키마 체계·접두어·차원 유형 분류)을 수립했다. 기존에는 네이밍룰·설명·과거 데이터 적재가 갖춰져 있지 않았다.",
      "설계로 끝내지 않고 정합성을 기계 대조로 검증했다. 인터페이스 정의서와 실제 DDL을 컬럼 단위로 맞춰 타입 오류를 찾아냈고, 설계서 전수 검사로 네이밍룰 위반을 분류했다.",
    ],
    stack: ["MSSQL", "SSIS", "Tableau", "차원 모델링", "SCD2"],
    highlights: [
      "ODS/DW/DM 3계층 데이터 마트 설계 · 단일 DB 네이밍 표준 수립",
      "레거시 정량 진단으로 개선 과제 11건 도출 (인덱스·압축·파티셔닝·적재 전략)",
      "인터페이스 정의서 ↔ DDL 컬럼 단위 기계 대조로 타입 오류 63건 발견",
      "설계서 전수 검사(컬럼 9,945건)로 지적사항 826건 분류 · 우선순위화",
      "대리키·SCD2 적용 기준과 대용량 팩트 파티셔닝 전략 문서화",
    ],
    featured: true,
  },
  {
    slug: "multichannel-commerce-mart",
    title: "멀티채널 커머스 데이터 마트",
    client: "어댑트코리아",
    period: "2026.03 – 2026.09",
    status: "완료",
    kind: "실무",
    summary: "11개 커머스 채널의 이종 스키마를 공통 분석 모델로 정규화",
    description: [
      "자사몰·오픈마켓·해외마켓·물류 등 11개 채널의 주문·배송·클레임·결제·회원 데이터를 하나의 스키마로 수렴시켰다. 채널마다 필드명도, 통화도, 세금 처리도 달랐다.",
      "채널별로 독립 채번되던 계정 ID 때문에 서로 다른 몰의 고객이 같은 사람으로 병합되는 문제가 있었다. 브랜드 슬롯을 포함한 해시로 식별키를 재설계해 해소했다.",
      "모델을 만드는 것보다 '이 숫자가 맞는가'를 확인하는 데 시간이 더 들었다. 과거 데이터 백필 완전성을 채널별로 교차 검증했고, 증분 수집 채널에서 옛 주문이 통째로 비는 원인을 규명했다.",
    ],
    stack: ["dbt", "AWS Athena", "AWS Lambda", "S3", "Glue", "Salesforce Data Cloud", "SQL"],
    highlights: [
      "dbt 모델 93개 · 1,430컬럼 구축, 테스트 39건 운영",
      "채널 간 계정 식별자 충돌 해소 — 브랜드 슬롯 포함 해시로 재설계",
      "누락 채널 확장으로 주문 약 38,400건(+17%) 복구",
      "Salesforce Data Cloud 매핑 24종 구축 · 형상관리",
      "과거 데이터 백필 완전성 채널별 교차 검증",
    ],
    featured: true,
  },
  {
    slug: "sponsor-campaign-mart",
    title: "후원자 캠페인 반응 데이터 마트",
    client: "초록우산",
    period: "2025.10 – 2026.01",
    status: "완료",
    kind: "실무",
    summary: "Oracle · Marketing Cloud · Data Cloud 다중 원천을 SQL로 통합",
    description: [
      "발송·오픈·클릭 이력(Marketing Cloud), 후원·결연 데이터(Oracle), 행동 데이터(Data Cloud)가 서로 다른 시스템에 흩어져 있었다. 후원자 기준으로 결합하는 SQL 계층을 만들었다.",
      "캠페인 반응 퍼널(실행 → 오픈 → 클릭 → 참여 → 전환) 모델을 설계하고, '전환'이 무엇인지를 데이터 조건으로 정의했다. 예를 들어 캠페인 수신 후 일정 기간 내 후원금 납부 같은 규칙이다.",
      "후원자번호가 없는 비후원자를 어떻게 추적할지도 설계 대상이었다. 식별키 부여 방안을 두 가지로 제안해 협의했다.",
    ],
    stack: ["Oracle", "Salesforce Data Cloud", "Marketing Cloud", "SQL", "Tableau"],
    highlights: [
      "다중 원천(Oracle · Marketing Cloud · Data Cloud) SQL 통합",
      "캠페인 반응 퍼널 모델 · 전환 조건 정의",
      "비후원자 식별키 부여 방안 설계",
      "지표 산정 기준(신청·중단 정의, 조인 조건) 정의서로 명문화",
      "대시보드 수치와 로데이터 불일치를 원천 통계 대조로 규명",
    ],
    featured: false,
  },
  {
    slug: "weblog-membership-mart",
    title: "웹 행동 로그 파이프라인 · 회원 통합",
    client: "한국일보",
    period: "2025.02 – 2025.05",
    status: "완료",
    kind: "실무",
    summary: "웹 로그를 3계층으로 나누고 계층별 보관 정책을 분리",
    description: [
      "웹에서 발생한 액세스 로그를 원천 DB에 적재하고, 집계 형태로 마트에 넣은 뒤, 소비 계층에는 최근 3개월치만 두었다. 계층마다 목적이 다르니 보관 정책도 달라야 했다.",
      "행동 로그를 상세 그대로 추출로 밀면 추출 크기와 갱신 시간이 함께 커진다. 소비 계층에서 잘라내는 판단이 여기서 나왔고, 이후 다른 프로젝트의 마트 설계 기준으로 정리됐다.",
      "회원·행사 데이터가 대행사 수기 파일로 흩어져 취합이 안 되던 것이 프로젝트의 출발점이었다. 일원화하려면 정의부터 갈라야 했다.",
    ],
    stack: ["SQL", "Salesforce Data Cloud", "Tableau Prep", "Tableau"],
    highlights: [
      "원천 DB → 집계 마트 → Tableau(최근 3개월) 3계층 설계",
      "계층별 보관 정책 분리로 추출 크기 · 갱신 시간 관리",
      "회원 정의 체계 정립 (정회원 / 준회원 / 전환대상 / 누적 / 통합)",
      "Prep 흐름 5종 Hourly · Daily 스케줄 운영",
      "구축 후 1년간 운영 담당",
    ],
    featured: false,
  },

  // ───────────────────────── 개인 ─────────────────────────
  {
    slug: "home-server",
    title: "미니PC 홈서버 — 설정을 전부 코드로",
    period: "2026 – 현재",
    status: "운영 중",
    kind: "개인",
    summary: "손으로 띄우던 서버를 compose 기반으로 옮겨 재현 가능한 상태로 만든 작업",
    description: [
      "Beelink SER8(8845HS)에 Ubuntu Server를 헤드리스로 설치하고 Docker로 서비스를 격리 운영한다.",
      "`docker run`으로 띄워 실행 옵션이 서버 어디에도 남지 않던 서비스를 compose로 전환했다. 지우기 전에 `docker inspect`로 설정을 추출해 파일로 복원하는 순서를 지켜야 했다.",
      "비밀값은 `.env`로 분리하고 데이터·로그는 저장소 밖으로 빼, 설정만 담긴 private 저장소 하나로 서버 전체를 형상 관리한다. 이 사이트도 GitHub Actions → GHCR → 서버 pull → Cloudflare Tunnel 경로로 배포된다.",
    ],
    stack: ["Ubuntu", "Docker", "Docker Compose", "GitHub Actions", "GHCR", "Cloudflare Tunnel", "Tailscale"],
    highlights: [
      "docker run → compose 전환: 서버 설정을 전부 파일로 (IaC)",
      "비밀값 .env 분리 · 계정 키 대신 deploy key 로 최소 권한 연결",
      "GHCR 이미지 배포 파이프라인 구축 — 서버에 앱 소스를 두지 않음",
      "Cloudflare Tunnel 로 포트포워딩 없이 도메인 공개, 직접 포트 노출 제거",
      "백업 보존정책이 한 달간 미적용이던 것을 발견 · 수정",
    ],
    roadmap: ["헬스체크 · 알림 기반 모니터링", "복구 시나리오 실측 — 빈 서버에 저장소만으로 재구축"],
    featured: true,
  },
  {
    slug: "palworld-save-migration",
    title: "바이너리 세이브 마이그레이션 디버깅",
    period: "2026",
    status: "완료",
    kind: "개인",
    summary: "공개 툴이 파싱조차 못 하는 신규 세이브 포맷을 라이브러리 패치로 뚫은 사례",
    description: [
      "게임 업데이트로 세이브 압축 방식이 바뀌면서 기존 공개 툴이 전부 실패했다. 파서를 직접 읽어 미지원 타입(Int64) 분기가 빠진 지점을 찾아 패치하고 전체 파싱에 성공했다.",
      "이전 후 개체 92개가 '원정 배정' 상태로 잠기는 문제는, 정상 개체와 이상 개체의 필드를 비교해 원인 필드를 특정하고 제거하는 방식으로 해결했다.",
      "편집 전에 '아무것도 바꾸지 않고 재저장한' 파일을 먼저 올려 무손상을 확인하는 바운디드 테스트를 거쳤다.",
    ],
    stack: ["Python", "바이너리 포맷 분석", "Docker"],
    highlights: [
      "라이브러리 파서의 미지원 타입 분기를 추가해 파싱 블로커 해제",
      "정상/이상 개체 필드 비교로 원인 플래그 특정 → 92개 복구",
      "적용 전 무손상 재저장으로 안전성 검증 후 반영",
      "잘못된 접근(참조 강제 수정)이 서버 크래시로 이어진 것을 확인하고 폐기",
    ],
    featured: false,
  },
  {
    slug: "jd-crawler",
    title: "채용공고 스킬 트렌드 대시보드",
    period: "2026 – 현재",
    status: "진행 중",
    kind: "개인",
    summary: "채용공고에서 요구 기술을 추출해 '시장 수요 대비 내 역량'을 시각화",
    description: [
      "JD 텍스트에서 기술 키워드를 추출·집계해 JSON으로 떨구고, 이 사이트의 스킬 대시보드가 그대로 읽는다.",
      "현재는 샘플 JD 기반으로 동작하며, 실제 사이트 수집은 확장 지점으로 열어두었다.",
    ],
    stack: ["Python", "BeautifulSoup", "Next.js"],
    highlights: [
      "키워드 추출 → 빈도 집계 → 대시보드 연동 파이프라인",
      "수집 실패 시 샘플로 폴백하는 구조",
    ],
    roadmap: ["실제 채용 사이트 수집 (ToS 확인 후)", "주기 실행 스케줄링 및 추이 비교"],
    featured: false,
  },
  {
    slug: "trading-bot",
    title: "자동매매 봇 + 데이터 파이프라인",
    period: "2026 –",
    status: "설계",
    kind: "개인",
    summary: "실시간 시세 수집과 주문 실행을 분리한 매매 시스템 — 설계 완료, 구현 착수 전",
    description: [
      "아직 코드는 없다. 구조 설계와 실패 지점 분석까지 마친 단계다.",
      "시세는 한 증권사 API, 주문·잔고는 다른 증권사로 분리하되 계좌 상태의 진실은 한 곳만 두는 것을 원칙으로 잡았다. 두 곳을 혼용하면 정합성이 깨진다.",
      "LLM은 매매 판단 경로 밖에 둔다. 응답이 초 단위라 실행 엔진에 넣으면 늦는다. 뉴스·국면 분석 결과를 미리 계산된 컨텍스트로 넘기는 역할만 맡긴다.",
    ],
    stack: ["Python", "Docker"],
    highlights: [
      "데이터/주문 경로 분리, 상태의 단일 원천 원칙",
      "LLM을 실행 경로 밖에 두는 지연 설계",
      "장애 시나리오 정의 — 피드 끊김 시 신규 진입 중단, 주문 장애 시 수동 킬스위치",
    ],
    roadmap: [
      "실행 엔진 스캐폴딩 (규칙 + 경량 ML 추론)",
      "증권사 Open API 연동 및 모의 운용",
      "Kafka 틱 적재 · Spark 처리 파이프라인",
    ],
    featured: false,
  },
];
