<script lang="ts">
	import type { Resume } from '$lib/content/types';
	import { pad } from '$lib/format';
	import Section from './Section.svelte';

	let { toolkit }: { toolkit: Resume['toolkit'] } = $props();

	const total = $derived(toolkit.groups.reduce((n, g) => n + g.items.length, 0));
</script>

<Section id="toolkit" cmd="ls -la ./skills" title="Toolkit" count={pad(total)} sub="기술" meta={toolkit.meta}>
	<div class="toolkit">
		{#each toolkit.groups as group (group.name)}
			<div>
				<h3 class="mono"><span>{group.name}</span><span>{pad(group.items.length)}</span></h3>
				<ul>
					{#each group.items as item (item.name)}<li>{item.name}{#if item.daily}{' '}<span>●</span>{/if}</li>{/each}
				</ul>
			</div>
		{/each}
	</div>
</Section>

<style>
	.toolkit { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--ink); }
	.toolkit > div { padding: 20px 24px 28px 0; }
	.toolkit > div:not(:nth-child(4n+1)) { padding-left: 24px; border-left: 1px solid var(--rule); }
	.toolkit > div:nth-child(n+5) { border-top: 1px solid var(--rule); }
	h3 { display: flex; justify-content: space-between; color: var(--ink-3); font-weight: 400; margin-bottom: 14px; }
	li { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--rule); }
	li:last-child { border-bottom: 0; }
	li span { color: var(--signal); }

	@media (max-width: 960px) {
		.toolkit { grid-template-columns: 1fr 1fr; }
		.toolkit > div, .toolkit > div:not(:nth-child(4n+1)) { padding: 18px 12px 18px 0; border-left: 0; border-top: 1px solid var(--rule); }
		.toolkit > div:nth-child(even) { padding-left: 14px; border-left: 1px solid var(--rule); }
		.toolkit > div:nth-child(-n+2) { border-top: 0; }
	}
</style>
