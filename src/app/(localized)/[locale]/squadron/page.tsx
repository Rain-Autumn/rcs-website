import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { evidenceEngineCopy } from "@/content/architecture";
import { getCopy, isLocale, type Locale } from "@/content/i18n";
import { socialMetadata } from "@/lib/site-metadata";
import { evidenceEngineStructuredData } from "@/lib/structured-data";

const DRAGON_ONE_URL = "https://evidence-engine.raijucloudsystem.com/";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = evidenceEngineCopy[locale];
  const social = socialMetadata({
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    path: `/${locale}/squadron`,
    locale: getCopy(locale).metadata.ogLocale,
  });
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: `/${locale}/squadron`,
      languages: {
        "fr-BE": "/fr/squadron",
        en: "/en/squadron",
        "nl-BE": "/nl/squadron",
        "x-default": "/en/squadron",
      },
    },
    ...social,
  };
}

export default async function EvidenceEnginePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const copy = evidenceEngineCopy[locale];

  return (
    <>
      <StructuredData
        data={evidenceEngineStructuredData(
          locale,
          copy.metadataDescription,
          DRAGON_ONE_URL,
        )}
      />
      <SiteHeader locale={locale} copy={getCopy(locale)} mode="squadron" />
      <main id="main" className="squadron-page">
        <section
          className="technical-panel squadron-hero"
          data-section="RCS-EE"
        >
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="hero-lead">{copy.lead}</p>
            <div className="button-row">
              <a
                className="mechanical-button mechanical-button--dark"
                href={DRAGON_ONE_URL}
              >
                {copy.demoAction}
                <span aria-hidden="true">↗</span>
              </a>
              <Link className="mechanical-button" href={`/${locale}`}>
                {copy.back}
                <span aria-hidden="true">↖</span>
              </Link>
            </div>
          </div>
          <div className="squadron-live-panel">
            <span>
              <i aria-hidden="true" />
              {copy.status}
            </span>
            <strong>DRAGON ONE</strong>
            <small>INTERFACE / ORCHESTRATION / HUMAN SUPERVISION</small>
            <div className="squadron-signal" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </section>

        <section className="technical-panel" data-section="01">
          <div className="section-heading">
            <p className="eyebrow">{copy.architectureEyebrow}</p>
            <h2>{copy.architectureTitle}</h2>
            <p className="section-lead">{copy.architectureLead}</p>
          </div>
          <div className="squadron-map">
            <article className="squadron-node squadron-node--one">
              <span>D-01{" // "}COORDINATOR</span>
              <h3>Dragon One</h3>
              <strong>{copy.coordinator.role}</strong>
              <p>{copy.coordinator.summary}</p>
            </article>
            <div className="squadron-specialists">
              {copy.specialists.map((dragon) => (
                <article className="squadron-node" key={dragon.code}>
                  <span>
                    {dragon.code}
                    {" // "}INTERNAL
                  </span>
                  <h3>{dragon.name}</h3>
                  <strong>{dragon.role}</strong>
                  <p>{dragon.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="technical-panel squadron-method" data-section="02">
          <div className="section-heading">
            <p className="eyebrow">{copy.methodEyebrow}</p>
            <h2>{copy.methodTitle}</h2>
          </div>
          <ol className="squadron-steps">
            {copy.methodSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.summary}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="squadron-limits">
            <h3>{copy.limitsTitle}</h3>
            <ul>
              {copy.limits.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="technical-panel squadron-demo" data-section="LIVE">
          <div>
            <p className="eyebrow">RCS // PUBLIC DEMONSTRATOR</p>
            <h2>{copy.demoTitle}</h2>
            <p className="section-lead">{copy.demoLead}</p>
            <a
              className="mechanical-button mechanical-button--dark"
              href={DRAGON_ONE_URL}
            >
              {copy.demoAction}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="squadron-demo__notice">{copy.demoNotice}</p>
        </section>
      </main>
      <footer className="site-footer">
        <span>RAIJU CLOUD SYSTEM</span>
        <span>RCS EVIDENCE ENGINE</span>
        <span>HUMAN SUPERVISION REQUIRED</span>
      </footer>
    </>
  );
}
