/** Values carousel: numbered bullets as tabs (click, ← →, Home/End). */
export function initCarousel() {
  document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((root) => {
    const bullets = [...root.querySelectorAll<HTMLButtonElement>("[data-bullet]")];
    const slides = [...root.querySelectorAll<HTMLElement>("[data-slide]")];
    const go = (i: number, focus = false) => {
      const n = (i + bullets.length) % bullets.length;
      bullets.forEach((b, k) => {
        b.setAttribute("aria-selected", String(k === n));
        b.tabIndex = k === n ? 0 : -1;
      });
      slides.forEach((s, k) => (s.hidden = k !== n));
      if (focus) bullets[n]?.focus();
    };
    bullets.forEach((b, i) => {
      b.addEventListener("click", () => go(i));
      b.addEventListener("keydown", (e) => {
        const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: bullets.length - 1 };
        if (e.key in map) {
          e.preventDefault();
          go(map[e.key]!, true);
        }
      });
    });
  });
}
