import type { Lang, ProjectDetail } from '../types';

// Written from the repos (hanrivertemp V7, hantemp-backend, hantemp-parse-bot, hantemp-fallback) and the Play listing.
// Only claims those sources support: e.g. Compose is described as screen-by-screen, since the app shell is still Views.
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
		lead: '한강 수온을 보여주는 안드로이드 앱입니다. 2018년 Google Play에 처음 올린 뒤 1인 프로젝트로 기획부터 운영까지 맡아 왔고, 2026년 9월 V7에서 **앱과 서버를 처음부터 다시** 만들었습니다.',
		facts: [
			{ k: 'Period', v: '2018.04 — 운영 중' },
			{ k: 'Role', v: '1인 · 기획 · 앱 · 백엔드 · 운영' },
			{ k: 'App', v: 'Kotlin · Compose · Koin · Ktor Client' },
			{ k: 'Backend', v: 'Kotlin · Ktor · Exposed · JobRunr' },
			{ k: 'Data', v: 'PostgreSQL · TimescaleDB · Redis' },
			{ k: 'Infra', v: 'Docker · Traefik · Kotlin/Native' },
			{ k: 'Now', v: 'V7.0.0 · 2026.09' }
		],
		structure: {
			intro: 'V7은 앱, Ktor 백엔드, 관리자 콘솔, 공개 백업 저장소로 나뉩니다. 앱과 서버는 **같은 Kotlin 모델**을 공유합니다.',
			items: [
				{ name: 'Android app', text: 'Java 코드 없이 Kotlin으로 새로 썼습니다. 수온·댐·설정 탭, 수온 기록, 공지, 위젯 3종, 매일 수온 알림과 댐 방류 경보. 주요 화면은 Compose로 옮겼고, 탭을 담는 앱 셸은 아직 ViewPager2와 Fragment입니다.' },
				{ name: 'backend/', text: 'Ktor 서버. 매시 수집과 저장, 공개 API(현재값·기록·댐 방류), 점검 모드, 공지를 맡습니다.' },
				{ name: 'shared/', text: 'Kotlin Multiplatform 모델. 앱은 백엔드 저장소를 서브모듈로 가져와 서버 응답과 백업 JSON을 같은 모델로 읽습니다.' },
				{ name: 'git-updater/', text: '수집 결과를 공개 GitHub 저장소에 커밋하는 별도 프로세스. Kotlin/Native 바이너리로 배포합니다.' },
				{ name: 'adminpage', text: 'SvelteKit 관리자 콘솔. 수집 이력, 오류, 데이터 차트, 공지, 점검 상태를 봅니다.' },
				{ name: 'parse-bot', text: 'V5 시절의 수집 봇. 지금도 GitHub Actions에서 하루 8번 돌며 Google Sheets에 기록하고, 앱의 마지막 예비 경로가 됩니다.' }
			]
		},
		architecture: {
			intro: '매시 정각 백엔드가 공공 API 세 곳에서 값을 모아 **한 트랜잭션**으로 저장합니다. 앱은 Traefik을 거쳐 이 값을 읽고, 서버가 답하지 않으면 GitHub에 남긴 사본을 읽습니다.',
			notes: [
				'수집 한 번이 엔트리 하나가 되고, 수온과 댐 행이 그 엔트리에 딸립니다. TimescaleDB 하이퍼테이블에 30일 단위로 쌓입니다.',
				'현재값 API는 서버 안의 **30초 캐시**에서 먼저 답하고, 새 수집이 끝나면 캐시를 바로 비웁니다.',
				'응답에는 "최신 수집본이 아님"과 "관측이 오래됨"을 **따로** 표시합니다. 오래됨은 가져온 시각이 아니라 관측 시각으로 잽니다.',
				'앱은 **API → GitHub 사본 → 예전 시트** 순서로 읽고, 사본을 쓴 화면에는 "예비 데이터"를 표시합니다. 점검(503) 중에도 사본을 먼저 시도합니다.',
				'백업 경로는 요청 경로와 떨어져 있습니다. 서버는 Redis Stream에 넣기만 하고, 커밋과 재시도는 git-updater가 맡습니다.',
				'상류 API는 사이트 이전, 측정소 순서, 필드 이름(`W_TEMP` → `WATT`)까지 여러 번 바뀌었습니다. 백엔드는 측정소를 이름으로 찾고 필드의 옛 이름과 새 이름을 함께 받아, 2026년 1월 변경 때도 그대로 돌았습니다.'
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
				title: '서버가 멈춰도 열리는 앱',
				problem: 'V5는 수온을 읽을 곳이 시트 하나뿐이라, 읽지 못하면 "서버 연결 실패" 안내를 띄우고 앱을 닫았습니다. 새 서버를 두어도 서버나 DB가 멈추면 같은 일이 생깁니다.',
				approach: '서버는 수집이 끝날 때마다 Redis Stream에 넣고, 별도 프로세스(git-updater)가 공개 GitHub 저장소에 커밋합니다. 앱은 서버와 **같은 공유 모델로** 이 사본을 읽고, 그것도 안 되면 예전 시트를 읽습니다. 점검 중에도 사본을 먼저 시도하고, 점검 공지는 기간이 지난 것이면 무시합니다.',
				result: '2026년 3월부터 매시 스냅샷이 쌓여 **9,000개가 넘는 커밋**이 됐습니다. 사본 해석, 폴백 표시, 점검 기간 판정은 테스트 29개로 고정했습니다.'
			},
			{
				title: '"최신"이라던 값이 이틀 전 값이었다',
				problem: '현재값 API가 이틀 지난 수온을 최신이라고 돌려준 적이 있습니다. 수온과 댐이 Redis의 "최신 엔트리" 포인터 하나를 같이 썼는데, 댐 API가 실패했을 때 폴백 로직이 이 포인터를 **과거 엔트리로 되돌려** 놓았기 때문입니다.',
				approach: '공유 포인터를 없애고, 도메인마다 "값이 있는 가장 최근 엔트리"를 한 읽기 트랜잭션 안에서 찾도록 바꿨습니다. "최신 수집본이 아님"과 "관측이 오래됨"을 서로 다른 필드로 나눴습니다.',
				result: '운영에서 난 순서(댐 → 수온) 그대로 오염을 재현하는 회귀 테스트를 넣고, 현재값 해석을 SQL 3문으로 고정했습니다. 새 필드는 기본값일 때 내보내지 않아 **기존 앱은 그대로** 동작합니다.'
			},
			{
				title: '매일 알림이 하루 이틀 뒤 멈췄다',
				problem: 'V5는 매일 수온 알림을 반복 알람 하나(`setRepeating`)로 걸었습니다. 반복 알람은 기기가 절전 상태에 들어가면 계속 미뤄질 수 있고, 재부팅 뒤 알람을 다시 거는 수신기는 매니페스트에 등록돼 있지 않았습니다.',
				approach: '한 번짜리 알람을 걸고, 알람이 울리면 **다음 알람부터 먼저 예약하는** 사슬로 바꿨습니다. 부팅, 앱 업데이트, 앱 시작 때마다 다시 걸고, 수신기는 비동기로 수온을 가져오되 알림을 올릴 시간을 남기도록 타임아웃을 나눴습니다.',
				result: 'V7에서 이 문제를 고쳤고, 같은 구조를 새로 넣은 댐 방류 경보에도 그대로 썼습니다.'
			},
			{
				title: '화면 오른쪽이 눌리지 않았다',
				problem: '탭 전환 효과가 오른쪽 이웃 페이지를 투명하게만 만들어 두어, 보이지 않는 페이지가 **화면 오른쪽 약 20%를 덮고** 터치를 가로챘습니다. 투명도는 터치 판정에 영향을 주지 않기 때문입니다.',
				approach: '전환 계산을 순수 함수로 떼어 내고, 화면 밖에 자리 잡은 페이지는 변환을 원래대로 되돌리게 했습니다. "화면 밖 페이지는 보이는 페이지와 겹치지 않는다"는 조건을 테스트로 고정했습니다.',
				result: '테스트 8개로 회귀를 막고, V7에서 수온 화면 오른쪽이 눌리지 않던 문제를 고쳤습니다.'
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
		lead: 'An Android app that shows the Han River’s water temperature. First published on Google Play in 2018 and run as a one-person project, from planning to operations, ever since; in September 2026, V7 **rebuilt both the app and the server** from scratch.',
		facts: [
			{ k: 'Period', v: '2018.04 — live' },
			{ k: 'Role', v: 'Solo · planning · app · backend · ops' },
			{ k: 'App', v: 'Kotlin · Compose · Koin · Ktor Client' },
			{ k: 'Backend', v: 'Kotlin · Ktor · Exposed · JobRunr' },
			{ k: 'Data', v: 'PostgreSQL · TimescaleDB · Redis' },
			{ k: 'Infra', v: 'Docker · Traefik · Kotlin/Native' },
			{ k: 'Now', v: 'V7.0.0 · 2026.09' }
		],
		structure: {
			intro: 'V7 is split into the app, a Ktor backend, an admin console and a public backup repository. The app and the server share **the same Kotlin models**.',
			items: [
				{ name: 'Android app', text: 'Rewritten in Kotlin with no Java left: temperature, dam and settings tabs, history, notices, three widget sizes, a daily temperature alert and dam discharge alerts. The main screens are in Compose; the shell that hosts the tabs is still ViewPager2 and Fragments.' },
				{ name: 'backend/', text: 'The Ktor server: hourly collection and storage, the public API (current values, history, dam discharge), maintenance mode and notices.' },
				{ name: 'shared/', text: 'Kotlin Multiplatform models. The app pulls in the backend repository as a submodule and reads both server responses and the backup JSON with them.' },
				{ name: 'git-updater/', text: 'A separate process that commits each collection to a public GitHub repository, shipped as a Kotlin/Native binary.' },
				{ name: 'adminpage', text: 'A SvelteKit admin console for collection history, errors, data charts, notices and maintenance.' },
				{ name: 'parse-bot', text: 'The V5-era collector. It still runs on GitHub Actions eight times a day, writes to Google Sheets, and serves as the app’s last fallback.' }
			]
		},
		architecture: {
			intro: 'On the hour, the backend pulls from three public APIs and stores the result in **one transaction**. The app reads it through Traefik, and when the server does not answer it reads the copy left on GitHub.',
			notes: [
				'Each collection is one entry with its temperature and dam rows attached, kept in a TimescaleDB hypertable in 30-day chunks.',
				'The current-value API answers from a **30-second in-process cache**, cleared the moment a new collection lands.',
				'Responses report "not the latest collection" and "observation is old" **separately**, and age is measured from the observation time, not the fetch time.',
				'The app reads **API → GitHub copy → old sheet** in that order and marks screens that use the copy as backup data. It tries the copy first even during maintenance (503).',
				'The backup path is kept off the request path: the server only appends to a Redis Stream, and git-updater handles commits and retries.',
				'The upstream API has changed many times: the site moved, station order changed, fields were renamed (`W_TEMP` → `WATT`). The backend finds stations by name and accepts old and new field names, so it kept running through the January 2026 change.'
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
				title: 'An app that opens when the server is down',
				problem: 'V5 had one place to read from, the sheet; if it failed, the app showed a connection error and closed. A new server alone would fail the same way whenever it or its database stopped.',
				approach: 'After each collection the server appends to a Redis Stream and a separate process, git-updater, commits a snapshot to a public GitHub repository. The app reads that copy with **the same shared models** as the server, then the old sheet if that fails too. It tries the copy first even during maintenance, and ignores maintenance notices whose window has passed.',
				result: 'Hourly snapshots since March 2026 add up to **more than 9,000 commits**. Reading the copy, marking backup data and checking maintenance windows are pinned by 29 tests.'
			},
			{
				title: 'The "latest" value was two days old',
				problem: 'The current-value API once served a two-day-old temperature as the latest. Temperature and dam data shared a single "latest entry" pointer in Redis, and when the dam API failed, the fallback logic **moved that pointer back to an old entry**.',
				approach: 'The shared pointer is gone: each domain now looks up "the most recent entry that has its rows" inside one read transaction, and "not the latest collection" and "observation is old" became separate fields.',
				result: 'A regression test replays the production order (dam, then temperature), and resolving the current value is pinned to three SQL statements. The new fields are omitted at their defaults, so **existing app versions keep working**.'
			},
			{
				title: 'The daily alert stopped after a day or two',
				problem: 'V5 set the daily temperature alert as one repeating alarm (`setRepeating`). Repeating alarms can keep slipping once the device dozes, and the receiver meant to re-arm it after a reboot was never registered in the manifest.',
				approach: 'Now a one-shot alarm is set, and when it fires **the next one is booked first**. Alarms are re-armed on boot, app update and app start, and the receiver fetches the temperature asynchronously with split timeouts so there is always time left to post the notification.',
				result: 'Fixed in V7, and the same structure now drives the new dam discharge alerts.'
			},
			{
				title: 'The right edge of the screen ignored taps',
				problem: 'The tab transition only made the neighbouring page transparent, so an invisible page **covered the right fifth of the screen** and swallowed taps; transparency does not affect hit testing.',
				approach: 'The transition maths moved into a pure function, and pages settled off-screen now reset their transform. A test pins the rule that an off-screen page never overlaps the visible one.',
				result: 'Eight tests guard against regressions, and V7 fixed the dead strip on the temperature screen.'
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
