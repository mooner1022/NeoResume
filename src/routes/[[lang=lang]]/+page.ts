import { content } from '$lib/content';
import type { Lang } from '$lib/content/types';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const lang: Lang = params.lang ?? 'ko';
	return { lang, c: content[lang] };
};
