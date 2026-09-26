import type { Attachment } from 'svelte/attachments';

// one observer for every section; hidden-until-seen only applies under html.js (see app.html)
let io: IntersectionObserver | undefined;

export const reveal: Attachment<HTMLElement> = (node) => {
	io ??= new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				e.target.classList.add('in');
				io?.unobserve(e.target);
			}),
		{ threshold: 0.04 }
	);
	io.observe(node);
	return () => io?.unobserve(node);
};
