# JIWON — Profile Portfolio

백엔드와 인프라를 공부하는 김지원의 성격, 프로젝트 경험과 현재의 관심사를 소개하는 자기소개 페이지입니다. 개발 경험뿐 아니라 개발을 배우게 된 과정과 일상의 모습을 함께 담았습니다.

## 배포 링크

<https://d3j0t61n2e0cz0.cloudfront.net/>

## 프로젝트 화면

### 첫 방문 인트로

![첫 방문 자기소개 인트로](docs/images/intro.png)

- 자기소개 문구가 한 줄씩 나타난 뒤 `ENTER MY STORY` 버튼이 활성화됩니다.
- 버튼을 누르면 양쪽 패널이 열리며 포트폴리오 본문으로 전환됩니다.
- 같은 브라우저 탭에서는 한 번만 자동 실행되며 `REPLAY INTRO`로 다시 볼 수 있습니다.
- `SKIP`, Enter, Escape 키와 모션 감소 환경을 지원합니다.

### 프로필

![포트폴리오 프로필 화면](docs/images/home.png)

- 관심 분야와 기술 스택을 첫 화면에서 소개합니다.
- 주요 섹션으로 이동하는 내비게이션과 GitHub 프로필 링크를 제공합니다.
- About 영역에서는 소개, 성향, 관심 분야와 학습 목표를 카드 형태로 보여줍니다.

### 프로젝트 경험

![프로젝트 경험 화면](docs/images/log.png)

- Mung-Shall, Z멋대로, LUMEN 프로젝트 경험을 목록으로 소개합니다.
- 프로젝트를 선택하면 역할, 주요 작업, 사용 기술과 소개 영상을 모달로 표시합니다.
- 모달에서 각 프로젝트의 GitHub 저장소로 이동할 수 있습니다.

### 나의 이야기

![나의 이야기 화면](docs/images/story.png)

- 개발에 관심을 갖게 된 과정과 프로젝트 경험을 시간의 흐름에 따라 소개합니다.
- 궁금한 것을 직접 확인하는 성향과 앞으로 만들고 싶은 서비스에 관한 생각을 담았습니다.
- 개발 경험을 단순한 기술 목록이 아닌 개인의 성장 과정으로 연결합니다.

### 요즘의 관심사

![요즘의 관심사 화면](docs/images/now.png)

- 현재 배우는 기술과 앞으로의 목표를 카드 형태로 소개합니다.
- 성격, 산책과 생각 정리 등 개발 외의 개인적인 모습도 함께 보여줍니다.
- 같은 길을 준비하는 사람에게 방명록을 통한 소통을 제안합니다.

### 방명록

![방명록 화면](docs/images/guestbook.png)

- 아이디와 비밀번호를 이용해 익명 메시지를 작성합니다.
- 동일한 아이디의 비밀번호를 확인해 메시지 수정과 삭제 권한을 구분합니다.
- 메시지를 한 페이지에 6개씩 표시하고 페이지네이션을 제공합니다.

## 주요 기능

