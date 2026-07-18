# 여행의 발견

국내 여섯 도시의 여행 정보를 살펴보고 나만의 여행 일정과 준비 항목을 관리할 수 있는 웹사이트입니다. 여러 페이지를 목적에 따라 분리하고, JavaScript ES Modules와 Local Storage를 활용해 사용자별 데이터를 유지하도록 구현했습니다.

## 실행 결과

### 메인 페이지

![여행의 발견 메인 페이지](docs/images/main.png)

- 서비스의 콘셉트와 국내 추천 여행지를 소개합니다.
- 서울·광주·울산 배경이 순환하고, 영상 캐러셀과 오늘의 여행 문구를 제공합니다.
- JavaScript 데이터로 여섯 도시의 여행지 카드를 동적으로 생성합니다.

### 여행지 상세 페이지

![여행지 상세 페이지](docs/images/destination.png)

- URL의 `city` 쿼리 파라미터에 따라 도시별 내용을 동적으로 표시합니다.
- 도시 소개, 추천 명소, 대표 먹거리, 여행 팁과 영상을 제공합니다.
- 해당 도시가 선택된 상태로 여행 계획 페이지에 이동할 수 있습니다.

### 여행 계획 페이지

![여행 계획 페이지](docs/images/planner.png)

- 여행지와 기간을 선택해 여행을 생성하고 수정·삭제할 수 있습니다.
- 날짜별 시간 일정과 준비 항목을 추가하고 완료 상태를 관리합니다.
- 일정 필터, 달력, 여행 기간과 D-day를 제공합니다.
- 로그인한 사용자별 여행 계획을 Local Storage에 저장합니다.

### 회원가입 페이지

![회원가입 페이지](docs/images/signup.png)

- 사용자 이름, 아이디, 비밀번호와 추가 프로필 정보를 입력받습니다.
- 중복 아이디와 입력값을 검사하고 비밀번호를 PBKDF2 방식으로 처리합니다.
- 로그인한 사용자에 따라 여행 계획 데이터를 구분합니다.

## 페이지 구성

| 페이지 | 파일 | 역할 |
| --- | --- | --- |
| 메인 | `index.html` | 히어로, 여행 문구, 영상 캐러셀, 여행지 목록 |
| 여행지 상세 | `destination.html` | 선택한 도시의 명소·먹거리·영상·여행 팁 |
| 여행 플래너 | `planner.html` | 여행과 날짜별 일정 및 준비 항목 관리 |
| 로그인 | `login.html` | 사용자 인증과 세션 생성 |
| 회원가입 | `signup.html` | 입력 검증과 사용자 등록 |
| 회원 목록 | `result.html` | 현재 브라우저에 저장된 실습용 회원 목록 |

## 주요 기능과 소스코드

| 기능 | 설명 | 관련 파일 |
| --- | --- | --- |
| 여행지 데이터 | 여섯 도시의 소개·명소·먹거리·영상 데이터 관리 | `assets/js/data/destinations.js` |
| 여행지 목록 | 도시 데이터를 이용해 메인 카드를 동적으로 생성 | `assets/js/pages/destinations.js` |
| 여행지 상세 | `city` 파라미터를 읽어 선택한 도시 콘텐츠 렌더링 | `assets/js/pages/destination.js` |
| 영상 캐러셀 | 이전·다음 버튼과 영상 종료 이벤트로 영상 전환 | `assets/js/components/video-carousel.js` |
| 오늘의 문구 | JSON 데이터를 Fetch API로 읽어 무작위 문구 표시 | `assets/js/components/quote.js`, `assets/data/quotes.json` |
| 사용자 인증 | 회원가입, 로그인, 세션과 안전한 이동 경로 관리 | `assets/js/core/auth.js`, `assets/js/pages/login.js`, `assets/js/pages/signup.js` |
| 여행 플래너 | 여행·일정·준비 항목 CRUD와 달력 렌더링 | `assets/js/pages/app.js` |
| 브라우저 저장소 | 회원과 사용자별 여행 계획의 Local Storage 처리 | `assets/js/core/storage.js` |
| 공통 UI | 내비게이션, 테마, 로그아웃, 상단 이동 버튼 | `assets/js/core/common.js` |

## 기술별 구현 내용

### HTML

