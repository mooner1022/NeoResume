<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';
	import Field from '$lib/components/Field.svelte';
	import Section from '$lib/components/Section.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import Cases from '$lib/components/detail/Cases.svelte';
	import Diagram from '$lib/components/detail/Diagram.svelte';
	import Head from '$lib/components/detail/Head.svelte';
	import Pager from '$lib/components/detail/Pager.svelte';
	import Shots from '$lib/components/detail/Shots.svelte';
	import { profile } from '$lib/content';
	import { pad, rich } from '$lib/format';

	let { data } = $props();
	const c = $derived(data.c);
	const p = $derived(data.project);
	const d = $derived(data.detail);
	const home = $derived(data.lang === 'en' ? '/en/' : '/');
	const path = $derived(`projects/${p.id}/`);
	const cwd = $derived(`resume/projects/${p.id}`);
	const title = $derived(`${p.name} — ${data.lang === 'en' ? profile.name.en : profile.name.ko}`);
	// the page's own lead, not the list card's line, so the summary matches what the page says
	const description = $derived(d.lead ? d.lead.replace(/\*\*|`/g, '') : p.desc);

	$effect(() => {
		document.documentElement.lang = data.lang;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{profile.site}{home}{path}" />
	<link rel="alternate" hreflang="ko" href="{profile.site}/{path}" />
	<link rel="alternate" hreflang="en" href="{profile.site}/en/{path}" />
	<link rel="alternate" hreflang="x-default" href="{profile.site}/{path}" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content={c.meta.locale} />
</svelte:head>

<Field />

<div class="container">
	<Topbar lang={data.lang} {path} />
	<Head project={p} detail={d} index={data.index} total={c.projects.items.length} back={c.projectPage.back} {home} />
</div>

<main>
	<Section id="structure" {cwd} cmd="tree -L 1" title="Structure" count="01" sub="구조" meta={`${pad(d.structure.items.length)} parts`}>
		<div class="two">
			<p class="intro">{@html rich(d.structure.intro)}</p>
			<dl class="parts">
				{#each d.structure.items as item (item.name)}
					<div><dt class="mono lc">{item.name}</dt><dd>{@html rich(item.text)}</dd></div>
				{/each}
			</dl>
		</div>
	</Section>

	<Section id="architecture" {cwd} cmd="cat docs/architecture.md" title="Architecture" count="02" sub="아키텍처" meta="Data flow">
		<Diagram id={p.id} label={d.architecture.intro} />
		<div class="two notes">
			<p class="intro">{@html rich(d.architecture.intro)}</p>
			<ul>
				{#each d.architecture.notes as note}<li>{@html rich(note)}</li>{/each}
			</ul>
		</div>
	</Section>

	<Section id="cases" {cwd} cmd="git log --grep=fix" title="Problem solving" count="03" sub="문제 해결" meta={`${pad(d.cases.length)} cases`}>
		<Cases cases={d.cases} pending={c.projectPage.pending} />
	</Section>

	{#if d.shots.length}
		<Section id="screens" {cwd} cmd="ls ./screens" title="Screens" count="04" sub="화면" meta={`${pad(d.shots.length)} images`}>
			<Shots shots={d.shots} />
		</Section>
	{/if}

	<Pager prev={data.prev} next={data.next} {home} labels={c.projectPage} />
</main>

<Contact contact={c.contact} />

<style>
	.intro { color: var(--ink); font-size: 17px; line-height: 1.7; letter-spacing: -0.015em; text-wrap: pretty; max-width: 36ch; }
	.intro :global(b), .parts :global(b), .notes :global(b) { font-weight: 600; color: var(--ink); }
	.parts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 40px; }
	.parts > div { padding: 16px 0; border-top: 1px solid var(--rule); }
	.parts dt { color: var(--ink); font-size: 12px; letter-spacing: .02em; margin-bottom: 6px; }
	.parts dd { color: var(--ink-2); font-size: 15px; text-wrap: pretty; }
	.notes { margin-top: 48px; }
	.notes ul { display: grid; gap: 12px; }
	.notes li { position: relative; padding-left: 18px; color: var(--ink-2); text-wrap: pretty; max-width: 68ch; }
	.notes li::before { content: ""; position: absolute; left: 0; top: .72em; width: 7px; height: 1px; background: var(--ink-3); }

	@media (max-width: 960px) {
		.parts { grid-template-columns: 1fr; }
		.intro { max-width: none; }
	}
</style>
