import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoots = ["src", "public"];
const files = [];

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
const cssText = files
  .filter((file) => file.endsWith(".css"))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
const languageGate = fs.readFileSync(
  path.join(root, "src", "components", "ui", "LanguageGate.tsx"),
  "utf8",
);
const siteHeader = fs.readFileSync(
  path.join(root, "src", "components", "layout", "SiteHeader.tsx"),
  "utf8",
);
const workflow = fs.readFileSync(
  path.join(root, ".github", "workflows", "ci.yml"),
  "utf8",
);

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
    "localized hub exposes four permanent sections",
    /Un système\. Quatre espaces\./.test(text) &&
      /\/presentation/.test(text) &&
      /\/evidence-engine/.test(text) &&
      /\/research/.test(text) &&
      /\/team/.test(text),
  ],
  [
    "presentation route preserves RCS Core",
    fs.existsSync(
      path.join(
        root,
        "src",
        "app",
        "(localized)",
        "[locale]",
        "presentation",
        "page.tsx",
      ),
    ) && /coreStructuredData/.test(text),
  ],
  [
    "Evidence Engine route describes the current dynamic architecture",
    fs.existsSync(
      path.join(
        root,
        "src",
        "app",
        "(localized)",
        "[locale]",
        "evidence-engine",
        "page.tsx",
      ),
    ) &&
      fs.existsSync(
        path.join(
          root,
          "src",
          "app",
          "(localized)",
          "[locale]",
          "squadron",
          "page.tsx",
        ),
      ) &&
      /permanentRedirect\(`\/\$\{locale\}\/evidence-engine`\)/.test(text) &&
      /RCS Evidence Engine/.test(text) &&
      /^const DRAGON_ONE_URL = "https:\/\/evidence-engine\.raijucloudsystem\.com\/";$/m.test(
        text,
      ) &&
      /Agents éphémères/.test(text) &&
      /Dragon Two/.test(text) &&
      !/Dragon (Three|Four|Five|Six)/.test(text),
  ],
  [
    "portal has a semantic heading and crawlable language links",
    /<h1 className="boot-brand">RAIJU CLOUD SYSTEM<\/h1>/.test(languageGate) &&
      /href={`\/\$\{option\.locale\}`}/.test(languageGate),
  ],
  [
    "header language switch uses crawlable links",
    /href={languageHref\(target\)}/.test(siteHeader) &&
      !/<button[\s\S]*?switchLocale/.test(siteHeader),
  ],
  [
    "main section navigation stays crawlable",
    /className="section-nav"/.test(siteHeader) &&
      /sectionNavigation\[locale\]\.map/.test(siteHeader),
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
    "published RCS-RP-001 identifiers present",
    /10\.5281\/zenodo\.21994886/.test(text) &&
      /0009-0009-7729-6552/.test(text) &&
      /RCS-RP-001/.test(text) &&
      /status: ["']published["']/.test(text),
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
      /Azure SQL Database/.test(text) &&
      /Créer un agent dans Microsoft Copilot Studio/.test(text) &&
      /8DDAC1CBF710F1DE/.test(text),
  ],
  [
    "team certifications use a compact native disclosure",
    /<details className="team-certifications-disclosure">/.test(text) &&
      /showCertifications/.test(text) &&
      /hideCertifications/.test(text),
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
    "LinkedIn social card present",
    fs.existsSync(path.join(root, "public", "images", "rcs-social-card.png")) &&
      /summary_large_image/.test(text) &&
      /1200/.test(text) &&
      /630/.test(text),
  ],
  [
    "structured data present",
    /application\/ld\+json/.test(text) &&
      /https:\/\/schema\.org/.test(text) &&
      /ScholarlyArticle/.test(text),
  ],
  [
    "IndexNow runs after deployment",
    /Deploy atomically[\s\S]+Notify participating search engines through IndexNow/.test(
      workflow,
    ) && /(indexnow:submit|submit-indexnow\.mjs)/.test(workflow),
  ],
  [
    "no remote image/font CDN",
    !/@import\s+(?:url\()?['"]?https?:\/\//i.test(cssText) &&
      !/url\(\s*['"]?https?:\/\//i.test(cssText) &&
      !/<Image[^>]+src=["']https?:\/\//i.test(text),
  ],
];

let failed = false;
for (const [label, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failed = true;
}

if (failed) process.exit(1);
