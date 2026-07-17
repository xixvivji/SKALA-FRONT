# SKALA Front-end

SKALA 과정에서 진행한 프론트엔드 과제와 실습 결과물을 정리한 저장소입니다.

## 프로젝트 목록

| 구분 | 프로젝트 | 설명 | 바로가기 |
| --- | --- | --- | --- |
| Assignment | 여행의 발견 | 국내 여행지를 소개하고 여행 일정을 관리하는 웹사이트 | [상세 README](assignment/day1/README.md) · [제출용 PDF](output/pdf/travel-discovery-project.pdf) |
| Practice | Profile Portfolio | 프로필, 프로젝트 경험과 개인적인 이야기를 소개하는 자기소개 페이지 | [상세 README](practice/profile-portfolio/README.md) · [배포 사이트](https://d3j0t61n2e0cz0.cloudfront.net/) |

## 1. Assignment — 여행의 발견

국내 여행지를 둘러보고 여행 계획을 직접 작성할 수 있도록 구현한 웹사이트입니다.

### 주요 기능

- 국내 여행지 목록 및 상세 정보 제공
- 여행 영상 캐러셀과 오늘의 여행 문구 표시
- 회원가입 및 로그인
- 여행별 일정과 준비 항목 생성·수정·삭제
- Local Storage를 활용한 사용자 및 여행 계획 데이터 관리
- 화면 크기에 대응하는 반응형 레이아웃

### 기술 스택

- HTML5
- CSS3
- JavaScript (ES Modules)
- Local Storage

### 실행 방법

[`assignment/day1/index.html`](assignment/day1/index.html)을 브라우저에서 실행합니다.

## 2. Practice — Profile Portfolio

개인 프로필과 프로젝트 경험, 개발을 배우게 된 과정과 현재의 관심사를 소개하는 자기소개 웹사이트입니다.

### 주요 기능

- 프로필과 관심 분야 및 기술 스택 소개
- 프로젝트별 역할, 주요 작업, 기술 스택과 소개 영상 제공
- 개발을 배우게 된 과정과 목표를 보여주는 My Story 타임라인
- 현재의 학습, 성격, 일상과 관심사를 소개하는 카드
- 방명록 작성 및 페이지네이션
- Supabase를 활용한 게임 기록과 방명록 데이터 관리
- 반응형 내비게이션과 프로젝트 상세 모달

### 기술 스택

- HTML5
- CSS3
- JavaScript
- Supabase
- AWS CloudFront

### 실행 방법

- 배포 사이트: <https://d3j0t61n2e0cz0.cloudfront.net/>
- 로컬 실행: [`practice/profile-portfolio/index.html`](practice/profile-portfolio/index.html)을 브라우저에서 실행합니다.

> 방명록의 Supabase 연동 기능을 사용하려면 네트워크 연결이 필요합니다.

## 폴더 구조

```text
SKALA-FRONT/
├── assignment/
│   └── day1/                  # 여행의 발견 과제
└── practice/
    └── profile-portfolio/     # 개인 프로필 포트폴리오
```

각 폴더는 서로 독립적인 결과물이며, 해당 폴더의 `index.html`이 시작 페이지입니다.
