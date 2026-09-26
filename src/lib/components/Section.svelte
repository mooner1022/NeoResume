<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/reveal';

	let {
		id,
		cmd,
		title,
		count,
		sub,
		meta,
		live = false,
		children
	}: {
		id: string;
		/** shell command shown above the title */
		cmd: string;
		title: string;
		count: string;
		/** small Korean label under the title — shown in both languages */
		sub: string;
		meta: string;
		/** pulsing dot before the meta line */
		live?: boolean;
		children: Snippet;
	} = $props();
</script>

<section class="sec container reveal" {id} {@attach reveal}>
	<p class="cmd mono lc"><b>mooner</b>:~/resume $ {cmd}</p>
	<div class="sec-head">
		<div><h2 class="wide">{title}<sup>{count}</sup></h2><span class="ko mono">{sub}</span></div>
		<p class="meta mono">{#if live}<span class="pulse"></span>{/if}{meta}</p>
	</div>
	{@render children()}
</section>

<style>
	/* hairline aligned to the content edge, not the padded box */
	.sec { padding-block: 120px 56px; background: linear-gradient(var(--rule), var(--rule)) 50% 0 / calc(100% - 96px) 1px no-repeat; }
	.sec-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 56px; }
	.sec-head h2 { display: flex; align-items: flex-start; gap: 10px; font-size: 40px; font-weight: 650; line-height: 1; }
	.sec-head h2 sup { font: 500 10px/1 var(--mono); font-stretch: 87.5%; letter-spacing: .06em; color: var(--ink-3); padding-top: 2px; }
	.sec-head .ko { display: block; margin-top: 12px; color: var(--ink-3); }
	.sec-head .meta { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-3); text-align: right; letter-spacing: .14em; }

	@media (max-width: 960px) {
		.sec { padding-block: 80px 32px; background-size: calc(100% - 40px) 1px; }
		.sec-head { flex-direction: column; align-items: flex-start; margin-bottom: 36px; gap: 10px; }
		.sec-head h2 { font-size: 30px; }
	}
	@media print {
		.sec { padding-block: 24px 8px; }
		.sec-head { margin-bottom: 18px; }
	}
</style>
