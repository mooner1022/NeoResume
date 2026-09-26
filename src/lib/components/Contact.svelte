<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/content';
	import type { Resume } from '$lib/content/types';
	import { copier } from '$lib/copy.svelte';
	import { reveal } from '$lib/reveal';

	let { contact }: { contact: Resume['contact'] } = $props();

	const email = copier(profile.email);
	const discord = copier(profile.discord);

	let clock = $state('--:--');
	onMount(() => {
		const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: false });
		const tick = () => (clock = fmt.format(new Date()));
		tick();
		const t = setInterval(tick, 10000);
		return () => clearInterval(t);
	});
</script>

<section class="panel reveal" id="contact" {@attach reveal}>
	<div class="container">
		<p class="status mono"><span class="on"><i></i>Accepting requests</span><span>Ansan <span id="clock" class="num">{clock}</span> KST</span></p>
		<div class="panel-body">
			<div>
				<p class="cmd mono lc">mooner:~/resume $ ./contact.sh</p>
				<h2 class="wide">Contact<sup>→</sup></h2>
				<dl class="kv mono">
					<dt>Name</dt><dd>{profile.name.ko} / {profile.name.en}</dd>
					<dt>Handle</dt><dd>@{profile.handle}</dd>
					<dt>Base</dt><dd>{profile.base}</dd>
				</dl>
			</div>
			<div>
				<p class="say">{contact.say}</p>
				<p class="sub">{contact.sub}</p>
				<div class="mailrow">
					<a class="mail wide" href="mailto:{profile.email}">{profile.email}<span>↗</span></a>
					<button type="button" class="copy mono" class:done={email.done} onclick={email.copy}>{email.done ? 'Copied ✓' : contact.copy}</button>
				</div>
				<nav class="alt mono">
					<a href={profile.github.href}><span>Code</span><i>─▸</i><span>{profile.github.label}</span></a>
					<button type="button" class:done={discord.done} onclick={discord.copy}><span>Chat</span><i>─▸</i><span>Discord · {profile.discord}<em>{discord.done ? 'Copied ✓' : contact.clickToCopy}</em></span></button>
				</nav>
				<p class="ps mono lc">// ping me anytime — i read all.</p>
			</div>
		</div>
		<footer class="mono"><span>© {profile.updated.slice(0, 4)} {profile.name.en}</span><span class="lc">crafted with monospace affection · rev {profile.updated}</span></footer>
	</div>
</section>

<style>
	/* inverted panel */
	.panel { margin: 150px 16px 16px; border-radius: 28px; background: var(--ink); color: var(--paper); }
	.container { padding-top: 28px; padding-bottom: 36px; }
	.status { display: flex; justify-content: space-between; gap: 16px; opacity: .6; }
	.on { display: inline-flex; align-items: center; gap: 8px; }
	.on i { width: 6px; height: 6px; border-radius: 50%; background: var(--signal); }
	.panel-body { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 72px; padding: 104px 0 120px; }
	.cmd { color: inherit; opacity: .5; }
	h2 { display: flex; align-items: flex-start; gap: 10px; font-size: 40px; font-weight: 650; line-height: 1; }
	h2 sup { font: 500 10px/1 var(--mono); font-stretch: 87.5%; letter-spacing: .06em; opacity: .6; padding-top: 2px; }
	.kv { margin-top: 28px; display: grid; grid-template-columns: 80px 1fr; row-gap: 8px; opacity: .65; }
	.kv dd { text-transform: none; letter-spacing: .02em; }
	.say { font-size: 30px; font-weight: 700; letter-spacing: -0.04em; line-height: 1.35; text-wrap: balance; }
	.sub { margin-top: 10px; opacity: .6; }
	.mailrow { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin-top: 40px; }
	.mail { display: inline-flex; align-items: center; gap: 14px; font-size: clamp(26px, 3.4vw, 44px); font-weight: 600; line-height: 1.1; padding-bottom: 8px; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .5s var(--ease); }
	.mail:hover { background-size: 100% 1px; }
	.mail span { font-family: var(--sans); font-size: .6em; opacity: .6; transition: transform .3s var(--ease); }
	.mail:hover span { transform: translate(4px, -4px); opacity: 1; }
	.copy { border: 1px solid currentColor; border-radius: 999px; padding: 5px 12px; opacity: .55; transition: opacity .2s; font: inherit; letter-spacing: inherit; }
	.copy:hover { opacity: 1; }
	.copy.done { opacity: 1; color: var(--signal); }
	.alt { margin-top: 32px; display: grid; gap: 8px; }
	.alt a, .alt button { display: grid; grid-template-columns: 56px 36px 1fr; align-items: center; text-align: left; letter-spacing: inherit; text-transform: inherit; opacity: .6; transition: opacity .2s; }
	.alt a:hover, .alt button:hover { opacity: 1; }
	.alt i { font-style: normal; opacity: .6; }
	.alt span:last-child { text-transform: none; letter-spacing: .02em; }
	.alt em { font-style: normal; margin-left: 12px; opacity: .55; }
	.alt button.done { opacity: 1; }
	.alt button.done em { color: var(--signal); opacity: 1; }
	.ps { margin-top: 28px; opacity: .45; }
	footer { display: flex; justify-content: space-between; gap: 16px; opacity: .4; }

	@media (max-width: 960px) {
		.panel { margin: 100px 8px 8px; border-radius: 22px; }
		.panel-body { grid-template-columns: 1fr; gap: 40px; padding: 64px 0 72px; }
		h2 { font-size: 30px; }
		.say { font-size: 23px; }
		footer { flex-direction: column; gap: 4px; }
	}
	@media print {
		.copy, .alt em { display: none !important; }
		.panel { margin: 24px 0 0; border: 1px solid #ddd; background: #fff; color: #111; }
		.panel-body { padding: 24px 0; }
	}
</style>
