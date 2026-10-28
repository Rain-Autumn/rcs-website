import type { Locale } from "@/content/i18n";
import type { ResearchProject } from "@/types/research";
import type { StoredResearch } from "@/lib/research-publications";
import { getResearchProjects } from "@/content/research";

export const EE_URL = "https://evidence-engine.raijucloudsystem.com/";
export const languages = ["fr", "en", "nl"] as const;
export const copy = {
  fr: {
    htmlLang: "fr-BE",
    title: "RCS — L’IA, de l’idée à l’expérience.",
    skip: "Aller au contenu",
    navResearch: "Recherches",
    navTeam: "Équipe",
    navContact: "Contact",
    headerChat: "Ouvrir EE",
    heroEyebrow: "RECHERCHE APPLIQUÉE · INGÉNIERIE IA",
    heroLine1: "L’IA, de l’idée",
    heroLine2: "à l’expérience.",
    heroDescription: "Utilisez Evidence Engine, notre IA expérimentale.",
    openEE: "Ouvrir Evidence Engine",
    exploreResearch: "Explorer les recherches",
    experimental: "Un projet RCS en expérimentation.",
    heroAlt:
      "Illustration filaire originale : des documents reliés à un noyau RCS et à une interface abstraite d’intelligence artificielle.",
    artCaption: "DE L’IDÉE AU SYSTÈME",
    heroBottom: "Concevoir. Expérimenter. Documenter.",
    scroll: "LA SUITE, PLUS BAS",
    libraryLabel: "BIBLIOTHÈQUE",
    researchTitle: "Les idées, à l’épreuve.",
    researchIntro:
      "Nos travaux, leurs méthodes et leurs limites. Des publications à lire, des données à explorer.",
    filterAll: "Tout",
    filterAI: "Intelligence artificielle",
    filterSystems: "Systèmes & compression",
    searchLabel: "Rechercher une publication",
    searchPlaceholder: "Rechercher une publication",
    libraryFoot: "Rapports et données accessibles sur Zenodo.",
    orcidLink: "Voir le profil ORCID",
    teamLabel: "L’ÉQUIPE",
    teamTitle: "Derrière les idées.",
    teamIntro:
      "Des parcours complémentaires, un même goût pour l’expérimentation technique.",
    huguesRole: "Fondateur · Ingénierie des systèmes",
    huguesBio:
      "Développement logiciel, infrastructure et orchestration IA. À l’origine de RCS et de ses travaux de recherche.",
    huguesCredentials: "Formations & certifications",
    jacobRole: "Membre · Cybersécurité & investigation numérique",
    jacobBio:
      "Étudiant en cybersécurité au Coleg Gwent. Investigation numérique, OSINT et expérimentation en infrastructure auto-hébergée.",
    jacobNote: "Sécurité, systèmes et IA locale.",
    contactLabel: "CONTACT",
    contactTitle: "Une idée à explorer ?",
    contactIntro:
      "Parlons recherche, intelligence artificielle ou collaboration.",
    copyEmail: "Copier l’adresse",
    backTop: "Retour en haut",
    latest: "DERNIÈRE PUBLICATION",
    readStudy: "Lire l’étude",
    readOnSite: "Lire sur le site RCS",
    categoryAI: "INTELLIGENCE ARTIFICIELLE",
    categorySystems: "SYSTÈMES & COMPRESSION",
    noResults: "Aucune publication ne correspond.",
    reset: "Réinitialiser les filtres",
    results: (n: number) =>
      `${n} publication${n > 1 ? "s" : ""} affichée${n > 1 ? "s" : ""}.`,
    copied: "Adresse copiée.",
    copyFailed: "Sélectionnez et copiez l’adresse ci-dessus.",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    navLabel: "Navigation principale",
    filtersLabel: "Filtrer les publications",
  },
  en: {
    htmlLang: "en",
    title: "RCS — AI, from idea to experiment.",
    skip: "Skip to content",
    navResearch: "Research",
    navTeam: "Team",
    navContact: "Contact",
    headerChat: "Open EE",
    heroEyebrow: "APPLIED RESEARCH · AI ENGINEERING",
    heroLine1: "AI, from idea",
    heroLine2: "to experiment.",
    heroDescription: "Try Evidence Engine, our experimental AI.",
    openEE: "Open Evidence Engine",
    exploreResearch: "Explore the research",
    experimental: "An experimental RCS project.",
    heroAlt:
      "Original wireframe illustration: documents connected to an RCS core and an abstract artificial intelligence interface.",
    artCaption: "FROM IDEA TO SYSTEM",
    heroBottom: "Design. Experiment. Document.",
    scroll: "EXPLORE BELOW",
    libraryLabel: "RESEARCH LIBRARY",
    researchTitle: "Ideas, put to the test.",
    researchIntro:
      "Our work, methods and limitations. Publications to read, data to explore.",
    filterAll: "All",
    filterAI: "Artificial intelligence",
    filterSystems: "Systems & compression",
    searchLabel: "Search publications",
    searchPlaceholder: "Search publications",
    libraryFoot: "Reports and data available on Zenodo.",
    orcidLink: "View the ORCID profile",
    teamLabel: "THE TEAM",
    teamTitle: "The people behind it.",
    teamIntro:
      "Complementary backgrounds, a shared curiosity for technical experimentation.",
    huguesRole: "Founder · Systems engineering",
    huguesBio:
      "Software development, infrastructure and AI orchestration. Founder of RCS and author of its research.",
    huguesCredentials: "Training & credentials",
    jacobRole: "Member · Cybersecurity & digital forensics",
    jacobBio:
      "Cyber Security student at Coleg Gwent. Digital forensics, OSINT and experimentation with self-hosted infrastructure.",
    jacobNote: "Security, systems and local AI.",
    contactLabel: "CONTACT",
    contactTitle: "An idea to explore?",
    contactIntro:
      "Let’s talk research, artificial intelligence or collaboration.",
    copyEmail: "Copy email address",
    backTop: "Back to top",
    latest: "LATEST PUBLICATION",
    readStudy: "Read the study",
    readOnSite: "Read on the RCS site",
    categoryAI: "ARTIFICIAL INTELLIGENCE",
    categorySystems: "SYSTEMS & COMPRESSION",
    noResults: "No matching publications.",
    reset: "Reset filters",
    results: (n: number) => `${n} publication${n !== 1 ? "s" : ""} shown.`,
    copied: "Email address copied.",
    copyFailed: "Select and copy the email address above.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navLabel: "Main navigation",
    filtersLabel: "Filter publications",
  },
  nl: {
    htmlLang: "nl-BE",
    title: "RCS — AI, van idee tot experiment.",
    skip: "Naar de inhoud",
    navResearch: "Onderzoek",
    navTeam: "Team",
    navContact: "Contact",
    headerChat: "Open EE",
    heroEyebrow: "TOEGEPAST ONDERZOEK · AI-ENGINEERING",
    heroLine1: "AI, van idee",
    heroLine2: "tot experiment.",
    heroDescription: "Gebruik Evidence Engine, onze experimentele AI.",
    openEE: "Open Evidence Engine",
    exploreResearch: "Ontdek het onderzoek",
    experimental: "Een experimenteel RCS-project.",
    heroAlt:
      "Originele draadmodelillustratie: documenten verbonden met een RCS-kern en een abstracte interface voor kunstmatige intelligentie.",
    artCaption: "VAN IDEE TOT SYSTEEM",
    heroBottom: "Ontwerpen. Experimenteren. Documenteren.",
    scroll: "ONTDEK MEER",
    libraryLabel: "BIBLIOTHEEK",
    researchTitle: "Ideeën op de proef.",
    researchIntro:
      "Ons werk, de methoden en de beperkingen. Publicaties om te lezen, data om te verkennen.",
    filterAll: "Alles",
    filterAI: "Kunstmatige intelligentie",
    filterSystems: "Systemen & compressie",
    searchLabel: "Publicaties zoeken",
    searchPlaceholder: "Publicaties zoeken",
    libraryFoot: "Rapporten en data beschikbaar op Zenodo.",
    orcidLink: "Bekijk het ORCID-profiel",
    teamLabel: "HET TEAM",
    teamTitle: "De mensen erachter.",
    teamIntro:
      "Aanvullende achtergronden, dezelfde nieuwsgierigheid naar technische experimenten.",
    huguesRole: "Oprichter · Systems engineering",
    huguesBio:
      "Softwareontwikkeling, infrastructuur en AI-orkestratie. Oprichter van RCS en auteur van het onderzoek.",
    huguesCredentials: "Opleidingen & certificeringen",
    jacobRole: "Lid · Cyberbeveiliging & digitale forensiek",
    jacobBio:
      "Student cyberbeveiliging aan Coleg Gwent. Digitale forensiek, OSINT en experimenten met zelfgehoste infrastructuur.",
    jacobNote: "Beveiliging, systemen en lokale AI.",
    contactLabel: "CONTACT",
    contactTitle: "Een idee verkennen?",
    contactIntro:
      "Laten we praten over onderzoek, kunstmatige intelligentie of samenwerking.",
    copyEmail: "E-mailadres kopiëren",
    backTop: "Naar boven",
    latest: "NIEUWSTE PUBLICATIE",
    readStudy: "Lees het onderzoek",
    readOnSite: "Lees op de RCS-site",
    categoryAI: "KUNSTMATIGE INTELLIGENTIE",
    categorySystems: "SYSTEMEN & COMPRESSIE",
    noResults: "Geen overeenkomende publicaties.",
    reset: "Filters herstellen",
    results: (n: number) => `${n} publicatie${n !== 1 ? "s" : ""} weergegeven.`,
    copied: "E-mailadres gekopieerd.",
    copyFailed: "Selecteer en kopieer het e-mailadres hierboven.",
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    navLabel: "Hoofdnavigatie",
    filtersLabel: "Publicaties filteren",
  },
};

