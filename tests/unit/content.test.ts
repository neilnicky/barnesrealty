import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { propertyImages } from "@/content/asset-manifest";
import { brand, comingSoon, findListing, footer, formatPrice, formatSurface, home, links, listings, listingSlug, navigation, officialListingPath, regions } from "@/content/barnes-content";

const asset = (file: string) => new URL(`../../src/assets/${file}`, import.meta.url);

describe("listings", () => {
  it("have unique references and resolvable slugs", () => {
    const refs = listings.map((l) => l.ref);
    expect(new Set(refs).size).toBe(refs.length);
    listings.forEach((l) => expect(findListing(listingSlug(l.ref))).toBe(l));
  });

  it("carry the facts the cards and detail pages need", () => {
    for (const l of listings) {
      expect(l.price.amount).toBeGreaterThan(0);
      expect(l.surfaceM2).toBeGreaterThan(0);
      expect(l.description.length).toBeGreaterThan(0);
      expect(l.officialUrl).toMatch(new RegExp(`^https://www\\.barnes-international\\.com/en/.+ref-${l.ref}\\.html$`));
      expect(l.agency.phone.href).toMatch(/^tel:\+\d{8,}$/);
      expect(regions.map((r) => r.id)).toContain(l.region);
      expect(l.gallery.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("only use photographs from their own listing", () => {
    for (const l of listings) {
      [l.cover, ...l.gallery].forEach((img) => expect(img.file).toContain(`properties/${l.ref}/`));
    }
  });
});

describe("assets", () => {
  it("manifest points at files that exist, with alt text and a source", () => {
    for (const images of Object.values(propertyImages)) {
      for (const img of images) {
        expect(existsSync(asset(img.file)), img.file).toBe(true);
        expect(img.alt.length).toBeGreaterThan(10);
        expect(img.source).toMatch(/^https:\/\/assets\.barnes-international\.com\//);
      }
    }
  });

  it("every image used on the home page exists", () => {
    const files = [
      ...Object.values(home.hero.art),
      home.why.image.file,
      ...home.arrows.images.map((i) => i.file),
      home.network.image.file,
      home.network.smallImage.file,
      home.values.image.file,
      ...home.services.items.map((s) => s.image.file),
      ...home.features.items.map((f) => f.image.file),
      ...home.news.items.map((n) => n.image.file),
      home.outro.image.file,
    ];
    files.forEach((f) => expect(existsSync(asset(f)), f).toBe(true));
  });
});

describe("content integrity", () => {
  it("values are BARNES's five published values", () => {
    expect(home.values.items.map((v) => v.name)).toEqual(["Trust", "Excellence", "Elegance", "Vision", "Global support"]);
    expect(home.values.items).toBe(brand.values);
  });

  it("every rendered link stays on the site: built pages or a registered coming-soon page", () => {
    const hrefs = [
      ...navigation.flatMap((n) => ("items" in n ? n.items.map((i) => i.href) : [n.href])),
      ...Object.values(links),
      ...footer.nav.map((n) => n.href),
      ...footer.legal.map((n) => n.href),
      ...footer.social.map((n) => n.href),
      ...home.features.items.map((f) => f.href),
      ...home.news.items.map((n) => n.href),
      ...home.destinations.groups.flatMap((g) => g.links.map((l) => l.href)),
      home.network.cta.href,
      home.steps.cta.href,
      home.features.cta.href,
      ...listings.map(officialListingPath),
    ];
    const built = (h: string) => h === "/" || h === "/sell/" || h.startsWith("/destinations/") || h.startsWith("/properties/") || h.startsWith("/#") || h in comingSoon;
    hrefs.forEach((h) => {
      expect(h, h).toMatch(/^\//);
      expect(built(h), h).toBe(true);
    });
  });

  it("coming-soon pages have clean, unique paths and keep their official source", () => {
    for (const [path, page] of Object.entries(comingSoon)) {
      expect(path).toMatch(/^\/[a-z0-9-/]+\/$/);
      expect(page.title.length).toBeGreaterThan(2);
      expect(page.source ?? "").toMatch(/^https:\/\//);
    }
    expect(Object.keys(comingSoon).length).toBeGreaterThan(30);
    expect(brand.social.length).toBe(5);
  });

  it("service rows map to the lead modal's deal types", () => {
    expect(home.services.items.map((s) => s.deal)).toEqual(["Buy", "Sell", "Rent"]);
  });
});

describe("formatting", () => {
  it("formats prices in their listing currency", () => {
    expect(formatPrice({ amount: 4_750_000, currency: "GBP" })).toBe("£4,750,000");
    expect(formatPrice({ amount: 20_700_000, currency: "EUR" })).toBe("€20,700,000");
    expect(formatSurface(1200)).toBe("1,200 m²");
  });
});
