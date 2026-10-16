import { defineConfig, devices } from "@playwright/test";

// E2E runs against the production build: `pnpm build && pnpm test:e2e`.
// Astro 7's preview daemonises; set PW_BASE_URL to reuse a server you started yourself.
const external = process.env.PW_BASE_URL;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: external ?? "http://127.0.0.1:4325" },
  webServer: external
    ? undefined
    : {
        command: "pnpm astro preview --port 4325 --host 127.0.0.1",
        url: "http://127.0.0.1:4325",
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
