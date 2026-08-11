import type { Locale } from "@/content/i18n";
import type { StoredResearch } from "@/lib/research-publications";
import type { ResearchProject } from "@/types/research";
import type { TeamMember } from "@/types/team";
import { RCS_SITE_URL } from "@/lib/site-metadata";

const language: Record<Locale, string> = {
  fr: "fr-BE",
  en: "en",
  nl: "nl-BE",
};

const organizationId = `${RCS_SITE_URL}/#organization`;
const websiteId = `${RCS_SITE_URL}/#website`;
const founderId = `${RCS_SITE_URL}/fr/team#RCS-TM-001`;

export function coreStructuredData(locale: Locale) {
  const pageUrl = `${RCS_SITE_URL}/${locale}/presentation`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Raiju Cloud System",
        alternateName: "RCS",
        url: RCS_SITE_URL,
        logo: `${RCS_SITE_URL}/icons/raiju-dragon-vector.svg`,
        email: "contact@raijucloudsystem.com",
        founder: { "@id": founderId },
        sameAs: ["https://github.com/Rain-Autumn/rcs-website"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Raiju Cloud System",
        alternateName: "RCS",
        url: RCS_SITE_URL,
        inLanguage: ["fr-BE", "en", "nl-BE"],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Raiju Cloud System",
        inLanguage: language[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
      },
    ],
  };
}

export function hubStructuredData(locale: Locale, description: string) {
  const pageUrl = `${RCS_SITE_URL}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Raiju Cloud System",
        alternateName: "RCS",
        url: RCS_SITE_URL,
        logo: `${RCS_SITE_URL}/icons/raiju-dragon-vector.svg`,
        email: "contact@raijucloudsystem.com",
        founder: { "@id": founderId },
        sameAs: ["https://github.com/Rain-Autumn/rcs-website"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Raiju Cloud System",
        alternateName: "RCS",
        url: RCS_SITE_URL,
        inLanguage: ["fr-BE", "en", "nl-BE"],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Raiju Cloud System",
        description,
        inLanguage: language[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        hasPart: [
          `${pageUrl}/presentation`,
          `${pageUrl}/squadron`,
          `${pageUrl}/research`,
          `${pageUrl}/team`,
        ].map((url) => ({ "@type": "WebPage", url })),
      },
    ],
  };
}

export function squadronStructuredData(
  locale: Locale,
  description: string,
  applicationUrl: string,
) {
  const pageUrl = `${RCS_SITE_URL}/${locale}/squadron`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "RCS AI Squadron",
        description,
        inLanguage: language[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": `${pageUrl}#application` },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#application`,
        name: "Dragon One — RCS AI Squadron",
        description,
        url: applicationUrl,
        applicationCategory: "Artificial Intelligence",
        browserRequirements: "JavaScript",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        creator: { "@id": organizationId },
      },
    ],
  };
}

export function portalStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Raiju Cloud System",
        alternateName: "RCS",
        url: RCS_SITE_URL,
        logo: `${RCS_SITE_URL}/icons/raiju-dragon-vector.svg`,
        email: "contact@raijucloudsystem.com",
        founder: { "@id": founderId },
        sameAs: ["https://github.com/Rain-Autumn/rcs-website"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Raiju Cloud System",
        alternateName: "RCS",
        url: RCS_SITE_URL,
        inLanguage: ["fr-BE", "en", "nl-BE"],
        publisher: { "@id": organizationId },
      },
    ],
  };
}

type LocalizedMember = TeamMember & { role: string; bio: string };

export function teamStructuredData(locale: Locale, members: LocalizedMember[]) {
  const pageUrl = `${RCS_SITE_URL}/${locale}/team`;
  const people = members.map((member) => ({
    "@type": "Person",
    "@id": `${pageUrl}#${member.id}`,
    identifier: member.id,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: pageUrl,
    memberOf: { "@id": organizationId },
    knowsAbout: member.specialties,
    ...(member.certifications.length
      ? {
          hasCredential: member.certifications.map((certification) => ({
            "@type": "EducationalOccupationalCredential",
            name: certification.title,
            dateCreated: certification.issued,
            recognizedBy: {
              "@type": "Organization",
              name: certification.provider,
            },
            ...(certification.credentialId
              ? { identifier: certification.credentialId }
              : {}),
            ...(certification.credentialUrl
              ? { url: certification.credentialUrl }
              : {}),
          })),
        }
      : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "RCS Team",
        inLanguage: language[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: people.length,
          itemListElement: people.map((person, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@id": person["@id"] },
          })),
        },
      },
      ...people,
    ],
  };
}

export function researchStructuredData(
  locale: Locale,
  projects: ResearchProject[],
  publications: StoredResearch[],
) {
  const pageUrl = `${RCS_SITE_URL}/${locale}/research`;
  const planned = projects.map((project) => ({
    "@type": "CreativeWork",
    "@id": `${pageUrl}#${project.id}`,
    identifier: project.id,
    name: project.title,
    abstract: project.question,
    description: project.summary,
    creativeWorkStatus: project.status,
    about: project.topics,
    inLanguage: language[locale],
    publisher: { "@id": organizationId },
  }));
  const published = publications.map((publication) => ({
    "@type": "ScholarlyArticle",
    "@id": `${pageUrl}#${publication.id}`,
    identifier: publication.id,
    headline: publication.title,
    abstract: publication.question,
    description: publication.conclusion,
    creativeWorkStatus: publication.status,
    datePublished: publication.createdAt,
    inLanguage: language[locale],
    publisher: { "@id": organizationId },
    encoding: {
      "@type": "MediaObject",
      encodingFormat: "application/pdf",
      contentUrl: `${RCS_SITE_URL}/api/research-files/${publication.id}`,
    },
  }));
  const works = [...planned, ...published];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "RCS Research",
        inLanguage: language[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: works.length,
          itemListElement: works.map((work, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@id": work["@id"] },
          })),
        },
      },
      ...works,
    ],
  };
}
