<script lang="ts">
	import { profile } from '$lib/content';
	import type { Lang, Resume } from '$lib/content/types';
	import { copier } from '$lib/copy.svelte';
	import { reducedMotion } from '$lib/motion';
	import Printer from './Printer.svelte';
	import ScrollCue from './ScrollCue.svelte';

	let { lang, hero }: { lang: Lang; hero: Resume['hero'] } = $props();

	const discord = copier(profile.discord);

	// typewriter — plays once per language; the page is not remounted when the language changes
	const typedLangs = new Set<Lang>();
	let typed = $state<string | null>(null);
	let ready = $state(false);
	$effect(() => {
		const text = hero.tagline;
		ready = true;
		if (typedLangs.has(lang) || reducedMotion()) {
			typed = null;
			return;
		}
		typedLangs.add(lang);
		let i = 0;
		typed = '';
		const step = () => {
			typed = text.slice(0, ++i);
			if (i < text.length) timer = setTimeout(step, 45 + Math.random() * 40);
		};
		let timer = setTimeout(step, 350);
		return () => clearTimeout(timer);
	});
</script>

<section class="hero">
	<div class="who">
		<p class="id mono lc"><span class="avatar"><img src="/avatar.png" width="46" height="46" alt="" /></span>@{profile.handle}</p>
		<h1 class="name"><span class="ko">{profile.name.ko}</span><span class="en wide">{profile.name.en}</span></h1>
		<p class="tagline"><span class="typed" class:ready>{typed ?? hero.tagline}</span><span class="caret" aria-hidden="true"></span></p>
		<p class="intro">
			{#each hero.intro as sentence, i}{#if i}{' '}{/if}<span>{sentence}</span>{/each}
		</p>
		<nav class="links mono">
			<a href="mailto:{profile.email}">Email</a>
			<a href={profile.github.href}>GitHub ↗</a>
			<button type="button" class:done={discord.done} data-copy={profile.discord} aria-label="Discord ID: {profile.discord} (copy)" onclick={discord.copy}><span>{discord.done ? 'Copied ✓' : 'Discord'}</span></button>
		</nav>
	</div>

	<Printer {hero} />
	<ScrollCue />
</section>

<style>
	.hero { position: relative; z-index: 1; flex: 1 0 auto; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 72px; align-items: center; padding: 24px 0 88px; }
	.id { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; color: var(--ink-3); }
	/* transparent PNG: light tile on paper, inverted tile in dark so the outline stays legible */
	.avatar { flex: none; display: grid; place-items: center; width: 60px; height: 60px; border-radius: 16px; border: 1px solid var(--rule); background: rgba(255, 255, 255, .72); transition: transform .5s var(--ease); }
	.avatar img { display: block; width: 76%; height: auto; }
	.avatar:hover { transform: rotate(-6deg); }
	:global(.dark) .avatar { background: var(--ink); border-color: transparent; }
	.name { display: flex; align-items: baseline; gap: 18px; flex-wrap: wrap; line-height: 1; }
	.name .ko { font-size: 68px; font-weight: 800; letter-spacing: -0.045em; }
	.name .en { font-size: 30px; font-weight: 500; color: var(--ink-4); }
	.tagline { margin-top: 26px; font-size: 22px; font-weight: 600; letter-spacing: -0.03em; min-height: 1.5em; }
	/* the prerendered tagline waits for hydration so it does not flash before typing; shown anyway if scripts never run */
	:global(.js) .typed:not(.ready) { visibility: hidden; animation: show-anyway 0s 1.5s forwards; }
	@keyframes show-anyway { to { visibility: visible; } }
	.caret { display: inline-block; width: .5em; height: 1.05em; margin-left: 3px; vertical-align: -0.16em; background: var(--signal); animation: blink 1.05s steps(1) infinite; }
	@keyframes blink { 50% { opacity: 0; } }
	.intro { margin-top: 12px; color: var(--ink-2); text-wrap: pretty; }
	.intro span { display: block; }   /* one sentence per line */

	.links { display: flex; gap: 22px; margin-top: 34px; flex-wrap: wrap; }
	.links a, .links button { position: relative; color: var(--ink-2); padding-bottom: 3px; letter-spacing: inherit; text-transform: inherit; transition: color .2s; }
	.links a::after, .links button::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform: scaleX(.25); transform-origin: left; opacity: .5; transition: transform .35s var(--ease), opacity .2s; }
	.links a:hover, .links button:hover { color: var(--ink); }
	.links a:hover::after, .links button:hover::after { transform: none; opacity: 1; }
	/* Discord ID peeks out under the label on hover */
	.links button::before { content: attr(data-copy); position: absolute; left: 0; top: calc(100% + 8px); color: var(--ink-3); text-transform: none; letter-spacing: .02em; white-space: nowrap; opacity: 0; transform: translateY(-3px); transition: opacity .2s, transform .3s var(--ease); pointer-events: none; }
	.links button:hover::before, .links button:focus-visible::before { opacity: 1; transform: none; }
	.links button.done { color: var(--signal); }

	@media (max-width: 960px) {
		.hero { grid-template-columns: 1fr; gap: 48px; padding: 16px 0 64px; }
		.name .ko { font-size: 52px; }
		.name .en { font-size: 22px; }
		.tagline { font-size: 19px; }
	}
	@media (prefers-reduced-motion: reduce) {
		.caret { animation: none; }
		.avatar { transition: none; }
		.avatar:hover { transform: none; }
	}
	@media print {
		.caret { display: none !important; }
		.links button { display: inline-flex; flex-direction: row-reverse; gap: 8px; }   /* print "Discord mooner.dev" */
		.links button::before { position: static; opacity: 1; transform: none; }
		.links button::after { display: none; }
		.hero { display: block; padding: 0 0 20px; }
	}
</style>
