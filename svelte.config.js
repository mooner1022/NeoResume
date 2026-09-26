import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// ko at /, en at /en/ — listed explicitly so both are prerendered
		prerender: { entries: ['/', '/en/'] }
	}
};

export default config;
