<script lang="ts">
	import type { Resume } from '$lib/content/types';
	import { pad } from '$lib/format';
	import Section from './Section.svelte';

	let { awards }: { awards: Resume['awards'] } = $props();
</script>

<Section id="awards" cmd="cat ./awards.txt" title="Awards" count={pad(awards.rows.length)} sub="수상" meta={awards.meta}>
	<ul class="rows">
		{#each awards.rows as row (row.name)}
			<li>
				<time class="mono">{row.when}</time>
				<div>
					<p class="award mono">{row.award}</p>
					<p><b>{row.name}</b> <span class="muted">{row.detail}</span></p>
					{#if row.note}<p class="note">{row.note}</p>{/if}
					{#if row.links?.length}<p class="go mono">{#each row.links as link (link.href)}<a href={link.href}>{link.label}</a>{/each}</p>{/if}
				</div>
			</li>
		{/each}
	</ul>
</Section>

<style>
	/* same row rhythm as Education */
	.rows li { display: grid; grid-template-columns: 220px 1fr; gap: 40px; padding: 22px 0; border-bottom: 1px solid var(--rule); }
	.rows li:first-child { border-top: 1px solid var(--rule); }
	time { color: var(--ink-3); padding-top: 3px; }
	.award { color: var(--signal); font-weight: 600; margin-bottom: 6px; }
	b { font-weight: 650; letter-spacing: -0.025em; font-size: 18px; }
	.muted { color: var(--ink-2); }
	.note { margin-top: 6px; color: var(--ink-3); font-size: 14px; max-width: 720px; }
	.go { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 12px; }
	.go a { color: var(--ink); border-bottom: 1px solid var(--ink-4); padding-bottom: 2px; transition: border-color .2s; }
	.go a:hover { border-color: var(--ink); }

	@media (max-width: 960px) {
		.rows li { grid-template-columns: 1fr; gap: 12px; }
	}
	@media print {
		.rows li { break-inside: avoid; }
	}
</style>
