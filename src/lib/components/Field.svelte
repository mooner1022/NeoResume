<!-- dot field behind the top of the page — fades out below the first screen -->
<div class="field" aria-hidden="true"></div>

<style>
	.field {
		position: absolute; inset: 0 0 auto; height: 110vh; pointer-events: none; z-index: 0;
		background-image: radial-gradient(var(--ink-4) 1px, transparent 1.2px);
		background-size: 28px 28px; background-position: -14px -14px;
		mask-image: linear-gradient(#000 30%, transparent 95%);
		opacity: .55;
	}
	@media print {
		.field { display: none !important; }
	}
</style>
