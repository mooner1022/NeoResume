<script lang="ts">
	import type { Resume } from '$lib/content/types';
	import { pad, rich } from '$lib/format';
	import Section from './Section.svelte';

	let { experience }: { experience: Resume['experience'] } = $props();
</script>

<Section id="experience" cmd="git log --author=mooner" title="Experience" count={pad(experience.jobs.length)} sub="경력" meta={experience.meta}>
	{#each experience.jobs as job, i}
		<article class="job two" class:now={job.now}>
			<p class="when mono"><b>{job.when}</b>@ {job.place} · E/{pad(i + 1)}</p>
			<div class="body">
				<h3>{job.org}</h3>
				<p class="role">{job.role}</p>
				{#if job.tags}
					<p class="tags mono">{#each job.tags as tag}<span>{tag}</span>{/each}</p>
				{/if}
				<ul>
					{#each job.points as point}<li>{@html rich(point)}</li>{/each}
				</ul>
			</div>
		</article>
	{/each}
</Section>

<style>
	/* diamond timeline */
	.job + .job { margin-top: 56px; }
	.when { color: var(--ink-3); line-height: 1.9; }
	.when b { display: block; color: var(--ink); font-weight: 600; }
	.body { position: relative; padding-left: 36px; }
	.body::before { content: ""; position: absolute; left: 0; top: 14px; bottom: -70px; width: 1px; background: var(--rule); }
	.job:last-child .body::before { bottom: 0; background: linear-gradient(var(--rule), transparent); }
	.body::after { content: ""; position: absolute; left: -4.5px; top: 9px; width: 9px; height: 9px; border: 1px solid var(--ink-3); background: var(--paper); transform: rotate(45deg); }
	.now .body::after { border-color: var(--signal); background: var(--signal); box-shadow: 0 0 0 4px color-mix(in srgb, var(--signal) 16%, transparent); }
	h3 { font-size: 23px; font-weight: 700; letter-spacing: -0.035em; line-height: 1.3; }
	.role { color: var(--ink-2); margin-top: 2px; }
	.tags { margin: 12px 0 0; }
	ul { margin-top: 14px; }
	li { position: relative; padding-left: 20px; color: var(--ink-2); max-width: 64ch; text-wrap: pretty; }
	li + li { margin-top: 6px; }
	li::before { content: ""; position: absolute; left: 0; top: .78em; width: 8px; height: 1px; background: var(--ink-3); }
	li :global(b) { color: var(--ink); font-weight: 600; white-space: nowrap; }

	@media (max-width: 960px) {
		.when b { display: inline; margin-right: 8px; }
		.when { padding-left: 36px; }
		.body::before { top: -30px; }
		.body::after { top: -24px; }
		.job + .job { margin-top: 48px; }
	}
	@media print {
		.job { break-inside: avoid; }
	}
</style>