| 적용 페이지 | 사용 요소 | 구현 내용 |
| --- | --- | --- |
| 전체 | `header`, `nav`, `main`, `section`, `footer` | 페이지 구조와 콘텐츠 영역을 의미에 따라 구분 |
| 메인 | `figure`, `video`, `article` | 여행 영상과 추천 도시 카드 구성 |
| 상세 | `article`, `figure`, `video` | 명소, 먹거리와 영상 콘텐츠 구성 |
| 플래너 | `aside`, `form`, `dialog` | 여행 목록, 일정 폼과 여행 편집 창 구성 |
| 로그인·회원가입 | `form`, `fieldset`, `input`, `select` | 인증 및 사용자 정보 입력 구성 |
| 회원 목록 | `table` | 가입된 실습용 사용자 데이터를 표로 표시 |
| 동적 영역 | `aria-label`, `aria-live`, `aria-current` | 현재 상태와 변경되는 콘텐츠의 접근성 보완 |

### CSS

| 적용 페이지 | 사용 기술 | 구현 내용 |
| --- | --- | --- |
| 전체 | CSS 변수 | 색상, 배경, 테두리와 간격을 일관되게 관리 |
| 전체 | Flexbox | 내비게이션, 버튼 그룹과 폼 요소 정렬 |
| 메인·상세 | CSS Grid | 여행지, 명소와 먹거리 카드 배치 |
| 플래너 | Grid, 상태 클래스 | 사이드바, 달력, 일정과 완료 상태 표현 |
| 전체 | Media Query | 모바일 내비게이션과 반응형 레이아웃 적용 |
| 상호작용 요소 | `hover`, `focus`, 활성 클래스 | 현재 선택과 키보드 포커스를 시각적으로 구분 |
| 전체 | 다크 테마 클래스 | 저장된 테마에 따라 페이지 색상 전환 |

### JavaScript

| 적용 페이지 | 사용 기술 | 구현 내용 |
| --- | --- | --- |
| 전체 | ES Modules | 데이터, 저장소, 인증, 컴포넌트와 페이지 로직 분리 |
| 메인 | Fetch API | JSON 여행 문구를 읽어 화면에 표시 |
| 메인 | DOM·미디어 이벤트 | 여행지 카드 생성과 영상 캐러셀 제어 |
| 상세 | URLSearchParams | `city` 값에 맞는 도시 콘텐츠 렌더링 |
| 회원가입 | Web Crypto API | PBKDF2 SHA-256 방식으로 비밀번호 처리 |
| 로그인·전체 | Local Storage | 회원, 세션, 테마와 사용자별 여행 계획 유지 |
| 플래너 | DOM·이벤트·CRUD | 달력과 여행·일정·준비 항목의 생성·수정·삭제 |

## 데이터 저장 방식

회원 정보, 로그인 상태와 여행 계획은 브라우저 Local Storage에 저장됩니다. 서버에 저장되는 데이터가 아니므로 브라우저나 기기가 달라지면 기존 데이터가 공유되지 않습니다. 인증과 회원 목록 역시 프론트엔드 기술을 연습하기 위한 실습용 기능입니다.

## 폴더 구조

```text
day1/
├── assets/
│   ├── css/                 # 공통 스타일
│   ├── data/                # 여행 문구 JSON
│   ├── images/              # 공통 및 도시별 이미지
│   ├── js/
│   │   ├── components/      # 영상 캐러셀, 오늘의 문구
│   │   ├── core/            # 인증, 저장소, 공통 기능
│   │   ├── data/            # 여행지 데이터
│   │   └── pages/           # 페이지별 동작
│   └── videos/              # 여행 영상
├── docs/images/             # README 실행 화면
├── destination.html
├── index.html
├── login.html
├── planner.html
├── result.html
└── signup.html
```

## 실행 방법

ES Modules와 JSON 요청을 정상적으로 사용하려면 저장소 루트에서 로컬 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:8000/assignment/day1/index.html
```

## 결과물 자기평가

여행지 소개에 그치지 않고 회원가입과 로그인, 사용자별 여행 계획 관리까지 하나의 흐름으로 연결했습니다. JavaScript를 역할별 ES Module로 분리하고 공통 저장소와 인증 기능을 재사용해 페이지가 늘어나도 관리할 수 있는 구조를 연습했습니다. 특히 달력 기반의 일정 관리와 준비 항목 CRUD를 직접 구현하면서 DOM 렌더링, 이벤트 처리와 상태 관리의 관계를 이해할 수 있었습니다.

Local Storage 기반이므로 여러 기기에서 데이터를 공유하거나 실제 사용자 권한을 안전하게 관리할 수 없다는 한계가 있습니다. 이후 백엔드나 데이터베이스와 연결한다면 실제 서비스에 가까운 인증과 동기화 기능으로 발전시킬 수 있습니다.
