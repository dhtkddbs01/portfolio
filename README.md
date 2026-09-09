# portfolio.sangyoun.com

데이터 엔지니어 포트폴리오 + **JD(채용공고) 스킬 트렌드 대시보드**.
채용공고를 크롤링해 시장 수요 기술스택을 집계하고, 내 역량과 비교해 보여준다.

## 스택
- **Next.js 16** (App Router, TypeScript, Tailwind v4) — 사이트
- **Python** (requests + BeautifulSoup) — JD 크롤러
- **Docker** — 배포 (홈서버 SER8 + Cloudflare Tunnel)

## 구조
```
src/
  app/            홈 · /projects · /skills(대시보드)
  components/     Nav · Footer · ProjectCard
  data/           profile.ts · projects.ts · skills.ts · jd-skills.json(크롤러 출력)
crawler/
  crawl.py        수집 → 스킬 추출 → 집계 → JSON
  skills.py       스킬 사전 + 추출 로직
  sample_jds.py   오프라인 데모용 샘플 JD
```

## 개발
```bash
npm install
npm run dev        # http://localhost:3000
```

## JD 크롤러 실행
```bash
cd crawler
python crawl.py                 # 샘플 데이터(오프라인)로 jd-skills.json 생성
python crawl.py --source wanted # 실제 사이트(구현/조정 필요)
```
결과는 `src/data/jd-skills.json`에 저장되고 `/skills` 대시보드가 읽는다.
스킬을 추가하려면 `crawler/skills.py`의 `SKILL_PATTERNS`에 넣으면 사이트에도 자동 반영.

## Docker
```bash
docker compose up -d --build    # http://localhost:3000
```

## 배포 (홈서버)
1. SER8(Ubuntu)에 이 레포 clone (또는 Gitea/GitHub pull)
2. `docker compose up -d --build`
3. **Cloudflare Tunnel**로 `portfolio.sangyoun.com` → `localhost:3000` 연결

## 채워야 할 것 (TODO)
- [ ] `src/data/profile.ts` — GitHub/이메일/이력서 링크
- [ ] `src/data/projects.ts` — 실제 프로젝트 내용·링크로 교체 (현재 예시 시드)
- [ ] `src/data/skills.ts` — 보유 스킬·레벨 조정
- [ ] `crawler/crawl.py` `fetch_wanted()` — 실제 채용사이트 셀렉터 구현
