import type { Lang, ProjectDetail } from '../types';

// Sources: the previous site's history is merged into this repo (8119380^2, last commit 3e47bf9, 2025-09-28 — 2025-10-13).
export const site: Record<Lang, ProjectDetail> = {
	ko: {
		lead: '이 이력서 전에 mooner.dev에 있던 개인 사이트입니다. **SvelteKit**으로 만든 정적 사이트였고, 지금은 이 페이지가 그 자리를 대신합니다.',
		facts: [
			{ k: 'Period', v: '2025.09 — 2025.10' },
			{ k: 'Role', v: '1인 · 디자인 · 개발' },
			{ k: 'Stack', v: 'SvelteKit · Svelte 5 · TypeScript · Tailwind CSS 4' },
			{ k: 'Host', v: 'GitHub Pages · DNS Cloudflare' },
			{ k: 'Status', v: 'Retired' }
		],
		structure: {
			intro: '페이지 다섯 개와 공용 컴포넌트 몇 개로 된 작은 사이트였습니다.',
			items: [
				{ name: 'routes/', text: 'Home, About, Experience, Projects, Skills 다섯 페이지. 모두 빌드할 때 HTML로 미리 만들었습니다.' },
				{ name: 'components/', text: 'Hero, Navigation, TechStack, ThemeToggle, ContactButtons.' },
				{ name: 'stores/theme.ts', text: '라이트/다크 테마를 저장하고, 처음 방문하면 시스템 설정을 따릅니다.' },
				{ name: '.github/workflows', text: 'main에 푸시하면 빌드해서 GitHub Pages에 올리는 배포 워크플로.' }
			]
		},
		architecture: {
			intro: '서버 없이 **정적 파일**만 올리는 구조입니다. 빌드한 결과를 GitHub Pages가 서빙하고, 도메인 DNS만 Cloudflare에 있습니다.',
			notes: [
				'adapter-static으로 모든 페이지를 프리렌더해 스크립트가 없어도 내용이 보입니다.',
				'스타일은 Tailwind CSS 4의 Vite 플러그인으로 빌드 시점에 만들었습니다.',
				'이 이력서도 같은 저장소와 같은 배포 경로(GitHub Actions → GitHub Pages)를 이어받았습니다.'
			]
		},
		cases: [],
		shots: [
			{ src: '/projects/site/home.webp', width: 1440, height: 900, alt: '이전 mooner.dev 첫 화면. 문어 아바타, Minki Moon, Backend & Android Developer 소개와 연락 버튼', caption: '첫 화면 · 라이트' },
			{ src: '/projects/site/home-dark.webp', width: 1440, height: 900, alt: '같은 첫 화면의 다크 테마', caption: '첫 화면 · 다크' }
		]
	},
	en: {
		lead: 'The personal site that lived at mooner.dev before this résumé. A static site built with **SvelteKit**; this page has taken its place.',
		facts: [
			{ k: 'Period', v: '2025.09 — 2025.10' },
			{ k: 'Role', v: 'Solo · design · build' },
			{ k: 'Stack', v: 'SvelteKit · Svelte 5 · TypeScript · Tailwind CSS 4' },
			{ k: 'Host', v: 'GitHub Pages · DNS on Cloudflare' },
			{ k: 'Status', v: 'Retired' }
		],
		structure: {
			intro: 'A small site: five pages and a handful of shared components.',
			items: [
				{ name: 'routes/', text: 'Home, About, Experience, Projects and Skills, all rendered to HTML at build time.' },
				{ name: 'components/', text: 'Hero, Navigation, TechStack, ThemeToggle, ContactButtons.' },
				{ name: 'stores/theme.ts', text: 'Remembers light or dark and follows the system setting on a first visit.' },
				{ name: '.github/workflows', text: 'Builds on every push to main and publishes to GitHub Pages.' }
			]
		},
		architecture: {
			intro: 'No server, only **static files**. GitHub Pages serves the build; only the domain’s DNS is on Cloudflare.',
			notes: [
				'adapter-static prerenders every page, so the content is there without scripts.',
				'Styles come from Tailwind CSS 4 through its Vite plugin at build time.',
				'This résumé took over the same repository and the same deploy path (GitHub Actions → GitHub Pages).'
			]
		},
		cases: [],
		shots: [
			{ src: '/projects/site/home.webp', width: 1440, height: 900, alt: 'The previous mooner.dev home page: octopus avatar, Minki Moon, Backend & Android Developer intro and contact buttons', caption: 'Home · light' },
			{ src: '/projects/site/home-dark.webp', width: 1440, height: 900, alt: 'The same home page in the dark theme', caption: 'Home · dark' }
		]
	}
};
