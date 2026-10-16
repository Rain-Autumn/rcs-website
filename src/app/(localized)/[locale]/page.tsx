import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OnePage } from "@/components/onepage/OnePage";
import "@/components/onepage/document.css";
import { StructuredData } from "@/components/seo/StructuredData";
import { copy, getOnePagePublications, htmlLanguages } from "@/content/onepage";
import { isLocale, type Locale } from "@/content/i18n";
import { localizedMember, officialTeamMembers } from "@/content/team";
import { loadResearch } from "@/lib/research-publications";
import { loadTeamMembers } from "@/lib/team-members";
import { socialMetadata } from "@/lib/site-metadata";
import { onePageStructuredData } from "@/lib/structured-data";

export const dynamic = "force-dynamic";
type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = copy[locale];
  const description = t.heroDescription + " " + t.researchIntro;
  return {
    title: t.title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "fr-BE": "/fr",
        en: "/en",
        "nl-BE": "/nl",
        "x-default": "/fr",
      },
    },
    ...socialMetadata({
      title: t.title,
      description,
      path: `/${locale}`,
      locale: htmlLanguages[locale].replace("-", "_"),
    }),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const [storedResearch, storedMembers] = await Promise.all([
    loadResearch(locale),
    loadTeamMembers(),
  ]);
  const ids = new Set(officialTeamMembers.map((member) => member.id));
  const members = [
    ...officialTeamMembers,
    ...storedMembers.filter((member) => !ids.has(member.id)),
  ].map((member) => localizedMember(member, locale));
  const publications = getOnePagePublications(locale, storedResearch);
  return (
    <>
      <StructuredData
        data={onePageStructuredData(locale, publications, members)}
      />
      <OnePage locale={locale} publications={publications} members={members} />
    </>
  );
}
