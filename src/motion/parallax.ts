import { env, onScroll } from "./runtime";
import { clamp01 } from "./config";

/**
 * [data-parallax="k"]: element drifts k × its distance from the viewport centre.
 * [data-parallax-img]: inner image drifts within its (overflow-hidden) frame.
 */
export function initParallax() {
  if (env.reduced) return;
  const drifters = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
  const frames = [...document.querySelectorAll<HTMLElement>("[data-parallax-img]")];
  if (!drifters.length && !frames.length) return;
  onScroll(() => {
    const vh = window.innerHeight;
    for (const el of drifters) {
      const r = (el.parentElement ?? el).getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      const k = Number(el.dataset.parallax) || 0.1;
      const d = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(d * k).toFixed(1)}px, 0)`;
    }
    for (const el of frames) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const p = clamp01((vh - r.top) / (vh + r.height));
      const img = el.querySelector<HTMLElement>("img");
      if (img) img.style.transform = `translate3d(0, ${((p - 0.5) * -8).toFixed(2)}%, 0) scale(1.1)`;
    }
  });
}
