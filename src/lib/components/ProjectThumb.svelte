<script lang="ts">
	import type { Project } from '$lib/content/types';

	let { id }: { id: Project['id'] } = $props();

	// AMOA: a seeded vector space, a query point and its nearest neighbours
	let seed = 7;
	const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
	const q = { x: 118, y: 52 };
	const pts = Array.from({ length: 46 }, () => ({ x: 8 + rnd() * 184, y: 8 + rnd() * 94 }));
	const dist = (p: { x: number; y: number }) => Math.hypot(p.x - q.x, p.y - q.y);
	const near = [...pts].sort((a, b) => dist(a) - dist(b)).slice(0, 4);
</script>

<svg viewBox="0 0 200 110">
	{#if id === 'amoa'}
		<circle class="d" cx={q.x} cy={q.y} r={dist(near[3]) + 4} />
		{#each near as p}<line class="d" x1={q.x} y1={q.y} x2={p.x} y2={p.y} />{/each}
		{#each pts as p}<circle class={near.includes(p) ? 'f' : 'g'} cx={p.x} cy={p.y} r={near.includes(p) ? 2.6 : 2} />{/each}
		<rect class="s" x={q.x - 4} y={q.y - 4} width="8" height="8" transform="rotate(45 {q.x} {q.y})" />
		<text x="0" y="8">ANN · k=4 · RRF</text>
	{:else if id === 'agora'}
		<circle class="o" cx="100" cy="18" r="11" /><circle class="o" cx="40" cy="88" r="11" /><circle class="o" cx="160" cy="88" r="11" />
		<text x="100" y="21" text-anchor="middle">CTO</text><text x="40" y="91" text-anchor="middle">CMO</text><text x="160" y="91" text-anchor="middle">DM</text>
		<line class="d" x1="93" y1="28" x2="48" y2="78" /><line class="d" x1="107" y1="28" x2="152" y2="78" /><line class="d" x1="52" y1="88" x2="148" y2="88" />
		<rect class="s" x="95" y="60" width="10" height="10" transform="rotate(45 100 65)" />
		<text x="100" y="52" text-anchor="middle">ROUND 3</text>
	{:else if id === 'hanriv'}
		<text x="0" y="10">HAN RIVER · NOW</text>
		<text x="0" y="46" class="big">17.4°</text>
		<path class="o" d="M0 84 C 20 74, 36 74, 56 82 S 92 92, 112 80 S 150 68, 170 78 S 192 86, 200 82" />
		<path class="d" d="M0 96 C 24 90, 44 92, 64 96 S 104 102, 124 94 S 164 88, 200 94" />
		<circle class="s" cx="112" cy="80" r="3.5" />
		<text x="200" y="10" text-anchor="end">★ 4.85</text>
	{:else if id === 'starlight'}
		<rect class="o" x="62" y="30" width="76" height="50" rx="4" />
		<text x="100" y="58" text-anchor="middle">CORE</text>
		<rect class="f" x="20" y="18" width="26" height="16" rx="2" /><rect class="f" x="20" y="76" width="26" height="16" rx="2" />
		<rect class="s" x="154" y="18" width="26" height="16" rx="2" /><rect class="o" x="154" y="76" width="26" height="16" rx="2" />
		<line class="d" x1="46" y1="26" x2="62" y2="40" /><line class="d" x1="46" y1="84" x2="62" y2="70" />
		<line class="d" x1="154" y1="26" x2="138" y2="40" /><line class="d" x1="154" y1="84" x2="138" y2="70" />
	{:else if id === 'site'}
		<rect class="o" x="20" y="8" width="160" height="96" rx="5" />
		<line class="o" x1="20" y1="24" x2="180" y2="24" />
		<circle class="g" cx="30" cy="16" r="2.5" /><circle class="g" cx="39" cy="16" r="2.5" /><circle class="g" cx="48" cy="16" r="2.5" />
		<circle class="s" cx="100" cy="46" r="9" />
		<line class="o" x1="72" y1="66" x2="128" y2="66" /><line class="d" x1="60" y1="78" x2="140" y2="78" /><line class="d" x1="70" y1="88" x2="130" y2="88" />
	{/if}
</svg>

<style>
	svg { width: 64%; height: auto; overflow: visible; }
	.o { fill: none; stroke: var(--ink); stroke-width: 1.1; }
	.f { fill: var(--ink); }
	.g { fill: var(--ink-4); }
	.s { fill: var(--signal); }
	.d { fill: none; stroke: var(--ink-3); stroke-width: 1; stroke-dasharray: 2 3; }
	text { font-family: var(--mono); font-stretch: 87.5%; font-size: 8px; letter-spacing: .06em; fill: var(--ink-3); }
	text.big { font-family: var(--wide); font-stretch: 125%; font-size: 26px; font-weight: 600; fill: var(--ink); letter-spacing: -0.02em; }
</style>
