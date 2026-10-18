import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { catalog } from "./content.mjs";

// This portal has no dependency on the institutional site or its Next.js build.
const directory = dirname(fileURLToPath(import.meta.url));
const output = join(directory, "dist");
const origin = "https://integrations.raijucloudsystem.com";
const locales = ["en", "fr"];
const strings = {
  en: {
    skip: "Skip to content",
    navigation: "Main navigation",
    languages: "Language",
    home: "Integrations",
    service: "Deadlines Reminder",
    platform: "Discord",
    back: "All integrations",
    overview: "Overview",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    documentation: "Service documentation",
    learn: "Explore the service",
    register: "Service register",
    serviceCount: "01 / available service",
    catalogNote:
      "Service information, terms of use and privacy documentation, in one place.",
    access: "Access & availability",
    accessText:
      "Deployment is restricted to approved Discord servers. This page does not provide a public installation link.",
    documents: "Terms & privacy",
    documentsText:
      "Read the conditions that apply to this service and how it handles data.",
    operator: "Operated by",
    updated: "Last updated",
    contact: "Contact",
    institutional: "Institutional website",
    footer: "Tools for external platforms.",
    errorTitle: "This page could not be found.",
    errorIntro: "The address may have changed, or this page does not exist.",
    errorLink: "Return to integrations",
    factPurpose: "Purpose",
    factPurposeValue: "Scheduled deadline reminders",
    factPlatform: "Platform",
    factAccess: "Deployment",
    factAccessValue: "Approved servers only",
  },
  fr: {
    skip: "Aller au contenu",
    navigation: "Navigation principale",
    languages: "Langue",
    home: "Intégrations",
    service: "Deadlines Reminder",
    platform: "Discord",
    back: "Toutes les intégrations",
    overview: "Présentation",
    terms: "Conditions d’utilisation",
    privacy: "Politique de confidentialité",
    documentation: "Documentation du service",
    learn: "Découvrir le service",
    register: "Répertoire des services",
    serviceCount: "01 / service disponible",
    catalogNote:
      "Informations sur les services, conditions d’utilisation et confidentialité, au même endroit.",
    access: "Accès et disponibilité",
    accessText:
      "Le déploiement est limité aux serveurs Discord approuvés. Cette page ne propose pas de lien d’installation public.",
    documents: "Conditions et confidentialité",
    documentsText:
      "Consultez les conditions applicables au service et la manière dont il traite les données.",
    operator: "Exploité par",
    updated: "Dernière mise à jour",
    contact: "Contact",
    institutional: "Site institutionnel",
    footer: "Des outils pour les plateformes externes.",
    errorTitle: "Cette page est introuvable.",
    errorIntro: "L’adresse a peut-être changé, ou cette page n’existe pas.",
    errorLink: "Revenir aux intégrations",
    factPurpose: "Fonction",
    factPurposeValue: "Rappels d’échéances programmés",
    factPlatform: "Plateforme",
    factAccess: "Déploiement",
    factAccessValue: "Serveurs approuvés uniquement",
  },
};

