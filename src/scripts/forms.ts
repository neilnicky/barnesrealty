import { schemas, submitForm, validateForm, type FormKind } from "@/lib/forms";

/**
 * Progressive enhancement for [data-form]. Native validation stays off
 * (novalidate) so every error is shown inline, in the same voice.
 */
export function initForms() {
  document.querySelectorAll<HTMLFormElement>("form[data-form]").forEach((form) => {
    const kind = form.dataset.form as FormKind;
    const schema = schemas[kind];
    const status = form.querySelector<HTMLElement>("[data-form-status]")!;
    const submit = form.querySelector<HTMLButtonElement>("[type=submit]")!;
    const endpoint = form.dataset.endpoint || undefined;

    const values = () => Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v)]));

    const showField = (name: string, error: string | undefined) => {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      const msg = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      if (!input || !msg) return;
      input.setAttribute("aria-invalid", String(!!error));
      msg.textContent = error ?? "";
      msg.hidden = !error;
    };
    const show = (errors: Record<string, string>) => Object.keys(schema).forEach((name) => showField(name, errors[name]));

    // Once a field has been flagged, re-check it as the visitor corrects it.
    form.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      if (target.getAttribute("aria-invalid") !== "true") return;
      showField(target.name, validateForm(values(), schema)[target.name]);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = values();
      const errors = validateForm(data, schema);
      show(errors);
      const first = Object.keys(errors)[0];
      if (first) {
        (form.elements.namedItem(first) as HTMLElement | null)?.focus();
        setStatus("error", `Please check ${Object.keys(errors).length === 1 ? "the highlighted field" : "the highlighted fields"}.`);
        return;
      }
      submit.disabled = true;
      setStatus("pending", "Sending…");
      const result = await submitForm(endpoint, { form: kind, page: location.pathname, ...data });
      submit.disabled = false;
      if (result === "sent") {
        form.reset();
        setStatus("sent", form.dataset.msgSent ?? "");
      } else if (result === "failed") {
        setStatus("error", form.dataset.msgFailed ?? "");
      } else {
        setStatus("info", form.dataset.msgNotConnected ?? "");
      }
    });

    function setStatus(state: string, text: string) {
      status.dataset.state = state;
      status.textContent = text;
      status.hidden = !text;
    }
  });
}
