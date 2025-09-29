<script lang="ts">
	import { onMount } from 'svelte';

	let buttonsRef: HTMLElement;
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	function handleEmailClick() {
		window.location.href = 'mailto:siwol@mooner.dev';
	}

	function handleDiscordClick() {
		// Copy Discord ID to clipboard
		navigator.clipboard.writeText('mooner.dev').then(() => {
			// You could add a toast notification here
			console.log('Discord ID copied to clipboard');
		});
	}
</script>

<div
	bind:this={buttonsRef}
	class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
>
	<!-- Email Button -->
	<button
		onclick={handleEmailClick}
		class="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50 w-full sm:w-auto sm:min-w-[160px]"
	>
		<svg
			class="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
			></path>
		</svg>
		Get in Touch
		<div class="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
	</button>

	<!-- Discord Button -->
	<button
		onclick={handleDiscordClick}
		class="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50 w-full sm:w-auto sm:min-w-[160px]"
		title="Click to copy Discord ID"
	>
		<svg
			class="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
		</svg>
		Discord
		<div class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
			Click to copy ID
		</div>
	</button>
</div>