# 디자인 시안

템플릿 확정 전 비교용 시안. 모든 시안은 **같은 플레이스홀더 내용**(홍길동 / 예시 테크 등)을 쓰되 레이아웃에 맞게 표현만 일부 조정했고, 빌드 없는 단일 HTML 파일이다.
`index.html`에서 한눈에 비교할 수 있고, `screenshots/`에 데스크톱(1440)·모바일(390) 캡처가 있다.

| 시안 | 방향 | 핵심 디테일 |
| --- | --- | --- |
| **A. Editorial** `a-editorial.html` | 따뜻한 종이색, Instrument Serif 대형 이름, 비대칭 2단 | 스티키 섹션 라벨, 좌표가 들어간 상단 바, 첫 글자 액센트, 지표 사이 `→` 액센트, 콜로폰 푸터 |
| **B. Swiss Grid** `b-swiss-grid.html` | 흰 바탕·검정·인터내셔널 오렌지, 12컬럼 그리드 | 스펙시트형 헤더, 경력별 대형 지표(−78%, 3×), 프로젝트 테이블 호버, 크롭 마크, `G` 키 그리드 오버레이 |
| **C. Mono Dark** `c-mono-dark.html` | 다크, JetBrains Mono, Android 그린 포인트 | 커밋 그래프형 타임라인, 스크롤 스파이 목차, `open to work` 펄스, `key: value` 기술 스택, 인쇄 시 라이트 전환 |
| **D. Soft Bento** `d-soft-bento.html` | 부드러운 카드, 벤토 헤더, 블루 포인트 | 백엔드/안드로이드 경력 비율 바, 회사 이니셜 타일, 카드 호버 리프트, `prefers-color-scheme` 다크 모드 |
| **E. Compact Column** `e-compact-column.html` | 680px 단일 컬럼, 15px, 명도만으로 위계 | 호버 시 형제 항목 디밍, 좌→우로 차오르는 밑줄, 순차 페이드 인, 서울 실시간 시계 |
| **F. Telemetry** `f-telemetry.html` | 레퍼런스 재해석 — 계기판 히어로, 와이드 디스플레이, 라이트/다크 토글 | 요청 흐름 애니메이션(클릭 전송, 1–3 키로 REST/gRPC/Kafka), 타자 효과 태그라인, 뷰파인더 호버, 코드로 그린 프로젝트 썸네일, 반전 컨택트 패널 |
| **G. Spec Sheet** `g-spec-sheet.html` | F의 시각 언어 + 정적 히어로, 이력서 중심 | 지표 스트립(코너 브래킷), 스티키 섹션 라벨, 뷰파인더 호버, 인쇄 친화적 밀도 |

## Round 2 — 레퍼런스 차용 방식

레퍼런스: <https://heavyrain39.github.io/portfolio/> (Next.js · SUIT / Syne / Share Tech Mono · `#F5F5F0`/`#1A1A1A` · 붉은 포인트)

그대로 가져오지 않은 것: 폰트 조합, 정확한 색 값, 슈팅 게임 히어로, 한자 병기 이름, 점 두 개가 찍힌 다크 패널, 95vh 랜딩 구조.

