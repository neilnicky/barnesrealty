/**
 * Enquiry / valuation form logic, framework-free so it can be unit tested.
 * Submission is an integration boundary: with no endpoint configured the
 * result is "not-connected" and the UI must say nothing was sent.
 */

export interface FieldRule {
  label: string;
  required?: boolean;
  kind?: "text" | "email" | "tel" | "number";
  min?: number;
  max?: number;
  maxLength?: number;
}

export type Schema = Record<string, FieldRule>;
export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL = /^\+?[0-9 ().-]{6,20}$/;

export function validateField(raw: string, rule: FieldRule): string | null {
  const value = raw.trim();
  if (!value) return rule.required ? `Please enter your ${rule.label.toLowerCase()}.` : null;
  if (rule.maxLength && value.length > rule.maxLength) return `${rule.label} must be ${rule.maxLength} characters or fewer.`;
  if (rule.kind === "email" && !EMAIL.test(value)) return "Please enter a valid email address, e.g. name@example.com.";
  if (rule.kind === "tel" && !TEL.test(value)) return "Please enter a valid phone number, including the country code.";
  if (rule.kind === "number") {
    const n = Number(value.replace(/[\s,]/g, ""));
    if (!Number.isFinite(n)) return `${rule.label} must be a number.`;
    if (rule.min !== undefined && n < rule.min) return `${rule.label} must be at least ${rule.min}.`;
    if (rule.max !== undefined && n > rule.max) return `${rule.label} must be ${rule.max} or less.`;
  }
  return null;
}

export function validateForm(values: Record<string, string>, schema: Schema): Errors {
  const errors: Errors = {};
  for (const [name, rule] of Object.entries(schema)) {
    const error = validateField(values[name] ?? "", rule);
    if (error) errors[name] = error;
  }
  return errors;
}

export type SubmitResult = "sent" | "failed" | "not-connected";

export async function submitForm(
  endpoint: string | undefined,
  payload: Record<string, unknown>,
  fetchFn: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint) return "not-connected";
  try {
    const res = await fetchFn(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

export const schemas = {
  enquiry: {
    name: { label: "Name", required: true, maxLength: 120 },
    email: { label: "Email", required: true, kind: "email", maxLength: 200 },
    phone: { label: "Phone", kind: "tel" },
    message: { label: "Message", required: true, maxLength: 2000 },
  },
  valuation: {
    propertyType: { label: "Property type", required: true },
    city: { label: "City", required: true, maxLength: 120 },
    country: { label: "Country", required: true, maxLength: 120 },
    surface: { label: "Surface", kind: "number", min: 10, max: 100000 },
    bedrooms: { label: "Bedrooms", kind: "number", min: 0, max: 60 },
    name: { label: "Name", required: true, maxLength: 120 },
    email: { label: "Email", required: true, kind: "email", maxLength: 200 },
    phone: { label: "Phone", kind: "tel" },
    message: { label: "Message", maxLength: 2000 },
  },
  /** FIND-style "Find properties" modal; step one then step two. */
  lead: {
    email: { label: "Email", required: true, kind: "email", maxLength: 200 },
    phone: { label: "Phone", required: true, kind: "tel" },
    minPrice: { label: "Min price", kind: "number", min: 0 },
    maxPrice: { label: "Max price", kind: "number", min: 0 },
    deal: { label: "Deal type", required: true },
    name: { label: "Name", required: true, maxLength: 120 },
    destination: { label: "Destination", maxLength: 120 },
    message: { label: "Message", maxLength: 2000 },
  },
  newsletter: {
    email: { label: "Email", required: true, kind: "email", maxLength: 200 },
  },
} satisfies Record<string, Schema>;

export const leadSteps = [
  ["email", "phone", "minPrice", "maxPrice", "deal"],
  ["name", "destination", "message"],
] as const;

/** Pick part of a schema (used for multi-step forms). */
export function pickSchema(schema: Schema, keys: readonly string[]): Schema {
  return Object.fromEntries(keys.filter((k) => k in schema).map((k) => [k, schema[k]!]));
}

/** A max below the min is an error on the max field. */
export function validatePriceRange(min: string, max: string): string | null {
  const a = Number(min.replace(/[\s,]/g, ""));
  const b = Number(max.replace(/[\s,]/g, ""));
  if (!min.trim() || !max.trim() || !Number.isFinite(a) || !Number.isFinite(b)) return null;
  return b < a ? "Max price must be higher than min price." : null;
}

export type FormKind = keyof typeof schemas;
