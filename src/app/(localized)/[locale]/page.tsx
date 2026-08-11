import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { hubCopy } from "@/content/architecture";
import { getCopy, isLocale, locales, type Locale } from "@/content/i18n";
import { socialMetadata } from "@/lib/site-metadata";
import { hubStructuredData } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = hubCopy[locale];
  const social = socialMetadata({
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    path: `/${locale}`,
    locale: getCopy(locale).metadata.ogLocale,
  });

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "fr-BE": "/fr",
        en: "/en",
        "nl-BE": "/nl",
        "x-default": "/",
      },
    },
    ...social,
  };
}

export default async function LocalizedHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const copy = hubCopy[locale];
  const siteCopy = getCopy(locale);

  return (
    <>
      <StructuredData
        data={hubStructuredData(locale, copy.metadataDescription)}
      />
      <a className="skip-link" href="#main">
        {siteCopy.skipLink}
      </a>
      <SiteHeader locale={locale} copy={siteCopy} mode="hub" />
      <main id="main" className="rcs-hub-page" tabIndex={-1}>
        <section className="technical-panel hub-hero" data-section="RCS-00">
          <div className="hub-hero__copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="hero-lead">{copy.lead}</p>
          </div>
          <div className="hub-principles" aria-label="RCS">
            {copy.principles.map((principle, index) => (
              <div key={principle.label}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                  {" // "}
                  {principle.label}
                </span>
                <strong>{principle.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section
          className="technical-panel hub-directory"
          data-section="RCS-MAP"
        >
          <div className="section-heading">
            <p className="eyebrow">{copy.directoryEyebrow}</p>
            <h2>{copy.directoryTitle}</h2>
            <p className="section-lead">{copy.directoryLead}</p>
          </div>
          <div className="hub-system-grid">
            {copy.cards.map((card, index) => (
              <Link
                className="hub-system-card"
                href={`/${locale}${card.path}`}
                key={card.code}
              >
                <div className="hub-system-card__meta">
                  <span>{card.code}</span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </div>
                <div>
                  <p>{card.status}</p>
                  <h3>{card.title}</h3>
                  <span className="hub-system-card__summary">
                    {card.summary}
                  </span>
                </div>
                <strong>
                  {card.action}
                  <span aria-hidden="true">↗</span>
                </strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>RAIJU CLOUD SYSTEM</span>
        <span>RCS DIRECTORY</span>
        <span>{copy.footer}</span>
      </footer>
    </>
  );
}
