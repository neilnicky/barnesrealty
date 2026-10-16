/**
 * All editorial content for the BARNES site. Sources are recorded in
 * docs/barnes-research.md; listing facts are verbatim from the official
 * listing pages as captured on `listingsCapturedOn`.
 *
 * Rule: nothing here may be invented. When a fact is unknown, leave the field
 * out — components render what exists and skip what doesn't.
 */
import { shot, type ImageAsset, type PropertyRef } from "./asset-manifest";

export type { ImageAsset, PropertyRef };
export { shot };

const OFFICIAL = "https://www.barnes-international.com/en";

/**
 * Pages that are not built yet. Every link that used to leave the site points
 * at one of these internal paths instead; src/pages/[...soon].astro renders a
 * minimal "Coming soon" page for each. `source` keeps the official page it will mirror.
 */
export interface SoonPage {
  title: string;
  source?: string;
}

export const comingSoon: Record<string, SoonPage> = {};

const soon = (path: string, title: string, source?: string) => {
  comingSoon[path] = { title, source };
  return path;
};

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export const brand = {
  name: "BARNES",
  legalName: "BARNES International Realty",
  wordmark: { src: "/brand/barnes-wordmark.svg", ratio: 3189 / 637, alt: "BARNES" },
  positioning: "The leading player in international luxury real estate",
  bio: "Exceptional properties & lifestyle worldwide.",
  signature: "Find yours.",
  founded: { year: 1995, line: "Founded in 1995 by Heidi Barnes, with Thibault de Saint Vincent as president." },
  officialSite: soon("/services/", "Our services", `${OFFICIAL}/`),
  globalOffice: {
    name: "BARNES Global Office",
    address: ["81 avenue Kléber", "75016 Paris, France"],
    phone: { display: "+33 1 55 61 92 90", href: "tel:+33155619290" },
  },
  social: [
    { label: "Instagram", handle: "@barnesrealty", href: "https://www.instagram.com/barnesrealty/" },
    { label: "Facebook", href: soon("/social/facebook/", "BARNES on Facebook", "https://www.facebook.com/barnesinternationalrealty") },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/barnes_realty" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UC-ow3njRKM7mQ_aQo9ocTHQ" },
    { label: "Pinterest", href: "https://www.pinterest.fr/barnesluxury/" },
  ],
  values: [
    { name: "Trust", line: "A successful transaction rooted in transparency and discretion relies on trust within a lasting relationship." },
    { name: "Excellence", line: "Cultivating the art of being the best and providing the best for our clients." },
    { name: "Elegance", line: "“Without the elegance of the heart, there is no elegance.”" },
    { name: "Vision", line: "Sharing a vision with our clients to support them sustainably." },
    { name: "Global support", line: "Both local and international, covering multiple cities, countries, and sectors." },
  ],
} as const;

// ---------------------------------------------------------------------------
// Links & calls to action — every destination is real
// ---------------------------------------------------------------------------

