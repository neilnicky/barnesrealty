/**
 * All editorial content for the site — a Dubai luxury real estate template.
 *
 * BRAND is a placeholder: change it here (and swap the logo files in
 * public/brand/) to rebrand every page, title and label.
 *
 * Template content: residences, prices, advisors, insights and contact
 * details below are sample copy for layout and must be replaced with the
 * client's verified information before launch.
 */
import { shot, type ImageAsset, type PropertyRef } from "./asset-manifest";

export type { ImageAsset, PropertyRef };
export { shot };

/** Placeholder brand name — swap later. */
export const BRAND = "BARNES";

/**
 * Pages that are not built yet. Every link points at an internal path;
 * src/pages/[...soon].astro renders a minimal "Coming soon" page for each.
 */
export interface SoonPage {
  title: string;
}

export const comingSoon: Record<string, SoonPage> = {};

const soon = (path: string, title: string) => {
  comingSoon[path] = { title };
  return path;
};

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

/** Placeholder contact details — replace with the agency's own. */
const PHONE = { display: "+971 4 000 0000", href: "tel:+97140000000" };

export const brand = {
  name: BRAND,
  legalName: `${BRAND} Real Estate`,
  wordmark: { src: "/brand/barnes-wordmark.svg", alt: BRAND },
  positioning: "Prime UAE luxury real estate",
  bio: "Villas, penthouses and waterfront estates across Dubai.",
  signature: "Find yours.",
  servicesPage: soon("/services/", "Our services"),
  globalOffice: {
    name: "Head Office",
    address: ["Office address", "Dubai, United Arab Emirates"],
    phone: PHONE,
  },
  social: [
    { label: "Instagram", href: soon("/social/instagram/", `${BRAND} on Instagram`) },
    { label: "Facebook", href: soon("/social/facebook/", `${BRAND} on Facebook`) },
    { label: "Linkedin", href: soon("/social/linkedin/", `${BRAND} on LinkedIn`) },
    { label: "Youtube", href: soon("/social/youtube/", `${BRAND} on YouTube`) },
  ],
  values: [
    { name: "Trust", line: "Every relationship begins with transparency, and every transaction is handled with complete discretion." },
    { name: "Expertise", line: "Deep knowledge of Dubai’s prime communities, developers and market cycles, shared openly with every client." },
    { name: "Discretion", line: "Private viewings, confidential negotiations and a quiet, considered approach to every mandate." },
    { name: "Vision", line: "We look beyond the next sale to the long-term value of every home and investment we advise on." },
    { name: "Excellence", line: "An uncompromising standard of service, from the first conversation to the handover of keys." },
  ],
};

// ---------------------------------------------------------------------------
// Links & navigation — every destination is an internal page
// ---------------------------------------------------------------------------

export const links = {
  selection: "/destinations/#featured",
  destinations: "/destinations/",
  valuation: "/sell/",
  search: soon("/search/", "Property search"),
  rent: soon("/rent/", "Rentals"),
  holidayHomes: soon("/rent/holiday-homes/", "Holiday homes"),
  onlineValuation: soon("/sell/online-valuation/", "Online valuation"),
  commitments: soon("/sell/our-approach/", "Our approach"),
  findAgency: soon("/advisors/", "Our advisors"),
  contact: soon("/contact/", "Contact"),
  news: soon("/insights/", "Insights"),
  press: soon("/about/press/", "In the press"),
  history: soon("/about/story/", "Our story"),
  values: soon("/about/values/", "Our values"),
  join: soon("/careers/join/", `Join ${BRAND}`),
  jobs: soon("/careers/", "Careers"),
  fees: soon("/about/fees/", "Fees & FAQ"),
};

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Header, in FIND's order: three direct links, then four dropdowns. */
export const navigation: (NavItem | NavGroup)[] = [
  { label: "Search", href: links.search },
  { label: "Communities", href: links.destinations },
  { label: "Advisors", href: links.findAgency },
  {
    label: "Buy",
    items: [
      { label: "Properties for sale", href: links.search },
      { label: "Off-plan", href: soon("/buy/off-plan/", "Off-plan") },
      { label: "Penthouses", href: soon("/buy/penthouses/", "Penthouses") },
      { label: "Waterfront estates", href: soon("/buy/waterfront-estates/", "Waterfront estates") },
    ],
  },
  {
    label: "Sell",
    items: [
      { label: "Request a valuation", href: links.valuation },
      { label: "Our approach", href: links.commitments },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Property management", href: soon("/services/property-management/", "Property management") },
      { label: "Investment advisory", href: soon("/services/investment-advisory/", "Investment advisory") },
      { label: "Golden Visa advisory", href: soon("/services/golden-visa/", "Golden Visa advisory") },
      { label: "Interior design", href: soon("/services/interior-design/", "Interior design") },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Our story", href: links.history },
      { label: "Our values", href: links.values },
      { label: "Insights", href: links.news },
      { label: "In the press", href: links.press },
    ],
  },
];

