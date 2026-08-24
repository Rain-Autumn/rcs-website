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
    {
      code: "02",
      label: "EVIDENCE ENGINE",
      mode: "squadron",
      path: "/evidence-engine",
    },
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
    {
      code: "02",
      label: "EVIDENCE ENGINE",
      mode: "squadron",
      path: "/evidence-engine",
    },
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
    {
      code: "02",
      label: "EVIDENCE ENGINE",
      mode: "squadron",
      path: "/evidence-engine",
    },
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
      "Découvrez RCS, son architecture technique, son Evidence Engine supervisé, ses recherches et son équipe.",
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
        code: "RCS-EE",
        title: "RCS Evidence Engine",
        summary:
          "Un moteur cloud où Dragon One coordonne des analyses spécialisées, confronte les éléments de preuve et expose les incertitudes sous supervision humaine.",
        status: "MOTEUR EXPÉRIMENTAL ACTIF",
        action: "DÉCOUVRIR EVIDENCE ENGINE",
        path: "/evidence-engine",
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
      "Discover RCS, its technical architecture, supervised Evidence Engine, research programme and team.",
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
        code: "RCS-EE",
        title: "RCS Evidence Engine",
        summary:
          "A cloud engine where Dragon One coordinates specialised analysis, challenges evidence and exposes uncertainty under human supervision.",
        status: "LIVE EXPERIMENTAL ENGINE",
        action: "DISCOVER EVIDENCE ENGINE",
        path: "/evidence-engine",
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
      "Ontdek RCS, de technische architectuur, de Evidence Engine onder toezicht, het onderzoeksprogramma en het team.",
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
        code: "RCS-EE",
        title: "RCS Evidence Engine",
        summary:
          "Een cloudengine waarin Dragon One gespecialiseerde analyses coördineert, bewijselementen betwist en onzekerheid toont onder menselijk toezicht.",
        status: "ACTIEVE EXPERIMENTELE ENGINE",
        action: "ONTDEK EVIDENCE ENGINE",
        path: "/evidence-engine",
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

