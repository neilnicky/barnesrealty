# Design direction — "Ink, Stone and the Red Rule"

## Concept

The concept is a printed BARNES Magazine that moves.

FIND gives us the choreography: a pinned opening that turns a photograph into the wordmark, statements that read themselves as you scroll, media that opens to full bleed, and huge service words. BARNES gives us the identity:
- the Didone wordmark
- the warm stone paper
- the red bar from its Instagram highlight covers
- the courteous, French "art de vivre" voice

The site should feel like turning heavy pages, not using an app.

Everything shown is real. The seven properties are live BARNES listings, captured on 15 Oct 2026, each with its reference number and agency. Figures we could not verify are left out, not rounded up.

## Colour

| Token | Value | Use |
|---|---|---|
| `--ink` | `#1D1D1B` | BARNES site ink: text, primary pill |
| `--ink-muted` | `rgb(29 29 27 / .42)` | Two-tone heading tails, grey-to-ink reading reveal |
| `--stone` | `#EAE6DD` | BARNES warm stone: main canvas (FIND's white becomes stone) |
| `--paper` | `#F7F3F2` | Alternate light surface (FIND's `#F1F1F1`) |
| `--night` | `#141414` | Dark sections (services, footer). BARNES's own near-black |
| `--red` | `#B4002F` | **The red rule only**: dividers, active states, the reveal bar, and focus rings on dark. Never large fills except the 4–10 px rule. |
| `--line` | `rgb(29 29 27 / .16)` | Hairlines |

Red stays below about 1 % of any viewport. Ink on stone has a contrast ratio of 14.6:1.

## Typography

- **Display: Bodoni Moda** (variable, optical size). Used for headlines in sentence case. Headings have two tones: the lead is in ink and the tail is muted. Sizes follow FIND's scale. Tracking is −0.02em; Bodoni needs less tightening than Instrument Sans.
- **UI and body: Raleway** (BARNES's web font).
  - Labels and nav: UPPERCASE, 0.16em tracking, 11–12 px, matching BARNES's own UI convention.
  - Body: 16–18 px, line-height 1.6.
- **Numerals in specifications:** Raleway lining figures with tabular-nums.
- **Captions on property imagery:** Bodoni italic, bottom-right, with a thin arrow, as on BARNES Instagram.

## Layout

- The fluid scale is copied from the reference: `html { font-size: clamp(5.5px, .52vw, 10px) }`. Gutters are 10rem (75 px at 1440) and section padding is 15rem. The maximum width is 1920.
- Mobile uses a fixed 16 px base and 20 px gutters.
- The grid has 12 columns. FIND's signature split (label column at 4/12, content at 8/12) is kept for statement and steps sections.
- Corners are square everywhere except pills, as on FIND.

## Images

- **Formats:** 4:5 portrait for cards (the Instagram language); 16:9 to 21:9 for bleeds; tall 3:4 for the art-de-vivre strip.
- **Focal points** are set per image in the manifest, for example `50% 60%`, so crops stay on the architecture.
- No stock, no AI imagery, and no cut-outs. Each listing's own gallery is the only property imagery used.

## Section plan (adapted from the reference)

| # | FIND | BARNES | Treatment |
|---|---|---|---|
| 1 | Header | Wordmark · Properties / Sell / Rent / Art de vivre / Maison · "Request a valuation" pill | **Preserved.** Hide on scroll down. Red underline marks the active route. |
| 2 | Pinned hero: building, then image-filled FIND letters, then clouds to white | Pinned hero: Eygalières (pool facing the Alpilles) full bleed, headline "Exceptional properties & lifestyle worldwide.", then the photo **resolves into the BARNES wordmark** (image visible through the letters on stone), then a red rule draws beneath it | **Transformed.** No fabricated cut-outs. The image-to-letters reveal is the same idea, made from a real listing. |
| 3 | Why FIND: word reveal and expanding video | "La Maison BARNES": word-reveal statement from the commitments page, then the Fontainebleau aerial expands to full bleed | **Preserved** |
| 4 | Chevron portraits | "Art de vivre": four tall images clip-revealed in a stagger, crossed by a red bar, with the verified lifestyle verticals beneath | **Transformed** (red-bar motif) |
| 5 | — (FIND: neighbourhood cards) | **The selection**: seven real listings in four columns, region filter (Paris & Île-de-France / Riviera & Provence / Atlantic Coast / International), 4:5 cards linking to detail routes, and a closing ink tile leading to the full official catalogue | **New, required.** The filter works on real data. |
| 6 | Real Estate, Rewired: steps | "Selling with BARNES": 01 A written valuation · 02 Exposure · 03 One consultant to the deed | **Preserved** |
| 7 | Dark Buy / Sell / Rent rows | Dark **Buy / Sell / Rent / Seasonal** rows: hover photo, arrow, red underline | **Preserved.** Destinations go to real pages (selection, valuation, official rent and seasonal pages), not a modal. |
| 8 | Three feature cards | Expertise: Properties & Castles / Wine, hunting & equestrian estates / New developments & commercial. Typographic cards with a giant Didone initial and red bar (Instagram cover system) | **Transformed.** No unrelated photos. |
| 9 | Testimonials | — | **Omitted.** Nothing verified. |
| 10 | Blog list | "BARNES news": four dated official items, linking out | **Preserved**, typographic |
| 11 | Neighbourhood link band | Markets: the 26 directory countries, linking to the official country searches | **Preserved** |
| 12 | Outro full bleed | "Find yours." over the Ibiza sunset, with valuation and agency CTAs | **Preserved** |
| 13 | Footer with giant wordmark | Night footer, Global Office, socials, legal, giant BARNES wordmark rising | **Preserved** |

**Routes:**
- `/` — home
- `/properties/[ref]/` — detail: gallery, facts, official description, presenting agency, enquiry
- `/sell/` — valuation request
- `/404`

## Motion

- **Easing:** `expo-out cubic-bezier(.16,1,.3,1)` from the reference. Reveals take 0.9 s, the slow image settle is 2.4 s, and hovers are 0.3–0.4 s.
- **Scroll-linked work:** one requestAnimationFrame loop with Lenis on desktop fine-pointer devices only, as in the user's established pattern. Effects are scrubbed against element progress. Only `transform`, `opacity` and `clip-path` are animated.
- **Reduced motion:** the hero renders its final composed state with a static wordmark and photograph. Reveals are visible immediately, there is no Lenis, and no pinning.
- **Touch:** pins are shortened and services show their images at all times.

## Why this suits BARNES

- It keeps the BARNES assets the client already owns: the Didone wordmark, Raleway, ink, stone and red. It also turns the motif BARNES already uses on Instagram into a system.
- It sells with the real stock and with the service promise BARNES itself publishes.
- Its calm, magazine pace fits the brand's "discretion and elegance" values better than marketplace UI.

## Implementation notes (as built, 15 Oct 2026)

- **Hero image.** It changed from Saint-Tropez to Eygalières after a test render. The Saint-Tropez frame put the white Bodoni headline over palms and a busy façade, so it was hard to read. The Eygalières pool has a calm sky band for the headline, and its blues and greens read clearly through the letters.
- **Optical size.** Bodoni Moda at its automatic display optical size was too spindly at heading sizes next to the reference's medium-weight headlines. Headings are pinned to `opsz 30`, and the hero and outro to `opsz 36`. Only the huge service words and the monograms use `opsz 96`.
- **Wordmark mask.** Uses the traced SVG as a CSS mask on a second copy of the hero photograph (the same responsive source, so it costs no extra request). The photograph layer fades over it. Everything is animated with opacity and transform only.
- **Selection grid.** Seven listings left an orphan in three columns. The grid is now four columns with a final "Search every BARNES listing" tile, which keeps the grid whole in every filter state.

## Validation log

| Check | Result |
|---|---|
| Reference comparison, 1440×900 (recording frames vs implementation) | Composition, section rhythm, the image-filled wordmark, scrubbed statement, inset-to-bleed media, huge-word service rows and giant footer wordmark all match. Corrections made after comparison: heading optical size, service-row copy size and contrast, selection orphan, art-de-vivre bar moved behind the photographs (it read as a strike-through) |
| Viewports 1440 / 1280 / 768 / 390 / 320 | No page-level horizontal overflow. Hero copy, cards, filters (a horizontal scroller below 640 px), forms and footer checked visually |
| Reduced motion | Hero is 100svh and static. Reveals are visible immediately. No Lenis. Covered by E2E |
| Keyboard and a11y | Skip link, visible red focus rings, menu (Escape, focus return, `inert` page), dialog gallery (arrows, Escape, focus return), labelled fields with inline errors and `aria-invalid`, live region for filter results |
| Forms | Validation and "not connected" honesty covered by unit tests and E2E. No success state without a 2xx response |
| Console | No errors on any route (E2E) |
| Build | `astro check` 0 errors; production build of 10 pages; Vitest 14/14; Playwright 19 passed, 1 skipped (mobile-only test on the desktop project) |
