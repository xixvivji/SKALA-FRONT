# 여행의 발견

국내 여섯 도시의 여행 정보를 둘러보고, 나만의 여행 일정과 준비 항목을 관리할 수 있는 웹사이트입니다. HTML, CSS, JavaScript의 기본 기능을 각각 분리해 구현하고 브라우저의 Local Storage를 이용해 사용자 데이터를 유지합니다.

## 제출용 문서

[실행 결과·소스코드 구성·결과물 자기평가 PDF](../../output/pdf/travel-discovery-project.pdf)

## 프로젝트 화면

### 메인 페이지

![여행의 발견 메인 페이지](docs/images/main.png)

- 여행 서비스의 전체 콘셉트와 추천 콘텐츠를 소개합니다.
- 영상 캐러셀, 오늘의 여행 문구, 여섯 도시의 여행지 카드를 제공합니다.
- 여행 계획, 회원가입, 로그인 등 각 기능 페이지로 이동할 수 있습니다.

### 여행지 상세 페이지

![서울 여행지 상세 페이지](docs/images/destination.png)

- URL의 `city` 쿼리 파라미터에 따라 도시별 콘텐츠를 동적으로 표시합니다.
- 도시 소개, 대표 이미지, 추천 장소 및 여행 영상을 제공합니다.
- 이전·다음 도시로 이동하거나 해당 도시의 여행 계획을 만들 수 있습니다.

### 여행 계획 페이지

![여행 계획 페이지](docs/images/planner.png)

- 여행지와 기간을 선택해 새로운 여행을 생성합니다.
- 달력에서 날짜를 선택하고 시간 일정 또는 준비 항목을 추가합니다.
- 일정의 완료 상태 변경, 수정, 삭제 및 필터링을 지원합니다.
- 작성한 여행 계획은 Local Storage에 저장되어 새로고침 후에도 유지됩니다.

### 회원가입 페이지

![회원가입 페이지](docs/images/signup.png)

- 사용자 이름, 아이디, 비밀번호 등의 입력값을 검사합니다.
- 가입한 사용자 정보를 Local Storage에 저장합니다.
- 로그인 결과에 따라 사용자별 여행 계획을 구분합니다.

## 주요 기능

| 기능 | 설명 | 관련 파일 |
| --- | --- | --- |
| 여행지 목록 | JavaScript 데이터로 여섯 도시 카드를 동적으로 생성 | `assets/js/data/destinations.js`, `assets/js/pages/destinations.js` |
| 여행지 상세 | 쿼리 파라미터를 읽어 선택한 도시의 상세 콘텐츠 표시 | `destination.html`, `assets/js/pages/destination.js` |
| 영상 캐러셀 | 이전·다음 버튼으로 여행 영상을 순환 재생 | `assets/js/components/video-carousel.js` |
| 오늘의 문구 | JSON 데이터를 불러와 여행 문구와 작성자 표시 | `assets/data/quotes.json`, `assets/js/components/quote.js` |
| 사용자 인증 | 회원가입, 로그인 및 현재 로그인 사용자 관리 | `assets/js/core/auth.js`, `assets/js/pages/signup.js`, `assets/js/pages/login.js` |
| 여행 플래너 | 여행과 날짜별 일정 및 준비 항목 CRUD 제공 | `planner.html`, `assets/js/pages/app.js` |
| 데이터 저장 | 사용자와 여행 계획을 브라우저 Local Storage에 저장 | `assets/js/core/storage.js` |
| 공통 UI | 내비게이션, 테마, 연도 표시 등 공통 동작 처리 | `assets/js/core/common.js` |

## 기술별 구현 내용

### HTML

| 적용 페이지 | 사용 요소 | 적용 내용 | 관련 파일 |
| --- | --- | --- | --- |
| 전체 페이지 | `header`, `nav`, `main`, `footer` | 공통 구조와 주요 콘텐츠 영역을 시맨틱 태그로 구분 | `*.html` |
| 메인 | `section`, `figure`, `video` | 히어로, 오늘의 문구, 여행 영상과 추천 도시 영역 구성 | `index.html` |
| 여행지 상세 | `article`, `figure`, `video` | 도시 소개, 명소 갤러리, 먹거리 및 영상 콘텐츠 구성 | `destination.html` |
| 여행 플래너 | `aside`, `section`, `form`, `dialog` | 여행 목록, 달력, 일정 입력 폼과 여행 생성·수정 창 구성 | `planner.html` |
| 로그인·회원가입 | `form`, `fieldset`, `input`, `select` | 사용자 입력과 성별·여행 취향·거주지 선택 구성 | `login.html`, `signup.html` |
| 회원 목록 | `table` | 가입된 사용자 정보를 표 형태로 표시 | `result.html` |
| 동적 콘텐츠 영역 | `aria-label`, `aria-live`, `aria-current` | 메뉴 상태와 동적으로 변경되는 목록의 접근성 보완 | `index.html`, `planner.html`, `destination.html` |

