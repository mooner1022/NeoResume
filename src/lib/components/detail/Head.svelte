<script lang="ts">
	import type { Project, ProjectDetail } from '$lib/content/types';
	import { pad, rich } from '$lib/format';
	import ProjectThumb from '../ProjectThumb.svelte';

	let {
		project: p,
		detail: d,
		index,
		total,
		back,
		home
	}: { project: Project; detail: ProjectDetail; index: number; total: number; back: string; home: string } = $props();

	// the spec card is the same one the list previews on hover, so the page reads as that card opened up
	const facts = $derived(d.facts.length ? d.facts.map((f) => [f.k, f.v] as const) : p.card.specs);
</script>

<header class="head">
	<div class="main">
		<nav class="crumb mono"><a href="{home}#projects">← {back}</a><span>{pad(index + 1)} / {pad(total)}</span></nav>
		<p class="cmd mono lc"><b>mooner</b>:~/resume $ cat projects/{p.id}/README.md</p>
		<h1 class="wide">{p.name}</h1>
		<p class="subtitle">{p.subtitle}</p>
		{#if d.lead}<p class="lead">{@html rich(d.lead)}</p>{/if}
		<p class="tags mono">{#each p.tags as tag (tag.label)}<span class:sig={tag.signal}>{tag.label}</span>{/each}</p>
		{#if p.card.links}<p class="go mono">{#each p.card.links as link (link.href)}<a href={link.href}>{link.label}</a>{/each}</p>{/if}
	</div>
	<aside class="spec">
		<span class="corners" aria-hidden="true"></span>
		<p class="spec-head mono"><span class="lc">$ cat {p.id}/spec</span><span>{p.year} · {p.status}</span></p>
		<div class="thumb" aria-hidden="true"><ProjectThumb id={p.id} /></div>
		<dl>
			{#each facts as [k, v] (k)}<dt class="mono">{k}</dt><dd>{v}</dd>{/each}
		</dl>
	</aside>
</header>

<style>
	.head { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 72px; align-items: start; padding: 40px 0 96px; }
	.crumb { display: flex; justify-content: space-between; gap: 16px; color: var(--ink-3); margin-bottom: 48px; }
	.crumb a { color: var(--ink-2); transition: color .2s; }
	.crumb a:hover { color: var(--ink); }
	h1 { font-size: 56px; font-weight: 650; line-height: 1.05; letter-spacing: -0.03em; text-wrap: balance; }
	.subtitle { margin-top: 14px; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink-2); }
	.lead { margin-top: 28px; font-size: 18px; line-height: 1.7; letter-spacing: -0.015em; color: var(--ink); text-wrap: pretty; max-width: 58ch; }
	.lead :global(b) { font-weight: 650; }
	.tags { margin-top: 28px; }
	.sig { color: var(--signal); }
	.go { display: flex; gap: 22px; margin-top: 22px; }
	.go a { color: var(--ink); border-bottom: 1px solid var(--ink-4); padding-bottom: 2px; transition: border-color .2s; }
	.go a:hover { border-color: var(--ink); }

	.spec { position: relative; padding: 20px 22px 22px; margin-top: 64px; }
	.spec-head { display: flex; justify-content: space-between; gap: 12px; color: var(--ink-3); }
	.thumb { margin: 16px 0 18px; aspect-ratio: 16 / 9; border: 1px solid var(--rule); background: var(--tint); display: grid; place-items: center; overflow: hidden; }
	dl { display: grid; grid-template-columns: 84px 1fr; row-gap: 8px; }
	dt { color: var(--ink-3); padding-top: 2px; }
	dd { font-size: 14px; color: var(--ink); }

	@media (max-width: 960px) {
		.head { grid-template-columns: 1fr; gap: 40px; padding: 24px 0 56px; }
		.crumb { margin-bottom: 32px; }
		h1 { font-size: 40px; }
		.subtitle { font-size: 17px; }
		.lead { font-size: 16px; }
		.spec { margin-top: 0; }
	}
	@media print {
		.crumb, .cmd, .thumb, .corners { display: none !important; }
		.head { display: block; padding: 0 0 16px; }
		.spec { padding: 12px 0 0; margin: 0; }
	}
</style>
