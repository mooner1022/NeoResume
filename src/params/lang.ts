import type { ParamMatcher } from '@sveltejs/kit';

// only /en/ is a language route; Korean lives at /
export const match = ((param: string): param is 'en' => param === 'en') satisfies ParamMatcher;
