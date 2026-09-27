<script lang="ts">
	import type { Project, Resume } from '$lib/content/types';

	let { prev, next, home, labels }: { prev: Project | null; next: Project | null; home: string; labels: Resume['projectPage'] } = $props();
</script>

<nav class="pager container mono" aria-label={labels.back}>
	{#if prev}<a class="prev" href="{home}projects/{prev.id}/"><span>← {labels.prev}</span><b class="wide">{prev.name}</b></a>{:else}<span></span>{/if}
	<a class="all" href="{home}#projects">{labels.back}</a>
	{#if next}<a class="next" href="{home}projects/{next.id}/"><span>{labels.next} →</span><b class="wide">{next.name}</b></a>{:else}<span></span>{/if}
</nav>

<style>
	.pager { display: grid; grid-template-columns: 1fr auto 1fr; align-items: end; gap: 24px; padding-top: 120px; color: var(--ink-3); }
	.pager a { transition: color .2s; }
	.pager a:hover { color: var(--ink); }
	.prev, .next { display: grid; gap: 10px; }
	.next { text-align: right; }
	b { font: 650 26px/1.15 var(--wide); font-stretch: 125%; letter-spacing: -0.02em; text-transform: none; color: var(--ink); }
	.all { padding-bottom: 6px; }

	@media (max-width: 960px) {
		.pager { grid-template-columns: 1fr 1fr; padding-top: 80px; }
		.all { display: none; }
		b { font-size: 20px; }
	}
	@media print {
		.pager { display: none !important; }
	}
</style>
