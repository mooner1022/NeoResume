<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>mooner</title>
	<meta name="description" content="Backend and Android software engineer with 8 years of experience" />
	<meta name="keywords" content="software engineer, backend developer, android developer, portfolio" />
	<meta name="author" content="mooner1022" />
	<meta property="og:title" content="mooner" />
	<meta property="og:description" content="Backend and Android software engineer with 8 years of experience" />
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 font-[Inter,system-ui,sans-serif]">
	<Navigation />
	<main>
		{@render children?.()}
	</main>
</div>
