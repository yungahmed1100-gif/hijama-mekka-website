// One-time image pipeline. Generates responsive WebP variants for the gallery
// and a proper favicon set from the logo. Run with `npm run optimize:images`.
// Outputs are committed to public/ and referenced by the components.

import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const galleryDir = path.join(publicDir, "gallery");

// Widths that cover the gallery's rendered sizes (mobile 2-col up to the large
// featured tile) with a 2x buffer.
const WIDTHS = [480, 960];
const WEBP_QUALITY = 78;

async function optimizeGallery() {
  const files = (await readdir(galleryDir)).filter((f) => /\.jpe?g$/i.test(f));
  for (const file of files) {
    const base = file.replace(/\.jpe?g$/i, "");
    const input = path.join(galleryDir, file);
    for (const width of WIDTHS) {
      const out = path.join(galleryDir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(out);
      console.log(`gallery: ${path.basename(out)}`);
    }
  }
}

async function generateFavicons() {
  const logo = path.join(publicDir, "logo.png");
  if (!existsSync(logo)) {
    console.warn("logo.png missing — skipping favicons");
    return;
  }
  await sharp(logo).resize(32, 32).png().toFile(path.join(publicDir, "favicon-32.png"));
  await sharp(logo).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("favicons: favicon-32.png, apple-touch-icon.png");
}

async function main() {
  if (!existsSync(galleryDir)) await mkdir(galleryDir, { recursive: true });
  await optimizeGallery();
  await generateFavicons();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
