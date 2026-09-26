<script lang="ts">
	import type { Resume } from '$lib/content/types';
	import { rich } from '$lib/format';
	import Section from './Section.svelte';

	let { about }: { about: Resume['about'] } = $props();
</script>

<Section id="about" cmd="whoami" title="About" count="01" sub="소개" meta={about.meta}>
	<div class="two">
		<dl class="aside-kv mono">
			{#each about.facts as fact (fact.k)}
				<dt>{fact.k}</dt>
				<dd>{#each fact.v as line, i}{#if i}<br />{/if}{line}{/each}</dd>
			{/each}
		</dl>
		<div class="prose">
			{#each about.prose as p}<p>{@html rich(p)}</p>{/each}
		</div>
	</div>
</Section>

<style>
	.aside-kv { display: grid; grid-template-columns: 64px 1fr; row-gap: 6px; color: var(--ink-3); align-self: start; }
	.aside-kv dd { color: var(--ink); text-transform: none; letter-spacing: .02em; }
	.prose { max-width: 64ch; }
	.prose p { color: var(--ink-2); text-wrap: pretty; }
	.prose p + p { margin-top: 14px; }
	.prose p:first-child { font-size: 19px; line-height: 1.65; color: var(--ink); letter-spacing: -0.02em; }
	.prose :global(b) { color: var(--ink); font-weight: 600; }

	@media (max-width: 960px) {
		.prose p:first-child { font-size: 17px; }
	}
</style>
