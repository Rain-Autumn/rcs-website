import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { TeamMemberForm } from "@/components/team/TeamMemberForm";
import { founder, localizedMember, teamCopy } from "@/content/team";
import { getCopy, isLocale, type Locale } from "@/content/i18n";
import { loadTeamMembers } from "@/lib/team-members";
import { socialMetadata } from "@/lib/site-metadata";
import { teamStructuredData } from "@/lib/structured-data";

type PageProps = { params: Promise<{ locale: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = teamCopy[locale];
  const social = socialMetadata({
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    path: `/${locale}/team`,
    locale: getCopy(locale).metadata.ogLocale,
  });
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: `/${locale}/team`,
      languages: {
        "fr-BE": "/fr/team",
        en: "/en/team",
        "nl-BE": "/nl/team",
        "x-default": "/en/team",
      },
    },
    ...social,
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const copy = teamCopy[locale];
  const members = [founder, ...(await loadTeamMembers())].map((member) =>
    localizedMember(member, locale),
  );

  return (
    <>
      <StructuredData data={teamStructuredData(locale, members)} />
      <SiteHeader locale={locale} copy={getCopy(locale)} mode="team" />
      <main id="main" className="team-page">
        <section className="technical-panel team-hero" data-section="RCS-T">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="hero-lead">{copy.lead}</p>
            <Link className="mechanical-button" href={`/${locale}`}>
              {copy.back}
              <span aria-hidden="true">↖</span>
            </Link>
          </div>
          <div className="research-principles team-principles">
            <span>RCS / PEOPLE</span>
            <h2>{copy.principlesTitle}</h2>
            <ol>
              {copy.principles.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="technical-panel" data-section="01">
          <div className="section-heading">
            <p className="eyebrow">{copy.directoryEyebrow}</p>
            <h2>{copy.directoryTitle}</h2>
            <p className="section-lead">{copy.directoryLead}</p>
          </div>
          <div className="team-directory">
            {members.map((member) => (
              <article className="team-member" key={member.id}>
                <div className="team-member-identity">
                  <div
                    className={
                      member.id === "RCS-TM-001"
                        ? "team-member-mark team-member-mark--arkenstone"
                        : "team-member-mark"
                    }
                    aria-hidden="true"
                  >
                    {member.id === "RCS-TM-001" ? (
                      <Image
                        src="/icons/raiju-dragon-vector.svg"
                        alt=""
                        width={113}
                        height={121}
                      />
                    ) : (
                      <span>
                        {member.name
                          .split(/\s+/)
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="team-member-code">
                      {member.id}
                      {" // "}
                      {copy.type[member.type]}
                    </p>
                    <h3>{member.name}</h3>
                    <strong>{member.role}</strong>
                    {member.orcid && (
                      <a
                        className="team-member-orcid"
                        href={member.orcid}
                        target="_blank"
                        rel="noopener noreferrer me"
                      >
                        ORCID iD {member.orcid.split("/").at(-1)} ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="team-member-bio">{member.bio}</p>
                <div>
                  <small>{copy.specialties}</small>
                  <div className="technology-strip">
                    {member.specialties.map((specialty) => (
                      <span key={specialty}>{specialty}</span>
                    ))}
                  </div>
                </div>
                <div className="team-certifications">
                  {member.certifications.length ? (
                    <details className="team-certifications-disclosure">
                      <summary>
                        <span className="team-certifications-label">
                          {copy.certifications}
                        </span>
                        <span className="team-certifications-count">
                          {String(member.certifications.length).padStart(
                            2,
                            "0",
                          )}
                        </span>
                        <span className="team-certifications-toggle">
                          <span className="team-certifications-closed">
                            {copy.showCertifications}
                          </span>
                          <span className="team-certifications-open">
                            {copy.hideCertifications}
                          </span>
                          <i aria-hidden="true">⌄</i>
                        </span>
                      </summary>
                      <div className="team-cert-list">
                        {member.certifications.map((certification, index) => (
                          <article
                            key={`${certification.provider}-${certification.title}`}
                          >
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <div>
                              <strong>{certification.title}</strong>
                              <p>{certification.provider}</p>
                              <small>
                                {copy.issued}
                                {" // "}
                                {certification.issued}
                                {certification.credentialId
                                  ? ` · ${copy.credential} // ${certification.credentialId}`
                                  : ""}
                              </small>
                            </div>
                            {certification.credentialUrl && (
                              <a
                                href={certification.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={certification.title}
                              >
                                ↗
                              </a>
                            )}
                          </article>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <p>{copy.noCertifications}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="technical-panel team-admin" data-section="02">
          <div className="section-heading">
            <p className="eyebrow">{copy.adminEyebrow}</p>
            <h2>{copy.adminTitle}</h2>
            <p className="section-lead">{copy.adminLead}</p>
          </div>
          <TeamMemberForm locale={locale} />
        </section>
      </main>
      <footer className="site-footer">
        <span>RAIJU CLOUD SYSTEM</span>
        <span>RCS TEAM</span>
        <span>VERIFIED HUMAN STRUCTURE</span>
      </footer>
    </>
  );
}
