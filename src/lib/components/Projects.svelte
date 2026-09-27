<script lang="ts">
	import type { Lang, Project, Resume } from '$lib/content/types';
	import { pad } from '$lib/format';
	import ProjectThumb from './ProjectThumb.svelte';
	import Section from './Section.svelte';

	let { lang, projects, details }: { lang: Lang; projects: Resume['projects']; details: string } = $props();
	const base = $derived(lang === 'en' ? '/en/' : '/');

	// hovering or focusing a row swaps the spec card; the swap animation only plays after the first change
	let picked = $state<Project['id']>();
	const active = $derived(picked ?? projects.items[0].id);
	const index = $derived(projects.items.findIndex((p) => p.id === active));
	const activate = (id: Project['id']) => {
		if (id !== active) picked = id;
	};
</script>

<Section id="projects" cmd="ls ./projects" title="Projects" count={pad(projects.items.length)} sub="프로젝트" meta={projects.meta}>
	<div class="work">
		<ol class="plist">
			{#each projects.items as p, i (p.id)}
				<!-- the name links to the project page and covers the row; hover or focus still swaps the spec preview -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li class="prow bracket" class:active={p.id === active} onmouseenter={() => activate(p.id)} onfocusin={() => activate(p.id)}>
					<span class="idx mono">{pad(i + 1)}</span>
					<h3 class="wide"><a href="{base}projects/{p.id}/">{p.name}<span class="arr">→</span></a><small>{p.subtitle}</small></h3>
					<p class="yr mono">{p.year}<span>{p.status}</span></p>
					<p class="desc">{p.desc}</p>
					<p class="tags mono">{#each p.tags as tag}<span class:sig={tag.signal}>{tag.label}</span>{/each}</p>
				</li>
			{/each}
		</ol>

		<aside class="preview" aria-live="polite">
			<span class="corners" aria-hidden="true"></span>
			<p class="head mono"><span class="lc">$ cat {active}/spec</span><span>{pad(index + 1)} / {pad(projects.items.length)}</span></p>
			{#each projects.items as p (p.id)}
				<div class="card" class:show={p.id === active} class:anim={picked !== undefined && p.id === active}>
					<div class="thumb" aria-hidden="true"><ProjectThumb id={p.id} /></div>
					<h4>{p.card.title}</h4>
					<dl>
						{#each p.card.specs as [label, value] (label)}<dt class="mono">{label}</dt><dd>{value}</dd>{/each}
					</dl>
					<p class="go mono"><a href="{base}projects/{p.id}/">{details} →</a>{#each p.card.links ?? [] as link (link.href)}<a href={link.href}>{link.label}</a>{/each}</p>
				</div>
			{/each}
		</aside>
	</div>

	<div class="oss">
		<h3 class="mono"><span>More on GitHub</span><span>{projects.more.summary}</span></h3>
		<ul>
			{#each projects.more.repos as repo (repo.name)}
				<li><a href={repo.href}><b class="wide">{repo.name}</b><span class="star mono">{repo.stars}</span><span>{repo.desc}</span></a></li>
			{/each}
		</ul>
	</div>
</Section>

<style>
	/* list + spec preview */
	.work { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; }
	.plist > li + li { border-top: 1px solid var(--rule); }
	.prow { display: grid; grid-template-columns: 44px minmax(0, 1fr) auto; column-gap: 16px; padding: 22px 16px 22px 12px; transition: background .25s; }
	/* the whole row is the link; the focus ring goes on the row */
	.prow h3 a::after { content: ""; position: absolute; inset: 0; z-index: 1; }
	.prow h3 a:focus-visible { outline: none; }
	.prow:has(a:focus-visible) { outline: 1px solid var(--signal); outline-offset: -1px; }
	.prow.active { background: var(--tint); }
	.idx { color: var(--ink-3); padding-top: 7px; }
	.prow h3 { font-size: 20px; font-weight: 650; line-height: 1.3; }
	.prow h3 small { font: 400 15px var(--sans); letter-spacing: -0.01em; color: var(--ink-2); margin-left: 10px; font-stretch: 100%; }
	.yr { color: var(--ink-3); text-align: right; padding-top: 7px; white-space: nowrap; }
	.yr span { display: block; margin-top: 4px; color: var(--ink-3); opacity: .8; }
	.desc { grid-column: 2 / -1; margin-top: 8px; color: var(--ink-2); font-size: 15px; text-wrap: pretty; max-width: 62ch; }
	.prow .tags { grid-column: 2 / -1; margin-top: 12px; }
	.sig { color: var(--signal); }
	.arr { display: inline-block; margin-left: 8px; color: var(--ink-3); opacity: 0; transform: translateX(-4px); transition: all .3s var(--ease); font-family: var(--sans); font-size: 15px; }
	.prow.active .arr { opacity: 1; transform: none; }

	.preview { position: sticky; top: 32px; padding: 20px 22px 22px; }
	.head { display: flex; justify-content: space-between; color: var(--ink-3); }
	.thumb { margin: 16px 0 18px; aspect-ratio: 16 / 9; border: 1px solid var(--rule); background: var(--tint); display: grid; place-items: center; overflow: hidden; }
	.card { display: none; }
	.card.show { display: block; }
	.card.show.anim { animation: swap .45s var(--ease); }
	@keyframes swap { from { opacity: 0; transform: translateY(6px); } }
	.card h4 { font-size: 16px; font-weight: 600; letter-spacing: -0.02em; display: flex; align-items: center; gap: 10px; }
	.card h4::before { content: ""; width: 3px; height: 1em; background: var(--signal); }
	.card dl { display: grid; grid-template-columns: 84px 1fr; row-gap: 8px; margin-top: 14px; }
	.card dt { color: var(--ink-3); padding-top: 2px; }
	.card dd { font-size: 14px; color: var(--ink); }
	.go { display: flex; gap: 18px; margin-top: 18px; padding-top: 14px; border-top: 1px dashed var(--rule); }
	.go a { color: var(--ink); border-bottom: 1px solid var(--ink-4); padding-bottom: 2px; transition: border-color .2s; }
	.go a:hover { border-color: var(--ink); }

	.oss { margin-top: 64px; }
	.oss h3 { display: flex; justify-content: space-between; color: var(--ink-3); font-weight: 400; padding-bottom: 12px; border-bottom: 1px solid var(--ink); }
	.oss ul { display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 40px; }
	.oss li a { display: grid; grid-template-columns: 1fr auto; gap: 2px 12px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
	.oss li b { font-weight: 600; letter-spacing: -0.02em; }
	.oss li .star { color: var(--ink-3); }
	.oss li span:last-child { grid-column: 1 / -1; color: var(--ink-2); font-size: 14px; }
	.oss li a:hover b { text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }

	@media (max-width: 960px) {
		.work { grid-template-columns: 1fr; }
		.preview { display: none; }
		.prow { grid-template-columns: 32px 1fr; padding: 20px 0; }
		.yr { grid-column: 2; text-align: left; padding-top: 4px; }
		.yr span { display: inline; margin-left: 8px; }
		.prow h3 small { display: block; margin-left: 0; }
		.prow.active { background: none; }
		.oss ul { grid-template-columns: 1fr; }
	}
	@media (prefers-reduced-motion: reduce) {
		.card.show.anim { animation: none; }
	}
	@media print {
		.preview { display: none !important; }
		.prow { break-inside: avoid; }
		.work { display: block; }
	}
</style>
