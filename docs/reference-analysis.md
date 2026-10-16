# Reference analysis — FIND Real Estate (findrealestate.com)

Inspected 15 October 2026. Sources:

- **Live site.** Inspected with headless Chromium (Playwright) at 1440×900 and at 390×844 with touch emulation. Inspection covered computed styles, the DOM structure, scroll-step screenshots, the burger menu, and the `/about`, `/neighborhoods`, `/agents`, `/search` and `/services` routes.
- **Screen recording.** `~/Media/Screenshots/Screen Recording 2026-10-15 at 11.50.14 AM.mov` is 81.8 s at 3600×2260 and 120 fps. The filename uses a narrow no-break space before "AM", so the exact path string in the brief fails; the file was reached by glob. 164 frames were extracted at 2 fps; **t = frame ÷ 2 s**.

Two kinds of statement appear below. **Observed** means seen in the recording or the DOM. **Hypothesis** means an inference about how something is implemented.

## 1. Route inventory

| Route | Purpose | Observed |
|---|---|---|
| `/` | Brand-led landing and lead capture | Full scroll in the recording (t 0–64 s) and live |
| `/search` | Property search (Next.js app) | Live screenshot |
| `/neighborhoods` | "Places we love to call home" index: stats band, "where our agents are busiest" carousel, region grids (NY, NJ, PA, CT, Miami) | Recording t 63–76 s, live |
| `/neighborhoods/{area}/{hood}` | Neighbourhood guides | Links in footer band |
| `/agents`, `/join`, `/services`, `/blog`, `/blog/{slug}`, `/about`, `/press-and-media`, `/operating-procedure` | Secondary | `/about` in the recording t 80–82 s |
| Header dropdowns | Join, Paperwork (Submit an Application, Make a Payment, Online Forms), Resources (Helpful Partnerships, Commercial, Operating Procedure, Rent vs Buy Calculator), About (About Us, Blog, Press) | Recording t 70–78 s |
| Lead modal "Find properties" | Email, phone, min/max price, deal type, then "Next →" | Opens on load (t 0–8 s) and from service rows with the deal type pre-filled (t 42–46 s: "Buy", "Rent") |

**Stack (observed):**
- Next.js App Router (`/_next/static/chunks/app/...`)
- Lenis smooth scroll (`html.lenis`)
- CSS Modules
- iubenda cookie banner
- reCAPTCHA and GTM

## 2. Homepage sections, in order

Heights measured at 1440 wide.

1. **Header.** Sticky, 58 px, transparent over the hero. Layout is wordmark left, centred text nav, and a black "Sign In" pill on the right. It hides on scroll down and returns on scroll up. Transition: `background-color .3s, transform .3s ease-in-out`.
2. **Hero, `section.hero_root`, 4500 px tall: pinned scroll choreography.** Observed sequence:
   - t 6–8 s: the headline "Find What Moves You" draws in letter by letter with a mask wipe, over a sky photo.
   - t 9–12 s: on scroll, the headline and subline fade. A building cut-out PNG rises and scales up, and cloud PNGs drift in from the bottom.
   - t 12–13 s: the outlined "FIND / Real Estate" lettering appears over the building.
   - t 13–14 s: the lettering fills. **The letters become a window onto the building photo** (an image mask), while the building itself fades out.
   - t 14–16 s: cloud and smoke layers rise and fill the screen with white. This is the handoff to the white "Why FIND" section.
   - *Hypothesis:* a sticky 100vh stage whose scroll progress (0 to 1) is mapped to layer transforms; the letters use `background-clip:text` or an SVG mask.
3. **Why FIND, 1225 px.** A small label on the left and a large statement on the right (≈40 px). The statement's **words switch from grey to black as you scroll** (scrubbed reading progress). Below it, a video panel (1290 × 732) **grows to full bleed** with a slight zoom as it reaches centre (t 16–20 s).
4. **"This isn't just about real estate.", 822 px.** A centred two-tone headline: black, then grey `#B3B3B3` for the tail. Four **chevron-masked portraits** enter in a stagger from left to right (t 21–24 s), followed by a centred two-tone paragraph.
5. **"Real Estate, Rewired.", 645 px.** Two columns:
   - left: a sticky two-tone title and a "Start Your Search" pill
   - right: "Steps:", then three ruled rows numbered 01/02/03, each a bold lead plus grey continuation
