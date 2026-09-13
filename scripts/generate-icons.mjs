// Regenerates public/icons/icon-*.png from scripts/icon-source.svg.
// Run with: node scripts/generate-icons.mjs
// Requires `sharp` (installed on demand: npm install --no-save sharp).
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(join(__dirname, 'icon-source.svg'));
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outDir = join(__dirname, '..', 'public', 'icons');

for (const size of sizes) {
  const outFile = join(outDir, `icon-${size}x${size}.png`);
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(outFile);
  console.log(`wrote ${outFile}`);
}

const faviconFile = join(__dirname, '..', 'public', 'favicon.png');
await sharp(svg, { density: 384 }).resize(32, 32).png().toFile(faviconFile);
console.log(`wrote ${faviconFile}`);
