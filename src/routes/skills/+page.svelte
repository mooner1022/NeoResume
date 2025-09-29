<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	interface Skill {
		name: string;
		level: number; // 1-5
		category: 'backend' | 'android' | 'database' | 'tools' | 'cloud' | 'languages';
		color: string;
		description?: string;
		yearsOfExperience: number;
	}

	const skills: Skill[] = [
		// Backend
		{ name: 'Java', level: 5, category: 'backend', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', yearsOfExperience: 8, description: 'Enterprise-level backend development' },
		{ name: 'Spring Boot', level: 5, category: 'backend', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', yearsOfExperience: 6, description: 'Microservices and REST APIs' },
		{ name: 'Node.js', level: 4, category: 'backend', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', yearsOfExperience: 5, description: 'Server-side JavaScript development' },
		{ name: 'Python', level: 4, category: 'backend', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', yearsOfExperience: 4, description: 'Django and FastAPI frameworks' },
		{ name: 'Express.js', level: 4, category: 'backend', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', yearsOfExperience: 4, description: 'RESTful API development' },

		// Android
		{ name: 'Kotlin', level: 5, category: 'android', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300', yearsOfExperience: 6, description: 'Modern Android development' },
		{ name: 'Android SDK', level: 5, category: 'android', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', yearsOfExperience: 8, description: 'Native Android applications' },
		{ name: 'Jetpack Compose', level: 4, category: 'android', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', yearsOfExperience: 3, description: 'Modern UI toolkit for Android' },
		{ name: 'Room Database', level: 4, category: 'android', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300', yearsOfExperience: 4, description: 'Local data persistence' },
		{ name: 'Retrofit', level: 4, category: 'android', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', yearsOfExperience: 5, description: 'Network API integration' },

		// Database
		{ name: 'PostgreSQL', level: 4, category: 'database', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', yearsOfExperience: 5, description: 'Advanced SQL and optimization' },
		{ name: 'MySQL', level: 4, category: 'database', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', yearsOfExperience: 6, description: 'Database design and tuning' },
		{ name: 'MongoDB', level: 3, category: 'database', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', yearsOfExperience: 3, description: 'NoSQL document database' },
		{ name: 'Redis', level: 3, category: 'database', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300', yearsOfExperience: 4, description: 'Caching and session storage' },

		// Tools
		{ name: 'Git', level: 5, category: 'tools', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', yearsOfExperience: 8, description: 'Version control and collaboration' },
		{ name: 'Docker', level: 4, category: 'tools', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', yearsOfExperience: 4, description: 'Containerization and deployment' },
		{ name: 'Gradle', level: 4, category: 'tools', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', yearsOfExperience: 6, description: 'Build automation and dependency management' },
		{ name: 'IntelliJ IDEA', level: 5, category: 'tools', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300', yearsOfExperience: 8, description: 'IDE for Java and Kotlin development' },

		// Cloud
		{ name: 'AWS', level: 3, category: 'cloud', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', yearsOfExperience: 3, description: 'EC2, S3, Lambda, RDS' },
		{ name: 'Google Cloud', level: 3, category: 'cloud', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', yearsOfExperience: 2, description: 'App Engine, Cloud SQL, Storage' },
		{ name: 'Firebase', level: 4, category: 'cloud', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300', yearsOfExperience: 4, description: 'Real-time database and authentication' },

		// Programming Languages
		{ name: 'JavaScript/TypeScript', level: 4, category: 'languages', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300', yearsOfExperience: 5, description: 'Frontend and backend development' },
		{ name: 'SQL', level: 4, category: 'languages', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', yearsOfExperience: 6, description: 'Database queries and optimization' },
		{ name: 'Go', level: 2, category: 'languages', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', yearsOfExperience: 1, description: 'Learning microservices development' }
	];

	const categories = {
		backend: 'Backend Development',
		android: 'Android Development',
		database: 'Database & Storage',
		tools: 'Development Tools',
		cloud: 'Cloud & Infrastructure',
		languages: 'Programming Languages'
	};

	onMount(() => {
		mounted = true;
	});

	function getSkillLevel(level: number): string {
		switch (level) {
			case 5: return 'Expert';
			case 4: return 'Advanced';
			case 3: return 'Intermediate';
			case 2: return 'Learning';
			case 1: return 'Beginner';
			default: return 'Unknown';
		}
	}
</script>

<svelte:head>
	<title>Skills - mooner1022</title>
	<meta name="description" content="Technical skills and expertise in backend development, Android, databases, and more" />
</svelte:head>

<div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
				Skills & Expertise
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				Technologies, frameworks, and tools I've mastered over 8 years of software development
			</p>
		</div>

		<!-- Skills by Category -->
		<div class="space-y-16">
			{#each Object.entries(categories) as [categoryKey, categoryName], categoryIndex}
				<div
					class="category-section opacity-0 transform translate-y-8"
					style="animation: fadeInUp 0.6s ease-out {categoryIndex * 0.1}s forwards"
				>
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
						<div class="w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mr-4"></div>
						{categoryName}
					</h2>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each skills.filter(skill => skill.category === categoryKey) as skill, skillIndex}
							<div
								class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 opacity-0 transform translate-y-4"
								style="animation: fadeInUp 0.4s ease-out {(categoryIndex * 0.5) + (skillIndex * 0.1)}s forwards"
							>
								<!-- Skill Header -->
								<div class="flex items-start justify-between mb-4">
									<div class="flex-1">
										<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
											{skill.name}
										</h3>
										<span class="inline-block {skill.color} px-3 py-1 rounded-full text-xs font-medium mb-2">
											{getSkillLevel(skill.level)}
										</span>
									</div>
									<div class="text-right">
										<div class="text-sm text-gray-500 dark:text-gray-400">
											{skill.yearsOfExperience} years
										</div>
									</div>
								</div>

								<!-- Skill Level Bar -->
								<div class="mb-4">
									<div class="flex items-center justify-between mb-2">
										<span class="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
										<span class="text-sm font-medium text-gray-900 dark:text-white">{skill.level}/5</span>
									</div>
									<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
										<div
											class="bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500 h-2 rounded-full transition-all duration-1000 ease-out"
											style="width: {mounted ? (skill.level / 5) * 100 : 0}%; animation-delay: {(categoryIndex * 0.5) + (skillIndex * 0.1) + 0.5}s"
										></div>
									</div>
								</div>

								<!-- Description -->
								{#if skill.description}
									<p class="text-sm text-gray-600 dark:text-gray-400">
										{skill.description}
									</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Summary Stats -->
		<div class="mt-20">
			<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				Expertise Summary
			</h2>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">8</div>
					<div class="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
				</div>

				<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{skills.length}</div>
					<div class="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
				</div>

				<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{skills.filter(s => s.level >= 4).length}</div>
					<div class="text-sm text-gray-600 dark:text-gray-400">Expert Level</div>
				</div>

				<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{Object.keys(categories).length}</div>
					<div class="text-sm text-gray-600 dark:text-gray-400">Specializations</div>
				</div>
			</div>
		</div>

		<!-- Core Strengths -->
		<div class="mt-20">
			<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				Core Strengths
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div class="text-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
					<div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
						<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4l4 4"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Backend Architecture</h3>
					<p class="text-gray-600 dark:text-gray-400 text-sm">Designing scalable, maintainable backend systems with microservices architecture</p>
				</div>

				<div class="text-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
					<div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
						<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M17.523 15.3414c-.5665 0-.9726-.4061-.9726-.9726s.4061-.9726.9726-.9726.9726.4061.9726.9726-.4061.9726-.9726.9726m-11.046 0c-.5665 0-.9726-.4061-.9726-.9726s.4061-.9726.9726-.9726.9726.4061.9726.9726-.4061.9726-.9726.9726m11.405-6.02l1.79-3.097c.1038-.1794.0422-.4093-.1372-.5131-.1794-.1038-.4093-.0422-.5131.1372L17.13 8.4c-1.399-.6604-2.966-.9726-4.646-.9726-1.68 0-3.247.3122-4.646.9726L6.004 5.866c-.1038-.1794-.3337-.2410-.5131-.1372-.1794.1038-.2410.3337-.1372.5131L7.14 9.32C4.896 10.915 3.654 13.126 3.654 15.64h16.692c0-2.514-1.242-4.725-3.486-6.32"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Android Development</h3>
					<p class="text-gray-600 dark:text-gray-400 text-sm">Creating intuitive mobile experiences with modern Android frameworks and best practices</p>
				</div>

				<div class="text-center bg-gradient-to-br from-purple-50 to-violet-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
					<div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
						<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Database Design</h3>
					<p class="text-gray-600 dark:text-gray-400 text-sm">Optimizing data storage and retrieval with both SQL and NoSQL database systems</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.category-section {
		animation-fill-mode: forwards;
	}
</style>