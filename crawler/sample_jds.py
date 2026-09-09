"""오프라인 데모용 샘플 JD 텍스트 (데이터 엔지니어 채용공고 발췌).

실제 크롤링 없이도 파이프라인을 end-to-end로 돌려 대시보드 데이터를 만들 수 있게 함.
실제 사이트 연동은 crawl.py의 fetch_* 함수 참고.
"""

SAMPLE_JDS: list[str] = [
    "Python, SQL 기반 데이터 파이프라인 설계. Airflow로 워크플로우 오케스트레이션. AWS 환경 경험 우대.",
    "Spark 기반 대용량 배치 처리 경험 필수. Scala 또는 Python. Hadoop 에코시스템 이해. AWS EMR.",
    "실시간 데이터 처리(Kafka, Flink) 경험자. AWS Kinesis. Docker/Kubernetes 컨테이너 운영.",
    "dbt로 데이터 모델링, BigQuery 데이터 웨어하우스 운영. SQL 고급. GCP.",
    "Python ETL 개발, Airflow DAG 작성. PostgreSQL, Redshift. AWS. Docker.",
    "데이터 엔지니어: Spark, Kafka, Airflow. AWS 클라우드. Terraform으로 인프라 관리.",
    "SQL/Python 필수. Snowflake 데이터 웨어하우스. dbt 모델링. BI 협업.",
    "빅데이터 플랫폼 운영: Hadoop, Spark, Kafka. Kubernetes. 자바 또는 스칼라.",
    "Python 기반 크롤링/수집 파이프라인. Pandas 데이터 처리. AWS S3, Lambda. Docker.",
    "실시간 스트리밍 Kafka, Spark Streaming. Elasticsearch. GCP BigQuery. Python.",
    "데이터 웨어하우스 dbt + Snowflake. SQL 최적화. Airflow. AWS.",
    "MLOps 인접 데이터 엔지니어. Python, Spark. Kubernetes, Docker. AWS SageMaker 연동.",
    "Python, SQL. 사내 데이터 마트 구축(dbt, BigQuery). GCP. Git 협업 필수.",
    "Kafka 기반 이벤트 파이프라인. Flink/Spark. Kubernetes. AWS. Terraform.",
    "대규모 로그 분석: Elasticsearch, Spark. Python. AWS. Docker/K8s.",
    "데이터 엔지니어(주니어): Python, SQL 필수. Airflow, AWS, Docker 경험 우대.",
    "Redshift/BigQuery 운영, dbt 모델링, Airflow 스케줄링. Python. AWS/GCP.",
    "실시간 처리 Kafka + Flink, 배치 Spark. Scala/Python. Kubernetes. AWS.",
    "Python 데이터 파이프라인, Pandas, SQL. MySQL/PostgreSQL. Docker. AWS EC2.",
    "MongoDB, Redis, PostgreSQL 운영. Python. Kafka. Docker/Kubernetes. AWS.",
]
