<script lang="ts">
	import { onMount } from 'svelte';
	import type { Resume } from '$lib/content/types';
	import { reducedMotion } from '$lib/motion';

	let { hero }: { hero: Resume['hero'] } = $props();

	type Mode = 'rest' | 'sse' | 'cache';
	type Kind = 'req' | 'res' | 'evt';

	const NS = 'http://www.w3.org/2000/svg';
	const CACHE_AT = (268 - 100) / 350; // where the cache node sits on the route
	const PROTO: Record<Mode, { label: string; to: number; dur: number; lat: [number, number]; replies: number }> = {
		rest: { label: 'REST', to: 1, dur: 900, lat: [118, 164], replies: 1 },
		sse: { label: 'SSE', to: 1, dur: 700, lat: [38, 72], replies: 4 }, // one request, streamed events back
		cache: { label: 'Cache', to: CACHE_AT, dur: 420, lat: [2, 7], replies: 1 } // turns around at Redis
	};
	const MODES = Object.keys(PROTO) as Mode[];

	let mode = $state<Mode>('rest');
	let latency = $state(142);
	let inFlight = $state(0);

	let route: SVGPathElement;
	let pkts: SVGGElement;
	let ledC: SVGCircleElement;
	let cache: SVGRectElement;
	const leds: SVGCircleElement[] = [];

	const jitter = ([a, b]: [number, number]) => a + Math.random() * (b - a);
	const hist = Array.from({ length: 24 }, () => jitter(PROTO.rest.lat));
	const record = (v: number) => {
		hist.push(v);
		hist.shift();
		latency = Math.round([...hist].sort((a, b) => a - b)[Math.floor(hist.length * 0.99) - 1]);
	};
	const flash = (el: Element, cls = 'on') => {
		el.classList.add(cls);
		setTimeout(() => el.classList.remove(cls), 170);
	};

	let alive = true;
	const shoot = (from: number, to: number, kind: Kind, dur: number, done?: () => void) => {
		const el = document.createElementNS(NS, kind === 'evt' ? 'circle' : 'rect');
		if (kind === 'evt') el.setAttribute('r', '2.6');
		else {
			el.setAttribute('width', '7');
			el.setAttribute('height', '7');
		}
		el.setAttribute('class', 'pkt ' + kind);
		pkts.appendChild(el);
		inFlight++;
		const L = route.getTotalLength();
		const d = dur * Math.max(Math.abs(to - from), 0.35);
		const t0 = performance.now();
		const frame = (now: number) => {
			const t = Math.min(1, (now - t0) / d);
			const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
			const p = route.getPointAtLength((from + (to - from) * e) * L);
			if (kind === 'evt') {
				el.setAttribute('cx', String(p.x));
				el.setAttribute('cy', String(p.y));
			} else {
				el.setAttribute('x', String(p.x - 3.5));
				el.setAttribute('y', String(p.y - 3.5));
			}
			if (t < 1 && alive) requestAnimationFrame(frame);
			else {
				el.remove();
				inFlight--;
				if (alive) done?.();
			}
		};
		requestAnimationFrame(frame);
	};

	const send = () => {
		const m = mode;
		const P = PROTO[m];
		flash(ledC);
		shoot(0, P.to, 'req', P.dur, () => {
			if (m === 'cache') flash(cache, 'hit');
			else flash(leds[Math.floor(Math.random() * 3)]);
			const lat = jitter(P.lat);
			for (let i = 0; i < P.replies; i++)
				setTimeout(() => {
					shoot(P.to, 0, m === 'sse' ? 'evt' : 'res', P.dur, () => {
						flash(ledC);
						if (i === P.replies - 1) record(lat);
					});
				}, i * 150);
		});
	};

	const setMode = (m: Mode) => {
		mode = m;
		hist.forEach((_, i) => (hist[i] = jitter(PROTO[m].lat)));
		record(jitter(PROTO[m].lat));
	};

	const onkeydown = (e: KeyboardEvent) => {
		if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test((e.target as HTMLElement).tagName)) return;
		const m = ({ 1: 'rest', 2: 'sse', 3: 'cache' } as Record<string, Mode>)[e.key];
		if (m) setMode(m);
	};

	onMount(() => {
		record(140);
		// one calm heartbeat instead of constant traffic; clicks still send on demand
		let first: ReturnType<typeof setTimeout> | undefined;
		let beat: ReturnType<typeof setInterval> | undefined;
		if (!reducedMotion()) {
			first = setTimeout(send, 900);
			beat = setInterval(() => !document.hidden && send(), 4200);
		}
		return () => {
			alive = false;
			clearTimeout(first);
			clearInterval(beat);
		};
	});
</script>

<svelte:window {onkeydown} />

