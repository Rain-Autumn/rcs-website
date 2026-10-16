import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/content/i18n";
import { ResearchProposalForm } from "@/components/research/ResearchProposalForm";
import { TeamMemberForm } from "@/components/team/TeamMemberForm";

export const metadata: Metadata = {
  title: "RCS — Administration",
  robots: { index: false, follow: false },
};
export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = {
    fr: [
      "Retour au site",
      "Publication d’une recherche",
      "Gestion de l’équipe",
    ],
    en: ["Back to the website", "Publish research", "Team management"],
    nl: ["Terug naar de website", "Onderzoek publiceren", "Teambeheer"],
  }[locale];
  return (
    <main className="research-page">
      <section className="technical-panel">
        <Link href={`/${locale}`}>{labels[0]} ↗</Link>
        <h1>RCS — Administration</h1>
        <p>Accès réservé / Restricted access</p>
      </section>
      <section className="technical-panel">
        <h2>{labels[1]}</h2>
        <ResearchProposalForm locale={locale} />
      </section>
      <section className="technical-panel">
        <h2>{labels[2]}</h2>
        <TeamMemberForm locale={locale} />
      </section>
    </main>
  );
}