export type PublicationCategory = "all" | "ai" | "systems";
export type PublicationArt = "home" | "agents" | "chip" | "storage";
export type OnePagePublication = {
  id: string;
  title: string;
  summary: string;
  category: Exclude<PublicationCategory, "all">;
  art: PublicationArt;
  tags: string[];
  href: string;
  localHref?: string;
  doi?: string;
  year: string;
};
export const htmlLanguages: Record<Locale, string> = {
  fr: "fr-BE",
  en: "en",
  nl: "nl-BE",
};
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function filterPublications(
  items: OnePagePublication[],
  category: PublicationCategory,
  query: string,
) {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return items.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      words.every((word) =>
        normalize(
          [
            item.id,
            item.title,
            item.summary,
            item.doi ?? "",
            ...item.tags,
          ].join(" "),
        ).includes(word),
      ),
  );
}

export function getOnePagePublications(
  locale: Locale,
  stored: StoredResearch[] = [],
): OnePagePublication[] {
  const projects = getResearchProjects(locale);
  const ids = new Set(projects.map((project) => project.id));
  const known = projects.map(
    (project: ResearchProject): OnePagePublication => ({
      id: project.id,
      title: project.title,
      summary: project.summary,
      category: ["RCS-RP-001", "RCS-RP-004"].includes(project.id)
        ? "ai"
        : "systems",
      art:
        project.id === "RCS-RP-004"
          ? "home"
          : project.id === "RCS-RP-001"
            ? "agents"
            : project.id === "RCS-RP-002"
              ? "chip"
              : "storage",
      tags: project.topics.slice(0, 3),
      href:
        project.publicationUrl ??
        (project.doi
          ? "https://doi.org/" + project.doi
          : (project.href ?? "#recherches")),
      doi: project.doi,
      localHref: project.href,
      year: project.publicationDate?.slice(0, 4) ?? "2026",
    }),
  );
  const added = stored
    .filter((item) => !ids.has(item.id as ResearchProject["id"]))
    .map((item): OnePagePublication => ({
      id: item.id,
      title: item.title,
      summary: item.conclusion,
      category: /\b(ai|ia|llm|agent|intelligence)\b/i.test(item.title)
        ? "ai"
        : "systems",
      art: "agents",
      tags: item.evidence.map((kind) => kind.toUpperCase()),
      href: "/api/research-files/" + encodeURIComponent(item.id),
      year: item.createdAt.slice(0, 4),
    }));
  return [...known, ...added].sort((a, b) => b.id.localeCompare(a.id));
}
