/**
 * Every property photograph used on the site. `file` is relative to src/assets.
 * INTERIM IMAGERY: these photographs are placeholders for the template and
 * must be replaced with the agency's own Dubai photography before launch.
 * `source` records where each interim file came from.
 */
import sources from "./gallery-sources.json";

export interface ImageAsset {
  file: string;
  alt: string;
  /** CSS object-position, keeps crops on the architecture. */
  focus?: string;
  source: string;
}

type Shot = [index: number, alt: string, focus?: string];

const gallery = (ref: keyof typeof sources, shots: Shot[]): ImageAsset[] =>
  shots.map(([i, alt, focus]) => ({
    file: `properties/${ref}/${String(i).padStart(2, "0")}.jpg`,
    alt,
    focus,
    source: sources[ref][i] ?? "",
  }));

export const propertyImages = {
  "APM-87353841": gallery("APM-87353841", [
    [0, "Classic garden façade half hidden by mature trees", "50% 40%"],
    [1, "Panelled room with oak doors, a writing table and Versailles parquet"],
    [2, "Salon with fireplace, mouldings and a crystal chandelier"],
    [3, "The private garden seen from above, dense with ferns and shrubs"],
    [4, "Kitchen and dining room with a long oak table under high ceilings"],
    [5, "Bedroom with a marble fireplace and tall windows onto the garden"],
    [6, "Bathroom with a freestanding tub beneath a tall window"],
    [7, "Terrace with a dining table under the trees of the garden"],
  ]),
  "APM-87067773": gallery("APM-87067773", [
    [0, "Aerial view of the estate between the water and mature woodland", "40% 55%"],
    [1, "Corner salon with bay windows opening onto the park"],
    [2, "Grand salon under painted beams with chandeliers and antiques"],
    [3, "Aerial view of the estate and its lawns above the water", "45% 50%"],
    [4, "Reception room with a piano and a long view through the enfilade"],
    [5, "Enfilade of reception rooms with chandeliers and parquet"],
    [6, "Library with floor-to-ceiling white bookcases and a library ladder"],
    [7, "Long gallery with a large painting and a writing table"],
    [8, "Dining room beneath a large landscape painting"],
    [9, "Salon with a gilt mirror over the fireplace and garden views"],
  ]),
  "APM-87100407": gallery("APM-87100407", [
    [0, "Aerial view of the villa, its pools and red parasols among palms", "50% 55%"],
    [1, "White villa with a long pool and palms under a clear sky"],
    [3, "Glazed pool house with a billiard table"],
    [4, "Teak deck with sunbeds and parasols beside the pool"],
    [5, "The villa on the axis of its pool, lawns and palms on either side", "50% 55%"],
    [6, "Long pool leading to the pool house through the lawns"],
    [7, "The pool and gardens seen from the villa"],
    [8, "Stone entrance under a red shade sail, with steps and planting"],
    [9, "Living room opening onto the terrace and pool"],
  ]),
  "APM-87043121": gallery("APM-87043121", [
    [0, "Aerial view across the estate towards the hills", "50% 60%"],
    [1, "Aerial view of the villa, its pool and landscaped grounds", "50% 55%"],
    [2, "Stone façade of the villa with cypresses and a fountain basin", "50% 55%"],
    [3, "Gravel alley lined with cypresses and Mediterranean planting"],
    [4, "Twenty-metre pool on the lawn, with the hills beyond", "50% 62%"],
    [5, "Garden path under plane trees towards the stone house"],
    [6, "Glazed extension of the villa along a planted walk"],
    [7, "The pool in front of the house and its cypresses"],
    [8, "Tennis court set in the grounds"],
    [9, "Aerial view of the olive and almond groves"],
  ]),
  "APM-82420906": gallery("APM-82420906", [
    [0, "Planted path and steps leading up through pines to the villa"],
    [1, "Dark timber façade with white trim and sunbeds on the deck"],
    [2, "Pool and deck in front of the timber villa, under pines", "50% 60%"],
    [3, "Sunbeds beside the pool"],
    [4, "Aerial view of the villa, pool and pine garden"],
    [5, "Living room under exposed timber roof trusses"],
    [6, "Open living space with fireplace and long sofas"],
    [7, "Dining area with a vintage jukebox"],
    [8, "Kitchen with timber cabinetry and pendant lights"],
    [9, "Bedroom with timber ceiling and white linen"],
  ]),
  "APM-86116202": gallery("APM-86116202", [
    [0, "Aerial view of the estate on its terraced, wooded grounds", "50% 55%"],
    [1, "Long pool between palms with sea views beyond"],
    [2, "Sunset over the hills through palm trees", "60% 50%"],
    [3, "Terrace with parasol and white outdoor sofas"],
    [4, "Dining area under chestnut beams with floor-to-ceiling windows"],
    [5, "Pool lined with palms in the afternoon light"],
    [6, "Pool terraces stepping down the hillside"],
    [7, "Pool in front of a pergola terrace on the hillside"],
    [8, "Pergola terrace with stone walls and a dining table"],
    [9, "Room with a telescope at a window over the countryside"],
  ]),
  "APM-87357422": gallery("APM-87357422", [
    [0, "Rear garden and brick façade of the townhouse", "50% 55%"],
    [1, "Glazed garden room with plants and armchairs"],
    [2, "Sitting room with bookshelves and artwork"],
    [3, "Street façade behind front garden trees"],
    [4, "Kitchen extension with a glass roof and red cabinetry"],
    [5, "Garden path between borders and lawn"],
    [6, "Kitchen with red cabinetry and open shelving"],
    [7, "Living room with shelves of ceramics and books"],
    [8, "Long view through the ground floor to the garden"],
    [9, "Long reception room with a large abstract drawing"],
  ]),
} satisfies Record<keyof typeof sources, ImageAsset[]>;

export type PropertyRef = keyof typeof propertyImages;

/** One photograph by listing and gallery index. Throws if the index was not imported. */
export function shot(ref: PropertyRef, index: number): ImageAsset {
  const file = `properties/${ref}/${String(index).padStart(2, "0")}.jpg`;
  const found = propertyImages[ref].find((a) => a.file === file);
  if (!found) throw new Error(`No photograph ${index} for ${ref} in asset-manifest.ts`);
  return found;
}
