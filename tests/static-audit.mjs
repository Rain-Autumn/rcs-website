import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoots = ["src", "public"];
const files = [];
const remoteAssetUrl =
  /(?:\bsrc\s*=\s*["']https?:\/\/[^"']+|<link\b[^>]*\bhref\s*=\s*["']https?:\/\/[^"']+|url\(\s*["']?https?:\/\/[^)'" ]+|@import\s+(?:url\()?\s*["']?https?:\/\/)/;

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file);
    else files.push(file);
  }
}

sourceRoots.forEach((dir) => walk(path.join(root, dir)));
const textFiles = files.filter((file) =>
  /\.(ts|tsx|css|md|svg|json)$/.test(file),
);
const text = textFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

const checks = [
  [
    "forbidden identity absent",
    !text.includes(["Capitaine", "Autumn"].join(" ")),
  ],
  [
    "interactive terminal absent",
    !/terminal-form|nginx -t|curl -I/i.test(text),
  ],
  [
    "RCS Core institutional identity present",
    /RCS CORE/.test(text) && /RAIJU CLOUD SYSTEM/.test(text),
  ],
  [
    "multilingual routes present",
    fs.existsSync(
      path.join(root, "src", "app", "(localized)", "[locale]", "page.tsx"),
    ) &&
      /NEDERLANDS/.test(text) &&
      /FRANÇAIS/.test(text),
  ],
  [
    "research routes present",
    fs.existsSync(
      path.join(
        root,
        "src",
        "app",
        "(localized)",
        "[locale]",
        "research",
        "page.tsx",
      ),
    ),
  ],
  [
    "RP-003 localized study routes and reserved DOI present",
    fs.existsSync(
      path.join(
        root,
        "src",
        "app",
        "(localized)",
        "[locale]",
        "research",
        "rp-003",
        "page.tsx",
      ),
    ) &&
      /10\.5281\/zenodo\.23233639/.test(text) &&
      /research\/rp-003/.test(
        fs.readFileSync(path.join(root, "src", "app", "sitemap.ts"), "utf8"),
      ),
  ],
  [
    "RP-003 public research artifacts present",
    [
      "RCS-RP-003.pdf",
      "RCS-RP-003-method.md",
      "RCS-RP-003-results.csv",
      "RCS-RP-003-reproduce.ps1",
      "RCS-RP-003-test-fixtures.zip",
    ].every((name) =>
      fs.existsSync(path.join(root, "public", "research", name)),
    ),
  ],
  [
    "research storage stays private",
    !fs.existsSync(path.join(root, "public", "research-publications")) &&
      /MAX_PDF_BYTES/.test(text),
  ],
  [
    "research publication is password protected",
    /verifyResearchPassword/.test(text) && /httpOnly: true/.test(text),
  ],
  [
    "team routes and protected administration present",
    fs.existsSync(
      path.join(
        root,
        "src",
        "app",
        "(localized)",
        "[locale]",
        "team",
        "page.tsx",
      ),
    ) && /RCS_TEAM_PASSWORD_HASH/.test(text),
  ],
  [
    "founder certification record present",
    /RCS-TM-001/.test(text) &&
      /AWS Knowledge: Cloud Essentials/.test(text) &&
      /Azure SQL Database/.test(text),
  ],
  ["Three.js scene present", text.includes("@react-three/fiber")],
  ["GSAP motion present", text.includes("from 'gsap'")],
  [
    "lightweight reveal motion present",
    text.includes("IntersectionObserver") && text.includes("motion-ready"),
  ],
  [
    "Linux stack visible",
    /DEBIAN 13/.test(text) && /NGINX/.test(text) && /OVH VPS/.test(text),
  ],
  [
    "human validation visible",
    text.includes("HUGUES HENROTTE") && text.includes("HUMAN VALIDATION"),
  ],
  [
    "current public CV present",
    fs.existsSync(path.join(root, "public", "CV-Hugues-Henrotte-RCS-2026.pdf")),
  ],
  [
    "no remote image/font CDN",
    !remoteAssetUrl.test(text.replaceAll("http://www.w3.org/2000/svg", "")),
  ],
];

let failed = false;
for (const [label, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failed = true;
}

if (failed) process.exit(1);