| 레퍼런스 요소 | 재해석 | 적용 |
| --- | --- | --- |
| 게임 HUD (MODE / HEAT / TARGETS TERMINATED) | 백엔드 텔레메트리 판독 (PROTOCOL / LOAD / LATENCY p99 / REQUESTS OK) | F 히어로 |
| 과녁을 쏘는 인터랙션 | Android → Gateway → Server 요청 패킷 왕복, 클릭하면 전송 | F 히어로 |
| MODE 전환 (DUAL / QUAD) | 프로토콜 전환 REST / gRPC / Kafka (속도·응답 여부·지연 값이 달라짐) | F 히어로 |
| 흐린 좌표 표기 | 좌표 + AWS 리전 `ap-northeast-2` + UTC+09 | F, G 헤더 |
| `PORTFOLIO.2026 ■■■■` | `RESUME / BUILD 2026.09.26` + 빌드 진행 틱 | F 상단 바 |
| 한글 이름 + 흐린 한자 | 한글 이름 + 흐린 와이드 라틴 이름 | F, G |
| ENG / KOR 텍스트 토글 | LIGHT / DARK 테마 토글 (localStorage 유지) | F, G |
| Syne 헤딩 + 위첨자 `+` | Archivo 와이드(125%) 헤딩 + 위첨자 항목 개수 `03` | F, G |
| 우측 흐린 섹션 메타 (`TOTAL 17 …`) | `5.8 YRS — BACKEND 3.6 / ANDROID 2.2` | F, G |
| 모노 대문자 태그 | Martian Mono 87.5% 폭, 대문자 태그 | F, G |
| 호버 시 카드 주변 그리드 선 | 호버 시 뷰파인더 코너 브래킷 | F, G |
| 은은한 선 그리드 배경 | 점 그리드, 아래로 갈수록 마스크로 사라짐 | F, G |
| 프로젝트 스크린샷 썸네일 | 코드로 그린 추상 썸네일 (토큰 버킷 / 노트 동기화 / 배포 상태 그리드) | F |
| 둥근 반전 프로필 패널 | 둥근 반전 컨택트 패널 + 상태 줄 ("요청(REQ)을 보내주세요, 응답(RES)하겠습니다") | F, G |
| 타자 효과 + 커서 | 태그라인을 한 번만 타이핑 후 초록 블록 커서 (G는 커서만 몇 번 깜빡임) | F, G |
| 미세한 붉은 포인트 | Android 그린 (`#17A35B` / 다크 `#3DDC84`) — 점·패킷·카운터에만 | F, G |

## 공통 기본기

- 한글 `word-break: keep-all`, 날짜·수치 `tabular-nums`, 헤드라인 `text-wrap: balance/pretty`
- 보조 텍스트도 WCAG AA 대비 유지, 액센트 색은 시안당 하나
- `::selection`, `:focus-visible`, 외부 링크 `↗` 마이크로 인터랙션
- `@media print` A4 대응 (항목 단위 `break-inside: avoid`)
- 폰트: Pretendard(본문), JetBrains Mono(A·C 메타), Instrument Serif(A 디스플레이) — CDN 로드

## 스크린샷 다시 찍기

Playwright(캐시된 chromium-1148과 맞는 1.49.x)로 `document.fonts.ready` 이후 전체 페이지를 캡처했다.

## Round 3 — F 확정 · 실제 내용 적용 (2026-09-26)

`f-telemetry.html`에 `resume-demo.html` + mooner.dev 내용을 적용. 이전 플레이스홀더 버전은 `archive/f-telemetry-v1-placeholder.html`.

| 출처 | 채용한 요소 | F에서의 형태 |
| --- | --- | --- |
| resume-demo | KO / EN 병기 | 상단 KO/EN 토글 (localStorage 유지, 타자 효과도 언어별로) |
| resume-demo | 섹션별 셸 명령 (`git log --author=mooner` 등) | 섹션 제목 위 한 줄 프롬프트 |
| resume-demo | 다이아몬드 노드 타임라인 | 경력 타임라인 — 진행 중 항목은 초록 채움, 계기판 CACHE 노드와 같은 모양 |
| resume-demo | 호버 시 프로젝트 스펙 프리뷰 | 코너 브래킷 패널 + 코드로 그린 썸네일 + ARCH/SEARCH… 스펙 |
| resume-demo | `tail -f now.log` | Now 섹션 (업데이트 날짜 + 펄스) |
| resume-demo | 독학 연표 2016→2019 | 학력의 다이아몬드 여정 트랙 |
| resume-demo | 연락처 문구 · `─▸` · "crafted with monospace affection" | 컨택트 패널 문구·링크·푸터 |
| mooner.dev | 지표 (8+ yrs, ★57, 46.3K+) | 히어로 TRACK 줄 |
| mooner.dev | GitHub 저장소 목록 | More on GitHub 6개 |
| mooner.dev | Discord "click to copy" | 이메일 복사 버튼 |
| (재해석) | 계기판 프로토콜 | REST / SSE / Cache — Redis 캐시(한강), SSE(AGORA) 등 실제 스택 반영 |

## Round 4 — 첫 화면 덜어내기 (2026-09-26)

피드백: 첫 화면의 정보량과 밀도가 높다. 문구는 거창하지 않고 수수하게.

