export type Lang = 'ko' | 'en';

/** Inline text; wrap a phrase in **double asterisks** to bold it, or in `backticks` for code. */
export type Rich = string;

export interface Link {
	label: string;
	href: string;
}

export interface Tag {
	label: string;
	/** highlighted in the signal colour (stars, downloads) */
	signal?: boolean;
}

export interface Job {
	when: string;
	place: string;
	/** still ongoing — filled diamond on the timeline */
	now?: boolean;
	org: string;
	role: string;
	tags?: string[];
	points: Rich[];
}

export interface Project {
	/** also picks the preview thumbnail */
	id: 'amoa' | 'agora' | 'hanriv' | 'starlight' | 'site';
	name: string;
	subtitle: string;
	year: string;
	status: string;
	desc: string;
	tags: Tag[];
	card: {
		title: string;
		specs: [label: string, value: string][];
		links?: Link[];
	};
}

/** one "problem → approach → result" case on a project page */
export interface Case {
	title: string;
	problem: Rich;
	approach: Rich;
	result: Rich;
}

export interface Shot {
	/** under static/, e.g. /projects/hanriv/main.webp */
	src: string;
	width: number;
	height: number;
	alt: string;
	caption: string;
}

/** the long-form page behind a project row */
export interface ProjectDetail {
	/** one or two sentences under the title */
	lead: Rich;
	facts: { k: string; v: string }[];
	structure: { intro: Rich; items: { name: string; text: Rich }[] };
	architecture: { intro: Rich; notes: Rich[] };
	/** empty while the cases are still being written */
	cases: Case[];
	shots: Shot[];
}

export interface Repo {
	name: string;
	stars: string;
	desc: string;
	href: string;
}

export interface EducationRow {
	when: string;
	name: string;
	detail: string;
	note?: string;
	journey?: { year: string; text: string }[];
}

export interface Resume {
	meta: { title: string; description: string; locale: string };
	hero: {
		tagline: string;
		/** one sentence per line */
		intro: string[];
		/** the 3D printer panel beside the name */
		figureLabel: string;
		flowLabel: string;
		filaments: [string, string, string];
		hint: string;
	};
	about: {
		meta: string;
		facts: { k: string; v: string[] }[];
		/** the first paragraph is set larger */
		prose: Rich[];
	};
	experience: { meta: string; jobs: Job[] };
	projects: {
		meta: string;
		items: Project[];
		more: { summary: string; repos: Repo[] };
	};
	toolkit: {
		meta: string;
		groups: { name: string; items: { name: string; daily?: boolean }[] }[];
	};
	education: { meta: string; rows: EducationRow[] };
	now: { items: { k: string; text: string }[] };
	/** words used on the project pages */
	projectPage: {
		back: string;
		details: string;
		prev: string;
		next: string;
		pending: string;
	};
	contact: {
		say: string;
		sub: string;
		copy: string;
		clickToCopy: string;
	};
}
