import type { Lang, ProjectDetail } from '../types';

// Written from the public repos (StarLight, starlight-version, StarLight-GradlePlugin) and their issues.
// Cases use the owner's own diagnoses from the issue threads; outside contributions are credited.
export const starlight: Record<Lang, ProjectDetail> = {
	ko: {
		lead: '안드로이드 알림을 받아 사용자가 쓴 스크립트에 넘기고, 알림의 답장 기능으로 응답하는 **메신저 자동응답 프레임워크**입니다. 스크립트 언어와 기능을 플러그인으로 더할 수 있게 설계했습니다.',
		facts: [
			{ k: 'Period', v: '2021.03 — · 공개 알파 2023.08' },
			{ k: 'Role', v: '메인테이너 · 설계 · 개발' },
			{ k: 'Stack', v: 'Kotlin · Coroutines · Rhino (JavaScript)' },
			{ k: 'Modules', v: 'app · PluginCore · ConfigDSL' },
			{ k: 'Community', v: '★ 45 · 이슈 42 · PR 21' },
			{ k: 'Now', v: '0.3.4b · 베타' }
		],
		structure: {
			intro: 'Gradle 모듈 세 개와 플러그인 형식(`.slp`)으로 되어 있습니다. 앱과 플러그인은 **같은 SDK(PluginCore)**를 공유합니다.',
			items: [
				{ name: 'app/', text: '알림 리스너, 메시지 파서, 내장 JavaScript 엔진(Rhino), 스크립트 API 18종, 코드 에디터와 테스트용 디버그룸.' },
				{ name: 'PluginCore/', text: '앱과 플러그인이 함께 쓰는 SDK. 스크립트 언어, API, 프로젝트 이벤트, 위젯, 이벤트 버스를 확장하는 지점이 여기 있습니다.' },
				{ name: 'ConfigDSL/', text: '설정 화면을 Kotlin DSL로 선언하면 목록 화면으로 그려 주는 라이브러리. 앱과 플러그인 설정에 같이 씁니다.' },
				{ name: '*.slp', text: '매니페스트(`starlight.json`)가 든 플러그인 패키지. V8 같은 새 스크립트 언어나 API를 더합니다.' },
				{ name: 'starlight-version', text: '채널별(snapshot · beta · release) 최신 버전과 변경 기록. 앱의 업데이트 확인과 소개 페이지가 읽습니다.' },
				{ name: 'Gradle plugin', text: '플러그인 프로젝트를 `.slp`로 묶는 빌드 태스크. Gradle Plugin Portal에 올려 두었습니다.' }
			]
		},
		architecture: {
			intro: '알림 한 건이 **규칙 → 파서 → 이벤트 → 프로젝트** 순서로 흘러가고, 스크립트의 답장은 그 알림의 답장 기능으로 돌아갑니다.',
			notes: [
				'알림은 앱 패키지와 사용자 프로필로 규칙을 찾고, 규칙이 고른 파서가 방, 보낸 사람, 답장 경로를 꺼냅니다. 기본 규칙은 카카오톡이고, 규칙과 파서를 더해 다른 메신저로 넓힐 수 있게 되어 있습니다.',
				'이벤트는 그 이벤트를 허용한 프로젝트에만 전달됩니다. 허용 목록은 와일드카드를 쓰는 트리로 맞춥니다.',
				'프로젝트마다 **스레드 풀이 따로** 있고, 오류가 나면 그 프로젝트만 멈춥니다.',
				'플러그인 로더는 예약 ID와 API 버전을 검사하고 의존 순서대로 불러오며, 플러그인이 코어 클래스를 가리지 못하게 막습니다.',
				'기존 자동응답 앱의 스크립트가 그대로 돌도록 레거시 API와 `response` 이벤트도 함께 구현했습니다.'
			]
		},
		cases: [
			{
				title: '한 메시지에 답장이 두 번 간다',
				problem: '공개 알파를 올린 다음 날, 명령 하나에 답장이 두 번 간다는 제보가 들어왔습니다.',
				approach: '안드로이드가 기존 알림 리스너를 끝내지 않고 새 리스너를 한 번 더 등록하는 경우가 있다고 보고, **같은 메시지 ID가 연달아 들어오면 두 번째를 버리게** 했습니다.',
				result: '수정 빌드를 바로 올렸고, 제보자가 정상 동작을 확인해 이슈를 닫았습니다.'
			},
			{
				title: '답장이 다른 방으로 간다',
				problem: '레거시 `response` 이벤트의 답장이 명령이 온 방이 아니라, 마지막으로 알림이 온 방으로 갔습니다. 답장 객체가 하나뿐이고 방 정보를 들고 있지 않았기 때문입니다.',
				approach: '호환 대상 앱에서 같은 상황이 어떻게 동작하는지 먼저 확인한 뒤, **방마다 답장 객체를 만들어** 약한 참조 캐시에 두도록 바꿨습니다.',
				result: '0.3.2a에 반영했습니다. 새로 쓰는 스크립트에는 방 정보가 이벤트에 함께 담기는 `onMessage`를 권합니다.'
			},
			{
				title: 'Android 14 이하에서 로그가 쌓이면 앱이 종료된다',
				problem: '컴파일 대상 SDK를 35로 올린 뒤, 프로젝트 로그가 한도를 넘으면 Android 14 이하 기기에서 앱이 종료됐습니다.',
				approach: '원인을 Kotlin의 `removeFirst`가 Android 14 이하에는 없는 메서드로 컴파일되는 문제(KT-71375)로 짚어 이슈에 정리했습니다. 곧바로 고칠 수 없는 동안에는 **다운로드 링크를 이전 안정 버전으로 되돌렸고**, 수정 코드는 외부 기여자의 PR(#60)을 리뷰해 병합했습니다.',
				result: '0.3.3a에서 해결했고, 같은 원인으로 열린 이슈 세 개를 닫았습니다.'
			}
		],
		shots: [
			{ src: '/projects/starlight/projects.webp', width: 720, height: 899, alt: '프로젝트 탭. JavaScript와 V8 프로젝트 목록과 프로젝트별 편집, 재컴파일, 디버그룸 버튼', caption: '프로젝트 목록' },
			{ src: '/projects/starlight/plugins.webp', width: 720, height: 899, alt: '플러그인 탭. V8, Discord, Awt 플러그인이 설치된 모습', caption: '설치된 플러그인' }
		]
	},
	en: {
		lead: 'A **messenger auto-reply framework** that takes Android notifications, hands them to scripts users write, and answers through the notification’s reply action. Designed so that script languages and features can be added as plugins.',
		facts: [
			{ k: 'Period', v: '2021.03 — · public alpha 2023.08' },
			{ k: 'Role', v: 'Maintainer · design · build' },
			{ k: 'Stack', v: 'Kotlin · Coroutines · Rhino (JavaScript)' },
			{ k: 'Modules', v: 'app · PluginCore · ConfigDSL' },
			{ k: 'Community', v: '★ 45 · 42 issues · 21 PRs' },
			{ k: 'Now', v: '0.3.4b · beta' }
		],
		structure: {
			intro: 'Three Gradle modules and a plugin format (`.slp`). The app and its plugins share **one SDK, PluginCore**.',
			items: [
				{ name: 'app/', text: 'Notification listener, message parsers, the built-in JavaScript engine (Rhino), 18 script APIs, a code editor and a debug room for testing.' },
				{ name: 'PluginCore/', text: 'The SDK shared by the app and plugins: extension points for script languages, APIs, project events, widgets and the event bus.' },
				{ name: 'ConfigDSL/', text: 'Declare a settings screen in a Kotlin DSL and it renders as a list; used for both app and plugin settings.' },
				{ name: '*.slp', text: 'A plugin package with a `starlight.json` manifest, adding new script languages such as V8, or new APIs.' },
				{ name: 'starlight-version', text: 'Latest version and changelog per channel (snapshot · beta · release), read by the in-app update check and the landing page.' },
				{ name: 'Gradle plugin', text: 'A build task that packs a plugin project into `.slp`, published on the Gradle Plugin Portal.' }
			]
		},
		architecture: {
			intro: 'A notification flows **rule → parser → event → project**, and a script’s reply goes back through that notification’s reply action.',
			notes: [
				'A rule is matched by app package and user profile, and the parser it picks extracts the room, the sender and the reply path. KakaoTalk is the built-in rule; more rules and parsers can extend it to other messengers.',
				'Events reach only the projects that allow them, matched against a wildcard tree of event IDs.',
				'Each project has **its own thread pool**, and an error stops only that project.',
				'The plugin loader checks reserved IDs and API versions, loads in dependency order, and keeps plugins from shadowing core classes.',
				'Legacy APIs and the `response` event are implemented too, so scripts from existing auto-reply apps run as they are.'
			]
		},
		cases: [
			{
				title: 'Every message got two replies',
				problem: 'The day after the public alpha, a user reported that one command got two replies.',
				approach: 'Android sometimes registers a second notification listener without shutting down the first, so the app now **drops a message whose ID matches the one just handled**.',
				result: 'A fixed build went out right away, and the reporter confirmed it and closed the issue.'
			},
			{
				title: 'Replies went to the wrong room',
				problem: 'The legacy `response` event replied to whichever room had notified last, not the room the command came from, because there was a single replier with no room attached.',
				approach: 'After checking how the app it stays compatible with behaves, the listener now **creates one replier per room** and keeps them in a weak-reference cache.',
				result: 'Shipped in 0.3.2a. New scripts are pointed to `onMessage`, whose event carries the room.'
			},
			{
				title: 'The app crashed on Android 14 and below once logs piled up',
				problem: 'After moving the compile SDK to 35, the app crashed on Android 14 and below whenever a project’s log went over its limit.',
				approach: 'Traced it to Kotlin compiling `removeFirst` to a method those Android versions lack (KT-71375) and wrote it up in an issue. Until a fix was ready, **the download link was rolled back to the last stable build**; the fix itself was an outside contributor’s PR (#60), reviewed and merged.',
				result: 'Resolved in 0.3.3a, closing the three issues with that cause.'
			}
		],
		shots: [
			{ src: '/projects/starlight/projects.webp', width: 720, height: 899, alt: 'Projects tab listing JavaScript and V8 projects with edit, recompile and debug-room buttons', caption: 'Projects' },
			{ src: '/projects/starlight/plugins.webp', width: 720, height: 899, alt: 'Plugins tab with the V8, Discord and Awt plugins installed', caption: 'Installed plugins' }
		]
	}
};
