<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchTopRepos, type GitHubRepo } from '$lib/services/github';
	import AppImage from "$lib/assets/app_screenshot.png";
	import AppIcon from "$lib/assets/ic_main-playstore.png";
	import SLAppIcon from "$lib/assets/ic_starlight.png";

	let repos = $state<GitHubRepo[]>([]);
	let loading = $state(true);
	let mounted = $state(false);

	onMount(async () => {
		mounted = true;
		try {
			repos = await fetchTopRepos(12); // Get more repos for the projects page
		} catch (error) {
			console.error('Failed to load repos:', error);
		} finally {
			loading = false;
		}
	});

	const hantempDesc = {
		name: '지금 한강은｡',
		description: "A simple yet essential Android application that provides real-time Han River water temperature monitoring, built with modern Korean UI/UX design and featuring instant temperature updates for Seoul's iconic waterway.",
		features: [
			'Modern Design UI',
			'Real-time information update',
			'Stable Backend service',
			'Caching-Based Performance optimizations'
		],
		technologies: ['Kotlin', 'Android', 'Ktor', 'Redis', 'PostgreSQL', 'Traefik Load Balancing'],
		playStoreUrl: 'https://play.google.com/store/apps/details?id=com.temp.hanriv.moonm',
		sourceUrl: '#',
		downloads: '4.6K+',
		rating: 4.85,
		reviews: 273
	};

	const starlightDesc = {
		name: 'Project StarLight',
		description: 'A scriptable messenger auto-reply platform/framework built with Kotlin, featuring plugin support for extensible functionality and automation capabilities.',
		features: [
			'Scriptable Auto-Reply System',
			'Plugin Architecture Support',
			'Extensible Automation Framework',
			'Cross-Platform Messenger Integration'
		],
		technologies: ['Kotlin', 'Android', 'Messenger API', 'Plugin System'],
		sourceUrl: '#',
		category: 'Messenger Platform'
	};
</script>

<svelte:head>
	<title>Projects - mooner1022</title>
	<meta name="description" content="Open source projects and Android applications by mooner1022" />
</svelte:head>

<div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
				My Projects
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				Open source projects, Android applications, and contributions to the developer community
			</p>
		</div>

		<!-- Featured Projects -->
		<div class="mb-20">
			<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				Featured Projects
			</h2>

			<!-- Android App -->
			<div class="mb-16">
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Android Application</h3>

			<div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					<!-- App Info -->
					<div>
						<div class="flex items-center mb-6">
							<div class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mr-4">
								<img class="rounded-2xl" src={AppIcon} alt="지금 한강은｡ app icon"/>
							</div>
							<div>
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white">{hantempDesc.name}</h3>
								<div class="flex items-center mt-2">
									<div class="flex items-center mr-4">
										<svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
										</svg>
										<span class="text-sm text-gray-600 dark:text-gray-400">{hantempDesc.rating} ({hantempDesc.reviews} reviews)</span>
									</div>
									<span class="text-sm text-gray-600 dark:text-gray-400">{hantempDesc.downloads} downloads</span>
								</div>
							</div>
						</div>

						<p class="text-gray-600 dark:text-gray-400 mb-6">
							{hantempDesc.description}
						</p>

						<div class="mb-6">
							<h4 class="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
							<ul class="space-y-2">
								{#each hantempDesc.features as feature}
									<li class="flex items-center text-gray-600 dark:text-gray-400">
										<svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
										</svg>
										{feature}
									</li>
								{/each}
							</ul>
						</div>

						<div class="mb-6">
							<h4 class="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
							<div class="flex flex-wrap gap-2">
								{#each hantempDesc.technologies as tech}
									<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">
										{tech}
									</span>
								{/each}
							</div>
						</div>

						<div class="flex justify-center">
							<a
								href={hantempDesc.playStoreUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors"
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

					<div class="lg:pl-8">
						<div class="bg-gray-200 dark:bg-gray-700 rounded-2xl p-8 aspect-[3/4] flex items-center justify-center">
							<img src={AppImage} alt="지금 한강은｡ app screenshot"/>
						</div>
					</div>
				</div>
			</div>
			</div>

			<!-- Project StarLight -->
			<div class="mb-16">
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Open-Source Project</h3>

				<div class="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
					<div class="text-center">
						<div class="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
							<img class="rounded-2xl" src={SLAppIcon} alt="지금 한강은｡ app icon"/>
						</div>

						<h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							{starlightDesc.name}
						</h4>

						<p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
							{starlightDesc.description}
						</p>

						<div class="mb-6">
							<h5 class="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h5>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								{#each starlightDesc.features as feature}
									<div class="flex items-center justify-center text-gray-600 dark:text-gray-400">
										<svg class="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
										</svg>
										{feature}
									</div>
								{/each}
							</div>
						</div>

						<div class="mb-8">
							<h5 class="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h5>
							<div class="flex flex-wrap gap-2 justify-center">
								{#each starlightDesc.technologies as tech}
									<span class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600">
										{tech}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- GitHub Projects -->
		<div>
			<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				Open Source Projects
			</h2>

			{#if loading}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each Array(12) as _}
						<div class="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
							<div class="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
							<div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
							<div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
							<div class="flex justify-between items-center mb-4">
								<div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
								<div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
							</div>
							<div class="flex gap-1">
								<div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
								<div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each repos as repo, index}
						<div
							class="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 {mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
							style="animation-delay: {index * 50}ms"
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

							<p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 min-h-[3rem]">
								{repo.description || 'No description available'}
							</p>

							<div class="flex items-center justify-between mb-4">
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
								<div class="flex flex-wrap gap-1 mb-4">
									{#each repo.topics.slice(0, 3) as topic}
										<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
											{topic}
										</span>
									{/each}
								</div>
							{/if}

							<a
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
							>
								View on GitHub
								<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
								</svg>
							</a>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Stats -->
		<div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}+</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">Total Stars</div>
			</div>
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{repos.length}+</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
			</div>
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{new Set(repos.map(r => r.language).filter(Boolean)).size}</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">Languages</div>
			</div>
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">50K+</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">App Downloads</div>
			</div>
		</div>
	</div>
</div>