import { profile } from './profile';
import type { Resume } from './types';

const { stats } = profile;

export const en: Resume = {
	meta: {
		title: 'Minki Moon 문민기 — Backend & Android Developer',
		description: 'Résumé of Minki Moon (mooner), backend and Android developer. Kotlin · Ktor · Jetpack Compose.',
		locale: 'en_US'
	},

	hero: {
		tagline: 'I build backends and Android apps.',
		intro: ['Computer Engineering student at Hanyang University (ERICA).', 'Self-taught since 2016.'],
		figureLabel: 'Decorative panel showing requests between a client and a server',
		flowLabel: 'Animation of requests travelling from an Android client through Redis to a Ktor server',
		hint: 'Click to send a request · not real data'
	},

	about: {
		meta: 'Since 2016 — Self-taught',
		facts: [
			{ k: 'Base', v: [profile.base] },
			{ k: 'Stack', v: ['Kotlin · Ktor', 'Jetpack Compose'] },
			{ k: 'Track', v: [`${stats.years} yrs`, `★ ${stats.stars} GitHub`, `${stats.installs} installs`] },
			{ k: 'Lang', v: ['ko, en'] },
			{ k: 'Off', v: ['3D printing · CAD'] }
		],
		prose: [
			'Ordinary undergrad at Hanyang University (ERICA), majoring in Computer Engineering. Self-taught since 2016 — 8 years in and still hungry.',
			'Builds robust backend systems in **Java / Kotlin** and crafts Android apps with **Jetpack Compose**. Chasing clean, maintainable code and systems that actually scale.',
			'Back at Hanyang ERICA since the second semester of 2026 after finishing military service — classes by day, backend and side projects the rest of the time.',
			'Away from the screen: 3D printing and modeling. Used to design, build, and maintain a printer from scratch; these days a Bambu Lab X2D handles the printing and Fusion 360 gets most of the attention.'
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
				role: 'Computer Engineering · returned from leave',
				points: ['Returned from military leave for the 2026 fall semester', 'Building the **AMOA** backend and the **AGORA** side project alongside coursework']
			},
			{
				when: '2024 — 2026',
				place: 'Korea',
				org: 'ROK Air Force',
				role: 'IT Systems Management Specialist',
				points: [
					'Operated and maintained internal military information systems',
					'Kept open-source projects and personal services alive during off-hours',
					'Learned to ship focused work within tight operational constraints'
				]
			},
			{
				when: '2022 — Now',
				place: 'Remote',
				now: true,
				org: 'Project StarLight',
				role: 'Open Source · Maintainer',
				tags: ['Kotlin', 'Android', 'Plugin API'],
				points: [
					'Designed a plugin-based Android auto-reply framework in Kotlin',
					'Cross-messenger integration with an extensible scripting API',
					'**★ 46** on GitHub, **1,500+ downloads** — maintaining the plugin ecosystem and issues'
				]
			},
			{
				when: '2020',
				place: 'Korea',
				org: 'IT Company',
				role: 'Software Intern · Backend',
				points: [
					'Two-month internship contributing to a production backend codebase',
					'First hands-on experience with code review, team workflow, and deployment pipelines'
				]
			},
			{
				when: '2018 — Now',
				place: 'Seoul',
				now: true,
				org: '지금 한강은｡',
				role: 'Personal Service · Creator & Full-stack',
				tags: ['Kotlin', 'Ktor', 'Redis', 'Traefik'],
				points: [
					'Designed, built, and shipped an Android app for real-time Han River water temperature',
					'Ktor backend + Redis caching — stable responses under viral traffic spikes',
					'**46,300+ downloads** and **4.85 ★** (273 reviews) on Google Play'
				]
			},
			{
				when: '2017',
				place: '—',
				org: 'Indie Android',
				role: 'Solo Android Developer',
				points: ['Shipped first Android app on Google Play in 2017, at age 17', 'Paved the way to later projects including Project StarLight']
			}
		]
	},

	projects: {
		meta: 'Backend / Android / OSS',
		items: [
			{
				id: 'amoa',
				name: 'AMOA',
				subtitle: 'Hybrid-search backend',
				year: '2026 —',
				status: 'Backend · Ongoing',
				desc: 'Kotlin + Ktor + PostgreSQL on a hexagonal architecture. pgvector hybrid search (ANN + keyword CTE, RRF reranking) with an outbox-pattern embedding pipeline.',
				tags: [{ label: 'Ktor' }, { label: 'pgvector' }, { label: 'AWS EC2' }, { label: 'Terraform' }, { label: 'GitHub Actions' }],
				card: {
					title: 'Hybrid-search backend',
					specs: [
						['Arch', 'Hexagonal · Kotlin/Ktor'],
						['Search', 'pgvector ANN + keyword CTE, RRF rerank'],
						['Pipeline', 'Outbox-pattern embedding indexing'],
						['Infra', 'AWS EC2 · Terraform · SSM'],
						['Team', '4 · PM · FE · BE ×2']
					]
				}
			},
			{
				id: 'agora',
				name: 'AGORA',
				subtitle: 'Multi-agent decision system',
				year: '2026',
				status: 'Side · Demoed',
				desc: 'CTO · CCO/CMO · Decision Manager agents debate in rounds. SearXNG + Trafilatura web grounding, SSE streaming, prompt caching. MVP demoed to a client.',
				tags: [{ label: 'Ktor' }, { label: 'Exposed' }, { label: 'SvelteKit' }, { label: 'SSE' }],
				card: {
					title: 'Multi-agent decision system',
					specs: [
						['Agents', 'CTO · CCO/CMO · Decision Manager'],
						['Flow', 'Round-based debate → consensus'],
						['Grounding', 'SearXNG + Trafilatura'],
						['Stack', 'Ktor · Exposed · SvelteKit'],
						['Status', 'MVP demoed to a client']
					]
				}
			},
			{
				id: 'hanriv',
				name: '지금 한강은｡',
				subtitle: 'Real-time Han River temperature',
				year: '2018 —',
				status: 'Android · Live',
				desc: 'Modern Korean UI/UX temperature monitor. Ktor backend, Redis caching, Traefik LB — steady in production. Currently migrating to Jetpack Compose: Baseline Profiles and HorizontalPager jank fixes.',
				tags: [
					{ label: '★ 4.85 (273)', signal: true },
					{ label: '46.3K+ DL', signal: true },
					{ label: 'Kotlin' },
					{ label: 'Ktor' },
					{ label: 'Redis' }
				],
				card: {
					title: 'Real-time Han River temperature',
					specs: [
						['Rating', '★ 4.85 · 273 reviews'],
						['Installs', '46,300+'],
						['Stack', 'Kotlin · Ktor · Redis · Traefik'],
						['Now', 'Compose migration · Baseline Profile']
					],
					links: [{ label: 'Google Play ↗', href: 'https://play.google.com/store/apps/details?id=com.temp.hanriv.moonm' }]
				}
			},
			{
				id: 'starlight',
				name: 'Project StarLight',
				subtitle: 'Scriptable messenger auto-reply framework',
				year: '2022 —',
				status: 'Open Source',
				desc: 'Kotlin-based Android auto-reply platform with plugin architecture, extensible automation, and cross-messenger integration.',
				tags: [{ label: '★ 46', signal: true }, { label: '1.5K+ DL', signal: true }, { label: 'Kotlin' }, { label: 'Plugin' }],
				card: {
					title: 'Scriptable messenger auto-reply',
					specs: [
						['Arch', 'Plugin-based · scripting API'],
						['Reach', '★ 46 · 1,500+ downloads'],
						['Stack', 'Kotlin · Android'],
						['Role', 'Maintainer · 2022 —']
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
				subtitle: 'Previous personal site',
				year: '2024',
				status: 'Personal · Retired',
				desc: 'Personal site hand-built with Svelte + TypeScript. About / Projects / Home, curated by hand. Now replaced by this résumé.',
				tags: [{ label: 'Svelte' }, { label: 'TypeScript' }, { label: 'CloudFlare' }],
				card: {
					title: 'Previous personal site',
					specs: [
						['Stack', 'Svelte · TypeScript'],
						['Host', 'CloudFlare Pages'],
						['Pages', 'home · about · projects']
					]
				}
			}
		],
		more: {
			summary: `6 repos · ★ ${stats.stars}`,
			repos: [
				{ name: 'PeekAlert', stars: '★ 3', desc: 'Lightweight, highly customizable alert library for Android (Java & Kotlin)', href: 'https://github.com/mooner1022/PeekAlert' },
				{ name: 'Laika', stars: '★ 3', desc: 'Remote-Kakao compatible, coroutine-based Kotlin client (WIP)', href: 'https://github.com/mooner1022/Laika' },
				{ name: 'Dotenv-KMP', stars: '★ 2', desc: 'Kotlin Multiplatform dotenv reader / parser', href: 'https://github.com/mooner1022/Dotenv-KMP' },
				{ name: 'ChatBot-Benchmark', stars: '★ 2', desc: 'Benchmarks for messenger auto-reply bots incl. StarLight', href: 'https://github.com/mooner1022/ChatBot-Benchmark' },
				{ name: 'K-akaoLink', stars: '★ 2', desc: 'KakaoLink module for Java / Kotlin', href: 'https://github.com/mooner1022/K-akaoLink' },
				{ name: 'NeoResume', stars: 'new', desc: "The résumé you're reading right now", href: 'https://github.com/mooner1022/NeoResume' }
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
			{ name: 'Making', items: [{ name: 'Fusion 360' }, { name: 'Bambu Lab X2D' }, { name: 'DIY printer design' }, { name: 'DIY electronics' }] }
		]
	},

	education: {
		meta: 'B.S. Computer Engineering',
		rows: [
			{
				when: '2023 — Now',
				name: 'Hanyang University · ERICA',
				detail: 'B.S. Computer Engineering (transferred)',
				note: 'Military leave 2024–2026, returned fall 2026 · data structures, algorithms, OOP, databases, SE, OS, networks'
			},
			{ when: '2021 — 2023', name: 'Hoseo University', detail: 'Computer Science · transferred out', note: 'Transferred to Hanyang ERICA in 2023' },
			{
				when: '2016 —',
				name: 'Self-taught',
				detail: '8 years in — no formal training',
				journey: [
					{ year: '2016', text: 'First line of JS' },
					{ year: '2017', text: 'Android (Java)' },
					{ year: '2018', text: 'First app shipped' },
					{ year: '2019', text: 'Kotlin & full-stack' }
				]
			}
		]
	},

	now: {
		items: [
			{ k: 'School', text: 'Back at Hanyang ERICA, Computer Engineering — 2026 fall semester' },
			{ k: 'AMOA', text: 'Building the AMOA backend — search autocomplete & hybrid retrieval' },
			{ k: 'AGORA', text: 'Developing AGORA, a multi-agent decision system, on the side' },
			{ k: '지금 한강은｡', text: 'Maintenance — Compose migration & performance work' }
		]
	},

	contact: {
		say: 'Happy to trade coffee for conversation.',
		sub: 'If anything here catches your eye, feel free to reach out.',
		copy: 'Copy',
		clickToCopy: 'click to copy'
	}
};
