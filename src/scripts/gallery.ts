/** Property gallery: <dialog> lightbox with arrows, keyboard and swipe. */
export function initGallery() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-gallery]");
  if (!dialog) return;
  const slides = [...dialog.querySelectorAll<HTMLElement>("[data-gallery-slide]")];
  const count = dialog.querySelector<HTMLElement>("[data-gallery-count]")!;
  let index = 0;
  let opener: HTMLElement | null = null;

  // Slides are lazy; load the shown one and its neighbours as soon as they're reachable.
  const prime = (n: number) => {
    const img = slides[(n + slides.length) % slides.length]?.querySelector("img");
    if (img) img.loading = "eager";
  };

  const go = (i: number) => {
    index = (i + slides.length) % slides.length;
    [index, index + 1, index - 1].forEach(prime);
    slides.forEach((s, n) => (s.hidden = n !== index));
    count.textContent = `${index + 1} / ${slides.length}`;
  };

  document.querySelectorAll<HTMLElement>("[data-open-gallery]").forEach((btn) =>
    btn.addEventListener("click", () => {
      opener = btn;
      go(Number(btn.dataset.openGallery) || 0);
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }),
  );

  dialog.addEventListener("close", () => {
    document.documentElement.style.overflow = "";
    opener?.focus();
  });
  dialog.querySelector("[data-gallery-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-gallery-prev]")?.addEventListener("click", () => go(index - 1));
  dialog.querySelector("[data-gallery-next]")?.addEventListener("click", () => go(index + 1));
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  });

  let startX = 0;
  dialog.addEventListener("touchstart", (e) => (startX = e.touches[0]?.clientX ?? 0), { passive: true });
  dialog.addEventListener("touchend", (e) => {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - startX;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  });
}