export const headerCta = { label: "Contact", href: links.contact };

// ---------------------------------------------------------------------------
// Communities & residences (sample data)
// ---------------------------------------------------------------------------

export const regions = [
  { id: "waterfront", label: "Waterfront & Islands" },
  { id: "villas", label: "Villa Communities" },
  { id: "city", label: "City Living" },
] as const;

export type RegionId = (typeof regions)[number]["id"];

export interface Price {
  amount: number;
  currency: "AED";
  note?: string;
}

export interface Listing {
  /** Asset key for the photographs (src/assets/properties/{ref}). */
  ref: PropertyRef;
  /** URL slug: /properties/{slug}/ */
  slug: string;
  /** Public reference shown on the page. */
  code: string;
  name: string;
  place: string;
  country: string;
  region: RegionId;
  type: string;
  headline: string;
  status: "For sale";
  badge?: "Exclusive" | "New";
  price: Price;
  surfaceM2: number;
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  plot?: string;
  built?: number;
  description: string[];
  agency: {
    name: string;
    presenter: string;
    role?: string;
    address: string[];
    phone: { display: string; href: string };
  };
  cover: ImageAsset;
  gallery: ImageAsset[];
}

const gallery = (ref: PropertyRef, indexes: number[]) => indexes.map((i) => shot(ref, i));

/** Placeholder advisor shown on every residence until real profiles exist. */
const ADVISOR = {
  name: `${BRAND} Dubai`,
  presenter: "Private Client Advisor",
  address: brand.globalOffice.address,
  phone: PHONE,
};

const UAE = "United Arab Emirates";

