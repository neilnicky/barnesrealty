import { env } from "./runtime";
import { motion } from "./config";

/** Adds .is-in once to [data-reveal] / [data-inview] elements entering the viewport. */
export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal], [data-inview]");
  if (env.reduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: motion.reveal.rootMargin, threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}
