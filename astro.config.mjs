// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://barnesrealty.example",
  trailingSlash: "ignore",
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  image: { responsiveStyles: false },
  build: { inlineStylesheets: "auto" },
  // Class strategy lets a parent's scoped styles reach components it passes `class` to (TwoTone, Button).
  scopedStyleStrategy: "class",
});
