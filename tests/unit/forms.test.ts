import { describe, expect, it, vi } from "vitest";
import { leadSteps, pickSchema, schemas, submitForm, validateField, validateForm, validatePriceRange } from "@/lib/forms";

describe("validateField", () => {
  it("requires required fields and accepts optional blanks", () => {
    expect(validateField("  ", { label: "Name", required: true })).toBe("Please enter your name.");
    expect(validateField("", { label: "Phone", kind: "tel" })).toBeNull();
  });

  it("checks email and phone formats", () => {
    expect(validateField("someone@example", { label: "Email", kind: "email" })).toMatch(/valid email/);
    expect(validateField("someone@example.com", { label: "Email", kind: "email" })).toBeNull();
    expect(validateField("abc", { label: "Phone", kind: "tel" })).toMatch(/valid phone/);
    expect(validateField("+971 4 000 0000", { label: "Phone", kind: "tel" })).toBeNull();
  });

  it("checks numeric bounds and length", () => {
    const rule = { label: "Surface", kind: "number" as const, min: 10, max: 100000 };
    expect(validateField("ten", rule)).toMatch(/must be a number/);
    expect(validateField("5", rule)).toMatch(/at least 10/);
    expect(validateField("1 250", rule)).toBeNull();
    expect(validateField("x".repeat(5), { label: "City", maxLength: 4 })).toMatch(/4 characters or fewer/);
  });
});

describe("validateForm", () => {
  it("returns one message per invalid field", () => {
    const errors = validateForm({ name: "", email: "bad", message: "Hello" }, schemas.enquiry);
    expect(Object.keys(errors).sort()).toEqual(["email", "name"]);
  });

  it("passes a complete valuation request", () => {
    const errors = validateForm(
      { propertyType: "Villa", city: "Dubai", country: "United Arab Emirates", name: "A. Client", email: "a@client.ae", surface: "320" },
      schemas.valuation,
    );
    expect(errors).toEqual({});
  });
});

describe("submitForm", () => {
  it("never claims a send without an endpoint", async () => {
    const fetchFn = vi.fn();
    await expect(submitForm(undefined, {}, fetchFn)).resolves.toBe("not-connected");
    await expect(submitForm("", {}, fetchFn)).resolves.toBe("not-connected");
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("reports sent only on a 2xx response", async () => {
    const ok = vi.fn().mockResolvedValue({ ok: true });
    const bad = vi.fn().mockResolvedValue({ ok: false });
    const down = vi.fn().mockRejectedValue(new Error("offline"));
    await expect(submitForm("https://crm.example/hook", { a: 1 }, ok)).resolves.toBe("sent");
    await expect(submitForm("https://crm.example/hook", {}, bad)).resolves.toBe("failed");
    await expect(submitForm("https://crm.example/hook", {}, down)).resolves.toBe("failed");
    expect(ok).toHaveBeenCalledWith("https://crm.example/hook", expect.objectContaining({ method: "POST", body: '{"a":1}' }));
  });
});

describe("lead modal", () => {
  it("validates step one on its own", () => {
    const step1 = pickSchema(schemas.lead, leadSteps[0]);
    expect(Object.keys(step1)).toEqual(["email", "phone", "minPrice", "maxPrice", "deal"]);
    const errors = validateForm({ email: "a@b.co", phone: "", deal: "" }, step1);
    expect(Object.keys(errors).sort()).toEqual(["deal", "phone"]);
    expect(errors.name).toBeUndefined();
  });

  it("flags a max price below the min price", () => {
    expect(validatePriceRange("2 000 000", "1 000 000")).toMatch(/higher than min/);
    expect(validatePriceRange("1000000", "2000000")).toBeNull();
    expect(validatePriceRange("", "500")).toBeNull();
  });
});
