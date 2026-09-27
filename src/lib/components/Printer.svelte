<script lang="ts">
	import { onMount } from 'svelte';
	import type { Resume } from '$lib/content/types';
	import { octopus } from '$lib/figures/octopus';
	import { reducedMotion } from '$lib/motion';

	let { hero }: { hero: Resume['hero'] } = $props();

	// Front view of a printer whose bed drops a layer at a time while the nozzle stays on one line.
	const NZ = 67; // nozzle tip
	const PW = 190; // printed width
	const PX0 = 280 - PW / 2;
	const N = octopus.layers.length;
	const LH = (PW * octopus.aspect) / N;
	const PARK = 430;
	const PURGE = 440; // right of the bed, so the purged blob drops clear of it
	const BED_LOW = NZ + LH * N + 10;
	const TRAVEL = 1.4; // px per ms
	const EXTRUDE = 0.5;
	const COLORS = ['#FFB3A8', 'var(--signal)', 'var(--ink)'];
	const AMBIENT = 26;
	const HOT = 220;

	// filament: spool → coupler on the frame → tube → toolhead
	const SPOOL = { x: 516, y: 60 };
	const CORE = 8; // radius of an empty spool
	const FULL = 17;
	const COUPLER = { x: 486, y: 16 };
	const HEAD_TOP = 28;
	const FEED = 0.04; // filament px per px of extruded line, about what a 0.2 mm layer uses
	const RETRACT = 2.5; // pulled back at every layer change
	const DEG = 180 / Math.PI;

	const spans = octopus.layers.map((l) => l.map(([a, b]) => [PX0 + a * PW, PX0 + b * PW] as const));
	const bounds = spans.map((l) => [l[0][0], l[l.length - 1][1]] as const);

	type Step = 'Heating' | 'Unloading' | 'Loading' | 'Purging' | 'Printing' | 'Done';
	// the prerendered state is a finished print; it only shows when scripts never run
	let step = $state<Step>('Done');
	let mounted = $state(false);
	/** layers finished */
	let layer = $state(N);
	/** the layer being laid down and which way the head sweeps */
	let cur = $state<{ i: number; dir: 1 | -1 } | null>(null);
	let hx = $state(PARK);
	let bedY = $state(BED_LOW);
	let nozzle = $state(AMBIENT);
	let bed = $state(AMBIENT);
	/** filament on the spool holder; `picked` follows the buttons straight away */
	let fil = $state(0);
	let picked = $state(0);
	let clearing = $state(false);
	/** share of the path from spool to head that holds filament */
	let loaded = $state(1);
	/** filament moved through the tube, px — drives the flow marks */
	let feed = $state(0);
	/** spool angle, degrees */
	let spin = $state(0);
	/** filament left on each spool */
	const left = $state([1, 1, 1]);
	/** 0–1, how visible the flow marks are; they show only while filament moves */
	let flow = $state(0);
	/** the tube's upper control point trails the head like a stiff hose */
	let cx = $state(PARK);
	let blob = $state<{ x: number; y: number; r: number; o: number } | null>(null);

	const done = $derived(spans.slice(0, layer));
	const partial = $derived.by(() => {
		if (!cur) return [];
		const { i, dir } = cur;
		return spans[i]
			.map(([a, b]) => (dir > 0 ? [a, Math.min(b, hx)] : [Math.max(a, hx), b]))
			.filter(([a, b]) => b > a);
	});
	const wound = $derived(CORE + (FULL - CORE) * left[fil]);
	// the free strand leaves the wound filament on a tangent towards the coupler
	const tangent = $derived.by(() => {
		const dx = COUPLER.x + 4 - SPOOL.x;
		const dy = COUPLER.y - SPOOL.y;
		const a = Math.atan2(dy, dx) + Math.acos(wound / Math.hypot(dx, dy));
		return [SPOOL.x + wound * Math.cos(a), SPOOL.y + wound * Math.sin(a)];
	});
	const hose = $derived(`C ${COUPLER.x - 34} ${COUPLER.y - 22}, ${cx} ${HEAD_TOP - 38}, ${hx} ${HEAD_TOP}`);
	const tube = $derived(`M${COUPLER.x - 4} ${COUPLER.y} ${hose}`);
	const strand = $derived(`M${tangent[0]} ${tangent[1]} L${COUPLER.x + 4} ${COUPLER.y} L${COUPLER.x - 4} ${COUPLER.y} ${hose}`);

	const ease = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
	let alive = true;
	let run = 0;

	// tube and flow marks settle on their own loop, so they keep moving a moment after the head stops
	const K = 260;
	const C = 16;
	let cv = 0;
	let raf = 0;
	let last = 0;
	let lastFeed = 0;
	let still = 0;
	const settle = (t: number) => {
		const dt = Math.min(0.04, (t - last) / 1000) || 0.016;
		last = t;
		cv += (K * (hx - cx) - C * cv) * dt;
		cx += cv * dt;
		const v = Math.abs(feed - lastFeed) / dt;
		lastFeed = feed;
		flow += (Math.min(1, v / 12) - flow) * Math.min(1, dt * 10);
		still = Math.abs(hx - cx) < 0.05 && Math.abs(cv) < 0.05 && flow < 0.01 ? still + 1 : 0;
		if (still > 20 || !alive) {
			raf = 0;
			cx = hx;
			cv = 0;
			flow = 0;
			return;
		}
		raf = requestAnimationFrame(settle);
	};
	const wake = () => {
		if (raf || !alive) return;
		last = performance.now();
		raf = requestAnimationFrame(settle);
	};

	const tween = (ms: number, fn: (k: number) => void, token: number) =>
		new Promise<boolean>((res) => {
			const t0 = performance.now();
			const f = (t: number) => {
				if (!alive || token !== run) return res(false);
				const k = ms > 0 ? Math.min(1, (t - t0) / ms) : 1;
				fn(k);
				wake();
				if (k < 1) requestAnimationFrame(f);
				else res(true);
			};
			requestAnimationFrame(f);
		});
	const wait = (ms: number, token: number) => tween(ms, () => {}, token);

	// the spool turns only when the head draws more than it has before; retractions are taken up by slack
	let high = 0;
	const pull = (d: number) => {
		feed += d;
		if (feed <= high) return;
		const take = feed - high;
		high = feed;
		spin -= (take / wound) * DEG;
		left[fil] = Math.max(0.35, left[fil] - take * 0.0005);
	};
	const pullOver = (ms: number, total: number, token: number) => {
		let got = 0;
		return tween(ms, (k) => {
			pull(total * k - got);
			got = total * k;
		}, token);
	};

	let strandEl: SVGPathElement;

	const printOnce = async (token: number) => {
		step = 'Heating';
		const [h0, b0, n0, t0] = [hx, bedY, nozzle, bed];
		const start = bounds[0][0];
		// heat up while the bed rises to the nozzle and the head moves to the first layer
		const warm = await tween(n0 > 200 ? 900 : 1800, (k) => {
			const e = ease(k);
			nozzle = n0 + (HOT - n0) * e;
			bed = t0 + (55 - t0) * e;
			bedY = b0 + (NZ + LH - b0) * e;
			hx = h0 + (start - h0) * e;
		}, token);
		if (!warm) return;

		step = 'Printing';
		for (let i = 0; i < N; i++) {
			const dir = i % 2 ? -1 : 1;
			const [lo, hi] = bounds[i];
			const [from, to] = dir > 0 ? [lo, hi] : [hi, lo];
			const hs = hx;
			if (!(await tween(Math.abs(from - hs) / TRAVEL, (k) => (hx = hs + (from - hs) * k), token))) return;
			if (i && !(await pullOver(40, RETRACT, token))) return;
			cur = { i, dir };
			let at = from;
			const laid = await tween(Math.abs(to - from) / EXTRUDE, (k) => {
				const x = from + (to - from) * k;
				pull(Math.abs(x - at) * FEED);
				at = x;
				hx = x;
			}, token);
			if (!laid) return;
			layer = i + 1;
			cur = null;
			nozzle = HOT + (Math.random() - 0.5) * 1.6;
			if (!(await pullOver(60, i < N - 1 ? -RETRACT : -RETRACT * 2, token))) return;
			if (i < N - 1) {
				const by = bedY;
				if (!(await tween(90, (k) => (bedY = by + LH * k), token))) return;
			}
		}

		step = 'Done';
		const [hs, bs] = [hx, bedY];
		const parked = await tween(900, (k) => {
			const e = ease(k);
			hx = hs + (PARK - hs) * e;
			bedY = bs + 10 * e;
		}, token);
		if (!parked) return;
		const [n1, b1] = [nozzle, bed];
		await tween(24000, (k) => {
			nozzle = n1 + (AMBIENT + 12 - n1) * k;
			bed = b1 + (AMBIENT + 6 - b1) * k;
		}, token);
	};

	// a new colour means unloading the old filament, loading the new one and purging the nozzle before printing
	const change = async (next: number, token: number) => {
		step = nozzle < 200 ? 'Heating' : 'Unloading';
		const [h0, n0] = [hx, nozzle];
		const ready = await Promise.all([
			tween(Math.abs(PURGE - h0) / TRAVEL + 200, (k) => (hx = h0 + (PURGE - h0) * ease(k)), token),
			n0 < 200 ? tween(1400, (k) => (nozzle = n0 + (HOT - n0) * ease(k)), token) : wait(300, token)
		]);
		if (!ready.every(Boolean)) return false;
		clearing = false;
		layer = 0;
		const len = strandEl.getTotalLength();

		if (next !== fil && loaded > 0) {
			step = 'Unloading';
			const l0 = loaded;
			// the holder rewinds what was in the tube
			if (!(await tween(700 * l0, (k) => {
				const l = l0 * (1 - ease(k));
				spin += (((loaded - l) * len) / wound) * DEG;
				loaded = l;
			}, token))) return false;
			if (!(await wait(250, token))) return false;
		}
		fil = next;
		feed = 0;
		high = 0;
		lastFeed = 0;

		step = 'Loading';
		const l0 = loaded;
		if (!(await tween(900 * (1 - l0), (k) => {
			const l = l0 + (1 - l0) * ease(k);
			spin -= (((l - loaded) * len) / wound) * DEG;
			loaded = l;
		}, token))) return false;
		loaded = 1;

		step = 'Purging';
		blob = { x: hx, y: NZ, r: 0, o: 1 };
		const grew = await tween(700, (k) => {
			pull(0.4);
			if (blob) blob = { ...blob, r: 3.6 * Math.sqrt(k), y: NZ + 3.6 * Math.sqrt(k) };
		}, token);
		if (!grew) return false;
		const y0 = blob?.y ?? NZ;
		const fell = await tween(460, (k) => {
			if (blob) blob = { ...blob, y: y0 + (244 - y0) * k * k, o: k < 0.7 ? 1 : (1 - k) / 0.3 };
		}, token);
		blob = null;
		return fell;
	};

	const finished = () => {
		cur = null;
		blob = null;
		layer = N;
		loaded = 1;
		step = 'Done';
		hx = PARK;
		cx = PARK;
		bedY = BED_LOW;
	};

	// every print starts from a cleared plate
	const reprint = async (next = (picked + 1) % COLORS.length) => {
		const token = ++run;
		picked = next;
		blob = null;
		cur = null;
		if (reducedMotion()) {
			fil = next;
			return finished();
		}
		clearing = true;
		if (next !== fil || loaded < 1) {
			if (!(await change(next, token))) return;
		} else {
			if (!(await wait(300, token))) return;
			clearing = false;
			layer = 0;
		}
		printOnce(token);
	};

	const onkeydown = (e: KeyboardEvent) => {
		if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test((e.target as HTMLElement).tagName)) return;
		const n = Number(e.key) - 1;
		if (n >= 0 && n < COLORS.length) reprint(n);
	};

	onMount(() => {
		mounted = true;
		if (!reducedMotion()) {
			layer = 0;
			step = 'Heating';
			const token = ++run;
			setTimeout(() => token === run && printOnce(token), 600);
		}
		return () => {
			alive = false;
			cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:window {onkeydown} />

<figure class="instrument" aria-label={hero.figureLabel}>
	<figcaption class="inst-head mono">
		<span class="live" class:idle={step === 'Done'} class:pre={!mounted}><i class="pulse"></i>{step}</span>
		<span class:pre={!mounted}>Nozzle <span class="num">{Math.round(nozzle)}</span>° · Bed <span class="num">{Math.round(bed)}</span>°</span>
	</figcaption>
	<span class="corners" aria-hidden="true"></span>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
	<svg class="flow" viewBox="0 0 560 250" role="img" aria-label={hero.flowLabel} onclick={() => reprint()} style:--fil={COLORS[fil]}>
		<!-- frame and gantry -->
		<path class="faint" d="M96 244 V16 H{COUPLER.x - 4}" />
		<path class="faint" d="M464 16 V244" />
		<line class="outline" x1="100" y1="40" x2="460" y2="40" />

		<!-- bed and the part on it -->
		<g transform="translate(0 {bedY})">
			<line class="faint" x1="96" y1="2.5" x2="140" y2="2.5" /><line class="faint" x1="420" y1="2.5" x2="464" y2="2.5" />
			<rect class="plate" x="140" y="0" width="280" height="5" rx="1" />
			<g class="part" class:clearing class:pre={!mounted}>
				{#each done as l, i (i)}{#each l as [a, b] (a)}<rect x={a} y={-(i + 1) * LH} width={b - a} height={LH - 0.6} />{/each}{/each}
				{#if cur}{#each partial as [a, b] (a)}<rect x={a} y={-(cur.i + 1) * LH} width={b - a} height={LH - 0.6} />{/each}{/if}
			</g>
		</g>

		<!-- spool: the notch and spokes show it turning -->
		<g transform="translate({SPOOL.x} {SPOOL.y})">
			<circle class="flange" r="22" />
			<circle class="wound" r={(wound + CORE) / 2} stroke-width={wound - CORE} />
			<g transform="rotate({spin})">
				<circle class="hub" r="5" />
				<path class="hub" d="M0 -5.5 V-8 M4.8 2.8 L6.9 4 M-4.8 2.8 L-6.9 4 M0 19 V22" />
			</g>
		</g>
		<text x={SPOOL.x} y={SPOOL.y + 36} text-anchor="middle">PLA</text>

		<!-- tube, and the filament inside it -->
		<path class="tube" d={tube} />
		<path class="strand" bind:this={strandEl} d={strand} pathLength="1" stroke-dasharray="{loaded} 2" />
		<path class="marks" d={strand} stroke-dashoffset={-feed} style:opacity={loaded >= 0.999 ? flow * 0.75 : 0} />
		<rect class="coupler" x={COUPLER.x - 4} y={COUPLER.y - 3.5} width="8" height="7" rx="1" />

		<!-- toolhead -->
		<g transform="translate({hx} 0)">
			<rect class="head" x="-18" y={HEAD_TOP} width="36" height="32" rx="3" />
			<circle class="faint" cx="0" cy="44" r="8" /><path class="faint" d="M-5 44 H5 M0 39 V49" />
			<path class="outline" d="M-5 60 H5 L2 66 H-2 Z" />
			{#if cur}<circle class="melt" cx="0" cy={NZ + 0.5} r="1.6" />{/if}
		</g>
		{#if blob}<circle class="melt" cx={blob.x} cy={blob.y} r={blob.r} opacity={blob.o} />{/if}
	</svg>
	<div class="readouts mono">
		<div>
			<span>Filament</span>
			<span class="seg">
				{#each hero.filaments as name, i (name)}<button type="button" aria-pressed={picked === i} onclick={() => reprint(i)}>{name}</button>{/each}
			</span>
		</div>
		<div><span>Layer</span><span class="v" class:pre={!mounted}><span class="num">{String(layer).padStart(2, '0')}</span><span class="lc">&nbsp;/ {N}</span></span></div>
	</div>
	<p class="hint mono">{hero.hint}</p>
</figure>

<style>
	.instrument { position: relative; padding: 22px 24px 20px; color: var(--ink-3); }
	.inst-head { display: flex; justify-content: space-between; gap: 16px; }
	.live { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-2); }
	.live.idle .pulse { animation: none; }
	.flow { display: block; width: 100%; height: auto; margin: 10px 0 6px; cursor: pointer; overflow: visible; }
	.outline { fill: none; stroke: var(--ink); stroke-width: 1.1; }
	.faint { fill: none; stroke: var(--ink-4); stroke-width: 1; }
	.plate { fill: var(--tint); stroke: var(--ink); stroke-width: 1.1; }
	.head { fill: var(--paper); stroke: var(--ink); stroke-width: 1.1; transition: fill .35s; }
	.part { fill: var(--fil); transition: opacity .3s; }
	.part.clearing { opacity: 0; }
	/* with scripts the print starts from an empty plate, so the prerendered finished state stays hidden until mount */
	:global(.js) .pre { visibility: hidden; }
	.flange { fill: none; stroke: var(--ink-4); stroke-width: 1; }
	.wound { fill: none; stroke: var(--fil); opacity: .85; transition: stroke .4s; }
	.hub { fill: none; stroke: var(--ink-3); stroke-width: 1; }
	.tube { fill: none; stroke: var(--ink-4); stroke-width: 3.6; stroke-linecap: round; opacity: .7; }
	.strand { fill: none; stroke: var(--fil); stroke-width: 1.3; }
	/* short gaps that travel along the strand while filament is moving */
	.marks { fill: none; stroke: var(--paper); stroke-width: 1.5; stroke-dasharray: 1.4 9; }
	.coupler { fill: var(--paper); stroke: var(--ink-3); stroke-width: 1; }
	.melt { fill: var(--fil); }
	text { font-family: var(--mono); font-stretch: 87.5%; font-size: 9.5px; letter-spacing: .08em; fill: var(--ink-3); }

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
		.part, .wound { transition: none; }
	}
	@media print {
		.instrument { display: none !important; }
	}
</style>
