import { content } from '$lib/content';
import { details } from '$lib/content/projects';
import type { Lang, Project } from '$lib/content/types';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const lang: Lang = params.lang ?? 'ko';
	const id = params.id as Project['id'];
	const c = content[lang];
	const items = c.projects.items;
	const index = items.findIndex((p) => p.id === id);
	return {
		lang,
		c,
		index,
		project: items[index],
		detail: details[id][lang],
		prev: items[index - 1] ?? null,
		next: items[index + 1] ?? null
	};
};
