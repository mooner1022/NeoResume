<script lang="ts">
	import type { Shot } from '$lib/content/types';

	let { shots }: { shots: Shot[] } = $props();
</script>

<div class="shots">
	{#each shots as s (s.src)}
		<figure class:tall={s.height > s.width}>
			<img src={s.src} width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" />
			<figcaption class="mono lc">{s.caption}</figcaption>
		</figure>
	{/each}
</div>

<style>
	/* phone screenshots sit four to a row; wide images take half */
	.shots { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; align-items: start; }
	figure:not(.tall) { grid-column: span 2; }
	img { display: block; width: 100%; height: auto; border: 1px solid var(--rule); border-radius: 10px; background: var(--tint); }
	figure.tall img { border-radius: 16px; }
	figcaption { margin-top: 10px; color: var(--ink-3); letter-spacing: .02em; text-wrap: pretty; }

	@media (max-width: 960px) {
		.shots { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
	}
	@media print {
		.shots { grid-template-columns: repeat(4, 1fr); gap: 8px; }
		figure { break-inside: avoid; }
	}
</style>