export const listings: Listing[] = [
  {
    ref: "APM-87100407",
    slug: "palm-jumeirah-signature-villa",
    code: "DXB-1001",
    name: "A signature villa on the Palm",
    place: "Palm Jumeirah",
    country: UAE,
    region: "waterfront",
    type: "Villa",
    headline: "Palm Jumeirah — Signature villa with private pool and landscaped gardens",
    status: "For sale",
    badge: "Exclusive",
    price: { amount: 68_000_000, currency: "AED" },
    surfaceM2: 1_250,
    bedrooms: 7,
    rooms: 12,
    plot: "16,000 sq ft",
    description: [
      "A contemporary signature villa set on one of the Palm’s most private fronds, framed by mature palms and a long reflecting pool.",
      "Double-height reception rooms open onto shaded terraces, with seven en-suite bedrooms, a principal suite with dressing room and study, and a dedicated guest wing.",
      "A glazed pool house, wine room and garage for six cars complete a residence designed for entertaining on a grand scale.",
    ],
    agency: ADVISOR,
    cover: shot("APM-87100407", 0),
    gallery: gallery("APM-87100407", [5, 0, 1, 4, 6, 3, 8, 9]),
  },
  {
    ref: "APM-86116202",
    slug: "jumeirah-islands-waterfront-estate",
    code: "DXB-1002",
    name: "A waterfront estate on the lakes",
    place: "Jumeirah Islands",
    country: UAE,
    region: "waterfront",
    type: "Estate",
    headline: "Jumeirah Islands — Waterfront estate with main residence and guest house",
    status: "For sale",
    price: { amount: 32_000_000, currency: "AED" },
    surfaceM2: 1_154,
    bedrooms: 8,
    bathrooms: 8,
    description: [
      "A private waterfront estate with a main residence and a separate guest house, arranged across terraced gardens that step down to the water.",
      "The main house is planned around a sociable kitchen and dining room with floor-to-ceiling glazing, opening onto a pergola terrace and an 18-metre pool.",
      "Every level is designed for sunrise and sunset views, with generous outdoor living throughout.",
    ],
    agency: ADVISOR,
    cover: shot("APM-86116202", 0),
    gallery: gallery("APM-86116202", [0, 1, 2, 3, 4, 6, 7, 8]),
  },
  {
    ref: "APM-87353841",
    slug: "emirates-hills-mansion",
    code: "DXB-1003",
    name: "A classic mansion in Emirates Hills",
    place: "Emirates Hills",
    country: UAE,
    region: "villas",
    type: "Mansion",
    headline: "Emirates Hills — Classic mansion with private garden and panelled interiors",
    status: "For sale",
    badge: "New",
    price: { amount: 85_000_000, currency: "AED" },
    surfaceM2: 1_400,
    bedrooms: 6,
    bathrooms: 7,
    rooms: 14,
    description: [
      "A classically detailed mansion in Dubai’s most established villa community, set behind a mature, densely planted private garden.",
      "Panelled reception rooms with parquet floors and high ceilings lead to a formal salon, a family kitchen and a garden terrace for alfresco dining.",
      "A principal suite with dressing room, five further bedrooms, staff accommodation and secure parking complete this rare address.",
    ],
    agency: ADVISOR,
    cover: shot("APM-87353841", 0),
    gallery: gallery("APM-87353841", [0, 1, 2, 3, 4, 5, 6, 7]),
  },
  {
    ref: "APM-87067773",
    slug: "al-barari-private-estate",
    code: "DXB-1004",
    name: "A private estate among the gardens",
    place: "Al Barari",
    country: UAE,
    region: "villas",
    type: "Estate",
    headline: "Al Barari — Private estate with lake views and extensive grounds",
    status: "For sale",
    price: { amount: 46_000_000, currency: "AED" },
    surfaceM2: 1_200,
    bedrooms: 9,
    bathrooms: 10,
    rooms: 20,
    plot: "2.5 acres",
    description: [
      "Set within Dubai’s greenest community, this private estate looks out over water, lawns and mature woodland.",
      "A sequence of formal reception rooms, a library and a family wing are arranged around light-filled bay windows and garden views.",
      "Ornamental gardens, a pool and a separate guest house offer complete privacy minutes from the city.",
    ],
    agency: ADVISOR,
    cover: shot("APM-87067773", 0),
    gallery: gallery("APM-87067773", [0, 3, 1, 2, 4, 5, 6, 9]),
  },
  {
    ref: "APM-87043121",
    slug: "jumeirah-golf-estates-villa",
    code: "DXB-1005",
    name: "A villa on the fairways",
    place: "Jumeirah Golf Estates",
    country: UAE,
    region: "villas",
    type: "Villa",
    headline: "Jumeirah Golf Estates — Stone villa with 20-metre pool and tennis court",
    status: "For sale",
    price: { amount: 24_500_000, currency: "AED" },
    surfaceM2: 700,
    bedrooms: 6,
    rooms: 10,
    plot: "2 acres",
    description: [
      "A stone-built villa on generous landscaped grounds, with open views across the fairways.",
      "Generous living spaces open onto shaded terraces, while six suites are arranged across two floors for privacy.",
      "Outside, a 20-metre pool, a tennis court and planted gardens create a resort-like setting for family life.",
    ],
    agency: ADVISOR,
    cover: shot("APM-87043121", 2),
    gallery: gallery("APM-87043121", [1, 2, 3, 4, 5, 6, 8, 9]),
  },
  {
    ref: "APM-82420906",
    slug: "dubai-hills-estate-villa",
    code: "DXB-1006",
    name: "A garden villa in Dubai Hills",
    place: "Dubai Hills Estate",
    country: UAE,
    region: "villas",
    type: "Villa",
    headline: "Dubai Hills Estate — Garden villa with pool and summer kitchen",
    status: "For sale",
    price: { amount: 18_900_000, currency: "AED" },
    surfaceM2: 560,
    bedrooms: 5,
    rooms: 11,
    plot: "19,800 sq ft",
    description: [
      "A relaxed family villa set in mature gardens, moments from the park, the golf course and the community’s schools.",
      "A bright living room with fireplace and an open-plan kitchen lead directly onto the terraces and pool.",
      "Five bedrooms, a study, a summer kitchen and a garage for several cars complete the home.",
    ],
    agency: ADVISOR,
    cover: shot("APM-82420906", 2),
    gallery: gallery("APM-82420906", [2, 1, 0, 4, 5, 6, 8, 9]),
  },
  {
    ref: "APM-87357422",
    slug: "city-walk-townhouse",
    code: "DXB-1007",
    name: "A townhouse at City Walk",
    place: "City Walk",
    country: UAE,
    region: "city",
    type: "Townhouse",
    headline: "City Walk — Family townhouse with private garden",
    status: "For sale",
    badge: "New",
    price: { amount: 12_750_000, currency: "AED" },
    surfaceM2: 346,
    bedrooms: 4,
    bathrooms: 5,
    description: [
      "A light-filled townhouse in one of Dubai’s most walkable neighbourhoods, close to boutiques, cafés and Downtown.",
      "A glazed garden room, a kitchen with skylights and a long reception room give the ground floor an easy, open flow.",
      "Four bedrooms and a private landscaped garden make this a rare family home in the heart of the city.",
    ],
    agency: ADVISOR,
    cover: shot("APM-87357422", 0),
    gallery: gallery("APM-87357422", [0, 3, 1, 2, 4, 5, 6, 9]),
  },
];