export const links = {
  selection: "/destinations/#featured",
  destinations: "/destinations/",
  valuation: "/sell/",
  officialSearch: soon("/search/", "Property search", `${OFFICIAL}/for-sale.html`),
  officialRent: soon("/rent/", "Rentals", `${OFFICIAL}/for-rent.html`),
  officialSeasonal: soon("/rent/seasonal/", "Seasonal rentals", `${OFFICIAL}/seasonal-rental.html`),
  officialValuation: soon("/sell/online-valuation/", "Online valuation", `${OFFICIAL}/sell/get-my-property-valued.html`),
  commitments: soon("/sell/our-commitments/", "Our commitments", `${OFFICIAL}/sell/our-commitments.html`),
  findAgency: soon("/agencies/", "Find an agency", `${OFFICIAL}/about-barnes/find-an-agency.html`),
  contact: soon("/contact/", "Contact", `${OFFICIAL}/contact.html`),
  news: soon("/news/", "News", `${OFFICIAL}/about-barnes/news.html`),
  press: soon("/about/press/", "In the press", `${OFFICIAL}/about-barnes/in-the-press.html`),
  history: soon("/about/history/", "Our history", `${OFFICIAL}/about-barnes/our-history.html`),
  values: soon("/about/values/", "Our values", `${OFFICIAL}/about-barnes/our-values.html`),
  join: soon("/careers/join/", "Join the BARNES network", `${OFFICIAL}/about-barnes/join-the-barnes-network.html`),
  jobs: soon("/careers/", "Job offers", `${OFFICIAL}/about-barnes/job-offers.html`),
  fees: soon("/about/fees/", "Fees & FAQ", `${OFFICIAL}/about-barnes/frequently-asked-questions.html`),
} as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Header, in FIND's order: three direct links, then four dropdowns. */
export const navigation: (NavItem | NavGroup)[] = [
  { label: "Search", href: links.officialSearch },
  { label: "Destinations", href: links.destinations },
  { label: "Agencies", href: links.findAgency },
  {
    label: "Buy",
    items: [
      { label: "Properties for sale", href: links.officialSearch },
      { label: "New developments", href: soon("/buy/new-developments/", "New developments", `${OFFICIAL}/new-development.html`) },
      { label: "Properties & castles", href: soon("/buy/properties-and-castles/", "Properties & castles", `${OFFICIAL}/for-sale/type-castle.html`) },
      { label: "Wine estates", href: soon("/buy/wine-estates/", "Wine estates", `${OFFICIAL}/for-sale/type-vineyard-property.html`) },
    ],
  },
  {
    label: "Sell",
    items: [
      { label: "Request a valuation", href: links.valuation },
      { label: "Our commitments", href: links.commitments },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Interior design", href: soon("/services/interior-design/", "Interior design", `${OFFICIAL}/services/interior-design.html`) },
      { label: "Art & design", href: soon("/services/art-design/", "Art & design", `${OFFICIAL}/services/art-design.html`) },
      { label: "Rental management", href: soon("/services/rental-management/", "Rental management", `${OFFICIAL}/services/rental-management.html`) },
      { label: "Fine wines", href: soon("/services/fine-wines/", "Fine wines", `${OFFICIAL}/services/fine-wines.html`) },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Our history", href: links.history },
      { label: "Our values", href: links.values },
      { label: "News", href: links.news },
      { label: "In the press", href: links.press },
    ],
  },
];

export const headerCta = { label: "Contact", href: links.contact };

// ---------------------------------------------------------------------------
// Regions & listings
// ---------------------------------------------------------------------------

export const regions = [
  { id: "paris", label: "Paris & Île-de-France" },
  { id: "riviera", label: "French Riviera & Provence" },
  { id: "atlantic", label: "Atlantic Coast" },
  { id: "international", label: "International" },
] as const;

export type RegionId = (typeof regions)[number]["id"];

export interface Price {
  amount: number;
  currency: "EUR" | "GBP";
  note?: string;
}

export interface Listing {
  ref: PropertyRef;
  /** Short editorial name used on cards. */
  name: string;
  place: string;
  country: string;
  region: RegionId;
  type: string;
  /** Headline as published by the agency. */
  headline: string;
  status: "For sale";
  badge?: "Exclusivity" | "New";
  price: Price;
  surfaceM2: number;
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  plot?: string;
  built?: number;
  /** Sentences from the official description: excerpted for length, never reworded. */
  description: string[];
  agency: {
    name: string;
    presenter: string;
    role?: string;
    address: string[];
    phone: { display: string; href: string };
  };
  officialUrl: string;
  cover: ImageAsset;
  gallery: ImageAsset[];
}

const gallery = (ref: PropertyRef, indexes: number[]) => indexes.map((i) => shot(ref, i));

export const listingsCapturedOn = "2026-10-15";

