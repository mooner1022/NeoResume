<script lang="ts">
	import { onMount } from 'svelte';

	interface TechItem {
		name: string;
		color: string;
		icon: string;
	}

	interface TechCategory {
		name: string;
		items: TechItem[];
	}

	const techStack: TechCategory[] = [
		{
			name: 'Languages',
			items: [
				{ name: 'Java', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', icon: 'devicon-java-plain' },
				{ name: 'Kotlin', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300', icon: 'devicon-kotlin-plain' },
				{ name: 'C', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'devicon-c-plain' },
				{ name: 'C++', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'devicon-cplusplus-plain' },
				{ name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300', icon: 'devicon-javascript-plain' },
				{ name: 'TypeScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'devicon-typescript-plain' },
				{ name: 'Svelte', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', icon: 'devicon-svelte-plain' },
			]
		},
		{
			name: 'Backend Development',
			items: [
				{ name: 'Ktor', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300', icon: 'devicon-ktor-plain' },
				{ name: 'Spring Boot', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', icon: 'fas fa-leaf' },
				{ name: 'Node.js', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', icon: 'fab fa-node-js' },
				{ name: 'Express.js', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: 'fas fa-server' },
			]
		},
		{
			name: 'Android Development',
			items: [
				{ name: 'Android SDK', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', icon: 'fab fa-android' },
				{ name: 'Jetpack Compose', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'fas fa-mobile-alt' },
				{ name: 'Room Database', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300', icon: 'fas fa-database' },
				{ name: 'SQLite', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'devicon-sqlite-plain' },
			]
		},
		{
			name: 'Database & Storage',
			items: [
				{ name: 'PostgreSQL', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'devicon-postgresql-plain' },
				{ name: 'SQLite', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'devicon-sqlite-plain' },
				{ name: 'MongoDB', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', icon: 'devicon-mongodb-plain' },
				{ name: 'Redis', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300', icon: 'devicon-redis-plain' }
			]
		},
		{
			name: 'Development Tools',
			items: [
				{ name: 'Git', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', icon: 'fab fa-git-alt' },
				{ name: 'Docker', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: 'fab fa-docker' },
				{ name: 'Gradle', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: 'fas fa-cogs' },
				{ name: 'IntelliJ IDEA', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: 'devicon-intellij-plain' }
			]
		},
		{
			name: 'Cloud & Infrastructure',
			items: [
				{ name: 'AWS', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', icon: 'fab fa-aws' },
				{ name: 'CloudFlare', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', icon: 'fab fa-cloudflare' },
			]
		}
	];

	let mounted = $state(false);
	let visibleChips = $state<Record<string, boolean>>({});
	let sectionElement: HTMLElement;
	let animationTriggered = $state(false);

	onMount(() => {
		mounted = true;

		// Intersection Observer to trigger animation when section is visible
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !animationTriggered) {
						animationTriggered = true;
						startChipAnimation();
					}
				});
			},
			{ threshold: 0.2 } // Trigger when 20% of the section is visible
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			observer.disconnect();
		};
	});

	function startChipAnimation() {
		let itemIndex = 0;
		techStack.forEach(category => {
			category.items.forEach(item => {
				setTimeout(() => {
					visibleChips[item.name] = true;
				}, itemIndex * 100);
				itemIndex++;
			});
		});
	}
</script>

<section class="py-20 px-4 sm:px-6 lg:px-8" bind:this={sectionElement}>
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Tech Stack
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				Technologies and tools I use to build robust, scalable applications
			</p>
		</div>

		<!-- Tech -->
		<div class="space-y-12">
			{#each techStack as category}
				<div class="category-section">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
						<div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-3"></div>
						{category.name}
					</h3>

					<div class="flex flex-wrap gap-3">
						{#each category.items as item}
							<div
								class="tech-chip {item.color} px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 transition-all duration-500 transform hover:scale-105 hover:shadow-lg cursor-pointer flex items-center {visibleChips[item.name] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
							>
								<i class="{item.icon} text-base mr-2 flex items-center"></i>
								{item.name}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Years of experience -->
		<div class="mt-16 text-center">
			<div class="inline-flex items-center space-x-4 px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
				<div class="flex items-center space-x-2">
					<div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
					<span class="text-2xl font-bold text-gray-900 dark:text-white">8</span>
				</div>
				<span class="text-gray-600 dark:text-gray-400">Years of Programming Experience</span>
			</div>
		</div>
	</div>
</section>

<style>
	.tech-chip {
		position: relative;
		overflow: hidden;
	}

	.tech-chip::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
		transition: left 0.5s;
	}

	.tech-chip:hover::before {
		left: 100%;
	}

	.category-section {
		opacity: 0;
		transform: translateY(20px);
		animation: fadeInUp 0.6s ease-out forwards;
	}

	.category-section:nth-child(1) { animation-delay: 0.1s; }
	.category-section:nth-child(2) { animation-delay: 0.2s; }
	.category-section:nth-child(3) { animation-delay: 0.3s; }
	.category-section:nth-child(4) { animation-delay: 0.4s; }
	.category-section:nth-child(5) { animation-delay: 0.5s; }

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>