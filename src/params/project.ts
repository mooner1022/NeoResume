import type { ParamMatcher } from '@sveltejs/kit';
import type { Project } from '$lib/content/types';

const IDS: Project['id'][] = ['amoa', 'agora', 'hanriv', 'starlight', 'site'];

// one detail page per project row; anything else is a 404
export const match = ((param: string): param is Project['id'] => IDS.includes(param as Project['id'])) satisfies ParamMatcher;