| 기능 | 설명 | 구현 방식 |
| --- | --- | --- |
| 반응형 내비게이션 | 화면 크기에 따라 데스크톱 메뉴와 모바일 토글 메뉴 제공 | DOM 이벤트, CSS Media Query |
| 첫 방문 인트로 | 순차 문구 애니메이션과 클릭 후 패널 전환 | CSS Keyframes, JavaScript, Session Storage |
| 프로젝트 모달 | 프로젝트별 영상, 역할, 작업 내용과 기술 스택 표시 | JavaScript 객체 데이터, `<video>`, 모달 UI |
| 나의 이야기 | 개발을 배우게 된 과정과 앞으로의 목표를 타임라인으로 소개 | HTML, CSS Grid |
| 요즘의 관심사 | 학습 내용, 성격, 취미와 목표를 카드로 소개 | HTML, CSS Grid |
| 스크롤 타임라인 | 현재 보고 있는 성장 단계를 감지해 진행선과 카드를 활성화 | Intersection Observer, CSS 변수 |
| 반응형 3D 카드 | 마우스 위치에 따라 관심사 카드의 기울기와 빛 효과 변경 | Pointer Event, requestAnimationFrame, 3D Transform |
| 섹션 테마 | 현재 섹션에 따라 헤더 진행선과 포인트 컬러 변경 | Intersection Observer, data 속성, CSS 변수 |
| 실시간 상태 | 프로필 카드에 현재 한국 시각 표시 | Intl.DateTimeFormat |
| 대화 질문 | 개발 준비생들이 대화를 시작할 수 있는 랜덤 질문 제공 | DOM 이벤트, Web Animations API |
| 방명록 | 메시지 작성·수정·삭제 및 페이지네이션 | Supabase RPC, DOM 렌더링 |
| 방문 횟수 | 현재 브라우저의 방문 횟수 표시 | Local Storage |

## 기술별 구현 내용

### HTML

| 적용 영역 | 사용 요소 | 적용 내용 | 관련 파일 |
| --- | --- | --- | --- |
| 전체 페이지 | `header`, `nav`, `main`, `section`, `footer` | 각 콘텐츠 영역을 시맨틱 태그로 구분하고 한 페이지 내 탐색 구성 | `index.html` |
| 첫 방문 인트로 | `role="dialog"`, `h1`, `button` | 순차 문구, 건너뛰기와 본문 진입 버튼 구성 | `index.html` |
| 프로필·About | `aside`, `article`, `dl` | 프로필 카드, 자기소개와 관심 분야를 구조화해 표시 | `index.html` |
| 프로젝트 | `article`, `video` | 프로젝트 목록과 상세 소개 영상을 모달 내부에 구성 | `index.html` |
| My Story | `section`, `ol`, `li`, `blockquote` | 개발을 배우게 된 과정과 가치관을 타임라인으로 구성 | `index.html` |
| Now & Interests | `section`, `article` | 현재 학습, 성격, 일상과 목표를 카드로 구성 | `index.html` |
| 방명록 | `form`, `input`, `textarea`, `nav` | 메시지 작성 폼, 목록과 페이지네이션 구성 | `index.html` |
| 모달·동적 영역 | `aria-modal`, `aria-live`, label·pattern | 모달, 토스트와 입력 폼의 접근성 및 기본 검증 보완 | `index.html` |

### CSS

| 적용 영역 | 사용 기술 | 적용 내용 | 관련 파일 |
| --- | --- | --- | --- |
| 전체 페이지 | CSS 변수 | 색상, 배경, 테두리와 간격을 일관된 디자인 체계로 관리 | `style.css` |
| 첫 방문 인트로 | Keyframes·Clip Path·Transform | 문구 순차 등장과 좌우 패널 열림 애니메이션 구현 | `style.css` |
| 프로필·About | Grid·Flexbox | 히어로와 프로필 카드, Bento Grid 레이아웃 구성 | `style.css` |
| 프로젝트 | Flexbox·상태 스타일 | 프로젝트 목록과 hover 상태, 상세 모달 레이아웃 구성 | `style.css` |
| My Story | Grid·타임라인 | 소개 문구와 성장 과정을 좌우 레이아웃으로 구성 | `style.css` |
| Now & Interests | 반응형 Grid | 학습, 성격, 일상과 목표 카드를 화면 크기에 맞게 배치 | `style.css` |
| My Story | CSS 변수·Transition | 스크롤 진행률에 따라 타임라인 선과 카드 상태 표현 | `style.css` |
| Now & Interests | 3D Transform·Radial Gradient | 마우스를 따라 움직이는 카드 기울기와 빛 효과 표현 | `style.css` |
| 전체 페이지 | 동적 CSS 변수 | 현재 섹션에 따라 포인트 색상과 헤더 진행선 변경 | `style.css` |
| 방명록 | Grid·Form 스타일 | 작성 폼, 방문 횟수, 메시지 카드와 페이지 버튼 구성 | `style.css` |
| 전체 페이지 | Media Query | 모바일 메뉴와 화면 너비에 따른 단일 열 레이아웃 적용 | `style.css` |
| 전체 페이지 | `prefers-reduced-motion` | 모션 감소 설정과 터치 기기에서 불필요한 효과 비활성화 | `style.css` |
| 모달·토스트 | 고정 위치·애니메이션 | 오버레이, 열림 상태, 알림 표시와 입력 상태 표현 | `style.css` |

