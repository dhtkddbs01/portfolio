"""JD 크롤러: 채용공고 수집 → 스킬 추출 → 집계 → JSON 출력.

사용:
  python crawl.py                     # 샘플 데이터로 실행(오프라인)
  python crawl.py --source wanted     # 실제 사이트 크롤(구현/조정 필요)
  python crawl.py --out ../src/data/jd-skills.json

출력 포맷은 Next.js 대시보드(src/data/jd-skills.json)가 그대로 읽는다.
"""

from __future__ import annotations

import argparse
import json
from collections import Counter
from datetime import date
from pathlib import Path

from skills import extract_skills
from sample_jds import SAMPLE_JDS

DEFAULT_OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "jd-skills.json"


def fetch_sample(limit: int) -> list[str]:
    """오프라인 데모용 샘플 JD."""
    return SAMPLE_JDS[:limit] if limit else SAMPLE_JDS


def fetch_wanted(role: str, limit: int) -> list[str]:
    """실제 크롤링 확장 지점 (예: 원티드).

    requests + BeautifulSoup로 채용 목록 → 상세 JD 텍스트를 수집한다.
    사이트 구조/ToS에 맞춰 셀렉터·엔드포인트를 조정할 것.
    네트워크 실패 시 샘플로 폴백한다.
    """
    try:
        import requests
        from bs4 import BeautifulSoup  # noqa: F401

        # TODO: 실제 목록 페이지 → 상세 JD 텍스트 수집 로직 구현
        # resp = requests.get(list_url, params={...}, timeout=10)
        # ... 상세 페이지에서 JD 본문 텍스트 추출 ...
        raise NotImplementedError("실제 사이트 셀렉터를 구현하세요.")
    except Exception as e:  # noqa: BLE001
        print(f"[warn] 실제 크롤 실패({e}) → 샘플 데이터로 폴백")
        return fetch_sample(limit)


def aggregate(jd_texts: list[str]) -> Counter:
    """공고별로 언급된 스킬을 세어(공고 단위 카운트) 집계."""
    counter: Counter = Counter()
    for text in jd_texts:
        for skill in extract_skills(text):
            counter[skill] += 1
    return counter


def build_payload(role: str, jd_texts: list[str]) -> dict:
    counter = aggregate(jd_texts)
    skills = [{"name": name, "count": count} for name, count in counter.most_common()]
    return {
        "updatedAt": date.today().isoformat(),
        "source": "crawler",
        "role": role,
        "totalPostings": len(jd_texts),
        "skills": skills,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="JD 스킬 트렌드 크롤러")
    parser.add_argument("--source", choices=["sample", "wanted"], default="sample")
    parser.add_argument("--role", default="Data Engineer")
    parser.add_argument("--limit", type=int, default=0, help="0=전체")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()

    if args.source == "sample":
        jds = fetch_sample(args.limit)
    else:
        jds = fetch_wanted(args.role, args.limit)

    payload = build_payload(args.role, jds)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(f"[ok] {payload['totalPostings']}개 공고 분석 → {args.out}")
    for s in payload["skills"][:10]:
        print(f"  {s['name']:<14} {s['count']}")


if __name__ == "__main__":
    main()
