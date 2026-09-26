/** Read at call time — only call from onMount, effects, or event handlers. */
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
