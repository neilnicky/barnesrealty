# Brand identity verification — @barnesrealty

Verified 15 October 2026. Every finding below cites the source it came from.

## Verdict

**The supplied Instagram account `@barnesrealty` is the official account of BARNES International Realty**, the Paris-headquartered luxury real estate group trading as **BARNES** (barnes-international.com).

This is not a name match. The brand's own website links to the account (see Evidence 1).

## Evidence

| # | Source | Observation | Weight |
|---|---|---|---|
| 1 | `https://www.barnes-international.com/en/`: header and footer social icons (fetched HTML, 15 Oct 2026) | The Instagram icon links to `https://www.instagram.com/barnesrealty/`. The footer block reads "FOLLOW US ON INSTAGRAM @barnesrealty". The same icon set links to `facebook.com/barnesinternationalrealty`, `linkedin.com/company/barnes_realty`, `pinterest.fr/barnesluxury`, and YouTube channel `UC-ow3njRKM7mQ_aQo9ocTHQ`. | **Decisive.** First-party link from the official domain. |
| 2 | `https://www.instagram.com/barnesrealty/`, rendered logged out in headless Chromium | Display name "BARNES International Realty". Verified badge. Bio: "Official account · Exceptional properties & lifestyle worldwide. · Find yours with #BARNESRealty". About 392K followers and 2,130 posts. | Strong |
| 3 | Same profile | Profile image is a roundel monogram: a Didone "B" inside "BARNES · INTERNATIONAL". The Didone letterforms match the barnes-international.com wordmark. | Strong |
| 4 | Same profile | Story highlights are "Seasonal Rental", "Hospitality", "Art de Vivre", "Realty" and "Events". These match the official site's top navigation (BUY · SELL · RENT · SERVICES · HOSPITALITY · ABOUT BARNES). | Corroborating |
| 5 | Same profile, the 12 most recent posts (alt text plus visible tiles) | Posts are dated 17 May to 14 Oct 2026. They are property reels: Riviera villas under umbrella pines, a Paris rooftop near Sacré-Cœur, a Central Park view captioned "New York City, NY · 111 West 57th Street · For rent", and a hillside villa with pools. All of these markets appear in the official site's agency directory. | Corroborating |

## Entities that must not be conflated

- **Other businesses named "Barnes Realty"**, such as local US brokerages called Barnes Realty or Barnes Real Estate. None of them is linked from barnes-international.com, and none was used.
- **BARNES partner agencies.** Several listings carry "in partnership with Domus Nova", for example BARNES London and BARNES Ibiza. Those listings are presented here as BARNES listings because the official site presents them that way. Domus Nova's own brand is not used.
- **Independent agents.** One showcased listing (Fontainebleau) is presented by an "independent contractor agent" under BARNES Propriétés & Châteaux. Its content keeps that exact attribution.

## Final verified scope

- **Business:** BARNES (BARNES International Realty / "La Maison BARNES"). It is an integrated international network of luxury real estate agencies, with expert offices for art, yachting, wine, family office and similar, plus hospitality venues.
- **Founded:** 1995 by Heidi Barnes, with Thibault de Saint Vincent as president. International expansion has run since 2004. Source: `/en/about-barnes/our-history.html`.
- **Global Office:** 81 avenue Kléber, 75016 Paris, +33 1 55 61 92 90. Source: `/en/contact.html` expert offices.
- **Markets:** The agency directory lists 26 countries/territories: Argentina, Belgium, Bulgaria, Cambodia, Canada, Cyprus, Dominican Republic, France, Greece, Hungary, Israel, Italy, Luxembourg, Mauritius, Mexico, Monaco, Morocco, Portugal, Saint-Barthélemy, Spain, Switzerland, Turkey, United Arab Emirates, United Kingdom, United States and Uruguay.
- **International positioning:** Verified in operations, through agencies across those countries and listings priced in multiple local currencies. The site also offers FR/EN/ES/IT/DE.

## Unresolved ambiguities

1. **Network size statistics conflict across official pages.** The values found were:
   - "150 agencies in 22 countries" (home and contact pages)
   - "113 branches in 20 countries" (our-commitments page)
   - "over 19 countries and 75 destinations" (home footer)
   - "more than 100 dream destinations" and "over 1,800 employees" (history page)
   - "some 1,800 consultants" (commitments page)

   **Decision:** the site shows no headline network counts. It shows the directory's country list, which is verifiable item by item.
2. **Instagram post grid and captions** need a login to browse beyond the first 12 tiles. Captions could not be read, so no copy is quoted from posts except the bio.
3. **Master logo artwork** is not public in vector form. The official raster is `accommodation/21/logo/logo-blanc.png` at 400×80. A vector was traced from it (see `docs/barnes-research.md` → Assets). The client should supply master artwork before launch.
4. **Listing currency.** Listings rotate weekly. The showcase is a dated snapshot (15 Oct 2026), and every card links to the live official listing.
