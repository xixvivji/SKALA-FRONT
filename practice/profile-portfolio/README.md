# JIWON — Personal Blog Portfolio

김지원의 개인 블로그 느낌으로 구성한 프로필 포트폴리오입니다. 백엔드와 인프라를 공부하는 과정, 프로젝트 경험, 하루 기록과 방명록을 한 페이지에서 볼 수 있도록 만들었습니다.

## 배포 링크

<https://d3j0t61n2e0cz0.cloudfront.net/>

## 주요 화면

### 첫 방문 인트로

- `안녕하세요, 김지원입니다. 제 개인 블로그에 오신 것을 환영합니다.` 문구가 순서대로 나타납니다.
- `ENTER MY BLOG` 버튼을 누르면 본문으로 진입합니다.
- 같은 브라우저 탭에서는 한 번만 자동 실행되며, `REPLAY INTRO` 버튼으로 다시 볼 수 있습니다.
- `SKIP`, Enter, Escape 키와 `prefers-reduced-motion` 환경을 고려했습니다.

### 메인 프로필

- `김지원의 개인 공간입니다.`를 중심 문구로 사용합니다.
- 프로필 사진, 현재 상태, 기록 주제, 관심사를 카드 형태로 보여줍니다.
- GitHub 프로필 링크와 주요 섹션 이동 버튼을 제공합니다.

### About

- `나에 대해`, `공부`, `기록`, `취미`, `소통` 항목을 탭처럼 선택할 수 있습니다.
- 선택한 항목에 따라 소개 문구, 세부 카드, 키워드 칩이 동적으로 바뀝니다.
- 취미에는 산책과 다른 사람 GitHub 구경을 포함했습니다.

### 프로젝트 경험

- Mung-Shall, Z멋대로, LUMEN 프로젝트를 목록으로 소개합니다.
- 프로젝트를 클릭하면 역할, 핵심 작업, 기술 스택, 소개 영상이 모달로 표시됩니다.
- 각 프로젝트의 GitHub 저장소로 이동할 수 있습니다.

### Daily Log

- 날짜별 기록 캘린더에서 하루 일과와 생각을 남길 수 있습니다.
- 날짜를 선택해 하루 제목, 태그, 기분, 메모를 저장할 수 있습니다.
- 기록은 `localStorage`에 저장되며, 최근 기록 3개와 월별 기록 수를 표시합니다.

### Now & Interests

- 현재 학습 중인 기술, 성격, 취미, 다음 목표를 카드로 정리했습니다.
- 카드에는 마우스 위치에 따라 기울기와 빛 효과가 적용됩니다.
- 모바일과 터치 환경에서는 과한 효과를 줄였습니다.

### Guestbook

- 아이디와 비밀번호로 방문 기록을 남길 수 있습니다.
- 한 번 입력한 아이디는 `localStorage`에 저장되어 다음 작성 때 자동 입력됩니다.
- 방문 기록은 한 페이지에 6개씩 표시됩니다.
- 각 방문 기록에 댓글을 달 수 있습니다.
- 방문 기록 수정/삭제, 댓글 삭제는 브라우저 `prompt`가 아니라 `<dialog>` 모달로 처리합니다.
- 방문 기록 수를 `VISITOR NOTES`로 표시합니다.

### Dark Mode

- `prefers-color-scheme: dark`를 사용해 운영체제 또는 브라우저가 다크모드일 때 자동으로 어두운 테마가 적용됩니다.
- `DARK MODE` 버튼으로 사용자가 직접 다크모드를 켤 수 있고, `AUTO MODE`로 기기 설정을 따르는 상태로 돌아갈 수 있습니다.
- 직접 선택한 모드는 `localStorage`에 저장되어 다음 방문 때도 유지됩니다.

### Color Mode

- `COLOR MODE` 버튼을 누르면 생생한 색채 팔레트가 적용됩니다.
- 기본 레이아웃은 유지하고, 히어로 배경, 버튼, 카드, 선택 상태의 포인트 컬러만 더 선명하게 바꿉니다.
- 선택한 모드는 `localStorage`에 저장되어 다음 방문 때도 유지됩니다.

