import { profile } from './profile';
import type { Resume } from './types';

const { stats } = profile;

export const ko: Resume = {
	meta: {
		title: '문민기 Minki Moon — Backend & Android Developer',
		description: '백엔드 · 안드로이드 개발자 문민기(mooner)의 이력서. Kotlin · Ktor · Jetpack Compose.',
		locale: 'ko_KR'
	},

	hero: {
		tagline: '백엔드와 안드로이드 앱을 만듭니다.',
		intro: ['한양대학교 ERICA에서 컴퓨터공학을 공부합니다.', '2016년에 독학으로 프로그래밍을 시작했어요.'],
		figureLabel: '3D 프린터가 문어 아바타를 한 층씩 출력하는 장식용 패널',
		flowLabel: '스풀에서 풀린 필라멘트가 튜브를 지나 노즐로 들어가고, 노즐이 좌우로 오가며 문어 모양을 한 층씩 쌓는다. 한 층이 끝날 때마다 베드가 조금씩 내려간다.',
		filaments: ['핑크', '그린', '모노'],
		hint: '누르면 다시 출력합니다 · 화면 밖에서는 3D 프린팅을 합니다'
	},

	about: {
		meta: 'Since 2016 — Self-taught',
		facts: [
			{ k: 'Base', v: [profile.base] },
			{ k: 'Stack', v: ['Kotlin · Ktor', 'Jetpack Compose'] },
			{ k: 'Track', v: [`${stats.years} yrs`, `★ ${stats.stars} GitHub`, `${stats.installs} installs`] },
			{ k: 'Lang', v: ['ko, en'] },
			{ k: 'Off', v: ['3D 프린팅 · 모델링'] }
		],
		prose: [
			'한양대학교 ERICA 컴퓨터공학과에 재학 중인 평범한(그런 척하는) 학부생. 프로그래밍은 2016년부터 독학으로 시작해 올해로 8년째입니다.',
			'**Java와 Kotlin**을 주축으로 백엔드 시스템을, **Jetpack Compose**로 안드로이드 앱을 만듭니다. 깨끗하고 유지보수 가능한 코드와 확장 가능한 시스템 설계에 관심이 많아요.',
			'군 복무를 마치고 2026년 2학기부터 한양대학교 ERICA로 복학해 학업을 이어가는 중입니다. 그 외 시간엔 백엔드/사이드 프로젝트를 건드립니다.',
			'화면 밖에서는 3D 프린팅과 모델링을 합니다. 예전엔 프린터를 직접 설계해 만들고 고쳐 쓰다가, 지금은 Bambu Lab X2D에 맡기고 Fusion 360으로 그리는 쪽에 더 시간을 씁니다.'
		]
	},

	experience: {
		meta: '8 yrs — Since 2016',
		jobs: [
			{
				when: '2026 Fall — Now',
				place: 'Ansan',
				now: true,
				org: '한양대학교 ERICA',
				role: '컴퓨터공학과 · 복학',
				points: [
					'군 휴학을 마치고 2026년 2학기부터 복학해 학업을 이어가는 중',
					'학업과 병행해 **AMOA** 백엔드 및 **AGORA** 사이드 프로젝트를 개발 중'
				]
			},
			{
				when: '2024 — 2026',
				place: 'Korea',
				org: 'ROK Air Force',
				role: '정보체계관리 특기병',
				points: [
					'군 정보 시스템의 운영 및 유지보수 업무를 수행',
					'근무 외 시간을 활용해 오픈소스 프로젝트와 개인 서비스를 지속적으로 관리',
					'제한된 환경에서 집중력 있게 작업하는 방식을 몸에 익힘'
				]
			},
			{
				when: '2021 — Now',
				place: 'Remote',
				now: true,
				org: 'Project StarLight',
				role: '오픈소스 · 메인테이너',
				tags: ['Kotlin', 'Android', 'Plugin API'],
				points: [
					'Kotlin 기반 플러그인 구조의 안드로이드 자동응답 프레임워크를 설계·개발',
					'크로스-메신저 통합과 확장 가능한 스크립팅 API를 제공',
					'GitHub **★ 46**, **1,500+ 다운로드** — 플러그인 생태계와 이슈 대응을 지속 유지'
				]
			},
			{
				when: '2020',
				place: 'Korea',
				org: 'IT Company',
				role: '인턴십 · 백엔드',
				points: ['2개월간 실무 환경에서 백엔드 개발에 참여', '팀 단위의 협업 · 코드 리뷰 · 배포 프로세스를 처음 경험']
			},
			{
				when: '2018 — Now',
				place: 'Seoul',
				now: true,
				org: '지금 한강은｡',
				role: '개인 서비스 · 기획 · 풀스택',
				tags: ['Kotlin', 'Ktor', 'Redis', 'Traefik'],
				points: [
					'한강 수온을 실시간으로 보여주는 안드로이드 앱 기획·개발·배포',
					'Ktor 백엔드 + Redis 캐싱으로 트래픽 급증에도 안정적인 응답 유지',
					'Google Play **46,300+ 다운로드**, 평점 **4.85** (리뷰 273) 달성'
				]
			},
			{
				when: '2017',
				place: '—',
				org: 'Indie Android',
				role: '1인 개발자',
				points: ['첫 안드로이드 앱을 Google Play에 출시 — 2017년, 열일곱의 작은 성취', '이후 StarLight를 포함한 여러 개인 프로젝트로 이어짐']
			}
		]
	},

	projects: {
		meta: 'Backend / Android / OSS',
		items: [
			{
				id: 'amoa',
				name: 'AMOA',
				subtitle: '하이브리드 검색 백엔드',
				year: '2026 —',
				status: 'Backend · Ongoing',
				desc: 'Kotlin + Ktor + PostgreSQL, 기능 단위 수직 슬라이스 구조. 강의·클립·레시피를 한 번에 찾는 pgvector 하이브리드 검색(ANN + pg_trgm, RRF)과 한글 자동완성, 아웃박스 큐로 도는 임베딩 색인 파이프라인.',
				tags: [{ label: 'Ktor' }, { label: 'pgvector' }, { label: 'pg_trgm' }, { label: 'AWS EC2' }, { label: 'Terraform' }],
				card: {
					title: '하이브리드 검색 백엔드',
					specs: [
						['Arch', '수직 슬라이스 · Kotlin/Ktor'],
						['Search', 'pgvector ANN + pg_trgm, RRF 재랭킹'],
						['Pipeline', '아웃박스 큐 · SKIP LOCKED 색인'],
						['Infra', 'AWS EC2 · Terraform · SSM'],
						['Team', 'PM · FE · 백엔드 1인']
					]
				}
			},
			{
				id: 'agora',
				name: 'AGORA',
				subtitle: '멀티에이전트 의사결정 시스템',
				year: '2026',
				status: 'Side · Demoed',
				desc: 'CTO · CCO/CMO · Decision Manager 에이전트가 라운드 기반으로 토론하는 구조. SearXNG + Trafilatura 웹 그라운딩, SSE 스트리밍, 프롬프트 캐싱. 클라이언트 대상 MVP 데모 완료.',
				tags: [{ label: 'Ktor' }, { label: 'Exposed' }, { label: 'SvelteKit' }, { label: 'SSE' }],
				card: {
					title: '멀티에이전트 의사결정 시스템',
					specs: [
						['Agents', 'CTO · CCO/CMO · Decision Manager'],
						['Flow', '라운드 기반 토론 · 합의 도출'],
						['Grounding', 'SearXNG + Trafilatura'],
						['Stack', 'Ktor · Exposed · SvelteKit'],
						['Status', '클라이언트 MVP 데모 완료']
					]
				}
			},
			{
				id: 'hanriv',
				name: '지금 한강은｡',
				subtitle: '한강 수온을 실시간으로',
				year: '2018 —',
				status: 'Android · Live',
				desc: '현대적인 한국어 UI/UX의 수온 모니터링 앱. Ktor 백엔드, Redis 캐싱, Traefik 로드 밸런싱으로 안정적으로 운영 중. 현재 Jetpack Compose 마이그레이션과 Baseline Profile 적용, HorizontalPager 끊김 개선 등 성능 최적화 진행.',
				tags: [
					{ label: '★ 4.85 (273)', signal: true },
					{ label: '46.3K+ DL', signal: true },
					{ label: 'Kotlin' },
					{ label: 'Ktor' },
					{ label: 'Redis' }
				],
				card: {
					title: '한강 수온을 실시간으로',
					specs: [
						['Rating', '★ 4.85 · 리뷰 273'],
						['Installs', '46,300+'],
						['Stack', 'Kotlin · Ktor · Redis · Traefik'],
						['Now', 'Compose 마이그레이션 · Baseline Profile']
					],
					links: [{ label: 'Google Play ↗', href: 'https://play.google.com/store/apps/details?id=com.temp.hanriv.moonm' }]
				}
			},
			{
				id: 'starlight',
				name: 'Project StarLight',
				subtitle: '스크립터블 메신저 자동응답 프레임워크',
				year: '2021 —',
				status: 'Open Source',
				desc: 'Kotlin으로 작성된 플러그인 기반 안드로이드 자동응답 플랫폼. 확장 가능한 자동화 기능과 크로스-메신저 통합을 지원합니다.',
				tags: [{ label: '★ 46', signal: true }, { label: '1.5K+ DL', signal: true }, { label: 'Kotlin' }, { label: 'Plugin' }],
				card: {
					title: '스크립터블 메신저 자동응답',
					specs: [
						['Arch', '플러그인 기반 · 스크립팅 API'],
						['Reach', '★ 46 · 1,500+ 다운로드'],
						['Stack', 'Kotlin · Android'],
						['Role', '메인테이너 · 2021 —']
					],
					links: [
						{ label: 'Site ↗', href: 'https://starlight.mooner.dev/' },
						{ label: 'Source ↗', href: 'https://github.com/mooner1022/StarLight' }
					]
				}
			},
			{
				id: 'site',
				name: 'mooner.dev',
				subtitle: '이전 개인 웹사이트',
				year: '2025',
				status: 'Personal · Retired',
				desc: 'SvelteKit + TypeScript로 직접 만든 개인 웹사이트. Home, About, Experience, Projects, Skills 페이지를 손수 채웠습니다. 지금은 이 이력서로 바뀌었습니다.',
				tags: [{ label: 'SvelteKit' }, { label: 'TypeScript' }, { label: 'Tailwind' }],
				card: {
					title: '이전 개인 웹사이트',
					specs: [
						['Stack', 'SvelteKit · TypeScript · Tailwind'],
						['Host', 'GitHub Pages'],
						['Pages', 'home · about · experience · projects · skills']
					]
				}
			}
		],
		more: {
			summary: `6 repos · ★ ${stats.stars}`,
			repos: [
				{ name: 'PeekAlert', stars: '★ 3', desc: 'Java·Kotlin에서 쓰는 가볍고 커스터마이즈 가능한 Android 알림 라이브러리', href: 'https://github.com/mooner1022/PeekAlert' },
				{ name: 'Laika', stars: '★ 3', desc: 'Remote-Kakao 호환 코루틴 기반 Kotlin 클라이언트 (WIP)', href: 'https://github.com/mooner1022/Laika' },
				{ name: 'Dotenv-KMP', stars: '★ 2', desc: 'Kotlin Multiplatform용 dotenv 리더/파서', href: 'https://github.com/mooner1022/Dotenv-KMP' },
				{ name: 'ChatBot-Benchmark', stars: '★ 2', desc: '메신저봇·StarLight 등 자동응답 봇 벤치마크', href: 'https://github.com/mooner1022/ChatBot-Benchmark' },
				{ name: 'K-akaoLink', stars: '★ 2', desc: 'Java/Kotlin용 KakaoLink 모듈', href: 'https://github.com/mooner1022/K-akaoLink' },
				{ name: 'NeoResume', stars: 'new', desc: '지금 보고 있는 이 이력서', href: 'https://github.com/mooner1022/NeoResume' }
			]
		}
	},

	toolkit: {
		meta: '● = Daily driver',
		groups: [
			{ name: 'Languages', items: [{ name: 'Kotlin', daily: true }, { name: 'Java', daily: true }, { name: 'C / C++' }, { name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'Svelte' }] },
			{ name: 'Backend', items: [{ name: 'Ktor', daily: true }, { name: 'Exposed DSL', daily: true }, { name: 'Spring Boot' }, { name: 'Node.js' }, { name: 'Express.js' }] },
			{ name: 'Android', items: [{ name: 'Jetpack Compose', daily: true }, { name: 'Android SDK' }, { name: 'Room' }, { name: 'SQLite' }] },
			{ name: 'Data & Storage', items: [{ name: 'PostgreSQL', daily: true }, { name: 'pgvector' }, { name: 'pg_bigm' }, { name: 'Redis' }, { name: 'MongoDB' }] },
			{ name: 'Tools', items: [{ name: 'Git' }, { name: 'Docker' }, { name: 'Gradle' }, { name: 'GitHub Actions' }, { name: 'IntelliJ IDEA' }] },
			{ name: 'Cloud', items: [{ name: 'AWS' }, { name: 'Terraform' }, { name: 'CloudFlare' }, { name: 'Traefik' }] },
			{ name: 'Making', items: [{ name: 'Fusion 360' }, { name: 'Bambu Lab X2D' }, { name: '자작 프린터 설계' }, { name: '회로 자작' }] }
		]
	},

	education: {
		meta: 'B.S. Computer Engineering',
		rows: [
			{
				when: '2023 — Now',
				name: '한양대학교 ERICA',
				detail: '컴퓨터공학 학사 (편입)',
				note: '2024–2026 군 휴학 · 2026년 2학기 복학 · 자료구조 · 알고리즘 · OOP · DB · SW공학 · OS · 네트워크'
			},
			{ when: '2021 — 2023', name: '호서대학교', detail: '컴퓨터공학 전공 · 편입으로 중퇴', note: '2023년 한양대 ERICA로 편입' },
			{
				when: '2016 —',
				name: '독학',
				detail: '8년차 · 정식 교육 없이 시작',
				journey: [
					{ year: '2016', text: 'JS 첫 코드' },
					{ year: '2017', text: 'Android (Java)' },
					{ year: '2018', text: '첫 앱 출시' },
					{ year: '2019', text: 'Kotlin 전환 · 풀스택' }
				]
			}
		]
	},

	now: {
		items: [
			{ k: 'School', text: '한양대학교 ERICA 컴퓨터공학과 복학 · 2026년 2학기 수강 중' },
			{ k: 'AMOA', text: 'AMOA 백엔드 개발 · 검색어 자동완성, 하이브리드 검색 고도화' },
			{ k: 'AGORA', text: 'AGORA 멀티에이전트 시스템을 사이드 프로젝트로 개발 중' },
			{ k: '지금 한강은｡', text: '유지보수 · Compose 마이그레이션 및 성능 최적화' }
		]
	},

	projectPage: {
		back: '모든 프로젝트',
		details: '자세히',
		prev: '이전',
		next: '다음',
		pending: '정리 중입니다.'
	},

	contact: {
		say: '느긋하게 커피 한 잔 어떠세요?',
		sub: '궁금한 점이 있다면 편하게 연락 주세요.',
		copy: '복사',
		clickToCopy: '클릭해서 복사'
	}
};
