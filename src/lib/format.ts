import type { Rich } from './content/types';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Content strings are escaped, then **phrase** becomes <b>phrase</b> and `name` becomes <code>name</code>; safe for {@html}. */
export const rich = (s: Rich) =>
	escape(s)
		.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
		.replace(/`(.+?)`/g, '<code>$1</code>');

/** 1 → "01" — section counts, row indices */
export const pad = (n: number) => String(n).padStart(2, '0');
