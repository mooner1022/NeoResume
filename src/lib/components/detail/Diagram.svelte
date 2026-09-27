<script lang="ts">
	import type { Project } from '$lib/content/types';

	let { id, label }: { id: Project['id']; label: string } = $props();

	const HEIGHT: Partial<Record<Project['id'], number>> = { hanriv: 350, starlight: 320, amoa: 340, agora: 320 };
	const h = $derived(HEIGHT[id] ?? 300);
</script>

{#snippet node(x: number, y: number, w: number, title: string, sub = '', hot = false)}
	<rect class={hot ? 'p hot' : 'p'} {x} {y} width={w} height="56" rx="4" />
	<text {x} dx="14" {y} dy="24" class="b">{title}</text>
	{#if sub}<text {x} dx="14" {y} dy="41">{sub}</text>{/if}
{/snippet}

{#snippet arrow(x1: number, y1: number, x2: number, y2: number, hot = false)}
	<line class={hot ? 'wire hot' : 'wire'} {x1} {y1} {x2} {y2} marker-end="url(#{hot ? 'tip-hot' : 'tip'}-{id})" />
{/snippet}

{#snippet route(d: string, hot = false)}
	<path class={hot ? 'wire hot' : 'wire'} {d} fill="none" marker-end="url(#{hot ? 'tip-hot' : 'tip'}-{id})" />
{/snippet}

<!-- architecture drawn in the same line language as the list thumbnails; the green path is what a visitor or user hits -->
<figure class="diagram">
	<span class="corners" aria-hidden="true"></span>
	<svg viewBox="0 0 960 {h}" role="img" aria-label={label.replace(/\*\*/g, '')}>
		<defs>
			<marker id="tip-{id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="tip" d="M0 0 L8 4 L0 8 Z" /></marker>
			<marker id="tip-hot-{id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="tip hot" d="M0 0 L8 4 L0 8 Z" /></marker>
		</defs>

		{#if id === 'site'}
			{@render node(24, 132, 170, 'REPO · MAIN', 'SvelteKit source')}
			{@render node(262, 132, 230, 'GITHUB ACTIONS', 'build · adapter-static')}
			{@render node(560, 132, 170, 'GITHUB PAGES', 'static HTML', true)}
			{@render node(798, 132, 138, 'BROWSER', 'mooner.dev')}
			{@render node(560, 28, 170, 'CLOUDFLARE', 'DNS only')}
			{@render arrow(194, 160, 256, 160)}
			{@render arrow(492, 160, 554, 160)}
			{@render arrow(792, 160, 736, 160, true)}
			{@render arrow(645, 84, 645, 126)}
			<text x="228" y="150" text-anchor="middle">push</text>
			<text x="523" y="150" text-anchor="middle">deploy</text>
			<text x="764" y="150" text-anchor="middle">GET</text>
			<text x="24" y="250" class="lc">// no server: every page is prerendered at build time</text>
		{:else if id === 'hanriv'}
			<!-- hourly collection -->
			{@render node(250, 16, 200, 'SEOUL OPEN API', 'water temperature')}
			{@render node(470, 16, 210, 'WAMIS', 'dam discharge')}
			{@render node(700, 16, 200, 'OPENWEATHER', 'weather per site')}
			{@render arrow(350, 72, 540, 144)}
			{@render arrow(575, 72, 575, 144)}
			{@render arrow(800, 72, 612, 144)}
			<text x="250" y="116">hourly · cron 0 * * * *</text>
			<!-- what the app reads -->
			{@render node(24, 150, 170, 'ANDROID APP', 'V7 · Google Play')}
			{@render node(236, 150, 190, 'TRAEFIK', 'TLS · /hantemp/v2')}
			{@render node(470, 150, 210, 'KTOR BACKEND', 'collector · API · memo', true)}
			{@render node(740, 150, 196, 'POSTGRESQL', 'TimescaleDB hypertable')}
			{@render arrow(194, 178, 230, 178, true)}
			{@render arrow(426, 178, 464, 178, true)}
			{@render arrow(680, 178, 734, 178)}
			<text x="707" y="170" text-anchor="middle">1 tx</text>
			<!-- backup path, decoupled from the request path -->
			{@render node(470, 278, 160, 'REDIS STREAM', 'XADD · XREADGROUP')}
			{@render node(660, 278, 150, 'GIT-UPDATER', 'Kotlin/Native')}
			{@render node(840, 278, 96, 'GITHUB', 'fallback')}
			{@render arrow(550, 206, 550, 272)}
			{@render arrow(630, 306, 654, 306)}
			{@render arrow(810, 306, 834, 306)}
			<text x="24" y="296" class="lc">// green: what the app reads</text>
			<text x="24" y="316" class="lc">// dashed: hourly jobs and the backup copy</text>
		{:else if id === 'starlight'}
			<!-- one notification in, one reply out -->
			{@render node(24, 40, 140, 'MESSENGER', 'notification')}
			{@render node(186, 40, 176, 'LISTENER', 'package + profile')}
			{@render node(384, 40, 176, 'PARSER SPEC', 'room · sender')}
			{@render node(582, 40, 168, 'PROJECTS', 'allowed events only')}
			{@render node(772, 40, 164, 'SCRIPT', 'onMessage(event)', true)}
			{@render arrow(164, 68, 180, 68, true)}
			{@render arrow(362, 68, 378, 68, true)}
			{@render arrow(560, 68, 576, 68, true)}
			{@render arrow(750, 68, 766, 68, true)}
			{@render node(582, 170, 168, '.SLP PLUGINS', 'Discord · V8 · API')}
			{@render arrow(666, 170, 666, 102)}
			<text x="676" y="142" class="lc">addLanguage · addApi</text>
			{@render node(384, 250, 176, 'REMOTEINPUT', 'reply action')}
			{@render route('M854 96 V278 H566', true)}
			{@render route('M384 278 H94 V102', true)}
			<text x="710" y="270" text-anchor="middle" class="lc">event.room.send()</text>
			<text x="120" y="176" class="lc">// each project runs on its own thread pool;</text>
			<text x="120" y="196" class="lc">// an error stops only that project</text>
		{:else if id === 'amoa'}
			<!-- query path -->
			{@render node(24, 72, 120, 'QUERY', '/search')}
			{@render node(166, 72, 210, 'UNIFIED SEARCH', 'synonyms · query cache')}
			<rect class="f" x="404" y="12" width="366" height="176" rx="6" />
			<text x="418" y="32">each provider · lecture · clip · recipe</text>
			{@render node(420, 46, 160, 'VECTOR ARM', '512 → 768 halfvec')}
			{@render node(420, 118, 160, 'KEYWORD ARM', 'pg_trgm')}
			{@render node(612, 82, 140, 'RRF', 'k = 60')}
			{@render node(792, 82, 144, 'RESULTS', 'RRF across types', true)}
			{@render arrow(144, 100, 160, 100, true)}
			{@render arrow(376, 100, 398, 100, true)}
			{@render arrow(580, 74, 606, 98)}
			{@render arrow(580, 146, 606, 124)}
			{@render arrow(752, 110, 786, 110, true)}
			<!-- indexing, off the request path -->
			{@render node(24, 262, 170, 'CONTENT WRITE', 'same transaction')}
			{@render node(220, 262, 180, 'EMBEDDING_JOB', 'outbox queue')}
			{@render node(426, 262, 176, 'WORKER', 'SKIP LOCKED · lease')}
			{@render node(628, 262, 150, 'EMBED SERVER', '768 dims')}
			{@render node(804, 262, 132, 'PGVECTOR', 'HNSW · halfvec')}
			{@render arrow(194, 290, 214, 290)}
			{@render arrow(400, 290, 420, 290)}
			{@render arrow(602, 290, 622, 290)}
			{@render route('M514 318 V332 H870 V324')}
			{@render route('M870 262 V210 H500 V194')}
			<text x="690" y="204" class="lc">read by the vector arm</text>
			<text x="24" y="218" class="lc">// no embedding server? keyword arm only,</text>
			<text x="24" y="238" class="lc">// the response still comes back</text>
		{:else if id === 'agora'}
			{@render node(24, 132, 170, 'SVELTEKIT UI', 'agenda · live view')}
			{@render node(250, 132, 200, 'KTOR', 'orchestrator · rounds', true)}
			<rect class="f" x="500" y="16" width="220" height="276" rx="6" />
			<text x="514" y="36">round n</text>
			{@render node(520, 50, 180, 'CTO')}
			{@render node(520, 132, 180, 'CCO / CMO')}
			{@render node(520, 214, 180, 'DECISION MGR')}
			{@render node(770, 90, 166, 'SEARXNG', 'web search tool')}
			{@render node(770, 190, 166, 'EXTRACTOR', 'Trafilatura')}
			{@render arrow(194, 150, 244, 150, true)}
			{@render arrow(250, 172, 200, 172, true)}
			<text x="222" y="142" text-anchor="middle">POST</text>
			<text x="222" y="194" text-anchor="middle">SSE</text>
			{@render arrow(450, 160, 494, 160)}
			{@render arrow(720, 128, 764, 118)}
			<text x="742" y="146" text-anchor="middle" class="lc">tool</text>
			{@render arrow(853, 146, 853, 184)}
			<text x="24" y="250" class="lc">// statements and tool calls stream</text>
			<text x="24" y="270" class="lc">// to the page as they happen</text>
		{/if}
	</svg>
</figure>

<style>
	.diagram { position: relative; padding: 28px 28px 24px; }
	svg { display: block; width: 100%; height: auto; overflow: visible; }
	svg :global(.p) { fill: var(--paper); stroke: var(--ink); stroke-width: 1.1; }
	svg :global(.p.hot) { stroke: var(--signal); }
	svg :global(.f) { fill: none; stroke: var(--ink-4); stroke-width: 1; }
	svg :global(.wire) { stroke: var(--ink-3); stroke-width: 1; stroke-dasharray: 3 4; }
	svg :global(.wire.hot) { stroke: var(--signal); stroke-dasharray: none; stroke-width: 1.3; }
	svg :global(.tip) { fill: var(--ink-3); }
	svg :global(.tip.hot) { fill: var(--signal); }
	svg :global(.s) { fill: var(--signal); }
	svg :global(text) { font-family: var(--mono); font-stretch: 87.5%; font-size: 11px; letter-spacing: .06em; fill: var(--ink-3); }
	svg :global(text.b) { fill: var(--ink); font-weight: 600; letter-spacing: .08em; }
	svg :global(text.lc) { letter-spacing: .02em; }

	@media (max-width: 960px) {
		.diagram { padding: 18px 12px 14px; overflow-x: auto; }
		svg { min-width: 640px; }
	}
	@media print {
		.corners { display: none !important; }
		.diagram { padding: 0; break-inside: avoid; }
	}
</style>