/** "Download Brochure" opens an internal coming-soon page for each residence. */
export const brochurePath = (l: Listing) => soon(`/brochure/${l.slug}/`, `${l.place} brochure`);
listings.forEach(brochurePath);

export const listingDisclaimer =
  "Prices are shown in UAE dirhams (AED) and are indicative. Sample residence: details, imagery and pricing are template content.";

// ---------------------------------------------------------------------------
// Home page — FIND's section order
// ---------------------------------------------------------------------------

/** Rich line: plain words, then the muted ("em") continuation. */
export interface TwoTone {
  lead: string;
  tail?: string;
}

export const home = {
  hero: {
    title: ["Find", "Yours", "in", "Dubai"],
    text: { lead: "Villas, penthouses and waterfront estates.", tail: "Prime UAE luxury, curated for you." },
    cta: "Find Properties",
    lockupLabel: `${BRAND} Dubai Real Estate`,
    /** AI-generated illustrative scene, not a listed property. */
    art: {
      sky: "hero/sky.jpg",
      house: "hero/house.png",
      cloud: "hero/cloud.webp",
      fog: "hero/fog.webp",
    },
  },
  why: {
    label: `Why ${BRAND}`,
    statement: {
      lead: "Your next home is more than an address — it’s a way of life.",
      tail: "We help you find it with discretion, expertise, and one advisor by your side.",
    } satisfies TwoTone,
    image: shot("APM-87067773", 3),
  },
  arrows: {
    title: { lead: "This isn’t just", tail: "about property." } satisfies TwoTone,
    images: [shot("APM-87353841", 1), shot("APM-87043121", 2), shot("APM-86116202", 4), shot("APM-87067773", 6)],
    text: {
      lead: "It’s about light. Space. The sea on your doorstep. You’re not just looking for a property.",
      tail: "You’re looking for a way of life. That’s what we help you find.",
    } satisfies TwoTone,
  },
  steps: {
    title: { lead: "Real Estate,", tail: "Personal." } satisfies TwoTone,
    cta: { label: "Start Your Search", href: links.selection },
    label: "Steps:",
    items: [
      { lead: "Meet Your Advisor.", tail: "We listen first, to understand exactly what you have in mind." },
      { lead: "Get Clear Advice.", tail: "Honest guidance on communities, pricing and high-yield opportunities." },
      { lead: "Move Forward Together.", tail: "One advisor stays with you from first viewing to handover." },
    ] satisfies TwoTone[],
  },
  network: {
    label: `Join ${BRAND}`,
    title: { lead: "Join a Team.", tail: "Built on Trust." } satisfies TwoTone,
    smallImage: shot("APM-87357422", 1),
    image: shot("APM-87100407", 0),
    text: {
      lead: "Our advisors are selected for their market knowledge as well as their professional and personal qualities.",
      tail: "Join a team dedicated to prime UAE luxury — from waterfront estates to off-plan investments — built on trust, discretion and excellence.",
    } satisfies TwoTone,
    cta: { label: "Join the Team", href: links.join },
  },
  values: {
    title: { lead: "Our Values,", tail: "In Our Words." } satisfies TwoTone,
    image: shot("APM-87353841", 2),
    items: brand.values,
  },
  services: {
    caption: "Services",
    title: { lead: `How ${BRAND}`, tail: "Can Help You" } satisfies TwoTone,
    items: [
      { word: "Buy", deal: "Buy", text: "Villas, penthouses and waterfront estates across Dubai’s prime communities, with advisors who know every building and every street.", image: shot("APM-87043121", 1) },
      { word: "Sell", deal: "Sell", text: "A clear, well-argued valuation, a marketing plan built around your property — private viewings, film, editorial — and one advisor to completion.", image: shot("APM-87353841", 0) },
      { word: "Rent", deal: "Rent", text: "Long-term rentals and holiday homes across Dubai, from Downtown apartments to villas on the Palm.", image: shot("APM-86116202", 1) },
    ],
    brief: { lead: "Our advisors guide you through every stage of real estate", tail: "with expert knowledge and dedicated support." } satisfies TwoTone,
    cta: `Get Started with ${BRAND}`,
  },
  features: {
    title: { lead: "Support Beyond", tail: "Buying and Selling" } satisfies TwoTone,
    text: { lead: "Real estate is a human experience — and so is everything around it.", tail: "Our experts offer continued support beyond the sale, helping you make the most of your property." } satisfies TwoTone,
    cta: { label: "Discover Our Services", href: brand.servicesPage },
    items: [
      { title: "Investment Advisory", text: "High-yield opportunities across ready and off-plan property in Dubai.", href: soon("/services/investment-advisory/", "Investment advisory"), image: shot("APM-87100407", 4) },
      { title: "Property Management", text: "Let us manage your property while you enjoy the returns.", href: soon("/services/property-management/", "Property management"), image: shot("APM-87357422", 7) },
      { title: "Interior Design", text: "Bespoke interiors that make a residence truly yours.", href: soon("/services/interior-design/", "Interior design"), image: shot("APM-87353841", 2) },
    ],
  },
  news: {
    title: { lead: "Insights", tail: "& Perspectives" } satisfies TwoTone,
    text: "Market perspectives, community guides and advice for buying, selling and investing in Dubai.",
    cta: { label: "View All Insights", href: links.news },
    /** Sample editorial — replace with the agency's own articles. */
    items: [
      {
        date: "2026-09-12",
        title: "A Guide to Buying Waterfront Property in Dubai",
        text: "From the Palm to Bluewaters and Jumeirah Bay, what to consider when choosing a home on the water.",
        href: soon("/insights/waterfront-buying-guide/", "A guide to buying waterfront property in Dubai"),
        image: shot("APM-87100407", 6),
      },
      {
        date: "2026-07-28",
        title: "Ready or Off-Plan? Choosing the Right Investment",
        text: "How payment plans, handover timelines and rental yields compare across ready and off-plan property.",
        href: soon("/insights/ready-or-off-plan/", "Ready or off-plan? Choosing the right investment"),
        image: shot("APM-86116202", 7),
      },
      {
        date: "2026-06-03",
        title: "Living in Dubai’s Prime Villa Communities",
        text: "Emirates Hills, Dubai Hills Estate and Al Barari: space, privacy and green views close to the city.",
        href: soon("/insights/prime-villa-communities/", "Living in Dubai’s prime villa communities"),
        image: shot("APM-87043121", 7),
      },
    ] satisfies { date: string; title: string; text: string; href: string; image: ImageAsset }[],
  },
  outro: {
    title: { lead: "Find Yours.", tail: "We’ll Help You Get There." } satisfies TwoTone,
    cta: "Let’s Get Started",
    image: shot("APM-86116202", 2),
  },
  destinations: {
    title: "Featured communities across Dubai",
    more: { label: "Explore all communities →", href: links.destinations },
    groups: [
      { name: "Waterfront", links: ["Palm Jumeirah", "Dubai Marina", "Bluewaters Island", "Jumeirah Bay"] },
      { name: "City", links: ["Downtown Dubai", "Business Bay", "DIFC", "City Walk"] },
      { name: "Villa Communities", links: ["Emirates Hills", "Dubai Hills Estate", "Al Barari", "Jumeirah Golf Estates"] },
    ].map((g) => ({
      name: g.name,
      links: g.links.map((label) => ({ label, href: soon(`/communities/${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/`, label) })),
    })),
  },
};

