// 프로젝트 목록.
//
// status 로 "실제로 돌아가는 것"과 "설계까지 한 것"을 구분한다.
// roadmap 에 적은 항목은 실제로 만든 뒤 highlights 로 옮기고 status 를 올린다.

export type ProjectStatus = "운영 중" | "진행 중" | "설계";

export type Project = {
  slug: string;
  title: string;
  period: string;
  status: ProjectStatus;
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
  {
    slug: "sales-verification",
    title: "채널별 매출 검증 파이프라인",
    period: "2025 – 현재",
    status: "운영 중",
    summary: "다채널 매출을 데이터 웨어하우스 ↔ 원장 대사로 검증",
    description: [
      "채널별 취소·환불 분기와 3일 수집 윈도우를 반영한 매출 검증 방법론을 설계·구현.",
      "NET 매출 산식의 채널별 함정(결제할인·정산예상금 등)을 규명해 정합성을 끌어올렸다.",
    ],
    stack: ["dbt", "BigQuery", "SQL", "Python"],
    highlights: [
      "채널별 취소·환불 분기 로직 설계",
      "산식 불일치 원인 규명 후 정합성 개선",
      "수집 윈도우를 고려한 대사 기준 정립",
    ],
    featured: true,
  },
  {
    slug: "home-server",
    title: "미니PC 홈서버 — 설정을 전부 코드로",
    period: "2026 – 현재",
    status: "운영 중",
    summary: "손으로 띄우던 서버를 compose 기반으로 옮겨 재현 가능한 상태로 만든 작업",
    description: [
      "Beelink SER8(8845HS)에 Ubuntu Server 를 헤드리스로 설치하고 Docker 로 서비스를 격리 운영한다.",
      "`docker run` 으로 띄워 실행 옵션이 서버 어디에도 남지 않던 서비스를 compose 로 전환했다. 지우기 전에 `docker inspect` 로 설정을 추출해 파일로 복원하는 순서를 지켜야 했다.",
      "비밀값은 `.env` 로 분리하고 데이터·로그는 저장소 밖으로 빼, 설정만 담긴 private 저장소 하나로 서버 전체를 형상 관리한다.",
    ],
    stack: ["Ubuntu", "Docker", "Docker Compose", "Git", "Tailscale"],
    highlights: [
      "docker run → compose 전환: 서버 설정을 전부 파일로 (IaC)",
      "비밀값 .env 분리 · 계정 키 대신 deploy key 로 최소 권한 연결",
      "5GB 볼륨 이전을 무중단으로 — 바인드 경로 수정 검증 후 기동",
      "백업 보존정책이 한 달간 미적용이던 것을 발견·수정 (271MB 41개 → 61MB 9개)",
    ],
    roadmap: [
      "Cloudflare Tunnel 로 웹서비스 외부 공개",
      "헬스체크·알림 기반 모니터링",
      "복구 시나리오 실측 — 빈 서버에 저장소만으로 재구축",
    ],
    featured: true,
  },
  {
    slug: "palworld-save-migration",
    title: "바이너리 세이브 마이그레이션 디버깅",
    period: "2026",
    status: "운영 중",
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
    summary: "채용공고에서 요구 기술을 추출해 '시장 수요 대비 내 역량'을 시각화",
    description: [
      "JD 텍스트에서 기술 키워드를 추출·집계해 JSON 으로 떨구고, 이 사이트의 스킬 대시보드가 그대로 읽는다.",
      "현재는 샘플 JD 기반으로 동작하며, 실제 사이트 수집은 확장 지점으로 열어두었다.",
    ],
    stack: ["Python", "BeautifulSoup", "Next.js"],
    highlights: [
      "키워드 추출 → 빈도 집계 → 대시보드 연동 파이프라인",
      "수집 실패 시 샘플로 폴백하는 구조",
    ],
    roadmap: [
      "실제 채용 사이트 수집 (ToS 확인 후)",
      "주기 실행 스케줄링 및 추이 비교",
    ],
    featured: false,
  },
  {
    slug: "trading-bot",
    title: "자동매매 봇 + 데이터 파이프라인",
    period: "2026 –",
    status: "설계",
    summary: "실시간 시세 수집과 주문 실행을 분리한 매매 시스템 — 설계 완료, 구현 착수 전",
    description: [
      "아직 코드는 없다. 구조 설계와 실패 지점 분석까지 마친 단계다.",
      "시세는 한 증권사 API, 주문·잔고는 다른 증권사로 분리하되 **계좌 상태의 진실은 한 곳만** 두는 것을 원칙으로 잡았다. 두 곳을 혼용하면 정합성이 깨진다.",
      "LLM 은 매매 판단 경로 밖에 둔다. 응답이 초 단위라 실행 엔진에 넣으면 늦는다. 뉴스·국면 분석 결과를 미리 계산된 컨텍스트로 넘기는 역할만 맡긴다.",
    ],
    stack: ["Python", "Docker"],
    highlights: [
      "데이터/주문 경로 분리, 상태의 단일 원천 원칙",
      "LLM 을 실행 경로 밖에 두는 지연 설계",
      "게임 서버와 시간분할로 자원 충돌 회피",
      "장애 시나리오 정의 — 피드 끊김 시 신규 진입 중단, 주문 장애 시 수동 킬스위치",
    ],
    roadmap: [
      "실행 엔진 스캐폴딩 (규칙 + 경량 ML 추론)",
      "증권사 Open API 연동 및 모의 운용",
      "Kafka 틱 적재 · Spark 처리 파이프라인",
    ],
    featured: true,
  },
];
