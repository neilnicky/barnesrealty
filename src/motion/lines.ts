import { env, onResize, onScroll } from "./runtime";
import { clamp01 } from "./config";

/**
 * Splits [data-lines] text into visual lines and scrubs a veil (the section's
 * background at 80%) off each line as it rises through the viewport — the
 * reveal used on every FIND heading. Re-splits on resize.
 */
interface Line {
  el: HTMLElement;
  veil: HTMLElement;
}

function split(root: HTMLElement): Line[] {
  if (!root.dataset.source) root.dataset.source = root.innerHTML;
  root.innerHTML = root.dataset.source;
  // 1. Wrap every word, remembering whether it sat inside the muted span.
  const words: HTMLElement[] = [];
  const walk = (node: Node, em: boolean) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent ?? "").split(/(\s+)/);
      const frag = document.createDocumentFragment();
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.append(document.createTextNode(" "));
          continue;
        }
        const w = document.createElement("span");
        w.className = em ? "w em" : "w";
        w.textContent = part;
        words.push(w);
        frag.append(w);
      }
      node.parentNode!.replaceChild(frag, node);
      return;
    }
    if (node.nodeName === "BR") {
      (node as HTMLElement).dataset.br = "1";
      return;
    }
    [...node.childNodes].forEach((c) => walk(c, em || (c as HTMLElement).classList?.contains("em")));
  };
  [...root.childNodes].forEach((c) => walk(c, (c as HTMLElement).classList?.contains("em")));

  // 2. Group words by their rendered top into lines.
  const groups: HTMLElement[][] = [];
  let lastTop = -Infinity;
  for (const w of words) {
    const top = w.offsetTop;
    if (Math.abs(top - lastTop) > 2) {
      groups.push([]);
      lastTop = top;
    }
    groups[groups.length - 1]!.push(w);
  }

  // 3. Rebuild as line blocks, each with its own veil.
  root.innerHTML = "";
  return groups.map((g) => {
    const line = document.createElement("span");
    line.className = "ln";
    g.forEach((w, i) => {
      if (i) line.append(" ");
      line.append(w);
    });
    const veil = document.createElement("i");
    veil.className = "ln__veil";
    veil.setAttribute("aria-hidden", "true");
    line.append(veil);
    root.append(line);
    return { el: line, veil };
  });
}

export function initLines() {
  if (env.reduced) return;
  const roots = [...document.querySelectorAll<HTMLElement>("[data-lines]")];
  if (!roots.length) return;
  let lines: Line[] = [];
  const build = () => {
    lines = roots.flatMap((r) => split(r));
  };
  (document.fonts?.ready ?? Promise.resolve()).then(() => {
    build();
    onResize(build);
    onScroll(() => {
      const vh = window.innerHeight;
      for (const { el, veil } of lines) {
        const top = el.getBoundingClientRect().top;
        // Fully veiled when the line is at 92% of the viewport, clear by 62%.
        const p = clamp01((vh * 0.92 - top) / (vh * 0.3));
        veil.style.setProperty("--w", `${((1 - p) * 100).toFixed(1)}%`);
      }
    });
  });
}