/** Lead modal: FIND's two-step "Find properties" form. */
export const leadModal = {
  title: "Find properties",
  text: "Buy, sell or rent — our advisors are here to help.",
  deals: ["Buy", "Sell", "Rent"],
  next: "Next",
  submit: "Send Request",
  stepTwo: "Tell us a little more",
};

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

export const forms = {
  valuation: {
    label: `Sell with ${BRAND}`,
    title: "Request a",
    titleTail: "valuation.",
    lead: "Tell us about your property. An advisor will arrange a first meeting and prepare a written valuation.",
    propertyTypes: ["Apartment", "Penthouse", "Villa", "Townhouse", "Waterfront estate", "Plot", "Other"],
  },
  enquiry: {
    title: "Enquire about",
    titleTail: "this residence.",
  },
  /** Shown when PUBLIC_ENQUIRY_ENDPOINT is not configured. Never claims a send. */
  notConnected:
    "Online submission is not connected yet, so your details have not been sent. Please call us directly.",
  sent: `Thank you. Your request has been received by ${BRAND}.`,
  failed: "Your request could not be sent. Please try again, or call us directly.",
  privacy: "Your details are used only to answer this request.",
  phoneHint: "With country code, e.g. +971 50 123 4567",
};

// ---------------------------------------------------------------------------
// Footer & SEO
// ---------------------------------------------------------------------------

