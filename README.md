# SKALA Front-end

SKALA 과정에서 진행한 프론트엔드 과제와 실습 결과물을 정리한 저장소입니다. `personal-portal`은 제출 대상에서 제외하고, Assignment와 Profile Portfolio 두 프로젝트를 중심으로 구성했습니다.

## 프로젝트 목록

| 구분 | 프로젝트 | 설명 | 바로가기 |
| --- | --- | --- | --- |
| Assignment | 여행의 발견 | 국내 여행지를 탐색하고 사용자별 여행 일정과 준비 항목을 관리하는 웹사이트 | [상세 README](assignment/day1/README.md) |
| Practice | Profile Portfolio | 프로필, 프로젝트 경험, 하루 기록과 방명록을 담은 개인 블로그형 포트폴리오 | [상세 README](practice/profile-portfolio/README.md) · [배포 사이트](https://d3j0t61n2e0cz0.cloudfront.net/) |

## Assignment — 여행의 발견

국내 여섯 도시의 여행 정보를 둘러보고 로그인한 사용자가 여행 계획을 직접 작성할 수 있도록 구현한 다중 페이지 웹사이트입니다.

### 주요 기능

- 여행지 카드와 도시별 상세 정보 동적 렌더링
- 여행 영상 캐러셀과 JSON 기반 오늘의 여행 문구
- 회원가입, 로그인 및 사용자 세션 관리
- 여행, 날짜별 일정, 준비 항목 생성·조회·수정·삭제
- Local Storage를 활용한 사용자별 데이터 유지
- 다크모드, 모바일 메뉴와 반응형 레이아웃

### 주요 기술

`HTML5` · `CSS3` · `JavaScript ES Modules` · `Fetch API` · `Web Crypto API` · `Local Storage`

### 실행

```bash
python3 -m http.server 8000
```

<http://localhost:8000/assignment/day1/index.html>

## Practice — Profile Portfolio

개발 경험뿐 아니라 성격, 관심사, 학습 과정과 일상의 기록을 함께 보여주는 개인 블로그형 포트폴리오입니다.

### 주요 기능

- 문구가 순차적으로 나타나는 첫 방문 인트로
- 탭으로 살펴보는 About 콘텐츠
- 프로젝트별 역할, 기술과 소개 영상을 제공하는 상세 모달
- Supabase 기반 Daily Log 캘린더
- 포인터에 반응하는 3D 관심사 카드
- 방명록과 댓글 작성·수정·삭제 및 페이지네이션
- 다크모드, 컬러 모드와 반응형 내비게이션
- 키보드 조작과 모션 감소 설정을 고려한 접근성

### 주요 기술

`HTML5` · `CSS3` · `JavaScript` · `Supabase` · `Local Storage` · `AWS CloudFront`

### 실행

- 배포 사이트: <https://d3j0t61n2e0cz0.cloudfront.net/>
- 로컬 주소: <http://localhost:8000/practice/profile-portfolio/index.html>

> Daily Log와 방명록 등 Supabase 연동 기능을 사용하려면 인터넷 연결이 필요합니다. 방문자가 별도의 Supabase 프로젝트를 설정할 필요는 없습니다.

## 저장소 구조

```text
SKALA-FRONT/
├── assignment/
│   └── day1/                  # 여행의 발견 과제
└── practice/
    └── profile-portfolio/     # 개인 블로그형 포트폴리오
```

두 프로젝트는 같은 저장소에서 관리하지만 각각 별도의 `index.html`과 자원을 가진 독립적인 결과물입니다.
