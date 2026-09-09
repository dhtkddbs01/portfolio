"""스킬 사전 + 추출 로직.

JD 텍스트에서 기술스택을 뽑아낸다. canonical(표준명) → 매칭 패턴(별칭) 매핑.
새 스킬은 여기에 추가하면 크롤/대시보드에 자동 반영된다.
"""

import re

# canonical: [정규식 패턴들] — 소문자 기준으로 매칭
SKILL_PATTERNS: dict[str, list[str]] = {
    "Python": [r"\bpython\b", r"파이썬"],
    "SQL": [r"\bsql\b"],
    "Java": [r"\bjava\b(?!script)"],
    "Scala": [r"\bscala\b"],
    "TypeScript": [r"\btypescript\b", r"\bts\b"],
    "Spark": [r"\bspark\b", r"스파크"],
    "Kafka": [r"\bkafka\b", r"카프카"],
    "Airflow": [r"\bairflow\b", r"에어플로우"],
    "dbt": [r"\bdbt\b"],
    "Hadoop": [r"\bhadoop\b", r"하둡"],
    "Flink": [r"\bflink\b"],
    "BigQuery": [r"\bbigquery\b", r"빅쿼리"],
    "Snowflake": [r"\bsnowflake\b"],
    "Redshift": [r"\bredshift\b"],
    "AWS": [r"\baws\b", r"amazon web services"],
    "GCP": [r"\bgcp\b", r"google cloud"],
    "Azure": [r"\bazure\b"],
    "Docker": [r"\bdocker\b", r"도커"],
    "Kubernetes": [r"\bkubernetes\b", r"\bk8s\b", r"쿠버네티스"],
    "Terraform": [r"\bterraform\b"],
    "Kinesis": [r"\bkinesis\b"],
    "Pandas": [r"\bpandas\b"],
    "Elasticsearch": [r"\belasticsearch\b", r"\belastic search\b"],
    "PostgreSQL": [r"\bpostgres(ql)?\b"],
    "MySQL": [r"\bmysql\b"],
    "MongoDB": [r"\bmongo(db)?\b"],
    "Redis": [r"\bredis\b"],
    "Git": [r"\bgit\b(?!hub)"],
}

_COMPILED = {
    name: [re.compile(p, re.IGNORECASE) for p in pats]
    for name, pats in SKILL_PATTERNS.items()
}


def extract_skills(text: str) -> set[str]:
    """JD 텍스트 하나에서 언급된 스킬 집합을 반환."""
    found = set()
    for name, patterns in _COMPILED.items():
        if any(p.search(text) for p in patterns):
            found.add(name)
    return found
