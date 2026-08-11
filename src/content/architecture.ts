import type { Locale } from "@/content/i18n";

export type SiteMode =
  "hub" | "presentation" | "squadron" | "research" | "team";

type SectionLink = {
  code: string;
  label: string;
  mode: SiteMode;
  path: string;
};

export const sectionNavigation: Record<Locale, SectionLink[]> = {
  fr: [
    { code: "00", label: "ACCUEIL", mode: "hub", path: "" },
    {
      code: "01",
      label: "PRÉSENTATION",
      mode: "presentation",
      path: "/presentation",
    },
    { code: "02", label: "ESCADRON", mode: "squadron", path: "/squadron" },
    { code: "03", label: "RECHERCHE", mode: "research", path: "/research" },
    { code: "04", label: "ÉQUIPE", mode: "team", path: "/team" },
  ],
  en: [
    { code: "00", label: "HOME", mode: "hub", path: "" },
    {
      code: "01",
      label: "PRESENTATION",
      mode: "presentation",
      path: "/presentation",
    },
    { code: "02", label: "SQUADRON", mode: "squadron", path: "/squadron" },
    { code: "03", label: "RESEARCH", mode: "research", path: "/research" },
    { code: "04", label: "TEAM", mode: "team", path: "/team" },
  ],
  nl: [
    { code: "00", label: "START", mode: "hub", path: "" },
    {
      code: "01",
      label: "PRESENTATIE",
      mode: "presentation",
      path: "/presentation",
    },
    { code: "02", label: "ESKADER", mode: "squadron", path: "/squadron" },
    { code: "03", label: "ONDERZOEK", mode: "research", path: "/research" },
    { code: "04", label: "TEAM", mode: "team", path: "/team" },
  ],
};

type HubCard = {
  code: string;
  title: string;
  summary: string;
  status: string;
  action: string;
  path: string;
};

type HubCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  directoryEyebrow: string;
  directoryTitle: string;
  directoryLead: string;
  cards: HubCard[];
  principles: Array<{ label: string; value: string }>;
  footer: string;
};

