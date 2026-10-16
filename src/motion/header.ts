import { getLenis, onScroll } from "./runtime";
import { motion } from "./config";

let header: HTMLElement | null = null;
let menuOpen = false;

/** Hero decides when the header is transparent ("clear") or white. */
export function setHeaderTone(tone: "clear" | "solid") {
  if (!header || menuOpen) return;
  if (tone === "clear") header.dataset.tone = "clear";
  else delete header.dataset.tone;
}

export function initHeader() {
  header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;
  const hero = document.querySelector<HTMLElement>("[data-hero]");

  let last = 0;
  onScroll((y) => {
    if (!header) return;
    if (hero) setHeaderTone(y < hero.offsetHeight - window.innerHeight * 0.5 ? "clear" : "solid");
    if (menuOpen) return;
    const dy = y - last;
    if (Math.abs(dy) < motion.header.delta) return;
    header.classList.toggle("is-hidden", dy > 0 && y > motion.header.hideAfter);
    if (dy > 0) closeDropdowns();
    last = y;
  });
  header.addEventListener("focusin", () => header?.classList.remove("is-hidden"));

  initDropdowns();
  initMenu();
}

function closeDropdowns(except?: Element) {
  document.querySelectorAll<HTMLElement>("[data-dropdown].is-open").forEach((d) => {
    if (d === except) return;
    d.classList.remove("is-open");
    d.querySelector("button")?.setAttribute("aria-expanded", "false");
  });
}

function initDropdowns() {
  const fine = window.matchMedia("(hover: hover)");
  document.querySelectorAll<HTMLElement>("[data-dropdown]").forEach((dd) => {
    const btn = dd.querySelector<HTMLButtonElement>("button")!;
    const set = (open: boolean) => {
      if (open) closeDropdowns(dd);
      dd.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    // With a mouse, hover already opened it: a click must not toggle it shut again.
    btn.addEventListener("click", (e) => set(fine.matches && e.detail > 0 ? true : !dd.classList.contains("is-open")));
    dd.addEventListener("mouseenter", () => fine.matches && set(true));
    dd.addEventListener("mouseleave", () => fine.matches && set(false));
    dd.addEventListener("focusout", (e) => {
      if (!dd.contains(e.relatedTarget as Node)) set(false);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = document.querySelector<HTMLElement>("[data-dropdown].is-open");
    if (open) {
      closeDropdowns();
      open.querySelector("button")?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!(e.target as Element).closest("[data-dropdown]")) closeDropdowns();
  });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  const main = document.getElementById("main");
  const footer = document.querySelector("footer");
  if (!toggle || !menu || !header) return;

  const set = (open: boolean, restoreFocus = true) => {
    menuOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
    menu.hidden = !open;
    menu.classList.toggle("is-open", open);
    main?.toggleAttribute("inert", open);
    footer?.toggleAttribute("inert", open);
    document.documentElement.style.overflow = open ? "hidden" : "";
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      delete header!.dataset.tone;
      header!.classList.remove("is-hidden");
      menu.querySelector<HTMLElement>("a, summary")?.focus();
    } else {
      lenis?.start();
      if (restoreFocus) toggle.focus();
    }
  };

  toggle.addEventListener("click", () => set(!menuOpen));
  menu.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => set(false, false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) set(false);
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (e.matches && menuOpen) set(false, false);
  });
}
