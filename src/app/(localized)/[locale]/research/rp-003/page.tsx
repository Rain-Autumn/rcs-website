import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getCopy, isLocale, type Locale } from "@/content/i18n";
import { rp003Copy, rp003Results } from "@/content/research-rp-003";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const copy = rp003Copy[rawLocale];
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: `/${rawLocale}/research/rp-003`,
      languages: {
        "fr-BE": "/fr/research/rp-003",
        en: "/en/research/rp-003",
        "nl-BE": "/nl/research/rp-003",
        "x-default": "/en/research/rp-003",
      },
    },
  };
}

export default async function DiskSpaceStudyPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const copy = rp003Copy[locale];

  return (
    <>
      <SiteHeader locale={locale} copy={getCopy(locale)} mode="research" />
      <main id="main" className="research-page research-study-page">
        <section
          className="technical-panel research-study-hero"
          data-section="RCS-RP-003"
        >
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="hero-lead">{copy.abstract}</p>
          <div className="study-actions">
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003.pdf"
              download
            >
              {copy.report}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-Package_v2.0.zip"
              download
            >
              {copy.package}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003.docx"
              download
            >
              {copy.editableReport}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-method.md"
              download
            >
              {copy.source}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-results.csv"
              download
            >
              {copy.data}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-data.xlsx"
              download
            >
              {copy.workbook}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-summary-by-case.csv"
              download
            >
              {copy.caseSummary}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-corpus-manifest.csv"
              download
            >
              {copy.manifest}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-reproduce.ps1"
              download
            >
              {copy.reproduce}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="mechanical-button"
              href="/research/RCS-RP-003-sources.csv"
              download
            >
              {copy.sourcesRegister}
              <span aria-hidden="true">↓</span>
            </a>
            <Link className="mechanical-button" href={`/${locale}/research`}>
              {copy.back}
              <span aria-hidden="true">↖</span>
            </Link>
          </div>
          <div className="study-facts">
            <article>
              <span>{copy.method}</span>
              <p>{copy.environment}</p>
            </article>
            <article>
              <span>{copy.date}</span>
              <p>
                <strong>{copy.reservedDoi}</strong>
                <br />
                {copy.doiNotice}
              </p>
            </article>
          </div>
          <div className="study-question">
            <span>{copy.questionLabel}</span>
            <p>{copy.question}</p>
          </div>
        </section>

        <section className="technical-panel" data-section="RESULTS">
          <div className="section-heading">
            <p className="eyebrow">RCS // EVIDENCE · MEASURED</p>
            <h2>{copy.resultsTitle}</h2>
          </div>
          <div
            className="study-table-wrap"
            role="region"
            aria-label={copy.resultsTitle}
            tabIndex={0}
          >
            <table className="study-results-table">
              <thead>
                <tr>
                  <th scope="col">{copy.caseLabel}</th>
                  <th scope="col">{copy.inputLabel}</th>
                  <th scope="col">{copy.zipLabel}</th>
                  <th scope="col">{copy.zipDeltaLabel}</th>
                  <th scope="col">{copy.ntfsStoredLabel}</th>
                  <th scope="col">{copy.ntfsDeltaLabel}</th>
                </tr>
              </thead>
              <tbody>
                {rp003Results.map((row) => (
                  <tr key={row.key}>
                    <th scope="row">{row.name[locale]}</th>
                    <td>{row.input}</td>
                    <td>{row.zip}</td>
                    <td>{row.zipDelta}</td>
                    <td>{row.ntfs}</td>
                    <td>{row.ntfsDelta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figure className="study-figure">
            <Image
              src="/research/RCS-RP-003-Silesia-ratio.png"
              alt={copy.figureCaption}
              width={1900}
              height={1000}
              sizes="(max-width: 900px) 100vw, 80vw"
            />
            <figcaption>{copy.figureCaption}</figcaption>
          </figure>
          <p className="study-method-note">{copy.resultsNote}</p>
        </section>

        {copy.sections.map((section, index) => (
          <section
            className="technical-panel study-content-section"
            data-section={`0${index + 1}`}
            id={section.id}
            key={section.id}
          >
            <div className="section-heading">
              <p className="eyebrow">RCS-RP-003 // 0{index + 1}</p>
              <h2>{section.title}</h2>
            </div>
            <div className="study-prose">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section
          className="technical-panel study-content-section"
          data-section="SOURCES"
          id="sources"
        >
          <div className="section-heading">
            <p className="eyebrow">RCS // REFERENCES</p>
            <h2>{copy.sourcesTitle}</h2>
          </div>
          <ol className="study-sources">
            {copy.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <footer className="site-footer">
        <span>{copy.footerNote}</span>
        <span>RAIJU CLOUD SYSTEM</span>
        <span>HUMAN VALIDATION REQUIRED</span>
      </footer>
    </>
  );
}
