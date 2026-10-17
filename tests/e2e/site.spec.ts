import { expect, test, type Page } from "@playwright/test";

/** Most tests skip the reference's auto-opening lead modal; one test covers it. */
test.beforeEach(async ({ context }, info) => {
  if (info.title.includes("auto-opens")) return;
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("barnes:lead-seen", "1");
    } catch {}
  });
});

const errorsOf = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
};

const noHorizontalOverflow = async (page: Page) =>
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);

test("home renders the FIND section sequence without errors or overflow", async ({ page }) => {
  const errors = errorsOf(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Find\s*Yours\s*in\s*Dubai/);
  for (const id of ["why-label", "arw-title", "stp-title", "net-title", "val-title", "svc-title", "feat-title", "nws-title", "outro-title", "dst-title"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await noHorizontalOverflow(page);
  expect(errors).toEqual([]);
});

test("responsive images ship as WebP only (AVIF encoding stalls host builds)", async ({ page }) => {
  await page.goto("/");
  const sources = await page.locator("picture source, picture img").evaluateAll((els) =>
    els.map((e) => `${e.getAttribute("type") ?? ""} ${e.getAttribute("srcset") ?? ""} ${e.getAttribute("src") ?? ""}`),
  );
  expect(sources.length).toBeGreaterThan(0);
  for (const s of sources) expect(s).not.toMatch(/avif/i);
  expect(sources.some((s) => /webp/.test(s))).toBe(true);
});

test("hero is pinned and resolves into the BARNES lockup while scrolling", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "measured at 1440");
  await page.goto("/");
  const hero = page.locator("[data-hero]");
  const height = await hero.evaluate((el) => el.getBoundingClientRect().height);
  expect(height).toBeGreaterThan(3000);
  await page.evaluate(() => window.scrollTo(0, 1900));
  await expect
    .poll(async () => Number(await hero.evaluate((el) => getComputedStyle(el).getPropertyValue("--mix"))))
    .toBeGreaterThan(0.9);
  await expect(page.locator(".hero__composite")).toBeVisible();
});

test("lead modal auto-opens once per session, like the reference", async ({ page }) => {
  await page.goto("/");
  const dialog = page.locator("[data-lead]");
  await expect(dialog).toBeVisible({ timeout: 6000 });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await page.reload();
  await page.waitForTimeout(3000);
  await expect(dialog).toBeHidden();
});

test("lead modal: triggers preset the deal type, step one validates, nothing is falsely sent", async ({ page }) => {
  await page.goto("/");
  await page.locator('#services button[data-open-modal="Rent"]').click();
  const dialog = page.locator("[data-lead]");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("#lead-deal")).toHaveValue("Rent");

  await dialog.getByRole("button", { name: /Next/ }).click();
  await expect(dialog.locator('[data-error-for="email"]')).toHaveText("Please enter your email.");
  await expect(dialog.locator("#lead-email")).toBeFocused();

  await dialog.locator("#lead-email").fill("visitor@example.com");
  await dialog.locator("#lead-phone").fill("+971 50 000 0000");
  await dialog.locator('[name="minPrice"]').fill("3000000");
  await dialog.locator('[name="maxPrice"]').fill("1000000");
  await dialog.getByRole("button", { name: /Next/ }).click();
  await expect(dialog.locator('[data-error-for="maxPrice"]')).toContainText("higher than min");
  await dialog.locator('[name="maxPrice"]').fill("5000000");
  await dialog.getByRole("button", { name: /Next/ }).click();

  await expect(dialog.locator('[data-step="2"]')).toBeVisible();
  await dialog.locator("#lead-name").fill("Test Visitor");
  await dialog.getByRole("button", { name: /Send Request/ }).click();
  const status = dialog.locator("[data-form-status]");
  await expect(status).toContainText("not connected yet");
  await expect(status).not.toContainText("Thank you");
});

test("values carousel switches with bullets and arrow keys", async ({ page }) => {
  await page.goto("/");
  const slides = page.locator("[data-slide]");
  await expect(slides.nth(0)).toBeVisible();
  await page.locator('[data-bullet="2"]').click();
  await expect(slides.nth(2)).toBeVisible();
  await expect(slides.nth(2)).toContainText("Private viewings");
  await page.keyboard.press("ArrowRight");
  await expect(slides.nth(3)).toBeVisible();
  await expect(page.locator('[data-bullet="3"]')).toBeFocused();
});

test("header dropdowns open on click and close with Escape", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "desktop navigation");
  await page.goto("/destinations/");
  const btn = page.getByRole("button", { name: "Sell" });
  await btn.click();
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Request a valuation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(btn).toHaveAttribute("aria-expanded", "false");
});

test("mobile menu traps the page and closes with Escape", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "burger only on small screens");
  await page.goto("/");
  const toggle = page.locator("[data-menu-toggle]");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator("#menu").getByRole("link", { name: "Communities" }).click();
  await expect(page).toHaveURL(/\/destinations\/$/);
});

