<script lang="ts">
	import { profile } from '$lib/content';
	import type { Resume } from '$lib/content/types';
	import { pad } from '$lib/format';
	import Section from './Section.svelte';

	let { now }: { now: Resume['now'] } = $props();
</script>

<Section id="now" cmd="tail -f ./now.log" title="Now" count={pad(now.items.length)} sub="지금" meta="Updated {profile.updated}" live>
	<ul class="log">
		{#each now.items as item, i (item.k)}
			<li><p class="k mono"><i>#{i + 1}</i>{item.k}</p><div><p>{item.text}</p></div></li>
		{/each}
	</ul>
</Section>

<style>
	.log li { display: grid; grid-template-columns: 220px 1fr; gap: 40px; padding: 14px 0; border-bottom: 1px dashed var(--rule); }
	.log li:first-child { padding-top: 0; }
	.log .k { color: var(--ink-3); display: flex; gap: 14px; padding-top: 3px; }
	.log .k i { font-style: normal; color: var(--ink-4); }
	.log p { color: var(--ink); }

	@media (max-width: 960px) {
		.log li { grid-template-columns: 1fr; gap: 4px; }
	}
	@media print {
		.log li { break-inside: avoid; }
	}
</style>