export const listings: Listing[] = [
  {
    ref: "APM-87353841",
    name: "A piano nobile on the Left Bank",
    place: "Paris 6ème",
    country: "France",
    region: "paris",
    type: "Apartment",
    headline: "Paris VI — Exceptional apartment with terrace and private garden",
    status: "For sale",
    badge: "New",
    price: { amount: 20_700_000, currency: "EUR" },
    surfaceM2: 263,
    bedrooms: 3,
    bathrooms: 4,
    rooms: 6,
    built: 1670,
    description: [
      "Set within a 17th-century private mansion just steps from the Seine, this dual-aspect apartment—offering approximately 280 m² of living space (Carrez law)—occupies the piano nobile and opens onto a 40 m² terrace that extends into a private 330 m² garden.",
      "Restored with respect for its history, the property retains numerous original features, including Versailles parquet flooring, fireplaces, moldings, tiling, and wood panelling. The reception areas boast impressive ceiling heights of 4.50 meters.",
      "The private quarters comprise a master suite featuring a bathroom and a dressing room with 50 linear meters of storage, along with two additional bedrooms and a study. Two lock-up garages, four staff rooms, and two large cellars complete this rare property, which represents a perfect blend of Parisian heritage and contemporary comfort.",
      "A rare asset on Paris Left Bank, hidden from view.",
    ],
    agency: {
      name: "BARNES Private Office",
      presenter: "Claire Drean",
      address: ["14 avenue George V", "75008 Paris"],
      phone: { display: "+33 1 85 34 70 66", href: "tel:+33185347066" },
    },
    officialUrl: `${OFFICIAL}/for-sale/france/paris-6eme/ref-APM-87353841.html`,
    cover: shot("APM-87353841", 0),
    gallery: gallery("APM-87353841", [0, 1, 2, 3, 4, 5, 6, 7]),
  },
  {
    ref: "APM-87067773",
    name: "A château between forest and Seine",
    place: "Fontainebleau",
    country: "France",
    region: "paris",
    type: "Château",
    headline: "Fontainebleau — Château and estate buildings — 30 hectares — exceptional views",
    status: "For sale",
    price: { amount: 8_900_000, currency: "EUR" },
    surfaceM2: 1200,
    bedrooms: 17,
    bathrooms: 15,
    rooms: 25,
    plot: "30 ha",
    built: 1650,
    description: [
      "Just outside Fontainebleau, only one hour from Paris, this historic estate ranks among the region’s rarest properties.",
      "Set between the state forest and the banks of the Seine, it enjoys an exceptional natural setting where privacy, elegance and the French art of living come together. Sweeping views of the river, gardens and woodland create a landscape of remarkable beauty, free from any visual intrusion.",
      "Offering approximately 1,200 m² of living space and with origins dating back to the 17th century, the château embodies centuries of history with distinction. Recently restored to exacting standards with meticulous attention to detail, it retains all the authenticity and refinement that define France’s great country residences.",
      "Surrounding the main residence, the historic outbuildings, former stables and other estate buildings provide nearly 2,000 m² of additional floor space. Approximately 20 hectares of private woodland, directly connected to the Forest of Fontainebleau, form a natural extension of the estate.",
    ],
    agency: {
      name: "BARNES Propriétés & Châteaux",
      presenter: "Marie de Saint Périer",
      role: "Independent contractor agent",
      address: ["14 avenue George V", "75008 Paris"],
      phone: { display: "+33 1 85 34 70 64", href: "tel:+33185347064" },
    },
    officialUrl: `${OFFICIAL}/for-sale/france/fontainebleau/ref-APM-87067773.html`,
    cover: shot("APM-87067773", 0),
    gallery: gallery("APM-87067773", [0, 3, 1, 2, 4, 5, 6, 9]),
  },
  {
    ref: "APM-87100407",
    name: "A new villa near the beaches",
    place: "Saint-Tropez",
    country: "France",
    region: "riviera",
    type: "Villa",
    headline: "Saint-Tropez — Luxurious new villa — 7 bedrooms",
    status: "For sale",
    badge: "Exclusivity",
    price: { amount: 17_000_000, currency: "EUR" },
    surfaceM2: 500,
    bedrooms: 7,
    rooms: 12,
    plot: "3,727 m²",
    description: [
      "Close to the beaches and the village of Saint-Tropez, this magnificent and luxurious new villa of 500 sqm is located in a closed and secured domain. Set on a 3,727 sqm plot, this modern house is composed as follows:",
      "On the ground floor, entrance with cloakroom, double reception room opening onto beautiful terraces, fully equipped kitchen with pantry, dining room, 4 bedrooms en suite. On the first floor, a beautiful master bedroom with dressing room, study and shower room. Another bedroom with shower room.",
      "In the basement, a large bedroom with shower room, a multi-purpose room, a laundry room, a wine cellar, a garage for 6 cars.",
      "A pool-house of 100 sqm with sauna and shower room, a swimming pool mirror, magnificent landscaped garden complete this beautiful house with high quality services.",
    ],
    agency: {
      name: "BARNES Saint-Tropez",
      presenter: "Vincent Martel",
      address: ["7 avenue du 8 mai 1945", "83990 Saint-Tropez"],
      phone: { display: "+33 4 94 43 32 47", href: "tel:+33494433247" },
    },
    officialUrl: `${OFFICIAL}/for-sale/france/saint-tropez/ref-APM-87100407.html`,
    cover: shot("APM-87100407", 0),
    gallery: gallery("APM-87100407", [5, 0, 1, 4, 6, 3, 8, 9]),
  },
  {
    ref: "APM-87043121",
    name: "A mas facing the Alpilles",
    place: "Eygalières",
    country: "France",
    region: "riviera",
    type: "Country house",
    headline: "Eygalières — Exceptional country house — tennis court — panoramic view of the Alpilles",
    status: "For sale",
    price: { amount: 8_800_000, currency: "EUR" },
    surfaceM2: 355,
    bedrooms: 7,
    rooms: 10,
    plot: "9.6 acres",
    built: 1800,
    description: [
      "Set in an unspoiled environment just 0.75 miles from the center of the village of Eygalières, this remarkable Provençal mas enjoys panoramic views over the Alpilles and offers approximately 3,820 sq ft of living space in the heart of 9.6 acres of enclosed grounds.",
      "Fully renovated and expanded to an exceptional standard, this property elegantly combines the authenticity of traditional Provençal farmhouses with the refinement of high-end contemporary amenities. Stone, wood, and modern finishes blend harmoniously with the original architecture.",
      "Outside, a 20-metre swimming pool and a tennis court are set within beautifully landscaped grounds planted with Mediterranean species, olive trees, and 300 almond trees.",
      "An exceptional property distinguished by its location, the quality of its renovation, and its remarkable setting, at the heart of one of Provence’s most iconic landscapes.",
    ],
    agency: {
      name: "BARNES Alpilles – Luberon",
      presenter: "Séverine Fabre",
      address: ["15 rue des Écoles", "13810 Eygalières"],
      phone: { display: "+33 4 90 24 47 35", href: "tel:+33490244735" },
    },
    officialUrl: `${OFFICIAL}/for-sale/france/eygalieres/ref-APM-87043121.html`,
    cover: shot("APM-87043121", 2),
    gallery: gallery("APM-87043121", [1, 2, 3, 4, 5, 6, 8, 9]),
  },
  {
    ref: "APM-82420906",
    name: "A villa in the Golden Triangle",
    place: "Cap-Ferret",
    country: "France",
    region: "atlantic",
    type: "Villa",
    headline: "Exceptional villa with swimming pool and large garden in the Golden Triangle, Cap Ferret",
    status: "For sale",
    price: { amount: 5_980_000, currency: "EUR", note: "Includes 4% fees payable by the buyer" },
    surfaceM2: 305,
    bedrooms: 5,
    rooms: 11,
    plot: "1,800 m² garden",
    description: [
      "The BARNES Cap Ferret agency presents an exceptional property ideally located in the heart of Cap Ferret, in the highly sought-after Golden Triangle. Set in a quiet and unspoilt environment, this villa of nearly 305 m² offers a unique living environment, just a few minutes from the Bassin d'Arcachon, the ocean beaches and shops.",
      "The bright and spacious living area comprises a lounge with fireplace and an open-plan kitchen. It opens directly onto the terraces and swimming pool. The sleeping area consists of five bedrooms, several of which overlook the pool, six shower rooms and a study that can also be used as a bedroom.",
      "The landscaped garden of nearly 1,840 m² features a 13 x 5 metre swimming pool in an ideal location, offering sun from sunrise to sunset, as well as a summer kitchen and a regulation-size pétanque court. A 60 m² garage, which can accommodate several vehicles, completes the property.",
    ],
    agency: {
      name: "BARNES Bassin d'Arcachon",
      presenter: "Maxence Nourric",
      address: ["44 boulevard Marcel Gounouilhou", "33120 Arcachon"],
      phone: { display: "+33 5 56 66 73 93", href: "tel:+33556667393" },
    },
    officialUrl: `${OFFICIAL}/for-sale/france/cap-ferret/ref-APM-82420906.html`,
    cover: shot("APM-82420906", 2),
    gallery: gallery("APM-82420906", [2, 1, 0, 4, 5, 6, 8, 9]),
  },
  {
    ref: "APM-86116202",
    name: "Ses Calas, above Santa Eulalia",
    place: "Ibiza",
    country: "Spain",
    region: "international",
    type: "Estate",
    headline: "Ses Calas, Santa Eulalia",
    status: "For sale",
    price: { amount: 12_750_000, currency: "EUR" },
    surfaceM2: 1154,
    bedrooms: 8,
    bathrooms: 8,
    description: [
      "Nestled in the hills above Santa Eulalia, Ses Calas is a sprawling estate offering stunning sea and hill views from four panoramic terraces.",
      "The estate includes a main house, Diego, and a hacienda-style guest house, Frida, both designed by Ibizaliving with a timeless, minimalist aesthetic. The property spans multiple levels, featuring an 18-meter pool with a multi-purpose pool house and landscaped garden. Its southwest-facing position offers ideal sunrise and sunset views.",
      "The inverted main house maximizes the views, with a sociable kitchen and dining area on the upper floor, featuring granite countertops, chestnut beams and floor-to-ceiling windows that open to a pergola and terrace.",
      "The guest house blends seamlessly with the landscape, with rock formations in the living room and an open-plan kitchen and dining area leading to a terrace with a circular infinity pool.",
    ],
    agency: {
      name: "BARNES Ibiza in partnership with Domus Nova",
      presenter: "Sales Ibiza",
      address: ["TheHUB – Santa Eulària des Riu", "07814 Ibiza"],
      phone: { display: "+34 518 88 00 78", href: "tel:+34518880078" },
    },
    officialUrl: `${OFFICIAL}/for-sale/spain/isla-de-ibiza/ref-APM-86116202.html`,
    cover: shot("APM-86116202", 0),
    gallery: gallery("APM-86116202", [0, 1, 2, 3, 4, 6, 7, 8]),
  },
  {
    ref: "APM-87357422",
    name: "A family house on Hammersmith Grove",
    place: "London",
    country: "United Kingdom",
    region: "international",
    type: "House",
    headline: "Hammersmith Grove, Hammersmith",
    status: "For sale",
    badge: "New",
    price: { amount: 4_750_000, currency: "GBP", note: "Freehold · Council Tax band H" },
    surfaceM2: 346,
    bedrooms: 6,
    bathrooms: 3,
    description: [
      "There’s a distinctly neighbourly feel to this pocket of west London, balanced by excellent transport links and a cultural scene that rivals more central postcodes. Hammersmith Grove borders Brackenbury Village.",
      "The Thames is within easy reach, with the iconic River Café and a number of rowing clubs along its banks, while Ravenscourt Park offers tennis courts, football pitches and open green space for longer walks.",
      "Highly regarded schools, including Godolphin and Latymer, St Paul’s and Latymer Upper, are within easy reach, as is Heathrow Airport via the Piccadilly Line or A4.",
    ],
    agency: {
      name: "BARNES London in partnership with Domus Nova",
      presenter: "Sales London",
      address: ["113–115 Old Brompton Road", "South Kensington, London SW7 3LE"],
      phone: { display: "+44 20 7935 5797", href: "tel:+442079355797" },
    },
    officialUrl: `${OFFICIAL}/for-sale/united-kingdom/london/ref-APM-87357422.html`,
    cover: shot("APM-87357422", 0),
    gallery: gallery("APM-87357422", [0, 3, 1, 2, 4, 5, 6, 9]),
  },
];