export const hubCopy: Record<Locale, HubCopy> = {
  fr: {
    metadataTitle: "Raiju Cloud System — Systèmes, cloud, IA et recherche",
    metadataDescription:
      "Découvrez RCS, son architecture technique, son escadron d’intelligence artificielle supervisée, ses recherches et son équipe.",
    eyebrow: "RCS // SYSTEM DIRECTORY",
    title: "Un système. Quatre espaces.",
    lead: "Raiju Cloud System réunit ingénierie web, infrastructure cloud, intelligence artificielle supervisée et recherche documentée dans une structure unique, lisible et vérifiable.",
    directoryEyebrow: "01 // NAVIGATION PRINCIPALE",
    directoryTitle: "Choisissez votre point d’entrée.",
    directoryLead:
      "Chaque espace possède sa propre mission, ses propres contenus et une adresse permanente.",
    cards: [
      {
        code: "RCS-C",
        title: "RCS en détail",
        summary:
          "L’identité, les divisions, l’infrastructure, les systèmes web, l’IA et les projets qui structurent RCS.",
        status: "DOCUMENTATION",
        action: "OUVRIR LA PRÉSENTATION",
        path: "/presentation",
      },
      {
        code: "RCS-AI",
        title: "Escadron IA",
        summary:
          "Un démonstrateur cloud où Dragon One coordonne des agents spécialisés sous supervision humaine.",
        status: "DÉMONSTRATEUR ACTIF",
        action: "DÉCOUVRIR L’ESCADRON",
        path: "/squadron",
      },
      {
        code: "RCS-R",
        title: "Research",
        summary:
          "Des travaux techniques structurés autour d’une question, d’une méthode, de preuves et de limites explicites.",
        status: "PROGRAMME OUVERT",
        action: "CONSULTER LA RECHERCHE",
        path: "/research",
      },
      {
        code: "RCS-T",
        title: "Team",
        summary:
          "Les personnes qui construisent et représentent RCS, leurs domaines d’expertise et leurs certifications.",
        status: "ANNUAIRE VÉRIFIÉ",
        action: "VOIR L’ÉQUIPE",
        path: "/team",
      },
    ],
    principles: [
      { label: "INFRASTRUCTURE", value: "OVH · DEBIAN · CLOUDFLARE" },
      { label: "MÉTHODE", value: "DOCUMENTATION · TEST · TRAÇABILITÉ" },
      { label: "GOUVERNANCE", value: "SUPERVISION HUMAINE" },
    ],
    footer: "SYSTÈMES · RECHERCHE · CONTRÔLE HUMAIN",
  },
  en: {
    metadataTitle: "Raiju Cloud System — Systems, cloud, AI and research",
    metadataDescription:
      "Discover RCS, its technical architecture, supervised AI squadron, research programme and team.",
    eyebrow: "RCS // SYSTEM DIRECTORY",
    title: "One system. Four spaces.",
    lead: "Raiju Cloud System brings together web engineering, cloud infrastructure, supervised artificial intelligence and documented research in one readable and verifiable structure.",
    directoryEyebrow: "01 // PRIMARY NAVIGATION",
    directoryTitle: "Choose your entry point.",
    directoryLead:
      "Each space has its own mission, content and permanent address.",
    cards: [
      {
        code: "RCS-C",
        title: "RCS in detail",
        summary:
          "The identity, divisions, infrastructure, web systems, AI and projects that structure RCS.",
        status: "DOCUMENTATION",
        action: "OPEN PRESENTATION",
        path: "/presentation",
      },
      {
        code: "RCS-AI",
        title: "AI Squadron",
        summary:
          "A cloud demonstrator where Dragon One coordinates specialised agents under human supervision.",
        status: "LIVE DEMONSTRATOR",
        action: "DISCOVER THE SQUADRON",
        path: "/squadron",
      },
      {
        code: "RCS-R",
        title: "Research",
        summary:
          "Technical work structured around a question, a method, evidence and explicit limitations.",
        status: "OPEN PROGRAMME",
        action: "EXPLORE RESEARCH",
        path: "/research",
      },
      {
        code: "RCS-T",
        title: "Team",
        summary:
          "The people who build and represent RCS, their areas of expertise and certifications.",
        status: "VERIFIED DIRECTORY",
        action: "MEET THE TEAM",
        path: "/team",
      },
    ],
    principles: [
      { label: "INFRASTRUCTURE", value: "OVH · DEBIAN · CLOUDFLARE" },
      { label: "METHOD", value: "DOCUMENTATION · TESTING · TRACEABILITY" },
      { label: "GOVERNANCE", value: "HUMAN SUPERVISION" },
    ],
    footer: "SYSTEMS · RESEARCH · HUMAN CONTROL",
  },
  nl: {
    metadataTitle: "Raiju Cloud System — Systemen, cloud, AI en onderzoek",
    metadataDescription:
      "Ontdek RCS, de technische architectuur, het AI-eskader onder toezicht, het onderzoeksprogramma en het team.",
    eyebrow: "RCS // SYSTEM DIRECTORY",
    title: "Eén systeem. Vier ruimtes.",
    lead: "Raiju Cloud System brengt webengineering, cloudinfrastructuur, kunstmatige intelligentie onder toezicht en gedocumenteerd onderzoek samen in één leesbare en verifieerbare structuur.",
    directoryEyebrow: "01 // HOOFDNAVIGATIE",
    directoryTitle: "Kies uw toegangspunt.",
    directoryLead:
      "Elke ruimte heeft een eigen opdracht, inhoud en permanent adres.",
    cards: [
      {
        code: "RCS-C",
        title: "RCS in detail",
        summary:
          "De identiteit, divisies, infrastructuur, websystemen, AI en projecten die RCS structureren.",
        status: "DOCUMENTATIE",
        action: "OPEN DE PRESENTATIE",
        path: "/presentation",
      },
      {
        code: "RCS-AI",
        title: "AI-eskader",
        summary:
          "Een clouddemonstrator waarin Dragon One gespecialiseerde agenten onder menselijk toezicht coördineert.",
        status: "ACTIEVE DEMONSTRATOR",
        action: "ONTDEK HET ESKADER",
        path: "/squadron",
      },
      {
        code: "RCS-R",
        title: "Onderzoek",
        summary:
          "Technisch werk opgebouwd rond een vraag, een methode, bewijs en expliciete beperkingen.",
        status: "OPEN PROGRAMMA",
        action: "BEKIJK HET ONDERZOEK",
        path: "/research",
      },
      {
        code: "RCS-T",
        title: "Team",
        summary:
          "De mensen die RCS bouwen en vertegenwoordigen, hun expertisegebieden en certificeringen.",
        status: "GEVERIFIEERD OVERZICHT",
        action: "BEKIJK HET TEAM",
        path: "/team",
      },
    ],
    principles: [
      { label: "INFRASTRUCTUUR", value: "OVH · DEBIAN · CLOUDFLARE" },
      { label: "METHODE", value: "DOCUMENTATIE · TESTEN · TRACEERBAARHEID" },
      { label: "BESTUUR", value: "MENSELIJK TOEZICHT" },
    ],
    footer: "SYSTEMEN · ONDERZOEK · MENSELIJKE CONTROLE",
  },
};

type SquadronCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  status: string;
  demoAction: string;
  back: string;
  architectureEyebrow: string;
  architectureTitle: string;
  architectureLead: string;
  coordinator: { role: string; summary: string };
  specialists: Array<{
    code: string;
    name: string;
    role: string;
    summary: string;
  }>;
  methodEyebrow: string;
  methodTitle: string;
  methodSteps: Array<{ title: string; summary: string }>;
  limitsTitle: string;
  limits: string[];
  demoTitle: string;
  demoLead: string;
  demoNotice: string;
};

export const squadronCopy: Record<Locale, SquadronCopy> = {
  fr: {
    metadataTitle: "Escadron IA RCS — Démonstrateur multi-agent supervisé",
    metadataDescription:
      "Découvrez et testez Dragon One, l’interface publique de l’escadron d’intelligence artificielle supervisée de RCS.",
    eyebrow: "RCS // AI SQUADRON",
    title: "L’IA coordonnée. Sous contrôle humain.",
    lead: "Dragon One reçoit la demande, sélectionne les spécialistes nécessaires, assemble leurs analyses puis soumet les affirmations à un contradicteur avant de répondre.",
    status: "DÉMONSTRATEUR CLOUD ACTIF",
    demoAction: "ESSAYER DRAGON ONE",
    back: "RETOUR À L’ACCUEIL",
    architectureEyebrow: "01 // ARCHITECTURE",
    architectureTitle: "Un rôle précis par Dragon.",
    architectureLead:
      "Les agents spécialistes restent internes : l’utilisateur dialogue uniquement avec Dragon One.",
    coordinator: {
      role: "INTERFAÇAGE & ORCHESTRATION",
      summary:
        "Analyse l’objectif, répartit le travail, contrôle les retours et construit la réponse finale.",
    },
    specialists: [
      {
        code: "D-02",
        name: "Dragon Two",
        role: "RECHERCHE FACTUELLE",
        summary:
          "Repère les faits à sourcer et distingue connaissance générale et vérification effective.",
      },
      {
        code: "D-03",
        name: "Dragon Three",
        role: "GÉNIE LOGICIEL",
        summary:
          "Analyse architecture applicative, code, contrats, erreurs, tests et maintenabilité.",
      },
      {
        code: "D-04",
        name: "Dragon Four",
        role: "CLOUD & SÉCURITÉ",
        summary:
          "Étudie infrastructure, Linux, réseau, permissions, disponibilité et frontières de confiance.",
      },
      {
        code: "D-05",
        name: "Dragon Five",
        role: "DONNÉES & MESURES",
        summary:
          "Contrôle unités, échantillons, biais, statistiques, benchmarks et reproductibilité.",
      },
      {
        code: "D-06",
        name: "Dragon Six",
        role: "CONTRADICTION",
        summary:
          "Conteste les affirmations et exige les preuves nécessaires avant validation.",
      },
    ],
    methodEyebrow: "02 // MÉTHODE",
    methodTitle: "Déléguer, confronter, restituer.",
    methodSteps: [
      {
        title: "CADRAGE",
        summary: "Dragon One détermine le besoin et les disciplines utiles.",
      },
      {
        title: "ANALYSE",
        summary:
          "Les Dragons sélectionnés travaillent séparément sur une tâche limitée.",
      },
      {
        title: "VERROU",
        summary:
          "Dragon Six vérifie la solidité des affirmations et signale les éléments à confirmer.",
      },
      {
        title: "RESTITUTION",
        summary:
          "Dragon One synthétise une réponse compréhensible et expose les incertitudes.",
      },
    ],
    limitsTitle: "Transparence du démonstrateur",
    limits: [
      "Mémoire de conversation volontairement volatile.",
      "Capacité quotidienne limitée pour maîtriser les ressources.",
      "Une piste non vérifiée reste explicitement présentée comme telle.",
      "La validation finale et les actions sensibles restent humaines.",
    ],
    demoTitle: "Accéder à Dragon One.",
    demoLead:
      "Le démonstrateur fonctionne sur Cloudflare Workers AI. Il peut mobiliser plusieurs spécialistes selon la demande.",
    demoNotice:
      "Service expérimental · aucune action externe autonome · quotas et protections anti-abus actifs",
  },
  en: {
    metadataTitle: "RCS AI Squadron — Supervised multi-agent demonstrator",
    metadataDescription:
      "Discover and test Dragon One, the public interface to the RCS supervised artificial intelligence squadron.",
    eyebrow: "RCS // AI SQUADRON",
    title: "Coordinated AI. Under human control.",
    lead: "Dragon One receives the request, selects the required specialists, assembles their analyses and submits claims to a challenger before answering.",
    status: "LIVE CLOUD DEMONSTRATOR",
    demoAction: "TRY DRAGON ONE",
    back: "BACK TO HOME",
    architectureEyebrow: "01 // ARCHITECTURE",
    architectureTitle: "One precise role per Dragon.",
    architectureLead:
      "Specialist agents remain internal: users communicate only with Dragon One.",
    coordinator: {
      role: "INTERFACE & ORCHESTRATION",
      summary:
        "Analyses the objective, distributes work, checks returns and builds the final answer.",
    },
    specialists: [
      {
        code: "D-02",
        name: "Dragon Two",
        role: "FACTUAL RESEARCH",
        summary:
          "Identifies claims requiring sources and separates general knowledge from effective verification.",
      },
      {
        code: "D-03",
        name: "Dragon Three",
        role: "SOFTWARE ENGINEERING",
        summary:
          "Analyses application architecture, code, contracts, errors, tests and maintainability.",
      },
      {
        code: "D-04",
        name: "Dragon Four",
        role: "CLOUD & SECURITY",
        summary:
          "Studies infrastructure, Linux, networking, permissions, availability and trust boundaries.",
      },
      {
        code: "D-05",
        name: "Dragon Five",
        role: "DATA & MEASUREMENT",
        summary:
          "Checks units, samples, bias, statistics, benchmarks and reproducibility.",
      },
      {
        code: "D-06",
        name: "Dragon Six",
        role: "CHALLENGE",
        summary:
          "Challenges claims and requires sufficient evidence before validation.",
      },
    ],
    methodEyebrow: "02 // METHOD",
    methodTitle: "Delegate, challenge, deliver.",
    methodSteps: [
      {
        title: "SCOPE",
        summary: "Dragon One determines the need and the relevant disciplines.",
      },
      {
        title: "ANALYSE",
        summary: "Selected Dragons work separately on a limited task.",
      },
      {
        title: "LOCK",
        summary:
          "Dragon Six checks claims and identifies what still requires confirmation.",
      },
      {
        title: "DELIVER",
        summary:
          "Dragon One produces a readable answer and exposes uncertainty.",
      },
    ],
    limitsTitle: "Demonstrator transparency",
    limits: [
      "Conversation memory is intentionally volatile.",
      "Daily capacity is limited to control resources.",
      "An unverified lead remains explicitly labelled as such.",
      "Final validation and sensitive actions remain human.",
    ],
    demoTitle: "Access Dragon One.",
    demoLead:
      "The demonstrator runs on Cloudflare Workers AI and can involve several specialists depending on the request.",
    demoNotice:
      "Experimental service · no autonomous external action · quotas and anti-abuse controls active",
  },
  nl: {
    metadataTitle: "RCS AI-eskader — Multi-agentdemonstrator onder toezicht",
    metadataDescription:
      "Ontdek en test Dragon One, de publieke interface van het AI-eskader van RCS onder menselijk toezicht.",
    eyebrow: "RCS // AI SQUADRON",
    title: "Gecoördineerde AI. Onder menselijk toezicht.",
    lead: "Dragon One ontvangt de vraag, selecteert de nodige specialisten, bundelt hun analyses en legt beweringen voor aan een tegenspreker voordat hij antwoordt.",
    status: "ACTIEVE CLOUDDEMONSTRATOR",
    demoAction: "PROBEER DRAGON ONE",
    back: "TERUG NAAR START",
    architectureEyebrow: "01 // ARCHITECTUUR",
    architectureTitle: "Eén precieze rol per Dragon.",
    architectureLead:
      "Specialistische agenten blijven intern: gebruikers spreken uitsluitend met Dragon One.",
    coordinator: {
      role: "INTERFACE & ORKESTRATIE",
      summary:
        "Analyseert het doel, verdeelt het werk, controleert resultaten en bouwt het eindantwoord.",
    },
    specialists: [
      {
        code: "D-02",
        name: "Dragon Two",
        role: "FEITENONDERZOEK",
        summary:
          "Herkent feiten die bronnen vereisen en scheidt algemene kennis van werkelijke verificatie.",
      },
      {
        code: "D-03",
        name: "Dragon Three",
        role: "SOFTWARE-ENGINEERING",
        summary:
          "Analyseert applicatiearchitectuur, code, contracten, fouten, tests en onderhoudbaarheid.",
      },
      {
        code: "D-04",
        name: "Dragon Four",
        role: "CLOUD & BEVEILIGING",
        summary:
          "Bestudeert infrastructuur, Linux, netwerken, rechten, beschikbaarheid en vertrouwensgrenzen.",
      },
      {
        code: "D-05",
        name: "Dragon Five",
        role: "DATA & METINGEN",
        summary:
          "Controleert eenheden, steekproeven, vertekening, statistiek, benchmarks en reproduceerbaarheid.",
      },
      {
        code: "D-06",
        name: "Dragon Six",
        role: "TEGENSPRAAK",
        summary: "Betwist beweringen en eist voldoende bewijs vóór validatie.",
      },
    ],
    methodEyebrow: "02 // METHODE",
    methodTitle: "Delegeren, betwisten, opleveren.",
    methodSteps: [
      {
        title: "AFBAKENEN",
        summary: "Dragon One bepaalt de behoefte en de nuttige disciplines.",
      },
      {
        title: "ANALYSEREN",
        summary:
          "Geselecteerde Dragons werken afzonderlijk aan een beperkte taak.",
      },
      {
        title: "VERGRENDELEN",
        summary:
          "Dragon Six controleert beweringen en benoemt wat nog bevestigd moet worden.",
      },
      {
        title: "OPLEVEREN",
        summary:
          "Dragon One maakt een leesbaar antwoord en toont de onzekerheden.",
      },
    ],
    limitsTitle: "Transparantie van de demonstrator",
    limits: [
      "Het gespreksgeheugen is bewust vluchtig.",
      "De dagelijkse capaciteit is beperkt om middelen te beheersen.",
      "Een niet-geverifieerd spoor blijft duidelijk als zodanig aangeduid.",
      "Eindvalidatie en gevoelige acties blijven menselijk.",
    ],
    demoTitle: "Open Dragon One.",
    demoLead:
      "De demonstrator draait op Cloudflare Workers AI en kan naargelang de vraag meerdere specialisten inschakelen.",
    demoNotice:
      "Experimentele dienst · geen autonome externe acties · quota en anti-misbruikbeveiliging actief",
  },
};