test("destinations lists every listing and links to detail pages that survive a refresh", async ({ page }) => {
  await page.goto("/destinations/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Places we love to call home.");
  await expect(page.locator("#featured li")).toHaveCount(7);
  await page.locator('#villas a[href="/properties/al-barari-private-estate/"]').first().click();
  await expect(page).toHaveURL(/\/properties\/al-barari-private-estate\/$/);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("A private estate among the gardens");
  await expect(page.getByText("AED 46,000,000")).toBeVisible();
});

test("property gallery opens, steps with the keyboard and returns focus", async ({ page }) => {
  await page.goto("/properties/emirates-hills-mansion/");
  const opener = page.locator('[data-open-gallery="0"]');
  await opener.click();
  const dialog = page.locator("[data-gallery]");
  await expect(dialog).toBeVisible();
  await expect(page.locator("[data-gallery-count]")).toHaveText("1 / 8");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("[data-gallery-count]")).toHaveText("2 / 8");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("property enquiry validates and never reports a send without an endpoint", async ({ page }) => {
  await page.goto("/properties/city-walk-townhouse/");
  const form = page.locator('form[data-form="enquiry"]');
  await form.getByRole("button", { name: /Send enquiry/ }).click();
  await expect(form.locator('[data-error-for="name"]')).toHaveText("Please enter your name.");
  await form.locator("#f-name").fill("Test Visitor");
  await form.locator("#f-email").fill("visitor@example.com");
  await form.getByRole("button", { name: /Send enquiry/ }).click();
  await expect(form.locator("[data-form-status]")).toContainText("+971 4 000 0000");
});

test("newsletter field is honest about its integration state", async ({ page }) => {
  await page.goto("/sell/");
  const form = page.locator('form[data-form="newsletter"]');
  await form.locator("input").fill("visitor@example.com");
  await form.getByRole("button", { name: "Subscribe" }).click();
  await expect(form.locator("[data-form-status]")).toContainText("has not been saved");
});

test("valuation page validates required property details", async ({ page }) => {
  await page.goto("/sell/");
  await page.getByRole("button", { name: /Request my valuation/ }).click();
  await expect(page.locator('[data-error-for="propertyType"]')).toBeVisible();
  await page.locator("#f-surface").fill("abc");
  await page.getByRole("button", { name: /Request my valuation/ }).click();
  await expect(page.locator('[data-error-for="surface"]')).toHaveText("Surface must be a number.");
});

test("unknown routes return the branded 404", async ({ page }) => {
  const res = await page.goto("/properties/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("This address");
});

test("reduced motion: no pin, copy visible, sections readable", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  await context.addInitScript(() => sessionStorage.setItem("barnes:lead-seen", "1"));
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/js-reduced/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const height = await page.locator("[data-hero]").evaluate((el) => el.getBoundingClientRect().height);
  expect(height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
  await expect(page.locator(".ln__veil")).toHaveCount(0);
  await context.close();
});

test("every link on the built pages is internal and resolves", async ({ page, request }, info) => {
  test.skip(info.project.name !== "desktop", "crawl once");
  test.setTimeout(120_000);
  const hrefs = new Set<string>();
  for (const path of ["/", "/destinations/", "/properties/emirates-hills-mansion/", "/sell/"]) {
    await page.goto(path);
    for (const h of await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) hrefs.add(h);
  }
  const external = [...hrefs].filter((h) => /^https?:/.test(h));
  expect(external).toEqual([]);
  expect(await page.locator('a[target="_blank"]').count()).toBe(0);
  for (const h of hrefs) {
    if (h.startsWith("tel:") || h.startsWith("#")) continue;
    const res = await request.get(h.split("#")[0]!);
    expect(res.status(), h).toBe(200);
  }
});

test("coming-soon pages are minimal and lead back into the site", async ({ page }) => {
  await page.goto("/advisors/");
  await expect(page.getByText("Coming soon")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Our advisors");
  await noHorizontalOverflow(page);
  await page.getByRole("link", { name: /Back to Home/ }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("rendered pages carry no French or legacy-brand references (text and metadata)", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "scan once");
  const forbidden = [/french/i, /france/i, /paris/i, /ch[aâ]teau/i, /1995/, /riviera/i, /provence/i, /europe/i, /barnes-international/i, /€/];
  for (const path of ["/", "/destinations/", "/properties/emirates-hills-mansion/", "/properties/al-barari-private-estate/", "/sell/", "/advisors/"]) {
    await page.goto(path);
    const text = await page.evaluate(() => {
      const meta = [...document.querySelectorAll("meta[content], [alt], [aria-label], [placeholder], title")].map((e) =>
        [e.getAttribute("content"), e.getAttribute("alt"), e.getAttribute("aria-label"), e.getAttribute("placeholder"), e.textContent].join(" "),
      );
      return document.body.innerText + " " + meta.join(" ");
    });
    for (const word of forbidden) expect(text, `${path} ${word}`).not.toMatch(word);
    expect(text).toMatch(/Dubai|AED|UAE/);
  }
});
