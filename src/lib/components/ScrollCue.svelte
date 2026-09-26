<script lang="ts">
	import { reducedMotion } from '$lib/motion';

	let scrollY = $state(0);

	const toAbout = (e: MouseEvent) => {
		e.preventDefault();
		document.getElementById('about')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
	};
</script>

<svelte:window bind:scrollY />

<a class="scroll-cue mono" class:gone={scrollY > 24} href="#about" onclick={toAbout}><span class="rail" aria-hidden="true"><i></i></span>Scroll</a>

<style>
	/* a signal tick slides down a hairline; fades once the page moves */
	.scroll-cue { position: absolute; left: 0; bottom: 30px; display: inline-flex; align-items: center; gap: 12px; color: var(--ink-3); transition: color .2s, opacity .5s var(--ease); }
	.scroll-cue:hover { color: var(--ink); }
	.rail { position: relative; width: 1px; height: 36px; background: var(--rule); overflow: hidden; }
	.rail i { position: absolute; left: 0; top: 0; width: 1px; height: 12px; background: var(--signal); animation: drop 2.8s var(--ease) infinite; }
	@keyframes drop { 0% { transform: translateY(-12px); } 55%, 100% { transform: translateY(36px); } }
	.gone { opacity: 0; visibility: hidden; transition: color .2s, opacity .5s var(--ease), visibility 0s .5s; }   /* hidden also drops it from tab order */

	/* mobile stacks the instrument below, so the first screen already runs past the fold */
	@media (max-width: 960px) {
		.scroll-cue { display: none; }
	}
	@media (prefers-reduced-motion: reduce) {
		.rail i { animation: none; transform: translateY(12px); }
	}
	@media print {
		.scroll-cue { display: none !important; }
	}
</style>
