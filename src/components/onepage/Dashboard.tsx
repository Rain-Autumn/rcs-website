import type { OnePagePublication } from "@/content/onepage";
import type { Locale } from "@/content/i18n";
import { siteFeatures } from "@/lib/site-features";
import styles from "./Dashboard.module.css";

export const dashboardCopy = {
  fr: {
    label: "Les espaces RCS",
    research: "Recherche",
    security: "Sécurité",
    researchLead: "Des méthodes, des preuves et des limites explicites.",
    library: "Explorer les recherches",
    securityLead:
      "RCS shield : une protection ciblée contre les spams et les raids Discord.",
    stage: "Validation en simulation avant activation",
    privacy: "Pas d’archivage des conversations.",
    scope: "Pas d’administration générale du serveur.",
    contact: "Parler sécurité",
    team: "Équipe",
    contactLabel: "Contact",
    empty: "Les publications sont accessibles dans la bibliothèque.",
  },
  en: {
    label: "RCS spaces",
    research: "Research",
    security: "Security",
    researchLead: "Methods, evidence and explicit limitations.",
    library: "Explore the research",
    securityLead:
      "RCS shield: focused protection against Discord spam and raids.",
    stage: "Simulation validation before activation",
    privacy: "No conversation archiving.",
    scope: "No general server administration.",
    contact: "Talk security",
    team: "Team",
    contactLabel: "Contact",
    empty: "Publications are available in the research library.",
  },
  nl: {
    label: "RCS-ruimtes",
    research: "Onderzoek",
    security: "Beveiliging",
    researchLead: "Methoden, bewijs en duidelijke beperkingen.",
    library: "Het onderzoek verkennen",
    securityLead:
      "RCS shield: gerichte bescherming tegen Discord-spam en raids.",
    stage: "Validatie in simulatie vóór activering",
    privacy: "Geen archivering van gesprekken.",
    scope: "Geen algemeen serverbeheer.",
    contact: "Over beveiliging praten",
    team: "Team",
    contactLabel: "Contact",
    empty: "Publicaties zijn beschikbaar in de onderzoeksbibliotheek.",
  },
} satisfies Record<Locale, Record<string, string>>;

function Icon({ kind }: { kind: "arrow" | "down" | "flask" | "shield" }) {
  const paths = {
    arrow: "M5 19 19 5M5 5h14v14",
    down: "M12 4v16m-6-6 6 6 6-6",
    flask: "M9 3h6M10 3v6L4 19a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3M8 14h8",
    shield: "M12 3 4 7v5c0 5 8 9 8 9s8-4 8-9V7l-8-4ZM8 12l3 3 5-6",
  };
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[kind]} />
    </svg>
  );
}

export function Dashboard({
  locale,
  publications,
}: {
  locale: Locale;
  publications: OnePagePublication[];
}) {
  const t = dashboardCopy[locale];
  return (
    <div
      className={
        siteFeatures.securitySection
          ? styles.dashboard
          : `${styles.dashboard} ${styles.researchOnly}`
      }
      role="group"
      aria-label={t.label}
      data-dashboard
    >
      <article
        className={styles.research}
        aria-labelledby="dashboard-research-title"
        data-dashboard-panel="research"
      >
        <div className={styles.panelHeading}>
          <span className={styles.kicker}>02 / RCS RESEARCH</span>
          <Icon kind="flask" />
        </div>
        <h2 id="dashboard-research-title">{t.research}</h2>
        <p className={styles.summary}>{t.researchLead}</p>
        <ul className={styles.publications}>
          {publications.slice(0, 2).map((publication) => (
            <li key={publication.id}>
              <a href={`#${publication.id}`}>
                <small>{publication.id}</small>
                <span>{publication.title}</span>
                <Icon kind="arrow" />
              </a>
            </li>
          ))}
        </ul>
        {!publications.length && <p className={styles.summary}>{t.empty}</p>}
        <a className={styles.panelLink} href="#recherches">
          {t.library}
          <Icon kind="down" />
        </a>
      </article>
      {siteFeatures.securitySection && (
        <article
          id="securite"
          className={styles.security}
          aria-labelledby="dashboard-security-title"
          data-dashboard-panel="security"
        >
          <div className={styles.panelHeading}>
            <span className={styles.kicker}>03 / RCS SHIELD</span>
            <Icon kind="shield" />
          </div>
          <h2 id="dashboard-security-title">{t.security}</h2>
          <p className={styles.summary}>{t.securityLead}</p>
          <p className={styles.stage}>{t.stage}</p>
          <ul className={styles.principles}>
            <li>{t.privacy}</li>
            <li>{t.scope}</li>
          </ul>
          <a className={styles.panelLink} href="#contact">
            {t.contact}
            <Icon kind="down" />
          </a>
        </article>
      )}
    </div>
  );
}
