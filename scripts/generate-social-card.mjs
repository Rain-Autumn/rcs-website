import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'public', 'images');
const output = path.join(outputDirectory, 'rcs-social-card.png');
const emblem = (await readFile(path.join(root, 'public', 'icons', 'raiju-dragon-vector.svg'), 'utf8'))
  .replace('#5a5a5a', '#f3efe7');
const emblemData = Buffer.from(emblem).toString('base64');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#d9d2c8" stroke-width="1" opacity="0.72"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#f3efe7"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="132" fill="#0b0b0a"/>
  <image href="data:image/svg+xml;base64,${emblemData}" x="62" y="20" width="82" height="92"/>
  <text x="174" y="67" fill="#f3efe7" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" letter-spacing="5">RAIJU CLOUD SYSTEM</text>
  <text x="176" y="94" fill="#a79f95" font-family="Courier New, monospace" font-size="13" font-weight="700" letter-spacing="4">RCS CORE // PUBLIC SYSTEM</text>
  <text x="1136" y="78" text-anchor="end" fill="#a79f95" font-family="Courier New, monospace" font-size="13" font-weight="700" letter-spacing="3">FR / EN / NL</text>

  <text x="70" y="202" fill="#766f67" font-family="Courier New, monospace" font-size="15" font-weight="700" letter-spacing="5">RCS // TECHNOLOGY STRUCTURE</text>
  <text x="66" y="326" fill="#11110f" font-family="Arial, Helvetica, sans-serif" font-size="100" font-weight="800" letter-spacing="-5">SYSTEMS.</text>
  <text x="66" y="424" fill="#11110f" font-family="Arial, Helvetica, sans-serif" font-size="100" font-weight="800" letter-spacing="-5">RESEARCH.</text>

  <line x1="72" y1="474" x2="1128" y2="474" stroke="#1a1917" stroke-width="2"/>
  <line x1="72" y1="494" x2="72" y2="555" stroke="#9f6543" stroke-width="4"/>
  <text x="96" y="520" fill="#48433e" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="0.5">Engineering, infrastructure and documented technical research.</text>
  <text x="96" y="550" fill="#766f67" font-family="Courier New, monospace" font-size="14" font-weight="700" letter-spacing="3">HUMAN VALIDATION // TRANSPARENT METHODS</text>

  <text x="72" y="600" fill="#11110f" font-family="Courier New, monospace" font-size="15" font-weight="700" letter-spacing="3">RAIJUCLOUDSYSTEM.COM</text>
  <text x="1128" y="600" text-anchor="end" fill="#766f67" font-family="Courier New, monospace" font-size="13" font-weight="700" letter-spacing="3">RCS / 2026</text>
</svg>`;

await mkdir(outputDirectory, { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
console.log(`Generated ${path.relative(root, output)} (1200x630).`);