/** "View the official listing" opens an internal coming-soon page for each listing. */
export const officialListingPath = (l: Listing) =>
  soon(`/listing/${l.ref.toLowerCase()}/`, `Official listing ${l.ref}`, l.officialUrl);
listings.forEach(officialListingPath);

export const listingDisclaimer =
  "Prices displayed in a currency other than that used for the final transaction may vary depending on the exchange rate at the time of purchase. Only the price in local currency is valid at the time of sale.";

// ---------------------------------------------------------------------------
// Home page — FIND's section order, BARNES content
// ---------------------------------------------------------------------------

/** Rich line: plain words, then the muted ("em") continuation. */
export interface TwoTone {
  lead: string;
  tail?: string;
}

export const home = {
  hero: {
    title: ["Find", "Yours,", "Worldwide"],
    text: { lead: "Exceptional properties. Lifestyle worldwide.", tail: "The French art of living, since 1995." },
    cta: "Find Properties",
    lockupLabel: "BARNES International Realty",
    /** AI-generated illustrative scene, not a BARNES listing (see docs). */
    art: {
      sky: "hero/sky.jpg",
      house: "hero/house.png",
      cloud: "hero/cloud.webp",
      fog: "hero/fog.webp",
    },
  },
  why: {
    label: "Why BARNES",
    statement: {
      lead: "Your next home is more than an address — it’s a way of life.",
      tail: "We help you find it with discretion, expertise, and one consultant by your side.",
    } satisfies TwoTone,
    image: shot("APM-87067773", 3),
  },
  arrows: {
    title: { lead: "This isn’t just", tail: "about property." } satisfies TwoTone,
    images: [shot("APM-87353841", 1), shot("APM-87043121", 2), shot("APM-86116202", 4), shot("APM-87067773", 6)],
    text: {
      lead: "It’s about heritage. Light. The art of living. You’re not just looking for a property.",
      tail: "You’re looking for a way of life. That’s what we help you find.",
    } satisfies TwoTone,
  },
  steps: {
    title: { lead: "Real Estate,", tail: "Personal." } satisfies TwoTone,
    cta: { label: "Start Your Search", href: links.officialSearch },
    label: "Steps:",
    items: [
      { lead: "Meet a Real Consultant.", tail: "We listen first, to understand exactly what you have in mind." },
      { lead: "Get a Clear Valuation.", tail: "A comprehensive, written, well-argued assessment of your property." },
      { lead: "Move Forward Together.", tail: "The consultant you meet on day one stays with you to the deed." },
    ] satisfies TwoTone[],
  },
  network: {
    label: "Join BARNES",
    title: { lead: "Join a Network.", tail: "Built on Trust." } satisfies TwoTone,
    smallImage: shot("APM-87357422", 1),
    image: shot("APM-87100407", 0),
    text: {
      lead: "BARNES consultants are selected for their operational skills as well as their professional and interpersonal backgrounds.",
      tail: "Join an integrated network of luxury real estate agencies in the world’s most sought-after destinations — a house built on trust, excellence and elegance.",
    } satisfies TwoTone,
    cta: { label: "Join the Network", href: links.join },
  },
  values: {
    title: { lead: "Our Values,", tail: "In Our Words." } satisfies TwoTone,
    image: shot("APM-87353841", 2),
    /** Verbatim from barnes-international.com/en/about-barnes/our-values.html */
    items: brand.values,
  },
  services: {
    caption: "Services",
    title: { lead: "How BARNES", tail: "Can Help You" } satisfies TwoTone,
    items: [
      { word: "Buy", deal: "Buy", text: "Find an exceptional property with consultants who know their market — apartments, villas, châteaux and estates in the world’s most sought-after destinations.", image: shot("APM-87043121", 1) },
      { word: "Sell", deal: "Sell", text: "A written, well-argued valuation, a marketing plan designed around your property — BARNES Magazine, private viewings, videos — and one consultant to completion.", image: shot("APM-87353841", 0) },
      { word: "Rent", deal: "Rent", text: "Long-term and seasonal rentals across the BARNES network, from Paris apartments to villas by the sea.", image: shot("APM-86116202", 1) },
    ],
    brief: { lead: "Our consultants guide you through every stage of real estate", tail: "with expert knowledge and dedicated support." } satisfies TwoTone,
    cta: "Get Started with BARNES",
  },
  features: {
    title: { lead: "Support Beyond", tail: "Buying and Selling" } satisfies TwoTone,
    text: { lead: "Real estate is a human experience — and so is everything around it.", tail: "Our experts offer continued support beyond the sale, helping you make the most of your property." } satisfies TwoTone,
    cta: { label: "Discover Our Services", href: brand.officialSite },
    items: [
      { title: "Interior Design", text: "Bespoke interior design to make a property truly yours.", href: soon("/services/interior-design/", "Interior design", `${OFFICIAL}/services/interior-design.html`), image: shot("APM-87353841", 2) },
      { title: "Rental Management", text: "Let us manage your property while you enjoy the rewards.", href: soon("/services/rental-management/", "Rental management", `${OFFICIAL}/services/rental-management.html`), image: shot("APM-87357422", 7) },
      { title: "Properties and Castles", text: "Châteaux, manors and historic estates, with a dedicated team.", href: soon("/buy/properties-and-castles/", "Properties & castles", `${OFFICIAL}/for-sale/type-castle.html`), image: shot("APM-87067773", 0) },
    ],
  },
  news: {
    title: { lead: "News", tail: "& Perspectives" } satisfies TwoTone,
    text: "Our latest news, BARNES Magazine issues and events — from Paris and around the world.",
    cta: { label: "Visit Our News", href: links.news },
    /** Titles, dates and opening lines from the official news pages. */
    items: [
      {
        date: "2026-05-15",
        title: "Discover the 39th Issue of BARNES Magazine",
        text: "In this edition, we open our pages to Constance and Laurent de Gourcuff, whose journey perfectly embodies harmony, emotion, and the art of living well.",
        href: soon("/news/barnes-magazine-39/", "Discover the 39th Issue of BARNES Magazine", `${OFFICIAL}/about-barnes/news/2026/discover-the-39th-issue-of-barnes-magazine-3179.html`),
        image: { file: "news/news-1.jpg", alt: "Cover story of the 39th issue of BARNES Magazine", source: "https://www.barnes-international.com/accommodation/21/art_decouvrez-le-39e-numero-du-barnes-magazine_OXE_min.jpg" },
      },
      {
        date: "2026-02-04",
        title: "BARNES Presents the Global Property Handbook 2026 at Plaza Athénée",
        text: "BARNES gathered around thirty industry journalists for its annual press conference, held in the prestigious setting of the Plaza Athénée in Paris.",
        href: soon("/news/global-property-handbook-2026/", "Global Property Handbook 2026", `${OFFICIAL}/about-barnes/news/2026/barnes-presents-the-global-property-handbook-2026-at-a-press-conference-at-plaza-athenee-3126.html`),
        image: { file: "news/news-2.jpg", alt: "BARNES Global Property Handbook 2026 press conference", source: "https://www.barnes-international.com/accommodation/21/art_barnes-presente-le-global-property-handbook-2026-lors-dune-conference-de-presse-au-plaza-athenee_27W_min.jpg" },
      },
      {
        date: "2026-01-14",
        title: "BARNES Celebrates the End of the Year with an Exceptional Cocktail in Paris",
        text: "BARNES brought together its clients and partners at its Auteuil office for an event designed as a privileged moment for meetings and exchanges.",
        href: soon("/news/year-end-cocktail-paris/", "Year-end cocktail in Paris", `${OFFICIAL}/about-barnes/news/2026/barnes-celebrates-the-end-of-the-year-with-an-exceptional-cocktail-in-paris-3112.html`),
        image: { file: "news/news-3.jpg", alt: "Guests at the BARNES year-end cocktail in Paris", source: "https://www.barnes-international.com/accommodation/21/art_barnes-celebre-la-fin-dannee-lors-dun-cocktail-dexception-a-paris_Axc_min.jpg" },
      },
    ] satisfies { date: string; title: string; text: string; href: string; image: ImageAsset }[],
  },
  outro: {
    title: { lead: "Find Yours.", tail: "We’ll Help You Get There." } satisfies TwoTone,
    cta: "Let’s Get Started",
    image: shot("APM-86116202", 2),
  },
  destinations: {
    title: "Featured destinations across Europe",
    more: { label: "Explore all destinations →", href: links.destinations },
    groups: [
      { name: "France", links: [["Paris 16ème", "france/paris-16eme"], ["Neuilly-sur-Seine", "france/neuilly-sur-seine"], ["Cannes", "france/cannes"], ["Bordeaux", "france/bordeaux"]] },
      { name: "Italy", links: [["Roma", "italy/roma"], ["Milano", "italy/milano"], ["Venezia", "italy/venezia"], ["Porto Cervo", "italy/porto-cervo"]] },
      { name: "Greece", links: [["Mykonos", "greece/mykonos"], ["Paros", "greece/paros"], ["Attica", "greece/attica"]] },
    ].map((g) => ({ name: g.name, links: g.links.map(([label, path]) => ({ label: label!, href: soon(`/destinations/${path}/`, label!, `${OFFICIAL}/for-sale/${path}.html`) })) })),
  },
};

