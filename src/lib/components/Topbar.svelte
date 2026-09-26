<script lang="ts">
	import { onMount } from 'svelte';
	import type { Lang } from '$lib/content/types';

	let { lang }: { lang: Lang } = $props();

	// the theme is applied in app.html before paint; the pressed look comes from CSS so it is right before hydration too
	let dark = $state<boolean>();
	onMount(() => (dark = document.documentElement.classList.contains('dark')));

	const setTheme = (theme: 'light' | 'dark') => {
		dark = theme === 'dark';
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('theme', theme);
		} catch {}
	};
</script>

<header class="topbar mono">
	<span class="build">mooner / Resume <span class="ticks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></span>
	<span class="switches">
		<span class="toggle" role="group" aria-label="언어 / Language">
			<a href="/" hreflang="ko" aria-current={lang === 'ko' ? 'page' : undefined} data-sveltekit-noscroll data-sveltekit-keepfocus>KO</a><span>/</span><a href="/en/" hreflang="en" aria-current={lang === 'en' ? 'page' : undefined} data-sveltekit-noscroll data-sveltekit-keepfocus>EN</a>
		</span>
		<span class="toggle" role="group" aria-label="테마 / Theme">
			<button type="button" data-theme="light" aria-pressed={dark === undefined ? undefined : !dark} onclick={() => setTheme('light')}>Light</button><span>/</span><button type="button" data-theme="dark" aria-pressed={dark} onclick={() => setTheme('dark')}>Dark</button>
		</span>
	</span>
</header>

<style>
	.topbar { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 28px 0; color: var(--ink-3); }
	.build { display: inline-flex; align-items: center; gap: 10px; }
	.ticks { display: inline-flex; gap: 2px; }
	.ticks i { width: 3px; height: 9px; background: var(--ink-3); opacity: .9; }
	.ticks i:nth-child(n+5) { opacity: .25; }
	.switches { display: inline-flex; gap: 28px; }
	.toggle { display: inline-flex; gap: 8px; }
	.toggle a, .toggle button { color: var(--ink-3); letter-spacing: inherit; text-transform: inherit; font: inherit; transition: color .2s; }
	.toggle a:hover, .toggle button:hover { color: var(--ink-2); }
	.toggle a[aria-current="page"], :global(html:not(.dark)) [data-theme="light"], :global(html.dark) [data-theme="dark"] { color: var(--ink); font-weight: 600; }
	.toggle span { opacity: .5; }

	@media (max-width: 960px) {
		.switches { gap: 16px; }
	}
	@media print {
		.switches { display: none !important; }
	}
</style>