### CSS

| 적용 페이지 | 사용 기술 | 적용 내용 | 관련 파일 |
| --- | --- | --- | --- |
| 전체 페이지 | CSS 변수 | 색상, 배경, 테두리와 공통 간격을 일관되게 관리 | `assets/css/style.css` |
| 전체 페이지 | Flexbox | 내비게이션, 버튼 그룹, 폼과 콘텐츠 정렬 | `assets/css/style.css` |
| 메인·상세 | CSS Grid | 추천 도시 카드와 명소·먹거리 콘텐츠 배치 | `assets/css/style.css` |
| 여행 플래너 | Grid·상태 클래스 | 사이드바, 달력, 일정 입력 영역과 선택·완료 상태 표현 | `assets/css/style.css` |
| 로그인·회원가입 | Grid·Form 스타일 | 입력 항목과 선택 영역을 읽기 쉬운 폼 레이아웃으로 구성 | `assets/css/style.css` |
| 전체 페이지 | Media Query | 모바일 내비게이션과 화면 너비별 반응형 레이아웃 적용 | `assets/css/style.css` |
| 버튼·카드·입력창 | `hover`, `focus`, 활성 클래스 | 사용자 동작과 현재 선택 상태를 시각적으로 구분 | `assets/css/style.css` |
| 전체 페이지 | 다크 모드 클래스 | 저장된 테마에 따라 색상과 컴포넌트 스타일 전환 | `assets/css/style.css` |

### JavaScript

| 적용 페이지 | 구현 기능 | 적용 내용 | 관련 파일 |
| --- | --- | --- | --- |
| 전체 페이지 | ES Modules | 데이터, 공통 기능, 인증, 저장소와 페이지별 로직 분리 | `assets/js/` |
| 메인 | 여행지 렌더링 | 여행지 데이터로 여섯 도시 카드를 동적으로 생성 | `data/destinations.js`, `pages/destinations.js` |
| 메인·플래너 | Fetch API | JSON 파일에서 오늘의 여행 문구를 읽어 화면에 표시 | `components/quote.js`, `assets/data/quotes.json` |
| 메인 | 영상 캐러셀 | 이전·다음 버튼과 영상 종료 이벤트로 콘텐츠 전환 | `components/video-carousel.js` |
| 여행지 상세 | URL 파라미터·DOM 조작 | `city` 값에 맞는 도시 정보, 이미지와 영상을 렌더링 | `pages/destination.js` |
| 회원가입 | 폼 검증·Web Crypto | 입력값을 검사하고 비밀번호 정보를 처리해 사용자 저장 | `pages/signup.js`, `core/auth.js` |
| 로그인·전체 페이지 | 인증 상태 관리 | 로그인 세션을 저장하고 사용자에 따라 메뉴와 접근 경로 변경 | `pages/login.js`, `core/auth.js`, `core/common.js` |
| 여행 플래너 | CRUD·DOM 조작 | 여행과 날짜별 일정의 생성·조회·수정·삭제 및 필터링 | `pages/app.js` |
| 회원·플래너·전체 페이지 | Local Storage | 회원 정보, 로그인 상태, 여행 계획과 테마 유지 | `core/storage.js`, `core/auth.js`, `core/common.js`, `pages/app.js` |

## 폴더 구조

```text
day1/
├── assets/
│   ├── css/                 # 공통 스타일
│   ├── data/                # 여행 문구 JSON
│   ├── images/              # 도시별 이미지
│   ├── js/
│   │   ├── components/      # 영상 캐러셀, 오늘의 문구
│   │   ├── core/            # 인증, 저장소, 공통 기능
│   │   ├── data/            # 여행지 데이터
│   │   └── pages/           # 페이지별 동작
│   └── videos/              # 여행 영상
├── destination.html         # 여행지 상세
├── index.html               # 메인
├── login.html               # 로그인
├── planner.html             # 여행 계획
├── result.html              # 회원 목록
└── signup.html              # 회원가입
```

## 실행 방법

ES Modules와 JSON 데이터 요청을 정상적으로 사용하려면 프로젝트 루트에서 로컬 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 다음 주소로 접속합니다.

```text
http://localhost:8000/assignment/day1/index.html
```

간단히 화면만 확인할 경우 [`index.html`](index.html)을 브라우저에서 직접 실행할 수도 있습니다.
