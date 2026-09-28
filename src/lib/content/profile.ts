// Language-neutral facts shared by ko.ts and en.ts.
export const profile = {
	name: { ko: '문민기', en: 'Minki Moon' },
	handle: 'mooner',
	email: 'siwol@mooner.dev',
	discord: 'mooner.dev',
	github: { label: 'github.com/mooner1022', href: 'https://github.com/mooner1022' },
	base: 'Ansan, KR',
	site: 'https://mooner.dev',
	// years: full years since starting in 2016, counted at build time
	stats: { years: String(new Date().getFullYear() - 2016), stars: 57, installs: '51K+' },
	/** shown as "Updated …" on Now and as the footer revision */
	updated: '2026.09.28'
};
