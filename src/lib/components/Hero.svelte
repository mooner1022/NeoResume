<script lang="ts">
	import { onMount } from 'svelte';
	import ContactButtons from './ContactButtons.svelte';
	import PfLogo from "$lib/assets/pf_logo.png";

	let mounted = $state(false);
	let titleRef: HTMLElement;
	let typingText = $state('');
	const fullTitle = 'Backend & Android Developer';
	let typingIndex = $state(0);

	onMount(() => {
		mounted = true;

		// Typing animation
		const typeInterval = setInterval(() => {
			if (typingIndex <= fullTitle.length) {
				typingText = fullTitle.slice(0, typingIndex);
				typingIndex++;
			} else {
				clearInterval(typeInterval);
			}
		}, 100);

		return () => clearInterval(typeInterval);
	});
</script>

<section class="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto text-center">
		<!-- Logo placeholder with animation -->
		<div
			class="w-36 h-36 mx-auto mb-8 rounded-2xl shadow-lg transform transition-all duration-1000 {mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}"
			style="box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
		>
			<img src={PfLogo} alt="profile logo" class="w-full h-full rounded-2xl bg-white justify-center"/>
		</div>

		<!-- Name with slide-in animation -->
		<h1
			class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 transform transition-all duration-1000 delay-300 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
		>
			<span class="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
				Minki Moon
			</span>
		</h1>

		<!-- Typing animation title -->
		<div
			class="h-16 mb-6 transform transition-all duration-1000 delay-500 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
			bind:this={titleRef}
		>
			<h2 class="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-medium">
				{typingText}<span class="animate-pulse">|</span>
			</h2>
		</div>

		<!-- Description -->
		<p
			class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed transform transition-all duration-1000 delay-700 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
		>
			Just an ordinary undergraduate at <strong class="text-gray-900 dark:text-white">Hanyang University (ERICA)</strong>
			studying Computer Engineering who likes programming.<br>
			Self-taught developer passionate about backend systems and Android applications.
		</p>

		<!-- Contact buttons -->
		<div
			class="transform transition-all duration-1000 delay-1000 mb-16 sm:mb-20 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
		>
			<ContactButtons />
		</div>

		<!-- Scroll indicator -->
		<div
			class="transform transition-all duration-1000 delay-1200 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
		>
			<div class="flex flex-col items-center space-y-2">
				<span class="text-sm text-gray-500 dark:text-gray-400 font-medium">Scroll to explore</span>
				<div class="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
					<div class="w-1 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-2 animate-bounce"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Background decoration -->
	<div class="absolute inset-0 -z-10 overflow-hidden">
		<div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
		<div class="absolute top-1/3 right-1/4 w-72 h-72 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
		<div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gray-100 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
	</div>
</section>

<style>
	@keyframes blob {
		0%, 100% { transform: translate(0px, 0px) scale(1); }
		33% { transform: translate(30px, -50px) scale(1.1); }
		66% { transform: translate(-20px, 20px) scale(0.9); }
	}

	.animate-blob {
		animation: blob 7s infinite;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>