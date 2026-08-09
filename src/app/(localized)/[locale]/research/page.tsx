import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ResearchProposalForm } from '@/components/research/ResearchProposalForm';
import { StructuredData } from '@/components/seo/StructuredData';
import { getResearchProjects, researchCopy } from '@/content/research';
import { getCopy, isLocale, type Locale } from '@/content/i18n';
import { loadResearch } from '@/lib/research-publications';
import { socialMetadata } from '@/lib/site-metadata';
import { researchStructuredData } from '@/lib/structured-data';

type PageProps = { params: Promise<{ locale: string }> };
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = researchCopy[locale];
  const social = socialMetadata({ title: copy.metadataTitle, description: copy.metadataDescription, path: `/${locale}/research`, locale: getCopy(locale).metadata.ogLocale });
  return { title: copy.metadataTitle, description: copy.metadataDescription, alternates: { canonical: `/${locale}/research`, languages: { 'fr-BE': '/fr/research', en: '/en/research', 'nl-BE': '/nl/research', 'x-default': '/en/research' } }, ...social };
}

export default async function ResearchPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const copy = researchCopy[locale];
  const projects = getResearchProjects(locale);
  const publications = await loadResearch(locale);
  const adminCopy = {
    fr: ['03 // PUBLICATION', 'Publier une recherche', 'Accès réservé. Saisissez le mot de passe pour ouvrir le formulaire de publication.'],
    en: ['03 // PUBLICATION', 'Publish research', 'Restricted access. Enter the password to open the publication form.'],
    nl: ['03 // PUBLICATIE', 'Onderzoek publiceren', 'Beperkte toegang. Voer het wachtwoord in om het publicatieformulier te openen.'],
  }[locale];

  return <>
    <StructuredData data={researchStructuredData(locale, projects, publications)} />
    <SiteHeader locale={locale} copy={getCopy(locale)} mode="research" />
    <main id="main" className="research-page">
      <section className="technical-panel research-hero" data-section="RCS-R">
        <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="hero-lead">{copy.lead}</p><Link className="mechanical-button" href={`/${locale}`}>{copy.back}<span aria-hidden="true">↖</span></Link></div>
        <div className="research-principles"><span>RCS / METHODOLOGY</span><h2>{copy.principlesTitle}</h2><ol>{copy.principles.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div>
      </section>

      <section className="technical-panel" data-section="01">
        <div className="section-heading"><p className="eyebrow">{copy.catalogEyebrow}</p><h2>{copy.catalogTitle}</h2><p className="section-lead">{copy.catalogLead}</p></div>
        <div className="research-project-grid">{projects.map((project) => <article className="research-project-card" key={project.id}>
          <div className="research-project-meta"><strong>{project.id}</strong><span>{copy.status[project.status]}</span></div>
          <h3>{project.title}</h3><small>{copy.question}</small><p className="research-question">{project.question}</p><p>{project.summary}</p>
          <div className="technology-strip">{project.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
        </article>)}{publications.map((project) => <article className="research-project-card research-project-card--published" key={project.id}>
          <div className="research-project-meta"><strong>{project.id}</strong><span>{copy.status[project.status]}</span></div>
          <h3>{project.title}</h3><small>{copy.question}</small><p className="research-question">{project.question}</p><p>{project.conclusion}</p>
          <div className="technology-strip">{project.evidence.map((kind) => <span key={kind}>{kind.toUpperCase()}</span>)}</div>
          <a className="mechanical-button" href={`/api/research-files/${project.id}`}>PDF <span aria-hidden="true">↓</span></a>
        </article>)}</div>
      </section>

      <section className="technical-panel" data-section="DATA"><div className="section-heading"><p className="eyebrow">RCS // EVIDENCE</p><h2>{copy.evidenceTitle}</h2></div>
        <div className="evidence-grid">{Object.entries(copy.evidence).map(([kind, item]) => <article key={kind} data-kind={kind}><span>{item[0]}</span><p>{item[1]}</p></article>)}</div>
      </section>

      <section className="technical-panel research-support" data-section="02">
        <div className="section-heading"><p className="eyebrow">{adminCopy[0]}</p><h2>{adminCopy[1]}</h2><p className="section-lead">{adminCopy[2]}</p></div>
        <ResearchProposalForm locale={locale} />
      </section>
    </main>
    <footer className="site-footer"><span>RAIJU CLOUD SYSTEM</span><span>RCS RESEARCH</span><span>HUMAN VALIDATION REQUIRED</span></footer>
  </>;
}
