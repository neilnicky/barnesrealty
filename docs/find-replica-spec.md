# FIND replica rebuild: measured spec and status

**Status (15 Oct 2026):** built. The site in `src/` is the FIND replica. It supersedes the "Ink, Stone and the Red Rule" direction in `design-direction.md`, which is kept for history.

The raw reference measurements are in `docs/internal/`:
- `hero-tree.txt`: hero layer structure
- `hero-scroll.txt`: layer values every 200px of scroll
- `sections.txt`: box, type and colour data for every section

## Tokens (from findrealestate.com, 1440 wide)

- **Root font size:** `100vw/192` (7.5px at 1440, 10px at 1920). At ≤767px it is `100vw/37.5` (10.4px at 390).
- **Container:** gutters 75px (10rem); sections are padded 112.5px (15rem). The common split is a 558 / 732 grid, or 528 + 30 gap + 732.
- **Type:** Instrument Sans (`@fontsource-variable/instrument-sans`, installed). Lora is used only for testimonial quotes.

  | Element | Size / line-height | Weight | Tracking | Colour |
  |---|---|---|---|---|
  | H1 | 105/105 | 700 | −2.1px | — |
  | H2 | 54/54 | 500 | −2.16px | — |
  | Statement | 42/48.3 | 500 | −1.26 | — |
  | Steps | 33/37.95 | 500 | −0.99 | — |
  | Body-l | 24/31.2 | 500 | — | — |
  | Label | 15/21 | 600 | — | — |
  | Nav | 15 | 500 | — | — |
  | Button | 13.5 | 500 | — | — |
  | Service word | 180/171 | 400 | −9px | — |
  | Em (two-tone tail) | — | — | — | `#B3B3B3`, or white at 0.4 on dark |
- **Colours:** ink `#151717`, grey surface `#F1F1F1`, dark `#151717`, lines `rgba(21,23,23,.07–.1)`.
- **Buttons:** pill, radius 100px, padding 11.55 × 22.5px, height 44px, 18px arrow icon.
- **Header:** 58.5px, sticky. The grid is 187.5 / 915 / 187.5 and nav gaps are 30px. It hides on scroll down.

## Hero

The section is 4500px (600rem) tall, with a sticky stage of 100vh. Progress is `p = scrollY / 4500`, and `e = easeOutQuad(p)`.

Layers, back to front, with their animation:

- **Sky:** `src/assets/hero/sky.jpg`, static.
- **Building:** `src/assets/hero/house.png`. The reference sets it at width 100% and top 540px. Our cut-out is wider, so use about 68vw wide and centred, with the roof at about 59% of viewport height. Origin is bottom-centre. It scales `1 + 0.3e` and rises about 512px × e.
- **Composite:** the same building inside the BARNES + "International Realty" lockup mask (centred, about 97.7 × 42.3 rem). Its opacity crossfades with the plain building over y ≈ 1300→1750.
- **Two clouds:** `src/assets/hero/cloud.webp`.

  | Cloud | Left | Top | Width | Drift |
  |---|---|---|---|---|
  | Left | −252.9px | 225px | 843px | −15% × e |
  | Right | 990.9px | 180px | 702px | +15% × e |
- **Outline logo:** a 2px white stroke drawn on with `stroke-dasharray`. It fades in at y ≈ 500 and out over y ≈ 1300→2000.
- **Smoke:** `src/assets/hero/fog.webp` at top 435px, height 465px. It rises from `translateY(324px)` to 0 as `324 × (1 − e)`.
- **Copy:** the title fades as `(1 − y/800)²`, scales `1 → 0.9 × e`, and moves down 180px × e.
- **End of section:** a fog band plus a transparent-to-white gradient (232px tall) wipes into the white next section.

**Intro:** the H1 words rise inside overflow-hidden wrappers in a stagger, using `cubic-bezier(.16,1,.3,1)` over 0.9s.

## Sections in order

