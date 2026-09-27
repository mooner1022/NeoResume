<script lang="ts">
	import type { Case } from '$lib/content/types';
	import { pad, rich } from '$lib/format';

	let { cases, pending }: { cases: Case[]; pending: string } = $props();
</script>

{#if cases.length}
	<ol class="cases">
		{#each cases as item, i (item.title)}
			<li>
				<span class="idx mono">{pad(i + 1)}</span>
				<div>
					<h3>{item.title}</h3>
					<dl>
						<dt class="mono">Problem</dt><dd>{@html rich(item.problem)}</dd>
						<dt class="mono">Approach</dt><dd>{@html rich(item.approach)}</dd>
						<dt class="mono">Result</dt><dd>{@html rich(item.result)}</dd>
					</dl>
				</div>
			</li>
		{/each}
	</ol>
{:else}
	<p class="pending mono lc">// {pending}</p>
{/if}

<style>
	.cases > li { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 40px; padding: 32px 0; border-top: 1px solid var(--rule); break-inside: avoid; }
	.idx { color: var(--ink-3); padding-top: 6px; }
	h3 { font-size: 20px; font-weight: 650; letter-spacing: -0.025em; line-height: 1.4; text-wrap: balance; }
	dl { display: grid; grid-template-columns: 96px minmax(0, 1fr); row-gap: 12px; margin-top: 18px; }
	dt { color: var(--ink-3); padding-top: 5px; }
	dd { color: var(--ink-2); text-wrap: pretty; max-width: 66ch; }
	dd :global(b) { color: var(--ink); font-weight: 600; }
	dt:last-of-type, dt:last-of-type + dd { color: var(--ink); }
	.pending { color: var(--ink-3); padding: 24px 0; border-top: 1px solid var(--rule); }

	@media (max-width: 960px) {
		.cases > li { grid-template-columns: 1fr; gap: 10px; padding: 24px 0; }
		dl { grid-template-columns: 1fr; row-gap: 4px; }
		dd + dt { margin-top: 10px; }
	}
</style>
