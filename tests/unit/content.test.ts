import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { propertyImages } from "@/content/asset-manifest";
import * as content from "@/content/barnes-content";
import { BRAND, brand, brochurePath, comingSoon, findListing, footer, formatPrice, formatSurface, home, links, listings, listingSlug, navigation, regions } from "@/content/barnes-content";

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
      expect(l.slug).toMatch(/^[a-z0-9-]+$/);
      expect(l.code).toMatch(/^DXB-\d{4}$/);
      expect(l.price.currency).toBe("AED");
      expect(l.country).toBe("United Arab Emirates");
      expect(l.agency.phone.href).toMatch(/^tel:\+971\d{7,}$/);
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
  it("has five values", () => {
    expect(home.values.items).toHaveLength(5);
    expect(home.values.items).toBe(brand.values);
  });

  it("is a Dubai template: no French or legacy-brand references anywhere in the content", () => {
    // `source` is internal provenance for interim photos and is never rendered.
    const text = JSON.stringify(content, (key, value) => (key === "source" ? undefined : value));
    for (const word of [/french/i, /france/i, /paris/i, /ch[aâ]teau/i, /1995/, /riviera/i, /provence/i, /europe/i, /art de vivre/i, /barnes-international/i, /€/, /\+33/]) {
      expect(text, String(word)).not.toMatch(word);
    }
    expect(text).toMatch(/Dubai/);
  });

  it("uses the placeholder brand everywhere through BRAND", () => {
    expect(brand.name).toBe(BRAND);
    expect(home.why.label).toBe(`Why ${BRAND}`);
    expect(footer.copyright).toContain(BRAND);
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
      ...listings.map(brochurePath),
    ];
    const built = (h: string) => h === "/" || h === "/sell/" || h.startsWith("/destinations/") || h.startsWith("/properties/") || h.startsWith("/#") || h in comingSoon;
    hrefs.forEach((h) => {
      expect(h, h).toMatch(/^\//);
      expect(built(h), h).toBe(true);
    });
  });

  it("coming-soon pages have clean paths and titles", () => {
    for (const [path, page] of Object.entries(comingSoon)) {
      expect(path).toMatch(/^\/[a-z0-9-/]+\/$/);
      expect(page.title.length).toBeGreaterThan(2);
    }
    expect(Object.keys(comingSoon).length).toBeGreaterThan(30);
  });

  it("service rows map to the lead modal's deal types", () => {
    expect(home.services.items.map((s) => s.deal)).toEqual(["Buy", "Sell", "Rent"]);
  });
});

describe("formatting", () => {
  it("formats prices in AED and areas in sq ft", () => {
    expect(formatPrice({ amount: 68_000_000, currency: "AED" })).toBe("AED 68,000,000");
    expect(formatSurface(1250)).toBe("13,450 sq ft");
  });
});
