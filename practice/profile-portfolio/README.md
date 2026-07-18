# JIWON — Personal Blog Portfolio

김지원이라는 사람의 성격, 관심사, 학습 과정과 일상을 프로젝트 경험과 함께 보여주는 개인 블로그형 포트폴리오입니다. 개발 이야기만 나열하기보다 방문자가 여러 콘텐츠를 직접 눌러보며 알아갈 수 있도록 인터랙티브한 한 페이지 사이트로 구성했습니다.

## 배포 사이트

<https://d3j0t61n2e0cz0.cloudfront.net/>

## 실행 결과

> 아래 이미지는 최종 화면을 캡처한 후 `docs/images/`의 같은 파일명으로 교체하면 됩니다.

### 첫 방문 인트로

![첫 방문 인트로](docs/images/intro.png)

- 환영 문구와 `DAILY / STUDY / STORY`가 순차적으로 나타납니다.
- `ENTER MY BLOG` 버튼으로 본문에 진입하고 `REPLAY INTRO`로 다시 볼 수 있습니다.
- 같은 브라우저 탭에서는 한 번만 자동 재생되며 Skip, Enter, Escape 키를 지원합니다.

### 메인 프로필

![메인 프로필](docs/images/home.png)

- 프로필 사진과 간단한 소개, 현재 상태와 관심사를 보여줍니다.
- GitHub 링크와 주요 콘텐츠로 이동하는 버튼을 제공합니다.

### About

![About 탭](docs/images/story.png)

- `나에 대해`, `공부`, `기록`, `취미`, `소통` 항목을 탭으로 탐색합니다.
- 선택한 항목에 따라 설명, 세부 카드와 키워드가 동적으로 바뀝니다.

### 프로젝트 경험

- Mung-Shall, Z-invest, LUMEN 프로젝트를 소개합니다.
- 카드를 선택하면 역할, 핵심 작업, 기술 스택과 소개 영상이 모달에 표시됩니다.
- 각 프로젝트의 GitHub 저장소로 이동할 수 있습니다.

### Daily Log

![Daily Log](docs/images/log.png)

- 월별 캘린더에서 공개된 하루 기록을 날짜별로 확인합니다.
- 제목, 태그, 기분과 메모를 기록하고 최근 기록 3개와 월별 기록 수를 표시합니다.
- 기록 저장과 삭제는 공용 다이얼로그에서 관리자 비밀번호를 확인한 후 Supabase RPC로 처리합니다.

### Now & Interests

![Now & Interests](docs/images/now.png)

- 현재 배우는 내용, 성격, 취미, 목표와 소통 방식을 카드로 소개합니다.
- 마우스 위치에 따라 카드가 기울고 빛이 움직이는 3D 효과를 적용했습니다.

### Guestbook

![방명록](docs/images/guestbook.png)

- 아이디와 비밀번호로 방문 기록을 작성하고 글마다 댓글을 남길 수 있습니다.
- 방문 기록은 한 페이지에 6개씩 표시됩니다.
- 작성자 인증 후 글을 수정·삭제하거나 댓글을 삭제할 수 있습니다.
- 마지막으로 사용한 아이디를 Local Storage에 기억해 다음 입력에 활용합니다.

## 화면 구성

| 영역 | 주요 내용 | 핵심 인터랙션 |
| --- | --- | --- |
| Intro | 개인 블로그 환영 문구 | 순차 애니메이션, Skip, 다시 보기 |
| Hero | 프로필과 블로그 소개 | 섹션 이동, GitHub 링크 |
| About | 성격, 공부, 기록, 취미, 소통 | 탭 콘텐츠 전환 |
| Projects | 세 가지 프로젝트 경험 | 상세 모달, 영상 재생 |
| Daily Log | 날짜별 일상과 학습 기록 | 월 이동, 날짜 선택, 관리자 저장·삭제 |
| Now & Interests | 현재 관심사와 목표 | 포인터 기반 3D 카드 |
| Guestbook | 방문 기록과 댓글 | CRUD, 페이지네이션, 공용 인증 모달 |

## 주요 기능과 구현 방식

