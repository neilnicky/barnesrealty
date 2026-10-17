# Dubai luxury real estate — website template

A faithful recreation of findrealestate.com (layout, typography, scroll choreography and the pinned building-into-clouds hero), with content for a **Dubai luxury real estate agency**. The client brand will be added later. See `docs/find-replica-spec.md`.

## Rebranding

- **Name:** change `BRAND` in `src/content/barnes-content.ts` (currently the placeholder `"BARNES"`). Every title, label, meta tag and footer line reads from it.
- **Logo:** replace `public/brand/barnes-wordmark.svg` (header and footer) and `public/brand/barnes-lockup.svg` (the hero mask: wordmark over "Dubai Real Estate"). If the new lockup has a different aspect ratio, update the two `mask-size` values in `src/components/Hero.astro`.
- **Contact details:** the phone (`+971 4 000 0000`) and "Office address" are placeholders in the same file.

## Template content (replace before launch)

- **Residences:** the 7 Dubai residences (communities, prices in AED, sq ft areas, descriptions), the advisor, the insight articles and the values are sample copy.
- **Photos:** residence and editorial photos in `src/assets/properties/` are interim imagery of non-Dubai homes. They must be replaced with the agency's own photography. The hero scene is AI-generated and illustrative.

## Run

```sh
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # astro check + static build to dist/
pnpm preview
pnpm test           # Vitest: content integrity, forms, filter
pnpm test:e2e       # Playwright (desktop + Pixel 7) against the production build
                    # Astro 7 previews daemonise: if the run hangs, start `pnpm preview` yourself
                    # and run `PW_BASE_URL=http://127.0.0.1:<port> pnpm test:e2e`
```

Stack: Astro 7 (static, `scopedStyleStrategy: "class"`), TypeScript, Lenis (desktop smooth scroll only), Vitest, Playwright, Instrument Sans + Lora. No UI framework: motion is plain modules on a single rAF loop.

## Where things live

| Path | What |
|---|---|
| `src/content/barnes-content.ts` | **All editorial content**: brand, navigation, listings, home sections, forms, footer, SEO |
| `src/content/asset-manifest.ts` | Every photograph: file, alt, focal point, original source URL |
| `src/content/gallery-sources.json` | Full official gallery URLs per listing (for re-fetching higher resolutions) |
| `src/assets/properties/{REF}/` | Listing photographs (2000 px masters; Astro emits AVIF/WebP/JPEG) |
| `public/brand/barnes-wordmark.svg` | Wordmark vector **traced** from the official 400 px raster. Replace with master artwork. |
| `src/components/` | One component per section, plus `Img`, `Button`, `Heading`, `Field`, `FormShell` |
| `src/motion/` | `runtime` (rAF + Lenis), `config` (all timings), `hero`, `scrub` (word reveal and media expand), `reveal`, `header` |
| `src/lib/` | Pure logic: `forms` (validation and submission), `filter`, `images` |
| `docs/` | Identity verification, reference analysis, brand research, design direction |

To swap a listing, edit its entry in `listings` and its photographs in the manifest. No component changes are needed.

## Links and "Coming soon" pages

Nothing links off the site. Every destination that is not built yet (search, agencies, services, news articles, socials, official listings, and others) is an internal path registered with `soon(path, title, source)` in `src/content/barnes-content.ts`. `src/pages/[...soon].astro` renders a minimal "Coming soon" page for each one. `source` records the official page it should eventually mirror.

To build a real page, create a route at that path; Astro gives it priority over the catch-all. Then delete the registry entry if you like.

## Enquiries: integration boundary

Forms validate in the browser, then POST JSON to `PUBLIC_ENQUIRY_ENDPOINT` (see `.env.example`).

- **When it is empty (the current state)**, the form says plainly that nothing was sent and shows the agency's or Global Office's phone number. It never shows a false success message.
- **To go live**, set the endpoint to the client's CRM or form service. Only a 2xx response is reported as sent.

The payload contains `form` (`enquiry` or `valuation`), `page`, the field values and, for enquiries, `ref`.

## Before public launch

- [ ] Client confirms use of listing photography, and supplies master wordmark artwork.
- [ ] Connect `PUBLIC_ENQUIRY_ENDPOINT`, and add the privacy-policy link the client requires.
- [ ] Decide listing freshness. The showcase is a dated snapshot, so either refresh it or connect the listing feed. Listings rotate weekly on the official site.
- [ ] Languages. BARNES runs FR/EN/ES/IT/DE; this build is English only.
- [ ] Set the production domain in `astro.config.mjs` (`site`).
- [ ] Optional: higher-resolution originals for London (2999 px available) and the hero.

Left out deliberately, because it could not be verified: network statistics (official pages contradict each other), testimonials, and Instagram captions (login wall).