/** Lead modal: FIND's two-step "Find properties" form, BARNES wording. */
export const leadModal = {
  title: "Find properties",
  text: "Buy, sell or rent — our consultants are here to help.",
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
    label: "Sell with BARNES",
    title: "Request a",
    titleTail: "valuation.",
    lead: "Tell us about the property. A BARNES consultant will arrange a first meeting and prepare a written valuation.",
    propertyTypes: ["Apartment", "House", "Villa", "Château / estate", "Land", "Commercial", "Other"],
  },
  enquiry: {
    title: "Enquire about",
    titleTail: "this property.",
  },
  /** Shown when PUBLIC_ENQUIRY_ENDPOINT is not configured. Never claims a send. */
  notConnected:
    "Online submission is not connected yet, so your details have not been sent. Please call the agency directly or use the official BARNES contact page.",
  sent: "Thank you. Your request has been received by BARNES.",
  failed: "Your request could not be sent. Please try again, or call the agency directly.",
  privacy: "Your details are used only to answer this request.",
};

// ---------------------------------------------------------------------------
// Footer & SEO
// ---------------------------------------------------------------------------

export const footer = {
  newsletter: "Subscribe to our Newsletter!",
  nav: [
    { label: "Search", href: links.officialSearch },
    { label: "Agencies", href: links.findAgency },
    { label: "Destinations", href: links.destinations },
    { label: "About Us", href: links.history },
    { label: "Valuation", href: links.valuation },
  ],
  social: [
    { label: "Facebook", href: soon("/social/facebook/", "BARNES on Facebook", "https://www.facebook.com/barnesinternationalrealty") },
    { label: "Instagram", href: soon("/social/instagram/", "BARNES on Instagram", "https://www.instagram.com/barnesrealty/") },
    { label: "Youtube", href: soon("/social/youtube/", "BARNES on Youtube", "https://www.youtube.com/channel/UC-ow3njRKM7mQ_aQo9ocTHQ") },
    { label: "Linkedin", href: soon("/social/linkedin/", "BARNES on Linkedin", "https://www.linkedin.com/company/barnes_realty") },
  ],
  legal: [
    { label: "Our Values", href: links.values },
    { label: "Our History", href: links.history },
    { label: "Fees & FAQ", href: links.fees },
    { label: "In the Press", href: links.press },
    { label: "Job Offers", href: links.jobs },
  ],
  note: "Listings as published on barnes-international.com on 15 October 2026. Hero scene is illustrative.",
  copyright: "Copyright © BARNES International Realty",
};

export const seo = {
  siteName: "BARNES",
  title: "BARNES — Exceptional properties & lifestyle worldwide",
  description:
    "BARNES International Realty: a selection of exceptional properties in Paris, Provence, the Riviera, the Atlantic coast and abroad, and the art of living around them.",
  ogImage: shot("APM-87043121", 4),
  locale: "en_GB",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const listingSlug = (ref: string) => ref.toLowerCase();

export function findListing(slug: string): Listing | undefined {
  return listings.find((l) => listingSlug(l.ref) === slug);
}

export function formatPrice({ amount, currency }: Price): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatSurface(m2: number): string {
  return `${new Intl.NumberFormat("en-GB").format(m2)} m²`;
}

export function regionLabel(id: RegionId): string {
  return regions.find((r) => r.id === id)?.label ?? id;
}