| 기능 | 설명 | 구현 방식 |
| --- | --- | --- |
| 첫 방문 인트로 | 문구 순차 등장, 본문 진입과 다시 보기 | CSS Keyframes, Session Storage, `inert` |
| About 탭 | 선택한 주제의 소개와 키워드 렌더링 | JavaScript 객체, DOM 조작, ARIA Tab |
| 프로젝트 상세 | 프로젝트별 설명, 기술과 영상 표시 | `<dialog>`, `<video>`, 포커스 트랩 |
| Daily Log | 공개 기록 조회 및 관리자 저장·삭제 | Supabase, RPC, Calendar Rendering |
| Now 카드 | 포인터 위치에 따른 기울기와 빛 효과 | Pointer Events, `requestAnimationFrame`, CSS 변수 |
| 섹션 감지 | 현재 위치에 따른 메뉴와 진행선 변경 | Intersection Observer |
| 대화 질문 | 방명록 위의 질문을 무작위로 전환 | Web Animations API |
| 방명록 | 글 작성·수정·삭제와 페이지네이션 | Supabase RPC, DOM 렌더링 |
| 댓글 | 방명록별 댓글 작성과 삭제 | Supabase RPC |
| 공용 관리 창 | 글과 기록 관리에 필요한 정보 입력 | `<dialog>`, Promise 기반 제어 |
| 테마 | 기본·다크·컬러 모드 전환과 상태 유지 | `data-theme`, CSS 변수, Local Storage |
| 접근성 | 키보드 조작, 상태 안내와 모션 감소 | ARIA, 포커스 관리, `prefers-reduced-motion` |

## 기술별 구현 내용

### HTML

| 적용 영역 | 사용 요소 | 구현 내용 |
| --- | --- | --- |
| 전체 | `header`, `nav`, `main`, `section`, `footer` | 한 페이지 콘텐츠를 의미에 따라 구분 |
| 인트로 | `role="dialog"`, `button`, `h1` | 환영 화면과 본문 진입 구조 구성 |
| 프로필 | `aside`, `dl`, `img` | 프로필 사진과 요약 정보 구성 |
| About | `role="tablist"`, `role="tab"`, `article` | 키보드와 보조 기술을 고려한 탭 UI |
| Projects | `article`, `dialog`, `video` | 프로젝트 카드와 상세 영상 모달 |
| Daily Log | `form`, `select`, `textarea` | 날짜별 기록 입력과 관리 폼 |
| Guestbook | `form`, `input`, `textarea`, `nav` | 방명록, 댓글과 페이지네이션 |
| 공용 관리 창 | `dialog`, `form` | 관리자 및 작성자 인증 입력 |

### CSS

| 적용 영역 | 사용 기술 | 구현 내용 |
| --- | --- | --- |
| 디자인 시스템 | CSS 변수 | 색상, 선, 간격과 테마 기준 관리 |
| 전체 레이아웃 | Grid, Flexbox | 프로필, 탭, 캘린더, 카드와 방명록 배치 |
| 인트로 | Keyframes, Clip Path, Transform | 문구 등장과 화면 진입 애니메이션 |
| 프로젝트·관리 창 | Fixed Overlay, Backdrop | 페이지 흐름과 분리된 모달 구성 |
| Now 카드 | 3D Transform, Radial Gradient | 포인터에 반응하는 기울기와 빛 효과 |
| 반응형 | Media Query | 모바일 메뉴와 화면별 단일 열 레이아웃 |
| 접근성 | `focus-visible`, `prefers-reduced-motion` | 키보드 포커스 표시와 모션 최소화 |
| 테마 | Attribute Selector | `data-theme` 값에 따른 다크·컬러 모드 적용 |

### JavaScript