## 주요 기능

| 기능 | 설명 | 구현 방식 |
| --- | --- | --- |
| 반응형 내비게이션 | 데스크톱 메뉴와 모바일 햄버거 메뉴 제공 | DOM 이벤트, CSS Media Query |
| 첫 방문 인트로 | 문구 순차 등장, 진입 애니메이션, 다시 보기 | CSS Keyframes, Session Storage |
| About 탭 | 항목 선택 시 소개 카드와 키워드 동적 렌더링 | JavaScript 객체 데이터, DOM 조작 |
| 프로젝트 상세 모달 | 프로젝트별 역할, 작업, 기술 스택, 영상 표시 | `<video>`, 모달 UI, 포커스 관리 |
| Daily Log | 날짜별 하루 기록 저장, 삭제, 최근 기록 표시 | Local Storage, Calendar Rendering |
| Now 카드 효과 | 마우스 위치에 따른 카드 기울기와 빛 효과 | Pointer Event, requestAnimationFrame |
| 섹션 진행 표시 | 현재 섹션에 따라 헤더 진행선과 포인트 컬러 변경 | Intersection Observer, CSS 변수 |
| 대화 질문 | 방명록 작성 전 랜덤 질문 제공 | DOM 이벤트, Web Animations API |
| 방명록 | 방문 기록 작성, 수정, 삭제, 페이지네이션 | Supabase RPC, DOM 렌더링 |
| 댓글 | 방문 기록별 댓글 작성과 삭제 | Supabase RPC |
| 아이디 자동 기억 | 방명록/댓글 작성 시 마지막 아이디 자동 입력 | Local Storage |
| 관리 모달 | 수정/삭제 비밀번호 입력을 사이트 내부 모달로 처리 | `<dialog>`, Promise 기반 JS |
| 다크모드 | 사용자 기기 설정 또는 버튼으로 어두운 테마 적용 | `prefers-color-scheme`, `data-theme`, Local Storage |
| 컬러풀 모드 | 생생한 색채 팔레트로 포인트 테마 전환 | `data-theme`, Local Storage |

## 기술별 구현 내용

### HTML

| 적용 영역 | 사용 요소 | 내용 |
| --- | --- | --- |
| 전체 구조 | `header`, `nav`, `main`, `section`, `footer` | 한 페이지 안에서 섹션별 콘텐츠를 시맨틱하게 구성 |
| 첫 방문 인트로 | `role="dialog"`, `button`, `h1` | 인트로 화면과 본문 진입 버튼 구성 |
| 프로필 | `aside`, `dl`, `img` | 프로필 사진과 간단한 소개 정보를 카드로 구성 |
| About | `role="tablist"`, `role="tab"`, `article` | 소개 항목 전환 UI 구성 |
| 프로젝트 | `article`, `video`, `aria-modal` | 프로젝트 목록과 상세 모달 구성 |
| Daily Log | `form`, `select`, `textarea` | 날짜별 기록 작성 폼 구성 |
| Guestbook | `form`, `input`, `textarea`, `nav` | 방문 기록 작성, 댓글 입력, 페이지네이션 구성 |
| 관리 모달 | `dialog`, `form` | 수정/삭제 비밀번호 입력 모달 구성 |

### CSS

