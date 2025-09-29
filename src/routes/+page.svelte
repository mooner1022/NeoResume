<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import HantempAppIcon from '$lib/assets/ic_main-playstore.png';
	import StarLightAppIcon from '$lib/assets/ic_starlight.png';
	import { onMount } from 'svelte';
	import { fetchTopRepos, type GitHubRepo } from '$lib/services/github';
	import { base } from '$app/paths';

	let repos = $state<GitHubRepo[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			repos = await fetchTopRepos(6);
		} catch (error) {
			console.error('Failed to load repos:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>mooner1022</title>
	<meta name="description" content="Software engineer with 8 years of experience in backend and Android development. Explore my projects and technical expertise." />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- Tech Stack Section -->
<TechStack />

<!-- Featured Projects Section -->
<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Featured Projects
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
				Here are some of my most popular open-source projects on GitHub
			</p>
			<a
				href="{base}/projects"
				class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
			>
				View all projects
				<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>

		{#if loading}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each Array(6) as _}
					<div class="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
						<div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
						<div class="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
						<div class="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
						<div class="flex justify-between items-center">
							<div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
							<div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each repos as repo, index}
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						class="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
						style="animation-delay: {index * 100}ms"
					>
						<div class="flex items-start justify-between mb-4">
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
								{repo.name}
							</h3>
							<div class="flex items-center space-x-1 text-yellow-500">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
								</svg>
								<span class="text-sm font-medium">{repo.stargazers_count}</span>
							</div>
						</div>

						<p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
							{repo.description || 'No description available'}
						</p>

						<div class="flex items-center justify-between">
							{#if repo.language}
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
									{repo.language}
								</span>
							{/if}

							<div class="flex items-center text-gray-500 dark:text-gray-400 text-xs">
								Updated {new Date(repo.updated_at).toLocaleDateString()}
							</div>
						</div>

						{#if repo.topics && repo.topics.length > 0}
							<div class="flex flex-wrap gap-1 mt-3">
								{#each repo.topics.slice(0, 3) as topic}
									<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
										{topic}
									</span>
								{/each}
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Android App Showcase -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
			Featured Android App
		</h2>

		<div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
			<div class="flex items-center justify-center mb-8">
				<div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-lg">
					<img class="rounded-2xl" src={HantempAppIcon} alt="지금 한강은｡ app icon"/>
				</div>
			</div>

			<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
				지금 한강은｡
			</h3>

			<p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
				A simple yet essential Android application that provides real-time Han River water temperature monitoring, built with modern Korean UI/UX design and featuring instant temperature updates for Seoul's iconic waterway.
			</p>

			<div class="mb-6 text-center">
				<div class="flex items-center justify-center space-x-6 mb-4">
					<div class="flex items-center">
						<svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
						<span class="text-sm text-gray-600 dark:text-gray-400">4.85 (273 reviews)</span>
					</div>
					<span class="text-sm text-gray-600 dark:text-gray-400">4.6K+ downloads</span>
				</div>

				<div class="flex flex-wrap gap-2 justify-center mb-8">
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Kotlin</span>
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Android</span>
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Ktor</span>
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Redis</span>
				</div>
			</div>

			<div class="flex items-center justify-center">
				<a
					href="https://play.google.com/store/apps/details?id=com.temp.hanriv.moonm"
					target="_blank"
					rel="noopener noreferrer"
					class="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
					</svg>
					<div class="text-left">
						<div class="text-xs">Get it on</div>
						<div class="font-semibold">Google Play</div>
					</div>
				</a>
			</div>
		</div>
		<div class="mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
			<div class="flex items-center justify-center mb-8">
				<div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-lg">
					<img class="rounded-2xl" src={StarLightAppIcon} alt="starlight app icon"/>
				</div>
			</div>

			<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
				Project StarLight
			</h3>

			<p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
				A scriptable messenger auto-reply platform/framework built with Kotlin, featuring plugin support for extensible functionality and automation capabilities.
			</p>

			<div class="mb-6 text-center">
				<div class="flex items-center justify-center space-x-6 mb-4">
					<div class="flex items-center">
						<svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
						<span class="text-sm text-gray-600 dark:text-gray-400">46</span>
					</div>
					<span class="text-sm text-gray-600 dark:text-gray-400">1.5K+ downloads</span>
				</div>

				<div class="flex flex-wrap gap-2 justify-center mb-8">
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Kotlin</span>
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Android</span>
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Plugin</span>
					<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">Scriptable</span>
				</div>
			</div>

			<div class="flex items-center justify-center">
				<a
					href="https://starlight.mooner.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="mr-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg px-6 py-3 shadow-md border flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
				>
					<i class="fa-regular fa-house"></i>
					<div class="text-left">
						Visit Site
					</div>
				</a>
				<a
					href="https://github.com/mooner1022/StarLight"
					target="_blank"
					rel="noopener noreferrer"
					class="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors"
				>
					<i class="fa-brands fa-github"></i>
					<div class="text-left">
						View Source
					</div>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Experience Summary -->
<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12">
			Experience Highlights
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
				<div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">8+</div>
				<div class="text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
			</div>

			<div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
				<div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">{repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}+</div>
				<div class="text-gray-600 dark:text-gray-400 font-medium">GitHub Stars</div>
			</div>

			<div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
				<div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">{repos.length}+</div>
				<div class="text-gray-600 dark:text-gray-400 font-medium">Open Source Projects</div>
			</div>
		</div>

		<div class="mt-12">
			<a
				href="{base}/experience"
				class="inline-flex items-center bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
			>
				View Full Experience
				<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</section>
