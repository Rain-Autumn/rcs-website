import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "public", "images");
const output = path.join(outputDirectory, "rcs-social-card.png");
const emblem = (
  await readFile(
    path.join(root, "public", "icons", "raiju-dragon-vector.svg"),
    "utf8",
  )
).replace("#5a5a5a", "#20211e");
const hero = await readFile(
  path.join(outputDirectory, "rcs-onepage-hero.svg"),
  "utf8",
);
const emblemData = Buffer.from(emblem).toString("base64");
const heroData = Buffer.from(hero).toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f8f8f4"/><path d="M60 126h1080M60 550h1080" stroke="#dcded6"/>
<image href="data:image/svg+xml;base64,${emblemData}" x="60" y="39" width="52" height="56"/>
<text x="134" y="68" font-family="Arial,sans-serif" font-size="25" fill="#20211e" font-weight="700">RAIJU CLOUD SYSTEM</text>
<text x="135" y="91" font-family="Consolas,monospace" font-size="11" fill="#6d7068" letter-spacing="2">INDEPENDENT AI &amp; RESEARCH</text>
<text x="1138" y="75" text-anchor="end" font-family="Consolas,monospace" font-size="13" fill="#6d7068">FR / EN / NL</text>
<text x="60" y="192" font-family="Consolas,monospace" font-size="12" fill="#6d7068" letter-spacing="2">APPLIED RESEARCH / AI ENGINEERING</text>
<text x="56" y="290" font-family="Arial,sans-serif" font-size="65" fill="#20211e" font-weight="600" letter-spacing="-3">AI, from idea</text>
<text x="56" y="366" font-family="Arial,sans-serif" font-size="65" fill="#787c72" font-weight="600" letter-spacing="-3">to experiment.</text>
<rect x="60" y="415" width="212" height="45" fill="#20211e"/><text x="80" y="443" font-family="Arial,sans-serif" font-size="15" fill="#fff">Evidence Engine</text><text x="244" y="443" font-family="Arial,sans-serif" font-size="18" fill="#fff">↗</text>
<image href="data:image/svg+xml;base64,${heroData}" x="530" y="155" width="650" height="370"/>
<text x="60" y="589" font-family="Consolas,monospace" font-size="13" fill="#20211e" letter-spacing="1">RAIJUCLOUDSYSTEM.COM</text>
<text x="1138" y="589" text-anchor="end" font-family="Consolas,monospace" font-size="11" fill="#6d7068">BELGIUM / 2026</text></svg>`;
await mkdir(outputDirectory, { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
console.log("Generated public/images/rcs-social-card.png (1200x630).");