<figure class="instrument" aria-label={hero.figureLabel}>
	<figcaption class="inst-head mono"><span class="live"><i class="pulse"></i>Trace / Live</span></figcaption>
	<span class="corners" aria-hidden="true"></span>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
	<svg class="flow" viewBox="0 0 560 250" role="img" aria-label={hero.flowLabel} onclick={send}>
		<g transform="translate(40 70)">
			<rect class="outline" x="0" y="0" width="54" height="96" rx="10" />
			<rect class="faint" x="6" y="12" width="42" height="66" rx="2" />
			<line class="outline" x1="22" y1="6" x2="32" y2="6" />
			<circle class="led" bind:this={ledC} cx="27" cy="87" r="2.6" />
		</g>
		<text x="40" y="192" class="strong">CLIENT</text><text x="40" y="206">ANDROID</text>
		<g transform="translate(456 72)">
			<rect class="outline" x="0" y="0" width="64" height="24" rx="3" />
			<rect class="outline" x="0" y="34" width="64" height="24" rx="3" />
			<rect class="outline" x="0" y="68" width="64" height="24" rx="3" />
			<circle class="led" bind:this={leds[0]} cx="52" cy="12" r="2.6" /><circle class="led" bind:this={leds[1]} cx="52" cy="46" r="2.6" /><circle class="led" bind:this={leds[2]} cx="52" cy="80" r="2.6" />
			<line class="faint" x1="9" y1="12" x2="34" y2="12" /><line class="faint" x1="9" y1="46" x2="34" y2="46" /><line class="faint" x1="9" y1="80" x2="34" y2="80" />
		</g>
		<text x="456" y="192" class="strong">SERVER</text><text x="456" y="206">KTOR · POSTGRES</text>
		<g transform="translate(278 118)"><rect class="outline" bind:this={cache} x="-9" y="-9" width="18" height="18" transform="rotate(45)" /></g>
		<text x="278" y="148" text-anchor="middle" class="strong">CACHE</text><text x="278" y="161" text-anchor="middle">REDIS</text>
		<path class="wire" d="M100 118 L 266 118 M290 118 L 450 118" />
		<path bind:this={route} d="M100 118 L 450 118" fill="none" stroke="none" />
		<path class="wire-hot" style:opacity={inFlight ? 0.6 : 0} d="M100 118 L 450 118" />
		<g class="pkts" bind:this={pkts}></g>
	</svg>
	<div class="readouts mono">
		<div>
			<span>Protocol</span>
			<span class="seg">
				{#each MODES as m (m)}<button type="button" aria-pressed={mode === m} onclick={() => setMode(m)}>{PROTO[m].label}</button>{/each}
			</span>
		</div>
		<div><span>Latency <span class="lc">p99</span></span><span class="v"><span id="lat" class="num">{latency}</span><span class="lc">ms</span></span></div>
	</div>
	<p class="hint mono">{hero.hint}</p>
</figure>

<style>
	.instrument { position: relative; padding: 22px 24px 20px; color: var(--ink-3); }
	.inst-head { display: flex; justify-content: space-between; gap: 16px; }
	.live { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-2); }
	.flow { display: block; width: 100%; height: auto; margin: 10px 0 6px; cursor: crosshair; overflow: visible; }
	.wire { fill: none; stroke: var(--ink-4); stroke-width: 1; stroke-dasharray: 3 5; }
	.wire-hot { fill: none; stroke: var(--ink-3); stroke-width: 1; stroke-dasharray: 3 5; animation: dash 1.2s linear infinite; transition: opacity .3s; }
	@keyframes dash { to { stroke-dashoffset: -16; } }
	.outline { fill: none; stroke: var(--ink); stroke-width: 1.1; transition: stroke .15s; }
	.outline:global(.hit) { stroke: var(--signal); }
	.faint { fill: none; stroke: var(--ink-4); stroke-width: 1; }
	.led { fill: var(--ink-4); transition: fill .15s; }
	.led:global(.on) { fill: var(--signal); }
	text { font-family: var(--mono); font-stretch: 87.5%; font-size: 9.5px; letter-spacing: .08em; fill: var(--ink-3); }
	text.strong { fill: var(--ink); font-weight: 600; }
	/* packets are created at runtime, outside Svelte's scoping */
	.pkts :global(.pkt) { fill: var(--ink); }
	.pkts :global(.pkt.res) { fill: none; stroke: var(--signal); stroke-width: 1.4; }
	.pkts :global(.pkt.evt) { fill: var(--signal); }

	.readouts { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--rule); }
	.readouts > div { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--rule); }
	.readouts > div:nth-child(odd) { padding-right: 20px; border-right: 1px solid var(--rule); }
	.readouts > div:nth-child(even) { padding-left: 20px; }
	.v { color: var(--ink); font-weight: 600; }
	.seg { display: inline-flex; gap: 12px; }
	.seg button { font: inherit; letter-spacing: inherit; text-transform: inherit; color: var(--ink-4); transition: color .2s; }
	.seg button:hover { color: var(--ink-3); }
	.seg button[aria-pressed="true"] { color: var(--ink); font-weight: 600; }
	.hint { margin-top: 12px; color: var(--ink-4); font-size: 9.5px; }

	@media (max-width: 960px) {
		.instrument { padding: 18px 16px 16px; }
		.readouts { grid-template-columns: 1fr; }
		.readouts > div:nth-child(odd) { padding-right: 0; border-right: 0; }
		.readouts > div:nth-child(even) { padding-left: 0; }
	}
	@media (prefers-reduced-motion: reduce) {
		.wire-hot { animation: none; }
	}
	@media print {
		.instrument { display: none !important; }
	}
</style>
