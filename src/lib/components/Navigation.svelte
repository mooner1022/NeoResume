<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from './ThemeToggle.svelte';
	import PfLogo from '$lib/assets/pf_logo.png';

	const navItems = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/about`, label: 'About' },
		//{ href: `${base}/experience`, label: 'Experience' },
		{ href: `${base}/projects`, label: 'Projects' },
		//{ href: `${base}/skills`, label: 'Skills' },
	];

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo placeholder -->
			<a href="{base}/" class="flex items-center space-x-2" onclick={closeMobileMenu}>
				<img src="{PfLogo}" alt="profile logo" class="w-8 h-8 rounded transition-colors duration-200"/>
				<span class="font-bold text-xl text-gray-900 dark:text-white">mooner</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navItems as item}
					<a
						href={item.href}
						class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === item.href ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : ''}"
					>
						{item.label}
					</a>
				{/each}
				<div class="flex items-center space-x-3">
					<a
						href="https://github.com/mooner1022/NeoResume"
						target="_blank"
						rel="noopener noreferrer"
						class="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
						aria-label="View source code on GitHub"
					>
						<i class="fab fa-github text-xl"></i>
					</a>
					<ThemeToggle />
				</div>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden flex items-center space-x-2">
				<a
					href="https://github.com/mooner1022/NeoResume"
					target="_blank"
					rel="noopener noreferrer"
					class="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
					aria-label="View source code on GitHub"
				>
					<i class="fab fa-github text-lg"></i>
				</a>
				<ThemeToggle />
				<button
					onclick={toggleMobileMenu}
					class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
					aria-label="Toggle menu"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						{#if mobileMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						{/if}
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden pb-4">
				<div class="space-y-1">
					{#each navItems as item}
						<a
							href={item.href}
							onclick={closeMobileMenu}
							class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 {$page.url.pathname === item.href ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : ''}"
						>
							{item.label}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav>

<!-- Spacer for fixed navigation -->
<div class="h-16"></div>