| 영역 | 전 | 후 |
| --- | --- | --- |
| 상단 바 | `mooner / Resume · Rev 9.0 · 2026.09` + 틱 | `mooner / Resume` + 틱 |
| 히어로 왼쪽 | 라벨 줄(Profile — 01 · Ansan) · 이름 + 핸들 · 태그라인 · 소개 2줄 · ROLE/STACK/TRACK/STATUS 표 · 링크 | 아바타 + `@mooner` · 이름 · 태그라인 · 소개 두 문장(한 줄씩) · 링크 |
| 태그라인 | 서버와 앱, 양 끝을 잇는 개발자. | 백엔드와 안드로이드 앱을 만듭니다. |
| 링크 | Email · GitHub · mooner.dev | Email · GitHub · Discord(클릭 복사, 호버 시 ID 표시) |
| 계기판 | 좌표/리전 헤더 · 판독값 6개 · 힌트 2개 · 2.2초마다 자동 전송 | 헤더 `Trace / Live`만 · Protocol + Latency 한 줄 · 힌트 1개 · 4.2초마다 한 번 |
| TRACK 수치 | 히어로 표 | About 왼쪽 목록(Stack · Track) |
| 연락처 | "요청은 언제든 — 응답은 하루 안에." · `Avg. response < 24h` | "궁금한 점이 있다면 편하게 연락 주세요." · 응답 시간 약속 제거 · Discord 복사 줄 추가 |

- 아바타: mooner.dev의 캐릭터(`assets/avatar.png`, 192px로 축소). 배경이 투명이라 라이트에선 흰 타일, 다크에선 반전 타일로 외곽선이 보이게 했다. 호버 시 살짝 기울어진다.
- 복사 버튼: `navigator.clipboard`가 없는 비보안 출처(LAN 미리보기 http)에서는 `execCommand('copy')`로 대체한다.

## 개발 스택 결정

**SvelteKit + `adapter-static`**, 콘텐츠는 타입이 있는 ko/en 데이터 파일로 분리하고 전 페이지를 프리렌더한다.

- 이전 프로필(mooner.dev)이 Svelte라 익숙한 도구를 그대로 쓴다.
- 이력 내용과 디자인이 분리돼, 항목을 고칠 때 마크업을 건드리지 않는다.
- 결과물은 정적 파일이라 지금의 단일 HTML과 배포 방식이 같다.
- 포팅 시 주의: 첫 페인트 전 테마·언어 스크립트는 `app.html`에, 타자 효과·스크롤 리빌·계기판은 `onMount`로 옮긴다.

## Round 5 — 첫 화면을 한 화면으로, mooner.dev 대체 (2026-09-26)

피드백: Round 4 첫 화면은 괜찮다. 다만 데스크톱에서 About이 처음부터 보이지 않고 스크롤해야 나타나야 하며, 아래에 내용이 더 있다는 작은 암시가 필요하다. 이 이력서는 mooner.dev를 대체하고, 블로그는 없다.

| 영역 | 전 | 후 |
| --- | --- | --- |
| 첫 화면 높이 | 히어로 `min-height: min(72vh, 700px)` — 모든 데스크톱 크기에서 About 구분선과 `$ whoami` 줄이 보임 | 상단 바 + 히어로를 `.fold`로 묶어 `100svh`(대체값 `100vh`). About은 화면 바로 아래에서 시작 |
| 스크롤 암시 | 없음 | 히어로 왼쪽 아래 `Scroll` 라벨 + 1px 레일, 초록 틱이 2.8초마다 한 번 레일을 따라 내려감. 클릭하면 About으로 부드럽게 이동, 스크롤하면 사라짐 |
| 연락처 링크 | Code · Chat · Work → mooner.dev · Blog → mooner.dev/about | Code · Chat (자기 자신을 가리키는 Work, 없는 Blog 제거) |
| 프로젝트 05 | mooner.dev — 개인 웹사이트 / 포트폴리오 · `2024 Personal` · 미리보기에 `mooner.dev ↗` | mooner.dev — 이전 개인 웹사이트 · `2024 Personal · Retired` · 설명 끝에 "지금은 이 이력서로 바뀌었습니다." · 바깥 링크 제거 |

- 960px 이하(모바일)와 인쇄에서는 `.fold` 높이를 풀고 스크롤 암시를 숨긴다. 모바일은 계기판이 아래로 쌓여 첫 화면이 이미 한 화면을 넘는다.
- 모션 줄이기 설정에서는 틱이 레일 중간에 멈춰 있다.
- 확인한 크기: 961×600, 1024×768, 1280×560, 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080, 2560×1440. 모두 About 상단이 화면 높이보다 아래이고, 스크롤 암시는 히어로 내용과 겹치지 않는다.