6. **For Agents: "Don't Rent Your Career. Own It.", 1246 px.** An asymmetric pair: a small portrait on the left and a large landscape aerial on the right, moving at different parallax rates. Body copy and a CTA follow.
7. **Testimonials, `#F1F1F1`, 870 px.** A large photo on the left. On the right:
   - a numbered round pager (1–5) and a quote mark
   - the quote set in **Lora serif**, with name and stars
   - clicking a number swaps the quote (t 31–33 s)
8. **Services, dark `#151717`, 1547 px.** "How FIND Can Help You", then three full-width rows (`button.services_item`). Each row has a number, a description at 18 px, and a huge word: **Buy / Sell / Rent**. On hover, a **background photo fades in behind the row**, an arrow slides in from the right, and the word gets an underline (t 34–40 s). Clicking opens the lead modal with that deal type.
9. **Features: "Support Beyond Buying and Selling", dark, 814 px.** Three image cards (Mortgage / Property Management / Construction). Hover reveals a body line and a "Learn More" ghost pill.
10. **Blog & Resources, `#F1F1F1`, 1587 px.** An alternating list of title/excerpt and image rows, each with a date and "Read More".
11. **Outro, 675 px.** A full-bleed photo with a dark overlay, "Find You. We'll Help You Get There.", and a white pill.
12. **Featured neighbourhoods band, white, 252 px.** Three columns of links (NY / NJ / CT).
13. **Footer, dark.** Newsletter field on the left, link columns on the right, office/email/phone, and a **giant FIND wordmark** at the bottom that rises from grey to white as it enters (t 58–60 s). Legal links sit below it.

Cookie bar: fixed, bottom, persistent.

## 3. Design tokens (computed, 1440 wide)

- **Root font size:** `html { font-size: 7.5px }` at 1440, a fluid rem of ≈0.52vw. Everything below scales with the viewport.
- **Families:** Instrument Sans (400–700) everywhere. **Lora** is used only for testimonial quotes.

**Type scale:**

| Role | Size / line-height | Weight | Tracking |
|---|---|---|---|
| H1 | 105 / 105 px | 700 | −2.1 px (−0.02em) |
| Section H2 | 54 / 54 px | 500 | −2.16 px (−0.04em) |
| Blog H2 | 60 px | 500 | — |
| Card H3 | 33 / 38 px | 500 | −0.02em |
| Service description H3 | 18 / 27 px | 500 | — |
| Label | 15 px | 600 | — |
| Button | 13.5 / 18.9 px | 500 | — |

- **Two-tone headings:** the lead is ink and the tail is `#B3B3B3` on light backgrounds, or `rgba(255,255,255,.4)` on dark ones.
- **Colour:**

  | Token | Value |
  |---|---|
  | Ink | `#151717` |
  | Black | `#000` |
  | White | `#FFF` |
  | Surface | `#F1F1F1` |
  | Muted | `#B3B3B3` |
  | Muted on dark | `rgba(255,255,255,.4)` |

  There is no brand accent colour. The only exception is a system link blue `#0496FF` in the cookie bar.
- **Layout:**
  - container max-width 1920 px
  - side gutters **75 px** (10rem)
  - section padding **112.5 px** vertical (15rem)
  - typical split is label column ≈ 1/3, content ≈ 2/3
- **Buttons:**
  - pill, `border-radius:100px`, padding 11.5 × 22.5 px, height ≈44 px, label plus → arrow
  - primary is ink fill; secondary is white, or an inverted ghost on dark
  - transition `transform .3s`
- **Images:** `object-fit: cover`; sharp corners (no radius) everywhere except pills; dark overlays only on the outro and service hover.

## 4. Motion audit

Easing and timing values are read from computed `transition` values, so they are observed. Trigger behaviour comes from the recording.

