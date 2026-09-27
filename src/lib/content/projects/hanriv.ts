import type { Lang, ProjectDetail } from '../types';

// Written from the repos (hantemp-backend, hantemp-parse-bot, hanrivertemp, hantemp-fallback) and the Play listing.
// Only claims those sources support; app-side work on V7 is not described because its source was not available.
const shots = (alt: [string, string, string, string], caption: [string, string, string, string]) =>
	(['main-night', 'main-dusk', 'dams', 'settings'] as const).map((name, i) => ({
		src: `/projects/hanriv/${name}.webp`,
		width: 720,
		height: 1280,
		alt: alt[i],
		caption: caption[i]
	}));

export const hanriv: Record<Lang, ProjectDetail> = {
	ko: {
		lead: '한강 수온을 보여주는 안드로이드 앱입니다. 2018년 Google Play에 처음 올린 뒤 혼자 기획하고 만들고 운영해 왔고, 2026년 9월 V7에서 **앱과 서버를 처음부터 다시** 만들었습니다.',
		facts: [
			{ k: 'Period', v: '2018.04 — 운영 중' },
			{ k: 'Role', v: '1인 · 기획 · 앱 · 백엔드 · 운영' },
			{ k: 'Backend', v: 'Kotlin · Ktor · Exposed · JobRunr' },
			{ k: 'Data', v: 'PostgreSQL · TimescaleDB · Redis' },
			{ k: 'Infra', v: 'Docker · Traefik · Kotlin/Native' },
			{ k: 'Now', v: 'V7.0.0 · 2026.09' }
		],
		structure: {
			intro: 'V7은 앱, Ktor 백엔드, 관리자 콘솔, 공개 백업 저장소로 나뉩니다. 백엔드는 **Gradle 모듈 세 개**로 되어 있습니다.',
			items: [
				{ name: 'backend/', text: 'Ktor 서버. 매시 수집과 저장, 공개 API(현재값·기록·댐 방류), 점검 모드, 공지를 맡습니다.' },
				{ name: 'shared/', text: '서버와 도구가 함께 쓰는 Kotlin Multiplatform 모델. JVM, wasmJs, linuxX64로 빌드합니다.' },
				{ name: 'git-updater/', text: '수집 결과를 공개 GitHub 저장소에 커밋하는 별도 프로세스. Kotlin/Native 바이너리로 배포합니다.' },
				{ name: 'adminpage', text: 'SvelteKit 관리자 콘솔. 수집 이력, 오류, 데이터 차트, 공지, 점검 상태를 봅니다.' },
				{ name: 'Android app', text: '현재 수온과 최근 7일 기록, 댐 방류 현황, 테마, 매일 수온 알림.' },
				{ name: 'parse-bot', text: 'V5 시절의 수집 봇. 지금도 GitHub Actions에서 하루 8번 돌며 Google Sheets에 기록합니다.' }
			]
		},
		architecture: {
			intro: '매시 정각 백엔드가 공공 API 세 곳에서 값을 모아 **한 트랜잭션**으로 저장합니다. 앱은 Traefik을 거쳐 이 값을 읽고, 같은 값이 Redis Stream을 거쳐 GitHub에도 남습니다.',
			notes: [
				'수집 한 번이 엔트리 하나가 되고, 수온과 댐 행이 그 엔트리에 딸립니다. TimescaleDB 하이퍼테이블에 30일 단위로 쌓입니다.',
				'현재값 API는 서버 안의 **30초 캐시**에서 먼저 답하고, 새 수집이 끝나면 캐시를 바로 비웁니다.',
				'응답에는 "최신 수집본이 아님"과 "관측이 오래됨"을 **따로** 표시합니다. 오래됨은 가져온 시각이 아니라 관측 시각으로 잽니다.',
				'백업 경로는 서버와 떨어져 있습니다. 서버는 Redis Stream에 넣기만 하고, 커밋과 재시도는 git-updater가 맡습니다.',
				'점검 모드를 켜면 공개 API가 모두 503과 점검 안내를 돌려줍니다. 상태는 Redis에 두어 여러 인스턴스가 같이 봅니다.'
			]
		},
		cases: [
			{
				title: '시트를 읽던 앱에서, 직접 수집하는 서버로',
				problem: 'V5까지는 봇이 3시간마다 수온을 가져와 Google Sheets 셀에 쓰고, 앱이 그 시트 응답을 문자열로 잘라 읽었습니다. 기록은 **기기에 하루 하나씩, 14개까지만** 남았습니다.',
				approach: 'Ktor 백엔드를 새로 만들어 매시 정각 직접 수집하고, 수집 한 번을 엔트리 하나로 PostgreSQL(TimescaleDB)에 저장했습니다. 기록 API를 열고 댐 방류와 날씨도 함께 모으게 했습니다.',
				result: 'V7에서 기록이 기기 대신 **서버에 쌓이게** 됐고, 앱에 일별 그래프, 기간 통계, 측정소 비교, 댐 방류 알림이 생겼습니다.'
			},
			{
				title: '"최신"이라던 값이 이틀 전 값이었다',
				problem: '현재값 API가 이틀 지난 수온을 최신이라고 돌려준 적이 있습니다. 수온과 댐이 Redis의 "최신 엔트리" 포인터 하나를 같이 썼는데, 댐 API가 실패했을 때 폴백 로직이 이 포인터를 **과거 엔트리로 되돌려** 놓았기 때문입니다.',
				approach: '공유 포인터를 없애고, 도메인마다 "값이 있는 가장 최근 엔트리"를 한 읽기 트랜잭션 안에서 찾도록 바꿨습니다. "최신 수집본이 아님"과 "관측이 오래됨"을 서로 다른 필드로 나눴습니다.',
				result: '운영에서 난 순서(댐 → 수온) 그대로 오염을 재현하는 회귀 테스트를 넣고, 현재값 해석을 SQL 3문으로 고정했습니다. 새 필드는 기본값일 때 내보내지 않아 **기존 앱은 그대로** 동작합니다.'
			},
			{
				title: '계속 바뀌는 상류 API',
				problem: '수온 원천이 2021년부터 여러 번 바뀌었습니다. 사이트가 두 번 옮겨 갔고, 측정소 순서와 필드 이름(`W_TEMP` → `WATT`)도 바뀌었습니다. 행 번호로 측정소를 찾던 봇은 그때마다 고쳐야 했습니다.',
				approach: '새 백엔드는 측정소를 행 번호가 아니라 **이름으로** 찾고, 각 필드는 옛 이름과 새 이름을 함께 받습니다. 측정소가 점검 중이면 그 사실을 함께 저장합니다.',
				result: '2026년 1월 필드 이름이 바뀌었을 때 봇은 고쳐야 했지만, 백엔드는 **이미 두 이름을 다 받고** 있어서 그대로 돌았습니다.'
			},
			{
				title: '서버가 멈춰도 남는 최신값',
				problem: '백엔드나 데이터베이스가 멈추면 최신 수온을 내줄 곳이 없었습니다.',
				approach: '수집이 끝나면 서버는 Redis Stream에 넣기만 하고, 별도 프로세스(git-updater)가 이를 읽어 공개 GitHub 저장소에 커밋합니다. 실패하면 간격을 늘려 가며 최대 5번 다시 시도하고, 비어 있는 데이터로는 덮어쓰지 않습니다.',
				result: '2026년 3월부터 매시 스냅샷을 남겨 **9,000개가 넘는 커밋**이 쌓였습니다. git-updater는 Kotlin/Native로 바꿔 128MB 메모리 안에서 돕니다.'
			}
		],
		shots: shots(
			[
				'V7 메인 화면, 밤 테마. 탄천 25.9도와 최근 7일 수온 그래프',
				'같은 메인 화면, 해질녘 테마',
				'댐 방류 현황 화면. 종합 방류량과 팔당, 청평 댐 카드',
				'설정 화면. 테마 자동 변경, 테마 설정, 실험적 기능'
			],
			['메인 · 밤 테마', '메인 · 해질녘 테마', '댐 방류 현황', '설정']
		)
	},
	en: {
		lead: 'An Android app that shows the Han River’s water temperature. First published on Google Play in 2018 and planned, built and run solo ever since; in September 2026, V7 **rebuilt both the app and the server** from scratch.',
		facts: [
			{ k: 'Period', v: '2018.04 — live' },
			{ k: 'Role', v: 'Solo · planning · app · backend · ops' },
			{ k: 'Backend', v: 'Kotlin · Ktor · Exposed · JobRunr' },
			{ k: 'Data', v: 'PostgreSQL · TimescaleDB · Redis' },
			{ k: 'Infra', v: 'Docker · Traefik · Kotlin/Native' },
			{ k: 'Now', v: 'V7.0.0 · 2026.09' }
		],
		structure: {
			intro: 'V7 is split into the app, a Ktor backend, an admin console and a public backup repository. The backend is **three Gradle modules**.',
			items: [
				{ name: 'backend/', text: 'The Ktor server: hourly collection and storage, the public API (current values, history, dam discharge), maintenance mode and notices.' },
				{ name: 'shared/', text: 'Kotlin Multiplatform models shared by the server and its tools, built for JVM, wasmJs and linuxX64.' },
				{ name: 'git-updater/', text: 'A separate process that commits each collection to a public GitHub repository, shipped as a Kotlin/Native binary.' },
				{ name: 'adminpage', text: 'A SvelteKit admin console for collection history, errors, data charts, notices and maintenance.' },
				{ name: 'Android app', text: 'Current temperature, the last seven days, dam discharge, themes and a daily temperature alert.' },
				{ name: 'parse-bot', text: 'The V5-era collector. It still runs on GitHub Actions eight times a day and writes to Google Sheets.' }
			]
		},
		architecture: {
			intro: 'On the hour, the backend pulls from three public APIs and stores the result in **one transaction**. The app reads it through Traefik, and the same values reach GitHub through a Redis Stream.',
			notes: [
				'Each collection is one entry with its temperature and dam rows attached, kept in a TimescaleDB hypertable in 30-day chunks.',
				'The current-value API answers from a **30-second in-process cache**, cleared the moment a new collection lands.',
				'Responses report "not the latest collection" and "observation is old" **separately**, and age is measured from the observation time, not the fetch time.',
				'The backup path is decoupled from the server: the server only appends to a Redis Stream, and git-updater handles commits and retries.',
				'Maintenance mode makes every public endpoint return 503 with a notice; its state lives in Redis so every instance sees it.'
			]
		},
		cases: [
			{
				title: 'From an app that read a spreadsheet to a server that collects',
				problem: 'Up to V5, a bot fetched the temperature every three hours into a Google Sheets cell, and the app sliced the sheet’s response as a string. History lived **on the device, one reading a day, fourteen at most**.',
				approach: 'A new Ktor backend collects on the hour and stores each collection as one entry in PostgreSQL (TimescaleDB). It serves a history API and gathers dam discharge and weather alongside.',
				result: 'With V7, history **lives on the server** instead of the phone, and the app gained daily charts, period statistics, site comparison and dam discharge alerts.'
			},
			{
				title: 'The "latest" value was two days old',
				problem: 'The current-value API once served a two-day-old temperature as the latest. Temperature and dam data shared a single "latest entry" pointer in Redis, and when the dam API failed, the fallback logic **moved that pointer back to an old entry**.',
				approach: 'The shared pointer is gone: each domain now looks up "the most recent entry that has its rows" inside one read transaction, and "not the latest collection" and "observation is old" became separate fields.',
				result: 'A regression test replays the production order (dam, then temperature), and resolving the current value is pinned to three SQL statements. The new fields are omitted at their defaults, so **existing app versions keep working**.'
			},
			{
				title: 'An upstream API that keeps changing',
				problem: 'Since 2021 the temperature source has changed several times: the site moved twice, and the station order and field names (`W_TEMP` → `WATT`) changed. The bot found stations by row number and needed a fix each time.',
				approach: 'The new backend finds stations **by name** rather than position and accepts both the old and new name for every field. A station under maintenance is stored as such.',
				result: 'When the field names changed in January 2026 the bot had to be patched, but the backend **already accepted both** and kept running.'
			},
			{
				title: 'A latest value that survives a server outage',
				problem: 'If the backend or the database stopped, nothing could serve the latest temperature.',
				approach: 'After each collection the server just appends to a Redis Stream; a separate process, git-updater, reads it and commits to a public GitHub repository, retrying up to five times with growing gaps and never overwriting with empty data.',
				result: 'Hourly snapshots since March 2026 add up to **more than 9,000 commits**. git-updater moved to Kotlin/Native and runs within 128 MB of memory.'
			}
		],
		shots: shots(
			[
				'V7 home screen in the night theme: Tancheon at 25.9° and a seven-day chart',
				'The same home screen in the dusk theme',
				'Dam discharge screen with the total and cards for Paldang and Cheongpyeong',
				'Settings: automatic theme, theme choice and experimental features'
			],
			['Home · night theme', 'Home · dusk theme', 'Dam discharge', 'Settings']
		)
	}
};
