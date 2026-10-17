import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

describe("Cloudflare deploy config", () => {
  // Without wrangler.jsonc, `wrangler deploy` auto-runs `astro add cloudflare`, which fails under pnpm.
  it("serves the static build as Workers assets with the branded 404", () => {
    const config = JSON.parse(read("wrangler.jsonc"));
    expect(config.name).toBe("barnesrealty");
    expect(config.main).toBeUndefined();
    expect(config.assets).toMatchObject({ directory: "./dist", not_found_handling: "404-page" });
  });

  it("keeps the site static with no server adapter", () => {
    expect(read("astro.config.mjs")).not.toMatch(/adapter|@astrojs\/cloudflare/);
    expect(JSON.parse(read("package.json")).dependencies).not.toHaveProperty("@astrojs/cloudflare");
  });
});
