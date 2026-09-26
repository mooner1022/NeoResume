import type { Handle } from '@sveltejs/kit';

// <html lang> for prerendered pages; +page.svelte keeps it in sync on client-side navigation
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.url.pathname.startsWith('/en') ? 'en' : 'ko')
	});