| 적용 영역 | 구현 기능 | 구현 내용 |
| --- | --- | --- |
| 인트로 | 재생 상태와 접근 제어 | Session Storage, `inert`, 키보드 이벤트 |
| About | 탭 전환 | 소개 데이터와 키워드 동적 렌더링 |
| Projects | 상세 모달 | 데이터 주입, 영상 제어, Escape와 Tab 순환 |
| Daily Log | 캘린더와 CRUD | 월 이동, 날짜 선택, Supabase 조회와 RPC 관리 |
| Guestbook | 글과 댓글 | 조회, 작성, 수정, 삭제와 페이지네이션 |
| 관리 창 | Promise 기반 Dialog | 여러 관리 기능에서 하나의 입력 창 재사용 |
| 테마 | 모드 상태 저장 | `data-theme` 전환과 Local Storage 저장 |
| 전체 | 스크롤과 메뉴 | 진행선, 현재 섹션, 모바일 메뉴와 상단 이동 |
| Now 카드 | 포인터 인터랙션 | 좌표를 계산해 3D 회전용 CSS 변수 갱신 |

## Supabase 연동

Daily Log와 방명록은 이미 연결된 Supabase 프로젝트를 사용합니다. 방문자가 별도의 프로젝트 설정을 할 필요는 없으며, 연동 기능 사용 시 인터넷 연결이 필요합니다.

| 데이터·함수 | 역할 |
| --- | --- |
| `players` | 방명록 작성자 아이디와 비밀번호 해시 관리 |
| `guestbook` | 방문 기록 저장 |
| `guestbook_comments` | 방문 기록별 댓글 저장 |
| `daily_logs` | 날짜별 공개 기록 저장 |
| `blog_admin` | Daily Log 관리 권한 확인 |
| `add_guestbook` | 방문 기록 작성 |
| `update_guestbook`, `delete_guestbook` | 작성자 확인 후 글 수정·삭제 |
| `add_guestbook_comment`, `delete_guestbook_comment` | 댓글 작성·삭제 |
| `upsert_daily_log`, `delete_daily_log` | 관리자 확인 후 기록 저장·삭제 |

테이블, RLS 정책과 RPC 함수 정의는 [`supabase-schema.sql`](supabase-schema.sql)에 있습니다. 프론트엔드에 포함된 publishable key는 공개 클라이언트용 키이며, 데이터 변경 권한은 RLS 정책과 RPC 함수에서 제한합니다.

## 폴더 구조

```text
profile-portfolio/
├── assets/
│   └── videos/              # 프로젝트별 소개 영상
├── docs/
│   └── images/              # README 실행 화면 캡처
├── index.html               # 전체 페이지 구조
├── profile.jpg              # 프로필 이미지
├── profile.js               # 화면 동작과 Supabase 연동
├── style.css                # 반응형 레이아웃, 테마와 애니메이션
├── supabase-config.js        # 연결된 Supabase 클라이언트 설정
└── supabase-schema.sql       # 테이블, RLS 정책과 RPC 함수
```

## 실행 방법

### 배포 사이트

<https://d3j0t61n2e0cz0.cloudfront.net/>

### 로컬 실행

저장소 루트에서 로컬 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:8000/practice/profile-portfolio/index.html
```

정적 화면은 `index.html`을 직접 열어 확인할 수도 있습니다. Google Fonts, 프로젝트 링크, Daily Log와 방명록 등 네트워크 기반 기능은 인터넷 연결이 필요합니다.

## 결과물 자기평가

일반적인 이력서형 포트폴리오보다 개인 블로그에 가까운 구성을 선택해 프로젝트뿐 아니라 성격, 관심사와 하루의 기록을 함께 보여주고자 했습니다. 첫 방문 인트로, 탭형 소개, 영상 모달, 캘린더, 3D 카드와 방명록을 각기 다른 인터랙션으로 구현해 방문자가 직접 탐색하는 재미를 더했습니다.

Supabase를 활용해 여러 방문자가 같은 Daily Log와 방명록 데이터를 볼 수 있도록 했고, 데이터 변경은 RLS와 RPC 함수로 제어했습니다. 또한 키보드 조작, 포커스 이동, ARIA 속성과 모션 감소 설정을 적용해 시각 효과뿐 아니라 사용성도 고려했습니다.

현재 여러 기능이 하나의 JavaScript 파일에 모여 있어 기능이 더 늘어나면 관리가 어려워질 수 있습니다. 이후에는 인트로, 프로젝트, Daily Log, 방명록과 테마 기능을 모듈별로 분리해 유지보수성을 높일 수 있습니다.