### JavaScript

| 적용 영역 | 구현 기능 | 적용 내용 | 관련 파일 |
| --- | --- | --- | --- |
| 프로젝트 | 객체 데이터·DOM 조작 | 선택한 프로젝트의 역할, 작업, 기술과 영상을 모달에 렌더링 | `profile.js` |
| 첫 방문 인트로 | Session Storage·DOM 이벤트 | 최초 표시 여부, 버튼 활성화, 건너뛰기와 다시 보기 처리 | `profile.js` |
| 프로젝트 모달 | 이벤트·포커스 관리 | 열기·닫기, Escape 처리와 Tab 포커스 순환 제공 | `profile.js` |
| My Story | Intersection Observer | 화면에 들어온 타임라인 카드와 현재 단계를 순차적으로 활성화 | `profile.js` |
| 전체 페이지 | 스크롤 진행률·Intersection Observer | 헤더 진행선, 현재 메뉴와 섹션별 포인트 색상 갱신 | `profile.js` |
| Now & Interests | Pointer Event·requestAnimationFrame | 마우스 좌표를 계산해 카드 3D 기울기와 빛 위치 갱신 | `profile.js` |
| 프로필 | Intl.DateTimeFormat | Asia/Seoul 기준 현재 시각을 30초마다 갱신 | `profile.js` |
| 방명록 | Web Animations API | 버튼을 누를 때 개발 대화 질문을 애니메이션과 함께 변경 | `profile.js` |
| 방명록 | Supabase·페이지네이션 | 메시지 작성·수정·삭제, 목록 조회와 페이지 이동 | `profile.js`, `supabase-schema.sql` |
| 방문 횟수 | Local Storage | 현재 브라우저의 방문 횟수 저장 및 표시 | `profile.js` |
| 전체 페이지 | DOM 이벤트 | 모바일 메뉴, 맨 위 이동, 토스트와 반응형 동작 처리 | `profile.js` |

## Supabase 연동

`supabase-config.js`의 설정을 이용해 배포된 Supabase 프로젝트에 연결합니다. 방명록 기능은 네트워크 연결이 필요합니다.

주요 데이터베이스 함수와 테이블 정의는 [`supabase-schema.sql`](supabase-schema.sql)에서 확인할 수 있습니다.

## 폴더 구조

```text
profile-portfolio/
├── assets/
│   └── videos/               # 프로젝트 소개 영상
├── docs/
│   └── images/               # README 화면 이미지
├── index.html                # 전체 페이지 구조
├── profile.js                # 화면 동작 및 외부 API 연동
├── style.css                 # 반응형 스타일
├── supabase-config.js        # Supabase 연결 설정
└── supabase-schema.sql       # 테이블 및 RPC 정의
```

## 실행 방법

### 배포 사이트

별도의 설치 없이 아래 주소로 접속하면 바로 확인할 수 있습니다.

<https://d3j0t61n2e0cz0.cloudfront.net/>

### 로컬 실행

프로젝트 루트에서 로컬 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 다음 주소로 접속합니다.

```text
http://localhost:8000/practice/profile-portfolio/index.html
```

간단히 화면만 확인할 경우 [`index.html`](index.html)을 브라우저에서 직접 실행할 수도 있습니다.