| Interaction | Trigger | Change | Timing / easing | Notes |
|---|---|---|---|---|
| Hero choreography | Scroll through the 4500 px pin | Headline fades; building scales/rises; letters fill with image; clouds wipe to white | Scrubbed (no time-based easing); Lenis-smoothed | Reverses on scroll up |
| Headline intro | Load | Characters rise in a stagger behind masks | ≈0.9 s, `cubic-bezier(.16,1,.3,1)` (expo-out) | |
| Word-colour reading reveal | Scroll | Words go grey → ink in reading order | Scrubbed | Why FIND, two-tone paragraphs |
| Media expand | Element reaches centre | Inset video/image grows to full bleed + slight scale | `clip-path 1s cubic-bezier(.16,1,.3,1)`, `transform 4s cubic-bezier(.5,1,.89,1)` | The slow 4 s zoom continues after the clip |
| Staggered masked images | In view | Chevrons slide/fade in left → right | ≈0.8 s, stagger ≈0.12 s | |
| Two-tone heading reveal | In view | Tail fades from lighter grey → muted | ≈0.4–1 s | |
| Parallax pair | Scroll | Small portrait and large aerial move at different rates | Scrubbed | For Agents |
| Testimonial pager | Click 1–5 | Quote crossfade; active circle outline | `opacity .4s` | |
| Service rows | Hover / focus | Background photo opacity 0 → 1, arrow slides in, word underline | `opacity .4s`, `transform .3s` | Click opens modal |
| Feature cards | Hover | Description and pill reveal | `grid-template-columns 1s cubic-bezier(.16,1,.3,1)` | |
| Header | Scroll direction | Hide on down, show on up; background on scroll | `.3s ease-in-out` | |
| Footer wordmark | In view | Rises and turns grey → white | ≈1 s | |
| Dropdowns | Hover | Panel fades in under item | `opacity .2–.3s` | |
| Mobile menu | Burger | Full-screen white panel; large nav with chevron disclosure rows | — | Live screenshot |

**Reduced motion:** a sweep under reduced motion was not tested on the reference. The hero relies entirely on scroll and the content survives without animation. *Hypothesis:* there is no explicit reduced-motion handling, because no `prefers-reduced-motion` rules were found in the computed transitions.

## 5. Responsive behaviour (390×844, observed)

- The header collapses to wordmark plus burger. The headline is centred at about 44 px over 2 lines.
- The hero choreography is kept in a shorter form, still ending in image-filled letters.
- Every split stacks: label, then heading, then content. Steps keep their numbered rules.
- Service rows keep the huge words (≈72 px) and show their image at all times on mobile, with no hover.
- Feature cards stack. Blog rows stack image-first.
- The footer is stacked, with the wordmark at full width.
- The cookie bar takes up about 40 % of the viewport on mobile, which works against the experience.

## 6. What to keep, change or drop for BARNES

**Keep (design intelligence):**
- the pinned hero that ends in **image-filled wordmark letters**
- the scrubbed word-colour statement
- the inset-to-full-bleed media expand
- the staggered masked image row
- the numbered steps
- the huge-word service rows with hover photo
- the dark/light section rhythm
- the full-bleed outro CTA
- the giant footer wordmark
- the fluid type and spacing scale
- expo-out easing
- the pill buttons with arrows

**Change:**
- Instrument Sans display becomes the BARNES Didone plus Raleway system.
- Neutral grey surfaces become BARNES warm stone.
- The accent goes from none to the BARNES red bar used as a rule.
- The building-plus-clouds cut-out becomes a real listing photograph, because no cut-out assets exist and fabricating them would misrepresent a property.
- Chevron masks become plain clip-reveals crossed by a red bar, which is the BARNES highlight motif.

**Drop:**
- the auto-opening lead modal. It interrupts the first viewport. A green "Thanks — we've received your inquiry" toast is also visible in the recording at t 0–8 s; whether it followed an earlier submission is unknown.
- the agent-recruitment section (not a BARNES consumer journey)
- testimonials (no verified BARNES testimonials were obtained)
- the newsletter capture (no endpoint)
- "Sign In"

## 7. Open questions

- Exact hero scroll-to-progress curves. These were inferred from 2 fps frames, and the timing was tuned by eye in implementation.
- Whether the reference lazy-loads the hero PNG layers. Not material.

## 8. Prioritised implementation checklist

1. Fluid token system (rem scale, gutters, section padding, two-tone heading, pill button)
2. Header: sticky, hide on scroll down, transparent over the hero; mobile overlay menu
3. Pinned hero: photograph, then image-filled BARNES wordmark, then stone canvas
4. Scrubbed statement and inset-to-bleed media expand
5. Property selection with working region filter and real listings
6. Staggered clip-reveal image row with red bar ("Art de vivre")
7. Numbered selling steps and valuation CTA
8. Dark huge-word service rows with hover photo
9. Expertise cards, news list, markets, outro, footer wordmark
10. Property detail routes and valuation/enquiry route with an honest integration boundary
11. Reduced motion, keyboard, focus states, 320–1440 checks, then reference comparison passes
