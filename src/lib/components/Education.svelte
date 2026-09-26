<script lang="ts">
	import type { Resume } from '$lib/content/types';
	import { pad } from '$lib/format';
	import Section from './Section.svelte';

	let { education }: { education: Resume['education'] } = $props();
</script>

<Section id="education" cmd="cat ./edu.txt" title="Education" count={pad(education.rows.length)} sub="학력" meta={education.meta}>
	<ul class="rows">
		{#each education.rows as row (row.when)}
			<li>
				<time class="mono">{row.when}</time>
				<div>
					<p><b>{row.name}</b> <span class="muted">{row.detail}</span></p>
					{#if row.note}<p class="note">{row.note}</p>{/if}
					{#if row.journey}
						<ol class="journey">
							{#each row.journey as step (step.year)}<li><span class="y mono">{step.year}</span><p>{step.text}</p></li>{/each}
						</ol>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</Section>

<style>
	.rows li { display: grid; grid-template-columns: 220px 1fr; gap: 40px; padding: 22px 0; border-bottom: 1px solid var(--rule); }
	.rows li:first-child { border-top: 1px solid var(--rule); }
	time { color: var(--ink-3); padding-top: 3px; }
	b { font-weight: 650; letter-spacing: -0.025em; font-size: 18px; }
	.muted { color: var(--ink-2); }
	.note { margin-top: 6px; color: var(--ink-3); font-size: 14px; }
	.journey { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 18px; max-width: 640px; }
	.journey li { display: block; position: relative; padding: 18px 12px 0 0; border: 0 !important; background: linear-gradient(var(--ink-4), var(--ink-4)) 0 4px / 100% 1px no-repeat; }
	.journey li:last-child { background-size: 30% 1px; }
	.journey li::before { content: ""; position: absolute; left: 0; top: 0; width: 8px; height: 8px; border: 1px solid var(--ink-3); background: var(--paper); transform: rotate(45deg); }
	.journey li:last-child::before { border-color: var(--signal); background: var(--signal); }
	.y { color: var(--ink); font-weight: 600; }
	.journey p { margin-top: 2px; font-size: 13.5px; color: var(--ink-2); }

	@media (max-width: 960px) {
		.rows li { grid-template-columns: 1fr; gap: 12px; }
		.journey { grid-template-columns: 1fr 1fr; row-gap: 20px; }
	}
	@media print {
		.rows li { break-inside: avoid; }
	}
</style>
