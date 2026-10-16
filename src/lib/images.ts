import type { ImageMetadata } from "astro";

// Every photograph under src/assets, addressable by the manifest's relative path.
const modules = import.meta.glob<ImageMetadata>("/src/assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const byPath = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([key, meta]) => [key.replace("/src/assets/", ""), meta]),
);

export function resolveImage(file: string): ImageMetadata {
  const meta = byPath.get(file);
  if (!meta) throw new Error(`Image not found in src/assets: "${file}" (check src/content/asset-manifest.ts)`);
  return meta;
}
