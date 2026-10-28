import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const files = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file);
    else if (/\.(ts|tsx|css|md|svg|json)$/.test(file)) files.push(file);
  }
}
walk(path.join(root, "src"));
walk(path.join(root, "public"));
const text = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const css = files
  .filter((file) => file.endsWith(".css"))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
const home = read("src/app/(localized)/[locale]/page.tsx");
const landing = read("src/components/onepage/OnePage.tsx");
const content = read("src/content/onepage.ts");
const chatUrl = content.match(
  /^export const EE_URL = ["']([^"']+)["'];$/m,
)?.[1];
const research = read("src/content/research.ts");
const sitemap = read("src/app/sitemap.ts");
const workflow = read(".github/workflows/ci.yml");
const checks = [
  [
    "forbidden private identity absent",
    !text.includes(["Capitaine", "Autumn"].join(" ")),
  ],
  ["no interactive terminal", !/terminal-form|nginx -t|curl -I/i.test(text)],
  [
    "root goes directly to French landing page",
    /permanentRedirect\("\/fr"\)/.test(read("src/app/(portal)/page.tsx")),
  ],
  [
    "SSR landing page preserves saved research and members",
    /<OnePage/.test(home) &&
      /loadResearch\(locale\)/.test(home) &&
      /loadTeamMembers\(\)/.test(home),
  ],
  [
    "single public page has exactly three content sections",
    (landing.match(/<section\b/g) || []).length === 3 &&
      ["accueil", "recherches", "equipe"].every((id) =>
        landing.includes('id="' + id + '"'),
      ) &&
      !landing.includes('id="evidence-engine"'),
  ],
  [
    "legacy introduction pages redirect instead of duplicating home",
    ["presentation", "research", "team", "evidence-engine", "squadron"].every(
      (route) =>
        /permanentRedirect/.test(
          read("src/app/(localized)/[locale]/" + route + "/page.tsx"),
        ),
    ),
  ],
  [
    "FR EN NL use crawlable locale links",
    /languages\.map/.test(landing) &&
      /href=\{\x60\/\$\{target\}\$\{hash\}\x60\}/.test(landing) &&
      /htmlLanguages/.test(content),
  ],
  [
    "separate EE chat URL unchanged",
    chatUrl === "https://evidence-engine.raijucloudsystem.com/" &&
      /href=\{EE_URL\}/.test(landing) &&
      !/<iframe/.test(landing),
  ],
  [
    "team uses RCS emblems with founder-only Arkenstone",
    /member\.id === "RCS-TM-001"/.test(landing) &&
      /data-emblem=\{founder \? "arkenstone" : "rcs"\}/.test(landing) &&
      /raiju-dragon-vector\.svg/.test(landing),
  ],
  [
    "Arkenstone and reduced motion are implemented",
    /person-mark--arkenstone/.test(css) &&
      /arkenstone-core/.test(css) &&
      /prefers-reduced-motion/.test(css),
  ],
  [
    "four published research DOI records present",
    ["21994886", "22110548", "23373563", "23411388"].every((id) =>
      research.includes("10.5281/zenodo." + id),
    ),
  ],
  [
    "RP003 keeps its article and existing public artifacts",
    exists("src/app/(localized)/[locale]/research/rp-003/page.tsx") &&
      exists("public/research/RCS-RP-003.pdf") &&
      exists("public/research/RCS-RP-003-Package_v2.0.zip"),
  ],
  [
    "RP003 article points to confirmed DOI",
    read("src/content/research-rp-003.ts").includes("10.5281/zenodo.23373563"),
  ],
  [
    "sitemap excludes redirect pages and administration",
    /research\/rp-003/.test(sitemap) &&
      !/\/presentation|\/evidence-engine|\/team|\/admin/.test(sitemap),
  ],
  [
    "protected management remains accessible separately",
    exists("src/app/(localized)/[locale]/admin/page.tsx") &&
      /ResearchProposalForm/.test(
        read("src/app/(localized)/[locale]/admin/page.tsx"),
      ) &&
      /TeamMemberForm/.test(
        read("src/app/(localized)/[locale]/admin/page.tsx"),
      ) &&
      /index: false/.test(read("src/app/(localized)/[locale]/admin/page.tsx")),
  ],
  [
    "public landing contains no administration form",
    !/ResearchProposalForm|TeamMemberForm|<form/.test(landing),
  ],
  [
    "research and team authentication unchanged and protected",
    /verifyResearchPassword/.test(text) &&
      /httpOnly: true/.test(text) &&
      /RCS_TEAM_PASSWORD_HASH/.test(text) &&
      !exists("public/research-publications"),
  ],
  [
    "actual members and certifications retained",
    /Jacob Matthews/.test(text) &&
      /Malika Kayo/.test(text) &&
      /Build an AI Agent/.test(text) &&
      /CREDLY-3dfee891-aad9-4890-856d-d7c1472b7a4e/.test(text) &&
      /CyberFirst Advanced course/.test(text),
  ],
  [
    "onepage illustrations are local",
    [
      "rcs-onepage-hero",
      "onepage-home",
      "onepage-agents",
      "onepage-chip",
      "onepage-storage",
    ].every((name) => exists("public/images/" + name + ".svg")),
  ],
  [
    "no remote font or image CDN introduced",
    !/@import\s+(?:url\()?['"]?https?:\/\//i.test(css) &&
      !/url\(\s*['"]?https?:\/\//i.test(css) &&
      !/<Image[^>]+src=["']https?:\/\//i.test(text),
  ],
  [
    "structured data describes publications and actual people",
    /onePageStructuredData/.test(home) &&
      /ScholarlyArticle/.test(read("src/lib/structured-data.ts")) &&
      /application\/ld\+json/.test(text),
  ],
  [
    "social previews and public CV retained",
    exists("public/images/rcs-social-card.png") &&
      exists("public/CV-Hugues-Henrotte-RCS-2026.pdf") &&
      /summary_large_image/.test(text),
  ],
  [
    "existing atomic deployment and IndexNow retained",
    /Deploy atomically[\s\S]+Notify participating search engines through IndexNow/.test(
      workflow,
    ),
  ],
];
let failed = false;
for (const [label, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failed = true;
}
if (failed) process.exit(1);
