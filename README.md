# NeoResume

mooner.dev에 올라갈 이력서. SvelteKit + `adapter-static`으로 두 페이지를 프리렌더한다.

| 경로 | 언어 |
| --- | --- |
| `/` | 한국어 |
| `/en/` | English |

```sh
pnpm install
pnpm dev        # 개발 서버
pnpm check      # 타입 · Svelte 검사
pnpm build      # build/ 에 정적 파일 생성
pnpm preview    # build/ 미리보기 (다시 빌드하면 재시작해야 새 파일을 찾는다)
```

## 배포

`main`에 푸시하면 `.github/workflows/deploy.yml`이 검사·빌드 후 GitHub Pages로 올린다. 사용자 지정 도메인 `mooner.dev`는 저장소의 Pages 설정에 있다.

## 내용 고치기

마크업은 건드리지 않고 `src/lib/content/`만 고친다.

- `ko.ts`, `en.ts` — 언어별 전체 내용. 둘 다 `types.ts`의 `Resume` 타입이라 한쪽만 고치면 `pnpm check`가 알려준다.
- `profile.ts` — 언어와 무관한 값: 이름, 연락처, GitHub 수치, 갱신일(`updated`, Now와 푸터에 쓰임).
- 문장 안의 `**굵게**`는 굵은 글씨가 된다.
- 섹션 옆 숫자(Experience 06, Toolkit 33 …)는 항목 수에서 자동으로 계산된다.

## 구조

- `src/routes/[[lang=lang]]/` — 한 페이지. `src/params/lang.ts`가 `en`만 언어로 받는다.
- `src/lib/components/` — 섹션별 컴포넌트, 스타일은 각 컴포넌트 안에 있다.
- `src/lib/styles/global.css` — 색 토큰과 여러 컴포넌트가 함께 쓰는 유틸리티.
- `src/lib/figures/octopus.ts` — 히어로 프린터가 출력하는 아바타 실루엣(층별 구간). `static/avatar.png`에서 뽑았으므로 아바타를 바꾸면 다시 만들어야 한다.
- `src/app.html` — 첫 페인트 전 테마 적용 스크립트.
- `design/` — 시안과 라운드별 기록. `design/f-telemetry.html`은 포팅 전 기준 템플릿으로 남겨 둔다.