| 적용 영역 | 사용 기술 | 내용 |
| --- | --- | --- |
| 디자인 시스템 | CSS 변수 | 색상, 선, 폰트, 간격 기준 관리 |
| 레이아웃 | Grid, Flexbox | 히어로, About, Daily Log, 방명록 레이아웃 구성 |
| 인트로 | Keyframes, Clip Path, Transform | 첫 방문 문구와 패널 전환 애니메이션 구현 |
| 프로젝트/방명록 모달 | Fixed Overlay, Backdrop, Focus 상태 | 모달과 입력 상태를 사이트 톤에 맞게 스타일링 |
| 카드 효과 | 3D Transform, Radial Gradient | Now 카드의 기울기와 빛 효과 구현 |
| 반응형 | Media Query | 모바일 내비게이션과 단일 열 레이아웃 적용 |
| 접근성 설정 | `prefers-reduced-motion` | 모션 감소 환경에서 애니메이션 최소화 |
| 다크모드 | `prefers-color-scheme`, Attribute Selector | OS/브라우저 설정 또는 `html[data-theme="dark"]` 상태에 맞춰 색상 변경 |
| 컬러풀 모드 | Attribute Selector | `html[data-theme="vivid"]` 상태에서 생생한 포인트 팔레트 적용 |

### JavaScript

| 적용 영역 | 구현 기능 | 내용 |
| --- | --- | --- |
| 프로젝트 | 데이터 렌더링 | 프로젝트 객체 데이터를 모달에 주입 |
| 프로젝트 모달 | 열기/닫기, Escape, Tab 순환 | 키보드 사용성을 고려한 모달 제어 |
| About | 탭 전환 | 선택한 항목의 제목, 설명, 카드, 태그 렌더링 |
| Daily Log | 캘린더 렌더링 | 월 이동, 날짜 선택, 기록 저장/삭제, 최근 기록 표시 |
| Guestbook | 목록 렌더링 | Supabase에서 방문 기록과 댓글을 조회해 렌더링 |
| Guestbook | 작성/수정/삭제 | RPC 함수로 권한 확인 후 데이터 변경 |
| Guestbook | 댓글 | 댓글 작성과 삭제 처리 |
| Guestbook | 아이디 기억 | 마지막 작성 아이디를 `localStorage`에 저장하고 자동 입력 |
| 관리 모달 | Promise 기반 `<dialog>` 제어 | 수정/삭제 액션에서 공용 모달을 열고 결과를 받아 처리 |
| 테마 모드 | 테마 상태 저장 | `DARK MODE`, `AUTO MODE`, `COLOR MODE` 버튼으로 `data-theme`를 바꾸고 `localStorage`에 저장 |
| 전체 페이지 | 스크롤/메뉴 | 섹션 감지, 헤더 진행선, 현재 메뉴 표시, 맨 위 이동 |
| Now 카드 | 포인터 인터랙션 | 카드별 마우스 좌표 계산 후 CSS 변수 갱신 |

## Supabase 연동

방명록과 댓글은 Supabase와 연결되어 동작합니다.

- `players`: 아이디와 비밀번호 해시 관리
- `guestbook`: 방문 기록 저장
- `guestbook_comments`: 방문 기록별 댓글 저장
- `add_guestbook`: 방문 기록 작성
- `update_guestbook`: 방문 기록 수정
- `delete_guestbook`: 방문 기록 삭제
- `add_guestbook_comment`: 댓글 작성
- `delete_guestbook_comment`: 댓글 삭제

테이블과 RPC 정의는 [`supabase-schema.sql`](supabase-schema.sql)에 있습니다.

> `supabase-config.js`에는 Supabase 프로젝트 URL과 publishable key가 필요합니다. 방명록과 댓글 기능은 네트워크 연결이 있어야 동작합니다.

## 폴더 구조

```text
profile-portfolio/
├── index.html                # 페이지 구조
├── profile.jpg               # 프로필 이미지
├── profile.js                # 화면 동작, 모달, Supabase 연동
├── style.css                 # 반응형 스타일과 다크모드
├── supabase-config.js        # Supabase 연결 설정
└── supabase-schema.sql       # 테이블 및 RPC 정의
```

## 실행 방법

### 배포 사이트

<https://d3j0t61n2e0cz0.cloudfront.net/>

### 로컬 실행

프로젝트 루트에서 로컬 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:8000/practice/profile-portfolio/index.html
```

정적 화면만 확인할 경우 [`index.html`](index.html)을 브라우저에서 직접 열어도 됩니다. 다만 Supabase 방명록 기능은 네트워크와 설정 파일이 필요합니다.
