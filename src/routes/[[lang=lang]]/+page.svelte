<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Education from '$lib/components/Education.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Now from '$lib/components/Now.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Toolkit from '$lib/components/Toolkit.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import { profile } from '$lib/content';

	let { data } = $props();
	const c = $derived(data.c);

	// switching KO/EN is a client-side navigation to the same page, so <html lang> is kept in sync here
	$effect(() => {
		document.documentElement.lang = data.lang;
	});
</script>

<svelte:head>
	<title>{c.meta.title}</title>
	<meta name="description" content={c.meta.description} />
	<link rel="canonical" href={data.lang === 'en' ? `${profile.site}/en/` : `${profile.site}/`} />
	<link rel="alternate" hreflang="ko" href="{profile.site}/" />
	<link rel="alternate" hreflang="en" href="{profile.site}/en/" />
	<link rel="alternate" hreflang="x-default" href="{profile.site}/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content={c.meta.title} />
	<meta property="og:description" content={c.meta.description} />
	<meta property="og:locale" content={c.meta.locale} />
</svelte:head>

<div class="field" aria-hidden="true"></div>

<div class="container fold">
	<Topbar lang={data.lang} />
	<Hero lang={data.lang} hero={c.hero} />
</div>

<main>
	<About about={c.about} />
	<Experience experience={c.experience} />
	<Projects projects={c.projects} />
	<Toolkit toolkit={c.toolkit} />
	<Education education={c.education} />
	<Now now={c.now} />
</main>

<Contact contact={c.contact} />

<style>
	/* dot field — fades out below the hero */
	.field {
		position: absolute; inset: 0 0 auto; height: 110vh; pointer-events: none; z-index: 0;
		background-image: radial-gradient(var(--ink-4) 1px, transparent 1.2px);
		background-size: 28px 28px; background-position: -14px -14px;
		mask-image: linear-gradient(#000 30%, transparent 95%);
		opacity: .55;
	}
	/* first screen fills the viewport, so About starts below the fold */
	.fold { display: flex; flex-direction: column; min-height: 100vh; min-height: 100svh; }

	@media (max-width: 960px) {
		.fold { min-height: 0; }
	}
	@media print {
		.field { display: none !important; }
		.fold { display: block; min-height: 0; }
	}
</style>
