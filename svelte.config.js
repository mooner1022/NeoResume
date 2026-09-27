import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// ko at /, en at /en/, one page per project under each — listed so a missing page fails the build
		prerender: {
			entries: ['/', '/en/', ...['amoa', 'agora', 'hanriv', 'starlight', 'site'].flatMap((id) => [`/projects/${id}/`, `/en/projects/${id}/`])]
		}
	}
};

export default config;
