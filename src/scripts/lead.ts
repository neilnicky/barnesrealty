import { leadSteps, pickSchema, schemas, submitForm, validateForm, validatePriceRange } from "@/lib/forms";

const SEEN = "barnes:lead-seen";

/**
 * FIND's "Find properties" modal: opens from any [data-open-modal] trigger
 * (value = deal type to preselect), two steps, honest submission state, and —
 * like the reference — opens once per session on the home page.
 */
export function initLead() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-lead]");
  if (!dialog) return;
  const form = dialog.querySelector<HTMLFormElement>("[data-lead-form]")!;
  const steps = [...form.querySelectorAll<HTMLElement>("[data-step]")];
  const status = form.querySelector<HTMLElement>("[data-form-status]")!;
  const submit = form.querySelector<HTMLButtonElement>("[type=submit]")!;
  const deal = form.elements.namedItem("deal") as HTMLSelectElement;
  let opener: HTMLElement | null = null;

  const values = () => Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v)]));
  const showField = (name: string, error?: string) => {
    const input = form.elements.namedItem(name) as HTMLInputElement | null;
    const msg = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (!input || !msg) return;
    input.setAttribute("aria-invalid", String(!!error));
    msg.textContent = error ?? "";
    msg.hidden = !error;
  };
  const validateStep = (i: number) => {
    const keys = leadSteps[i]!;
    const v = values();
    const errors = validateForm(v, pickSchema(schemas.lead, keys));
    if (i === 0 && !errors.maxPrice) {
      const range = validatePriceRange(v.minPrice ?? "", v.maxPrice ?? "");
      if (range) errors.maxPrice = range;
    }
    keys.forEach((k) => showField(k, errors[k]));
    const first = keys.find((k) => errors[k]);
    if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
    return !first;
  };
  const goTo = (i: number) => {
    steps.forEach((s, n) => (s.hidden = n !== i));
    steps[i]?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  };
  const setStatus = (text: string) => {
    status.textContent = text;
    status.hidden = !text;
  };

  const open = (preset?: string, from?: HTMLElement | null) => {
    opener = from ?? null;
    if (preset && [...deal.options].some((o) => o.value === preset)) deal.value = preset;
    setStatus("");
    goTo(0);
    if (!dialog.open) dialog.showModal();
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {}
  };

  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>("[data-open-modal]");
    if (!trigger) return;
    e.preventDefault();
    open(trigger.dataset.openModal || undefined, trigger);
  });
  dialog.querySelector("[data-lead-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => opener?.focus());
  form.querySelector("[data-lead-next]")?.addEventListener("click", () => {
    if (validateStep(0)) goTo(1);
  });
  form.querySelector("[data-lead-back]")?.addEventListener("click", () => goTo(0));
  form.addEventListener("input", (e) => {
    const t = e.target as HTMLInputElement;
    if (t.getAttribute("aria-invalid") === "true") showField(t.name, validateForm(values(), schemas.lead)[t.name]);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateStep(0)) return goTo(0);
    if (!validateStep(1)) return;
    submit.disabled = true;
    setStatus("Sending…");
    const result = await submitForm(form.dataset.endpoint || undefined, { form: "lead", page: location.pathname, ...values() });
    submit.disabled = false;
    if (result === "sent") {
      form.reset();
      setStatus(form.dataset.msgSent ?? "");
    } else setStatus((result === "failed" ? form.dataset.msgFailed : form.dataset.msgNotConnected) ?? "");
  });

  // Reference behaviour: the form greets first-time visitors on the home page.
  let seen = false;
  try {
    seen = sessionStorage.getItem(SEEN) === "1";
  } catch {}
  if (!seen && document.querySelector("[data-hero]")) window.setTimeout(() => open(), 2200);
}