export const footer = {
  newsletter: "Subscribe to our Newsletter!",
  nav: [
    { label: "Search", href: links.search },
    { label: "Advisors", href: links.findAgency },
    { label: "Communities", href: links.destinations },
    { label: "About Us", href: links.history },
    { label: "Valuation", href: links.valuation },
  ],
  social: brand.social,
  legal: [
    { label: "Our Values", href: links.values },
    { label: "Our Story", href: links.history },
    { label: "Fees & FAQ", href: links.fees },
    { label: "In the Press", href: links.press },
    { label: "Careers", href: links.jobs },
  ],
  note: "Template preview: residences, imagery and copy are sample content.",
  copyright: `Copyright © ${BRAND} Real Estate`,
};

export const seo = {
  siteName: BRAND,
  title: `${BRAND} — Luxury Real Estate in Dubai`,
  description:
    "Villas, penthouses and waterfront estates across Dubai. Prime UAE luxury real estate and high-yield investments, with one advisor by your side.",
  ogImage: shot("APM-87100407", 5),
  locale: "en_AE",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const listingSlug = (ref: string) => listings.find((l) => l.ref === ref)?.slug ?? ref.toLowerCase();

export function findListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function formatPrice({ amount, currency }: Price): string {
  return `${currency} ${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(amount)}`;
}

/** Dubai convention: square feet. */
export function formatSurface(m2: number): string {
  return `${new Intl.NumberFormat("en-GB").format(Math.round((m2 * 10.7639) / 10) * 10)} sq ft`;
}

export function regionLabel(id: RegionId): string {
  return regions.find((r) => r.id === id)?.label ?? id;
}
