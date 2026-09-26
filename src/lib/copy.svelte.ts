// Clipboard with an execCommand fallback for non-secure origins (LAN preview over http).
const copyText = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {}
	const ta = Object.assign(document.createElement('textarea'), { value: text, readOnly: true });
	ta.style.cssText = 'position:fixed;opacity:0';
	document.body.append(ta);
	ta.select();
	const ok = document.execCommand('copy');
	ta.remove();
	return ok;
};

/** `done` stays true for a moment after a successful copy so the label can say "Copied ✓". */
export const copier = (text: string) => {
	let done = $state(false);
	return {
		text,
		get done() {
			return done;
		},
		copy: async () => {
			if (done || !(await copyText(text))) return;
			done = true;
			setTimeout(() => (done = false), 1600);
		}
	};
};
