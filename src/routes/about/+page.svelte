<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import PfLogo from "$lib/assets/pf_logo.png"

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const education = [
		{
			degree: 'Undergraduate in Computer Engineering',
			institution: 'Hanyang University (ERICA Campus)',
			period: '2021 - Present',
			description: 'Currently studying Computer Engineering with focus on software development and system architecture.',
			courses: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Systems', 'Software Engineering', 'Opeating Systems', 'Computer Networks']
		}
	];

	const interests = [
		{
			title: 'Open Source Contributing',
			description: 'Active contributor to various open source projects, sharing knowledge with the developer community.',
			icon: 'fa-solid fa-book-open'
		},
		{
			title: 'Mobile Technology',
			description: 'Staying updated with the latest Android development trends and mobile UI/UX innovations.',
			icon: 'fa-solid fa-mobile'
		},
		{
			title: 'System Architecture',
			description: 'Passionate about designing scalable systems and exploring new backend technologies.',
			icon: 'fa-regular fa-object-group'
		},
		{
			title: 'Tech Mentoring',
			description: 'Mentoring junior developers and sharing programming best practices through code reviews.',
			icon: 'fa-regular fa-newspaper'
		},
		{
			title: 'Continuous Learning',
			description: 'Always exploring new programming languages, frameworks, and development methodologies.',
			icon: 'fa-solid fa-pen-nib'
		},
		{
			title: 'Problem Solving',
			description: 'Enjoy tackling complex algorithms and optimizing system performance challenges.',
			icon: 'fa-solid fa-puzzle-piece'
		}
	];

	const timeline = [
		{
			year: '2016',
			event: 'First started programming with <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"><i class="devicon-javascript-plain mr-1"></i>JavaScript</span>',
			highlight: false
		},
		{
			year: '2017',
			event: 'Started Android programming with <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"><i class="devicon-java-plain mr-1"></i>Java</span>',
			highlight: false
		},
		{
			year: '2018',
			event: '<strong>Launched first mobile app on Google Play</strong>',
			highlight: true
		},
		{
			year: '2019',
			event: '<strong>Transitioned to full-stack development</strong>',
			highlight: false
		},
		{
			year: '2019',
			event: 'Led first major backend architecture project',
			highlight: false
		},
		{
			year: '2019',
			event: 'Started to learn and use <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"><i class="devicon-kotlin-plain mr-1"></i>Kotlin</span>',
			highlight: false
		},
		{
			year: '2020',
			event: 'Experienced <strong>2 months of internship</strong> on IT company',
			highlight: false
		},
		{
			year: '2021',
			event: 'Entered <strong>Hoseo University</strong>, as CS major',
			highlight: false
		},
		{
			year: '2023',
			event: '<strong>Transferred from Hoseo University to Hanyang University(ERICA)</strong>',
			highlight: true
		},
		{
			year: '2024',
			event: '<blockquote class="border-l-4 border-blue-500 pl-3 italic text-gray-600 dark:text-gray-400">Currently serving in the ROK Air Force as an IT Systems Management Specialist</blockquote>',
			highlight: true
		},
	];
</script>

<svelte:head>
	<title>About - mooner</title>
	<meta name="description" content="Learn more about mooner1022 - education, interests, and journey as a software engineer" />
</svelte:head>

<div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
				About Me
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				Passionate software engineer with a love for creating efficient, scalable solutions
			</p>
		</div>

		<!-- Introduction -->
		<div
			class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-16 transform transition-all duration-700 {mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
		>
			<div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
				<!-- Avatar placeholder -->
				<div class="flex-shrink-0">
					<div class="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
						<img src={PfLogo} alt="profile logo" class="w-full h-full rounded-2xl justify-center"/>
					</div>
				</div>

				<!-- Bio -->
				<div class="flex-1 text-center lg:text-left">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Hello, I'm Minki Moon (mooner)
					</h2>
					<div class="prose prose-gray dark:prose-invert max-w-none">
						<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
							I'm just an ordinary undergraduate who likes programming. I <strong>taught myself</strong> without learning anywhere else,
							and have been programming for <mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">8 years</mark>. Currently studying Computer Engineering at <strong>Hanyang University (ERICA Campus)</strong>,
							where I balance academics with my passion for creating software solutions.
						</p>
						<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
							Throughout my self-taught journey, I've specialized in building robust backend systems using <strong>Java</strong> and <strong>Kotlin</strong>,
							while also crafting intuitive mobile experiences with modern Android frameworks.
							I believe in writing <em>clean, maintainable code</em> and following best practices that scale.
						</p>
						<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
							When I'm not studying or coding, I enjoy contributing to <strong>open source projects</strong> and sharing
							my experiences with the developer community. I believe in continuous learning and growing
							as both a student and a self-taught developer.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Education -->
		<div class="mb-16">
			<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				Education & Certifications
			</h2>

			<div class="space-y-6">
				{#each education as edu, index}
					<div
						class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-700 {mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
						style="transition-delay: {index * 200}ms"
					>
						<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
							<div>
								<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
									{edu.degree}
								</h3>
								<p class="text-lg text-gray-600 dark:text-gray-300">
									{edu.institution}
								</p>
							</div>
							<span class="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
								{edu.period}
							</span>
						</div>

						<p class="text-gray-600 dark:text-gray-400 mb-4">
							{edu.description}
						</p>

						<div>
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Courses:</h4>
							<div class="flex flex-wrap gap-2">
								{#each edu.courses as course}
									<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
										{course}
									</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Journey Timeline -->
		<div class="mb-16">
			<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				My Journey
			</h2>

			<div class="relative">
				<!-- Timeline line -->
				<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

				<div class="space-y-8">
					{#each timeline as item, index}
						<div
							class="relative flex items-center transform transition-all duration-700 {mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}"
							style="transition-delay: {index * 150}ms"
						>
							<!-- Timeline dot -->
							<div class="absolute left-2 w-4 h-4 {item.highlight ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-400 dark:bg-gray-500'} rounded-full border-4 border-white dark:border-gray-900 z-10 {item.highlight ? 'animate-pulse' : ''}"></div>

							<!-- Content -->
							<div class="ml-12 {item.highlight ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'} rounded-lg p-4 shadow-md border flex-1 {item.highlight ? 'shadow-lg' : ''}">
								<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
									<div class="text-gray-600 dark:text-gray-400">{@html item.event}</div>
									<span class="text-sm font-medium text-gray-900 dark:text-white mt-1 sm:mt-0 {item.highlight ? 'text-blue-700 dark:text-blue-300' : ''}">
										{item.year}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Interests & Passions -->
		<div class="mb-16">
			<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				Interests & Passions
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each interests as interest, index}
					<div
						class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform {mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
						style="transition-delay: {index * 100}ms"
					>
						<div class="text-center">
							<div class="text-4xl mb-4">
								<i class="{interest.icon}"></i>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								{interest.title}
							</h3>
							<p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
								{interest.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Contact CTA -->
		<div class="text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
				Let's Work Together
			</h2>
			<p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
				I'm always interested in discussing new opportunities, collaborating on exciting projects,
				or simply connecting with fellow developers.
			</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
				<a
					href="{base}/"
					class="inline-flex items-center bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
				>
					Get in Touch
					<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
					</svg>
				</a>
				<a
					href="{base}/projects"
					class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
				>
					View My Projects
					<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>