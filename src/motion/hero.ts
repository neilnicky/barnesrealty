import { env, onResize, onScroll, pageTop } from "./runtime";
import { clamp01, span } from "./config";

/**
 * FIND hero choreography, re-derived from the reference's computed transforms
 * (docs/internal/hero-scroll.txt). Progress p = scroll / section height and
 * e = easeOutQuad(p) drive the building, clouds and fog; windows of p drive
 * the copy fade, the outline draw and the image-in-letters crossfade.
 * Only CSS custom properties are written; the stylesheet turns them into transforms.
 */
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

export function initHero() {
  const root = document.querySelector<HTMLElement>("[data-hero]");
  if (!root) return;

  // Intro (runs for everyone; with reduced motion the CSS never hides the copy).
  const ready = () => root.classList.add("is-ready");
  (document.fonts?.ready ?? Promise.resolve()).then(() => requestAnimationFrame(ready));
  window.setTimeout(ready, 1200);

  if (env.reduced) return;

  let top = 0;
  let height = 1;
  const measure = () => {
    top = pageTop(root);
    height = Math.max(1, root.offsetHeight);
  };
  measure();
  onResize(measure);

  let last = "";
  onScroll((y) => {
    const s = Math.max(0, y - top);
    const p = clamp01(s / height);
    const e = easeOutQuad(p);
    // Copy is gone after ~0.9 viewport heights: (1 - t)^2.
    const t = clamp01(s / (window.innerHeight * 0.89));
    const copy = (1 - t) * (1 - t);
    // Outline: in around p ≈ 0.09–0.13, drawn by p ≈ 0.2, out over p ≈ 0.29–0.44.
    const logoIn = span(p, [0.085, 0.13]);
    const logoOut = span(p, [0.29, 0.44]);
    const logo = logoIn * (1 - logoOut);
    const draw = 1 - span(p, [0.09, 0.2]);
    // Building → image-in-letters crossfade over p ≈ 0.29–0.39.
    const mix = span(p, [0.29, 0.39]);

    const next = `${e.toFixed(4)}|${copy.toFixed(3)}|${logo.toFixed(3)}|${mix.toFixed(3)}|${draw.toFixed(3)}`;
    if (next === last) return;
    last = next;
    root.style.setProperty("--e", e.toFixed(4));
    root.style.setProperty("--copy", copy.toFixed(3));
    root.style.setProperty("--logo", logo.toFixed(3));
    root.style.setProperty("--mix", mix.toFixed(3));
    root.style.setProperty("--draw", draw.toFixed(3));
  });
}