function escape(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

function path(locale, slug = "") {
  return `${locale === "fr" ? "/fr" : ""}/${slug ? `${slug}/` : ""}`;
}

function arrow() {
  return '<span class="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 18 18 6M6 6h12v12"/></svg></span>';
}

function paragraphs(items) {
  return items.map((item) => `<p>${escape(item)}</p>`).join("\n");
}

function date(locale) {
  const [year, month, day] = catalog.updated.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-BE" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function documents(locale, current = "") {
  const text = strings[locale];
  return `<nav class="document-nav" aria-label="${escape(text.documentation)}">
    ${[
      ["", text.overview],
      ["terms", text.terms],
      ["privacy", text.privacy],
    ]
      .map(
        ([slug, label]) =>
          `<a href="${path(locale, `deadlines-reminder${slug ? `/${slug}` : ""}`)}"${current === slug ? ' aria-current="page"' : ""}>${escape(label)}</a>`,
      )
      .join("\n")}
  </nav>`;
}

function page(
  locale,
  slug,
  title,
  description,
  body,
  { error = false, document = false } = {},
) {
  const text = strings[locale];
  const canonical = error
    ? `${origin}/404.html`
    : `${origin}${path(locale, slug)}`;
  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="robots" content="noindex,follow">
  <meta name="description" content="${escape(description)}">
  <title>${escape(title === "RCS Integrations" ? title : `${title} | RCS Integrations`)}</title>
  <link rel="canonical" href="${canonical}">
  ${
    error
      ? ""
      : `<link rel="alternate" hreflang="en" href="${origin}${path("en", slug)}">
  <link rel="alternate" hreflang="fr" href="${origin}${path("fr", slug)}">
  <link rel="alternate" hreflang="x-default" href="${origin}${path("en", slug)}">`
  }
  <link rel="icon" href="/assets/rcs.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
  <a class="skip-link" href="#main">${escape(text.skip)}</a>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="${path(locale)}" aria-label="RCS Integrations">
        <img src="/assets/rcs.svg" width="34" height="37" alt="">
        <span><span class="brand-name">RAIJU CLOUD SYSTEM</span><span class="brand-context">Integrations</span></span>
      </a>
      <nav class="header-nav" aria-label="${escape(text.navigation)}">
        <a href="${path(locale)}"${!slug && !error ? ' aria-current="page"' : ""}>${escape(text.home)}</a>
        <div class="language-switch" role="group" aria-label="${escape(text.languages)}">
          ${locales.map((language) => `<a lang="${language}" hreflang="${language}" href="${path(language, error ? "" : slug)}"${language === locale ? ' aria-current="true"' : ""}>${language.toUpperCase()}</a>`).join('<span aria-hidden="true">/</span>')}
        </div>
      </nav>
    </header>
    <main id="main" class="${document ? "document-page" : "main-page"}" tabindex="-1">${body}</main>
    <footer class="site-footer">
      <div><span class="footer-brand">Raiju Cloud System</span><p>${escape(text.footer)}</p></div>
      <nav aria-label="${locale === "fr" ? "Liens utiles" : "Useful links"}">
        <a href="mailto:${escape(catalog.contact)}">${escape(text.contact)} ${arrow()}</a>
        <a href="https://raijucloudsystem.com/">${escape(text.institutional)} ${arrow()}</a>
      </nav>
      <p class="footer-date">© ${escape(catalog.updated.slice(0, 4))} RCS</p>
    </footer>
  </div>
</body>
</html>
`;
}

function index(locale) {
  const content = catalog[locale];
  const text = strings[locale];
  const body = `
    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow"><span class="square" aria-hidden="true"></span>${escape(content.label)}</p>
      <h1 id="page-title">${escape(content.heading)}</h1>
      <p class="intro-copy">${escape(content.intro)}</p>
    </section>
    <section class="service-register" aria-labelledby="register-title">
      <div class="section-heading"><h2 id="register-title">${escape(text.register)}</h2><span>${escape(text.serviceCount)}</span></div>
      <article class="service-entry">
        <div class="service-number" aria-hidden="true">01</div>
        <div class="service-primary"><p class="eyebrow">${escape(text.platform)}</p><h3><a href="${path(locale, "deadlines-reminder")}">Deadlines Reminder</a></h3><p>${escape(content.serviceSummary)}</p></div>
        <div class="service-actions"><span class="status"><span aria-hidden="true"></span>${escape(content.serviceStatus)}</span><a class="text-link" href="${path(locale, "deadlines-reminder")}">${escape(text.learn)} ${arrow()}</a></div>
      </article>
    </section>
    <p class="catalog-note">${escape(text.catalogNote)}</p>`;
  return page(locale, "", "RCS Integrations", content.intro, body);
}

function detail(locale) {
  const content = catalog[locale];
  const text = strings[locale];
  const body = `
    <a class="back-link" href="${path(locale)}"><span aria-hidden="true">←</span> ${escape(text.back)}</a>
    <section class="service-intro" aria-labelledby="page-title">
      <p class="eyebrow"><span class="square" aria-hidden="true"></span>${escape(text.platform)} / 01</p>
      <h1 id="page-title">Deadlines<br class="desktop-break"> Reminder<span class="sage-period">.</span></h1>
      <p class="intro-copy">${escape(content.serviceSummary)}</p>
      <span class="status"><span aria-hidden="true"></span>${escape(content.serviceStatus)}</span>
    </section>
    ${documents(locale)}
    <div class="detail-layout">
      <div class="service-description">${paragraphs(content.serviceBody)}
        <section class="access-note" aria-labelledby="access-title"><h2 id="access-title">${escape(text.access)}</h2><p>${escape(text.accessText)}</p></section>
      </div>
      <dl class="service-facts">
        <div><dt>${escape(text.factPurpose)}</dt><dd>${escape(text.factPurposeValue)}</dd></div>
        <div><dt>${escape(text.factPlatform)}</dt><dd>Discord</dd></div>
        <div><dt>${escape(text.factAccess)}</dt><dd>${escape(text.factAccessValue)}</dd></div>
      </dl>
    </div>
    <section class="documents-section" aria-labelledby="documents-title"><div><p class="eyebrow">${escape(text.documentation)}</p><h2 id="documents-title">${escape(text.documents)}</h2><p>${escape(text.documentsText)}</p></div>
      <div class="document-links"><a href="${path(locale, "deadlines-reminder/terms")}">${escape(text.terms)} ${arrow()}</a><a href="${path(locale, "deadlines-reminder/privacy")}">${escape(text.privacy)} ${arrow()}</a></div>
    </section>`;
  return page(
    locale,
    "deadlines-reminder",
    "Deadlines Reminder",
    content.serviceSummary,
    body,
  );
}

function legal(locale, kind) {
  const content = catalog[locale][kind];
  const text = strings[locale];
  const body = `
    <a class="back-link" href="${path(locale, "deadlines-reminder")}"><span aria-hidden="true">←</span> Deadlines Reminder</a>
    <header class="document-heading"><p class="eyebrow"><span class="square" aria-hidden="true"></span>Deadlines Reminder / ${escape(text.platform)}</p><h1 id="page-title">${escape(content.title)}</h1><p class="document-intro">${escape(content.intro)}</p><p class="updated">${escape(text.updated)} <time datetime="${escape(catalog.updated)}">${escape(date(locale))}</time></p></header>
    ${documents(locale, kind)}
    <div class="legal-layout">
      <aside class="operator-note"><p class="eyebrow">${escape(text.operator)}</p><p>${escape(catalog.operator)}</p><a href="mailto:${escape(catalog.contact)}">${escape(catalog.contact)}</a></aside>
      <article class="legal-copy" aria-labelledby="page-title">${content.sections.map((section, index) => `<section aria-labelledby="section-${index + 1}"><h2 id="section-${index + 1}"><span class="section-number">${String(index + 1).padStart(2, "0")}</span>${escape(section.title)}</h2>${paragraphs(section.paragraphs)}</section>`).join("\n")}</article>
    </div>`;
  return page(
    locale,
    `deadlines-reminder/${kind}`,
    `${content.title} — Deadlines Reminder`,
    content.intro,
    body,
    { document: true },
  );
}

async function write(relative, contents) {
  const target = join(output, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

for (const locale of locales) {
  if (
    !catalog[locale]?.terms?.sections?.length ||
    !catalog[locale]?.privacy?.sections?.length
  ) {
    throw new Error(`Missing required ${locale} service documentation.`);
  }
  const prefix = locale === "fr" ? "fr/" : "";
  await write(`${prefix}index.html`, index(locale));
  await write(`${prefix}deadlines-reminder/index.html`, detail(locale));
  for (const kind of ["terms", "privacy"]) {
    await write(
      `${prefix}deadlines-reminder/${kind}/index.html`,
      legal(locale, kind),
    );
  }
}

await mkdir(join(output, "assets"), { recursive: true });
await copyFile(
  join(directory, "assets", "style.css"),
  join(output, "assets", "style.css"),
);
await copyFile(
  join(directory, "..", "public", "icons", "raiju-dragon-vector.svg"),
  join(output, "assets", "rcs.svg"),
);
await write(
  "404.html",
  page(
    "en",
    "",
    "Page not found",
    strings.en.errorIntro,
    `<section class="error-page"><p class="eyebrow">404 / RCS Integrations</p><h1>${escape(strings.en.errorTitle)}</h1><p class="intro-copy">${escape(strings.en.errorIntro)}</p><a class="primary-link" href="/">${escape(strings.en.errorLink)} ${arrow()}</a><p lang="fr" class="error-french">Page introuvable. <a href="/fr/">Revenir aux intégrations en français</a>.</p></section>`,
    { error: true },
  ),
);
await write("robots.txt", "User-agent: *\nAllow: /\n");
await write(
  "_headers",
  `/*
  Content-Security-Policy: default-src 'none'; script-src 'none'; style-src 'self'; img-src 'self'; font-src 'none'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'
  X-Robots-Tag: noindex, follow
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
`,
);
console.log(
  "Built RCS Integrations: 8 localized pages, 404, local assets, robots and security headers.",
);