Remaining reference details:
- Chevron clip is `polygon(0 0,60% 0,100% 50%,60% 100%,0 100%,38% 50%)`, 260×330px, overlapping by −50px.
- Service rows reveal their background with `clip-path: inset(100% 0 0) → inset(0)` over 1s, plus a 4s settle.
- Two-tone lines reveal through a per-line overlay (the section background at 0.8 opacity) that shrinks from full width to 0.

| # | Section | BARNES content and treatment |
|---|---|---|
| 1 | Header | Search · Destinations · Agencies · Buy▾ · Sell▾ · Services▾ · About▾, plus a "Contact" pill |
| 2 | Hero | "Find Yours, Worldwide"; "Find Properties" opens the lead modal |
| 3 | Why BARNES | Scrubbed line reveal, then media expands to 1290 × 732 |
| 4 | "This isn't just *about property.*" | Four chevron images |
| 5 | Steps | BARNES commitments, numbered 01–03 |
| 6 | Join the BARNES network | Small + large image; links to `/en/about-barnes/join-the-barnes-network.html` |
| 7 | Values carousel | Five values on the `#F1F1F1` background, Lora text, round pager |
| 8 | Services | Dark Buy / Sell / Rent rows; each opens the modal with the deal type set |
| 9 | Feature cards | Interior Design / Rental Management / Properties & Castles |
| 10 | News & Perspectives | Three posts. Images are in `src/assets/news/` and the lead lines are in `barnes-research.md` sources |
| 11 | Outro | "Find Yours. *We'll Help You Get There.*" |
| 12 | Destinations band | France / Italy / Greece, with official city URLs |
| 13 | Footer | Dark. Newsletter field (integration boundary), Global Office, links, socials, giant BARNES wordmark |

## Assets

All assets are custom: AI-generated with Figma (gpt-image), then keyed or alpha'd locally with sharp. None is copied from FIND.

| File | Contents |
|---|---|
| `src/assets/hero/house.png` / `house.webp` | 1227×766, illustrative Parisian penthouse, transparent background. **Not a BARNES listing.** |
| `src/assets/hero/cloud.webp` | 1429×542, alpha from luminance |
| `src/assets/hero/fog.webp` | 1536×546, alpha from luminance |
| `src/assets/hero/sky.jpg` | 2400px wide |
| `src/assets/news/news-1..3.jpg` | Official BARNES news images: 39th Magazine, Global Property Handbook 2026, year-end cocktail |

## As built

| Part | File |
|---|---|
| Home sections, in FIND order | `Hero`, `WhyUs`, `Arrows`, `Steps`, `Network`, `Values`, `Services`, `Features`, `News`, `Outro`, `DestinationsBand`, all in `src/components/` |
| Header | `Header.astro` |
| Footer | `Footer.astro` |
| Two-step lead modal | `LeadModal.astro` and `scripts/lead.ts`. It auto-opens once per session, like the reference. |
| Motion | `motion/hero.ts` (choreography, writes CSS variables only), `motion/lines.ts` (per-line veil reveal), `motion/parallax.ts` |
| `/destinations` | FIND `/neighborhoods` structure. Its stats are verifiable facts only. |
| Property and valuation pages | Restyled with the FIND tokens |
| Typography | Instrument Sans (Lora for the values quotes). Mobile hero geometry is tuned separately, at 1rem = 10.4px. |

**Intentional differences:**
- **Content:** BARNES copy, the five published values in place of testimonials, real listings and news.
- **No cookie banner:** the site sets no cookies.
- **Lead modal:** never claims a send without an endpoint.
- **FIND's "Sign In"** becomes "Contact".

**Validation:** compared frame by frame against `docs/internal` captures at 1440 (hero at y = 0/800/1600/2400; each section top-aligned) and at 390 (hero). Then:
- `astro check`: 0 errors
- Vitest: 18 passed
- Playwright: 27 passed, 3 skipped by device
