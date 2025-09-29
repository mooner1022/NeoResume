<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const experiences = [
		{
			period: '2022 - Present',
			role: 'Senior Software Engineer',
			company: 'Tech Company',
			type: 'Full-time',
			description: 'Leading backend development for scalable microservices architecture. Mentoring junior developers and implementing CI/CD pipelines.',
			technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS'],
			achievements: [
				'Reduced API response time by 40% through optimization',
				'Led migration to microservices architecture',
				'Implemented automated testing reducing bugs by 60%'
			]
		},
		{
			period: '2020 - 2022',
			role: 'Backend Developer',
			company: 'StartupCorp',
			type: 'Full-time',
			description: 'Developed and maintained RESTful APIs and database systems. Built Android applications with modern development practices.',
			technologies: ['Kotlin', 'Android SDK', 'Node.js', 'MongoDB', 'Express.js'],
			achievements: [
				'Built mobile app with 50K+ downloads',
				'Implemented real-time notifications system',
				'Optimized database queries improving performance by 35%'
			]
		},
		{
			period: '2018 - 2020',
			role: 'Full Stack Developer',
			company: 'Digital Agency',
			type: 'Full-time',
			description: 'Created web applications and mobile apps for various clients. Focused on user experience and clean architecture.',
			technologies: ['Python', 'Django', 'React', 'Android', 'Firebase'],
			achievements: [
				'Delivered 15+ client projects on time',
				'Improved client satisfaction scores by 25%',
				'Introduced automated deployment processes'
			]
		},
		{
			period: '2016 - 2018',
			role: 'Junior Developer',
			company: 'Software Solutions Inc',
			type: 'Full-time',
			description: 'Started professional career focusing on mobile app development and learning backend technologies.',
			technologies: ['Java', 'Android', 'MySQL', 'PHP', 'Git'],
			achievements: [
				'Completed Android certification',
				'Contributed to 5+ production applications',
				'Learned modern development practices'
			]
		},
		{
			period: '2003',
			role: 'Hello, World!',
			company: 'South Korea',
			type: '',
			description: '',
			technologies: [],
			achievements: []
		}
	];
</script>

<svelte:head>
	<title>Experience - mooner</title>
	<meta name="description" content="8 years of professional software development experience in backend and Android development" />
</svelte:head>

<div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
				Professional Experience
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				8 years of building robust software solutions, from mobile applications to scalable backend systems
			</p>
		</div>

		<!-- Timeline -->
		<div class="relative">
			<!-- Timeline line -->
			<div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

			<!-- Experience items -->
			{#each experiences as exp, index}
				<div
					class="relative flex items-start mb-12 transform transition-all duration-700 {mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
					style="transition-delay: {index * 200}ms"
				>
					<!-- Timeline dot -->
					<div class="absolute left-6 w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

					<!-- Content card -->
					<div class="ml-20 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 w-full hover:shadow-xl transition-shadow">
						<!-- Header -->
						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
							<div>
								<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
									{exp.role}
								</h3>
								<p class="text-lg text-gray-600 dark:text-gray-300 font-medium">
									{exp.company}
								</p>
							</div>
							<div class="mt-2 sm:mt-0 flex flex-col sm:items-end">
								<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 mb-2">
									{exp.period}
								</span>
								<span class="text-sm text-gray-500 dark:text-gray-400">
									{exp.type}
								</span>
							</div>
						</div>

						<!-- Description -->
						<p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							{exp.description}
						</p>

						<!-- Technologies -->
						{#if exp.technologies.length !== 0}
						<div class="mb-4">
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Technologies Used:</h4>
							<div class="flex flex-wrap gap-2">
								{#each exp.technologies as tech}
									<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
										{tech}
									</span>
								{/each}
							</div>
						</div>
						{/if}

						<!-- Achievements -->
						{#if exp.achievements.length !== 0}
						<div>
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
							<ul class="list-disc list-inside space-y-1">
								{#each exp.achievements as achievement}
									<li class="text-sm text-gray-600 dark:text-gray-400">
										{achievement}
									</li>
								{/each}
							</ul>
						</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Summary stats -->
		<div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">8+</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
			</div>
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">4</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">Companies</div>
			</div>
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">Projects Delivered</div>
			</div>
			<div class="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">15+</div>
				<div class="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
			</div>
		</div>

		<!-- CTA -->
		<div class="mt-16 text-center">
			<p class="text-gray-600 dark:text-gray-400 mb-6">
				Interested in working together? Let's discuss your next project.
			</p>
			<a
				href="/"
				class="inline-flex items-center bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
			>
				Get in Touch
				<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</div>