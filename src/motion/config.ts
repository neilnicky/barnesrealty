/** Every motion constant lives here. Easing mirrors the reference (expo-out). */
export const motion = {
  lenis: { lerp: 0.09, wheelMultiplier: 0.95 },
  ease: {
    out: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    inOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  },
  hero: {
    /** Progress windows (0–1 across the pinned section). */
    copyOut: [0.02, 0.22] as const,
    photoOut: [0.24, 0.52] as const,
    letters: [0.5, 0.82] as const,
    rule: [0.7, 0.88] as const,
    /** Photograph settles from this scale to 1 over the first half. */
    startScale: 1.14,
    /** Wordmark shrinks to this share of its full-bleed size. */
    endScale: 0.74,
  },
  header: { hideAfter: 120, delta: 6 },
  reveal: { rootMargin: "0px 0px -12% 0px", staggerMs: 110 },
  expand: { startInset: 0.12, startScale: 1.16 },
  scrollToMs: 1100,
};

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Map p from [a, b] to 0–1. */
export const span = (p: number, [a, b]: readonly [number, number]) => clamp01((p - a) / (b - a));