type EvidenceEngineCopy = {
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

export const evidenceEngineCopy: Record<Locale, EvidenceEngineCopy> = {
  fr: {
    metadataTitle: "RCS Evidence Engine — Analyse multi-agent supervisée",
    metadataDescription:
      "Découvrez et testez Dragon One, l’interface publique de RCS Evidence Engine pour coordonner, confronter et restituer des analyses sous supervision humaine.",
    eyebrow: "RCS // EVIDENCE ENGINE",
    title: "L’IA coordonnée. Sous contrôle humain.",
    lead: "Dragon One reçoit la demande, crée jusqu’à deux spécialistes éphémères adaptés à l’objectif, assemble leurs dossiers puis soumet l’artefact exact à Dragon Two avant de répondre.",
    status: "EVIDENCE ENGINE ACTIF",
    demoAction: "ESSAYER DRAGON ONE",
    back: "RETOUR À L’ACCUEIL",
    architectureEyebrow: "01 // ARCHITECTURE",
    architectureTitle:
      "Un coordinateur. Des spécialistes à la demande. Un verrou.",
    architectureLead:
      "Dragon One reste le seul point d’entrée public. Les spécialistes éphémères et Dragon Two sont privés et ne dialoguent jamais avec l’utilisateur final.",
    coordinator: {
      role: "INTERFAÇAGE & ORCHESTRATION",
      summary:
        "Analyse l’objectif, planifie une délégation bornée, assemble les dossiers et construit la seule réponse visible par l’utilisateur.",
    },
    specialists: [
      {
        code: "E-01 / E-02",
        name: "Agents éphémères",
        role: "SPÉCIALISATION DYNAMIQUE",
        summary:
          "Une ou deux instances reçoivent une spécialité et une mission limitées à la requête, puis sont libérées après leur dossier.",
      },
      {
        code: "D-02",
        name: "Dragon Two",
        role: "CONTRADICTION",
        summary:
          "Audite l’artefact verrouillé, exige les preuves utiles et rend un verdict catégorique avant la synthèse de Dragon One.",
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
          "Un ou deux agents éphémères travaillent séparément sur une mission limitée.",
      },
      {
        title: "VERROU",
        summary:
          "Dragon Two classe l’artefact comme vérifié, non vérifié ou rejeté et précise les éléments à confirmer.",
      },
      {
        title: "RESTITUTION",
        summary:
          "Dragon One synthétise une réponse compréhensible et expose les incertitudes.",
      },
    ],
    limitsTitle: "Transparence de l’Evidence Engine",
    limits: [
      "Mémoire de conversation volontairement volatile.",
      "Capacité quotidienne limitée pour maîtriser les ressources.",
      "Une source Web ne devient jamais une vérité automatique ; une piste non vérifiée reste explicitement présentée comme telle.",
      "La validation finale et les actions sensibles restent humaines.",
    ],
    demoTitle: "Accéder à Dragon One.",
    demoLead:
      "RCS Evidence Engine fonctionne actuellement sur Cloudflare Workers AI. Il peut créer jusqu’à deux spécialistes logiques pour une requête, puis mobiliser Dragon Two comme contradicteur privé.",
    demoNotice:
      "Service expérimental · aucune action externe autonome · quotas et protections anti-abus actifs",
  },
  en: {
    metadataTitle: "RCS Evidence Engine — Supervised multi-agent analysis",
    metadataDescription:
      "Discover and test Dragon One, the public interface to RCS Evidence Engine for coordinating, challenging and delivering analysis under human supervision.",
    eyebrow: "RCS // EVIDENCE ENGINE",
    title: "Coordinated AI. Under human control.",
    lead: "Dragon One receives the request, creates up to two ephemeral specialists tailored to the objective, assembles their dossiers and submits the exact artifact to Dragon Two before answering.",
    status: "EVIDENCE ENGINE ONLINE",
    demoAction: "TRY DRAGON ONE",
    back: "BACK TO HOME",
    architectureEyebrow: "01 // ARCHITECTURE",
    architectureTitle: "One coordinator. Specialists on demand. One lock.",
    architectureLead:
      "Dragon One remains the only public entry point. Ephemeral specialists and Dragon Two are private and never communicate with the end user.",
    coordinator: {
      role: "INTERFACE & ORCHESTRATION",
      summary:
        "Analyses the objective, plans bounded delegation, assembles dossiers and builds the only answer visible to the user.",
    },
    specialists: [
      {
        code: "E-01 / E-02",
        name: "Ephemeral agents",
        role: "DYNAMIC SPECIALISATION",
        summary:
          "One or two instances receive a specialty and mission limited to the request, then are released after returning their dossier.",
      },
      {
        code: "D-02",
        name: "Dragon Two",
        role: "CHALLENGE",
        summary:
          "Audits the locked artifact, requires sufficient evidence and returns a categorical verdict before Dragon One synthesises the answer.",
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
        summary:
          "One or two ephemeral agents work separately on a limited mission.",
      },
      {
        title: "LOCK",
        summary:
          "Dragon Two classifies the artifact as verified, unverified or rejected and identifies what still requires confirmation.",
      },
      {
        title: "DELIVER",
        summary:
          "Dragon One produces a readable answer and exposes uncertainty.",
      },
    ],
    limitsTitle: "Evidence Engine transparency",
    limits: [
      "Conversation memory is intentionally volatile.",
      "Daily capacity is limited to control resources.",
      "A Web source never becomes automatic truth; an unverified lead remains explicitly labelled as such.",
      "Final validation and sensitive actions remain human.",
    ],
    demoTitle: "Access Dragon One.",
    demoLead:
      "RCS Evidence Engine currently runs on Cloudflare Workers AI. It can create up to two logical specialists for one request, then involve Dragon Two as its private challenger.",
    demoNotice:
      "Experimental service · no autonomous external action · quotas and anti-abuse controls active",
  },
  nl: {
    metadataTitle: "RCS Evidence Engine — Multi-agentanalyse onder toezicht",
    metadataDescription:
      "Ontdek en test Dragon One, de publieke interface van RCS Evidence Engine voor gecoördineerde, betwiste en begrijpelijke analyses onder menselijk toezicht.",
    eyebrow: "RCS // EVIDENCE ENGINE",
    title: "Gecoördineerde AI. Onder menselijk toezicht.",
    lead: "Dragon One ontvangt de vraag, maakt maximaal twee tijdelijke specialisten op maat van het doel, bundelt hun dossiers en legt het exacte artefact voor aan Dragon Two voordat hij antwoordt.",
    status: "EVIDENCE ENGINE ACTIEF",
    demoAction: "PROBEER DRAGON ONE",
    back: "TERUG NAAR START",
    architectureEyebrow: "01 // ARCHITECTUUR",
    architectureTitle: "Eén coördinator. Specialisten op aanvraag. Eén slot.",
    architectureLead:
      "Dragon One blijft het enige publieke toegangspunt. Tijdelijke specialisten en Dragon Two zijn privé en spreken nooit met de eindgebruiker.",
    coordinator: {
      role: "INTERFACE & ORKESTRATIE",
      summary:
        "Analyseert het doel, plant een begrensde delegatie, bundelt dossiers en bouwt het enige antwoord dat de gebruiker ziet.",
    },
    specialists: [
      {
        code: "E-01 / E-02",
        name: "Tijdelijke agenten",
        role: "DYNAMISCHE SPECIALISATIE",
        summary:
          "Eén of twee instanties krijgen een specialiteit en missie die tot de aanvraag beperkt zijn en worden na hun dossier vrijgegeven.",
      },
      {
        code: "D-02",
        name: "Dragon Two",
        role: "TEGENSPRAAK",
        summary:
          "Controleert het vergrendelde artefact, eist voldoende bewijs en geeft een categorisch oordeel vóór de synthese van Dragon One.",
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
          "Eén of twee tijdelijke agenten werken afzonderlijk aan een beperkte missie.",
      },
      {
        title: "VERGRENDELEN",
        summary:
          "Dragon Two classificeert het artefact als geverifieerd, niet geverifieerd of verworpen en benoemt wat nog bevestigd moet worden.",
      },
      {
        title: "OPLEVEREN",
        summary:
          "Dragon One maakt een leesbaar antwoord en toont de onzekerheden.",
      },
    ],
    limitsTitle: "Transparantie van de Evidence Engine",
    limits: [
      "Het gespreksgeheugen is bewust vluchtig.",
      "De dagelijkse capaciteit is beperkt om middelen te beheersen.",
      "Een webbron wordt nooit automatisch waarheid; een niet-geverifieerd spoor blijft duidelijk als zodanig aangeduid.",
      "Eindvalidatie en gevoelige acties blijven menselijk.",
    ],
    demoTitle: "Open Dragon One.",
    demoLead:
      "RCS Evidence Engine draait momenteel op Cloudflare Workers AI. Het kan maximaal twee logische specialisten voor één aanvraag maken en daarna Dragon Two als private tegenspreker inschakelen.",
    demoNotice:
      "Experimentele dienst · geen autonome externe acties · quota en anti-misbruikbeveiliging actief",
  },
};
