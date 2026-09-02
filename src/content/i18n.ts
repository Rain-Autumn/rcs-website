import type { AgentId, InfrastructureNodeId } from "@/types/site";

export const locales = ["fr", "en", "nl"] as const;
export type Locale = (typeof locales)[number];

export type RcsCopy = {
  locale: Locale;
  htmlLang: string;
  metadata: {
    title: string;
    description: string;
    ogLocale: string;
  };
  skipLink: string;
  menu: string;
  navLabel: string;
  languageLabel: string;
  nav: Array<{ index: string; label: string; href: string }>;
  hero: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    role: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    sceneLabel: string;
    sceneA: string;
    sceneB: string;
    sceneC: string;
    facts: Array<[string, string]>;
  };
  divisions: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Array<{
      code: string;
      title: string;
      description: string;
      capabilities: string;
    }>;
  };
  web: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Array<[string, string, string]>;
  };
  infrastructure: {
    eyebrow: string;
    title: string;
    lead: string;
    canvasLabel: string;
    flowCaption: string;
    inspector: { status: string; role: string; detail: string };
    nodes: Array<{
      id: InfrastructureNodeId;
      index: string;
      label: string;
      eyebrow: string;
      description: string;
      status: string;
      detail: string;
    }>;
    facts: Array<[string, string]>;
  };
  intelligence: {
    eyebrow: string;
    title: string;
    lead: string;
    quality: string;
    humanValidation: string;
    agents: Array<{
      id: AgentId;
      code: string;
      name: string;
      role: string;
      summary: string;
    }>;
  };
  research: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Array<[string, string, string]>;
  };
  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    techLabel: string;
    futureEyebrow: string;
    futureTitle: string;
    futureLead: string;
    items: Array<{
      code: string;
      title: string;
      status: string;
      type: string;
      description: string;
      tech: string;
    }>;
    futureItems: Array<{
      code: string;
      title: string;
      status: string;
      type: string;
      description: string;
      tech: string;
    }>;
  };
  director: {
    eyebrow: string;
    title: string;
    role: string;
    lead: string;
    body: string;
    viewCv: string;
    downloadCv: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    labels: {
      director: string;
      system: string;
      email: string;
      phone: string;
      web: string;
    };
    projectContact: string;
    technicalContact: string;
    copyEmail: string;
    copied: string;
  };
  footer: string;
};

const sharedFacts = [
  ["SYSTEM", "Debian Linux"],
  ["HOSTING", "OVH VPS"],
  ["WEB SERVER", "Nginx"],
  ["FRONT-END", "React / Next.js"],
  ["GRAPHICS", "SVG / CSS"],
  ["AI", "Supervised multi-agent"],
] as Array<[string, string]>;

export const copyByLocale: Record<Locale, RcsCopy> = {
  fr: {
    locale: "fr",
    htmlLang: "fr-BE",
    metadata: {
      title: "Raiju Cloud System | RCS Core",
      description:
        "Raiju Cloud System est une structure technologique indépendante spécialisée dans les systèmes web, l’infrastructure Linux, l’automatisation et l’intelligence artificielle supervisée.",
      ogLocale: "fr_BE",
    },
    skipLink: "Aller au contenu principal",
    menu: "MENU",
    navLabel: "Navigation principale",
    languageLabel: "Langue",
    nav: [
      { index: "01", label: "CORE", href: "#core" },
      { index: "02", label: "DIVISIONS", href: "#divisions" },
      { index: "03", label: "WEB", href: "#web" },
      { index: "04", label: "SYSTEMS", href: "#systems" },
      { index: "05", label: "AI", href: "#intelligence" },
      { index: "06", label: "RESEARCH", href: "#research" },
      { index: "07", label: "PROJECTS", href: "#projects" },
      { index: "08", label: "DIRECTOR", href: "#director" },
      { index: "09", label: "CONTACT", href: "#contact" },
    ],
    hero: {
      eyebrow: "01 // RCS CORE",
      titleTop: "RAIJU",
      titleBottom: "CLOUD SYSTEM",
      role: "TECHNOLOGY · SYSTEMS · INFRASTRUCTURE · INTELLIGENCE",
      lead: "RCS conçoit, déploie et explore des systèmes numériques : expériences web, infrastructures Linux, automatisation et workflows d’intelligence artificielle supervisés.",
      primaryCta: "EXPLORER LES CAPACITÉS",
      secondaryCta: "OUVRIR LES PROJETS",
      sceneLabel: "Emblème vectoriel du RCS Core",
      sceneA: "CORE / RCS",
      sceneB: "VECTOR / ACTIVE",
      sceneC: "RAIJU EMBLEM / CORE MARK",
      facts: sharedFacts,
    },
    divisions: {
      eyebrow: "02 // RCS DIVISIONS",
      title: "Une structure. Plusieurs domaines.",
      lead: "Raiju Cloud System organise ses travaux par capacités techniques. Chaque division correspond à un champ d’expertise réellement mobilisable, sans prétendre à une organisation artificiellement surdimensionnée.",
      items: [
        {
          code: "DIV-01",
          title: "WEB SYSTEMS",
          description:
            "Conception, refonte et développement d’interfaces et d’applications web modernes.",
          capabilities: "UX · FRONT-END · NEXT.JS · WEBGL",
        },
        {
          code: "DIV-02",
          title: "SYSTEMS & INFRASTRUCTURE",
          description:
            "Environnements Linux, VPS, services web, déploiement et exploitation.",
          capabilities: "DEBIAN · NGINX · SSH · VPS",
        },
        {
          code: "DIV-03",
          title: "AUTOMATION",
          description:
            "Scripts, workflows et intégrations destinés à réduire les tâches répétitives et fiabiliser les opérations.",
          capabilities: "SCRIPTS · WORKFLOWS · TOOLING",
        },
        {
          code: "DIV-04",
          title: "ARTIFICIAL INTELLIGENCE",
          description:
            "Orchestration multi-agent, recherche assistée, production structurée et contrôle humain.",
          capabilities: "AGENTS · ROUTING · QA · HUMAN CONTROL",
        },
        {
          code: "DIV-05",
          title: "RESEARCH / EXPERIMENTAL",
          description:
            "Prototypes, visualisations avancées, 3D web et exploration de nouvelles architectures.",
          capabilities: "R&D · THREE.JS · PROTOTYPING",
        },
      ],
    },
    web: {
      eyebrow: "03 // WEB SYSTEMS",
      title: "Des systèmes web conçus comme des produits techniques.",
      lead: "L’interface, la performance, l’accessibilité et l’architecture applicative sont traitées comme un seul système cohérent.",
      cards: [
        [
          "NEXT.JS 16",
          "Architecture applicative",
          "Routage App, rendu moderne et séparation claire entre logique serveur et interactions client.",
        ],
        [
          "REACT 19",
          "Systèmes interactifs",
          "Composants spécialisés, états maîtrisés et interfaces accessibles.",
        ],
        [
          "THREE.JS",
          "WebGL / 3D",
          "Scènes procédurales, visualisations spatiales et expériences interactives légères.",
        ],
        [
          "GSAP",
          "Motion design",
          "Transitions mécaniques, timelines et animation guidée par le scroll.",
        ],
        [
          "TYPESCRIPT",
          "Fiabilité",
          "Contrats explicites entre données, composants et comportements.",
        ],
        [
          "PLAYWRIGHT",
          "Vérification",
          "Parcours critiques contrôlés sur desktop et mobile avant mise en production.",
        ],
      ],
    },
    infrastructure: {
      eyebrow: "04 // SYSTEMS & INFRASTRUCTURE",
      title: "Du réseau public jusqu’à l’application.",
      lead: "RCS traite l’infrastructure comme une partie intégrante du système : hébergement, Linux, serveur web, déploiement, diagnostics et retour arrière.",
      canvasLabel: "Architecture serveur interactive",
      flowCaption: "INTERNET → DNS → OVH VPS → DEBIAN → NGINX → APPLICATION",
      inspector: { status: "STATUS", role: "ROLE", detail: "DETAIL" },
      nodes: [
        {
          id: "internet",
          index: "01",
          label: "INTERNET",
          eyebrow: "PUBLIC NETWORK",
          description: "Entrée publique du trafic web.",
          status: "ONLINE",
          detail: "Le visiteur atteint le domaine public via HTTPS.",
        },
        {
          id: "dns",
          index: "02",
          label: "DNS",
          eyebrow: "ROUTING",
          description: "Résolution du domaine.",
          status: "RESOLVED",
          detail:
            "Le domaine dirige la requête vers l’infrastructure hébergée.",
        },
        {
          id: "ovh",
          index: "03",
          label: "OVH VPS",
          eyebrow: "COMPUTE",
          description: "Serveur virtuel privé.",
          status: "ACTIVE",
          detail:
            "La machine héberge l’environnement Linux et les services web.",
        },
        {
          id: "debian",
          index: "04",
          label: "DEBIAN 13",
          eyebrow: "HOST OS",
          description: "Système Linux de production.",
          status: "STABLE",
          detail:
            "Administration SSH, fichiers, services, mises à jour et procédures de reprise.",
        },
        {
          id: "nginx",
          index: "05",
          label: "NGINX",
          eyebrow: "WEB SERVER",
          description: "Couche de distribution HTTP.",
          status: "SERVING",
          detail:
            "Nginx publie l’application et assure la couche web côté serveur.",
        },
        {
          id: "application",
          index: "06",
          label: "APPLICATION",
          eyebrow: "NEXT.JS / REACT",
          description: "Expérience web interactive.",
          status: "RENDERING",
          detail: "React, Next.js, SVG et CSS composent l’interface publique.",
        },
      ],
      facts: [
        ["SYSTEM", "Debian Linux"],
        ["HOSTING", "OVH VPS"],
        ["WEB SERVER", "Nginx"],
        ["DEPLOYMENT", "Linux environment"],
        ["FRONT-END", "React / Next.js"],
        ["GRAPHICS", "SVG / CSS"],
        ["MOTION", "CSS / IntersectionObserver"],
        ["AI", "Multi-agent workflows"],
      ],
    },
    intelligence: {
      eyebrow: "05 // INTELLIGENCE SYSTEMS",
      title: "Spécialisation à la demande. Contrôle humain.",
      lead: "Dragon One coordonne jusqu’à deux spécialistes éphémères créés pour la demande, puis soumet leur artefact à Dragon Two, contradicteur privé permanent.",
      quality: "QUALITY CONTROL",
      humanValidation: "HUMAN VALIDATION",
      agents: [
        {
          id: "one",
          code: "NODE 01",
          name: "Dragon One",
          role: "ORCHESTRATION",
          summary:
            "Point d’entrée public : cadrage, planification, assemblage des dossiers et restitution à l’utilisateur.",
        },
        {
          id: "ephemeral",
          code: "NODE E01 / E02",
          name: "Agents éphémères",
          role: "SPÉCIALISATION DYNAMIQUE",
          summary:
            "Une ou deux instances privées, spécialisées pour une mission bornée puis libérées après la requête.",
        },
        {
          id: "two",
          code: "NODE 02",
          name: "Dragon Two",
          role: "CONTRADICTION",
          summary:
            "Service privé permanent : audit de l’artefact exact et verdict catégorique avant synthèse.",
        },
      ],
    },
    research: {
      eyebrow: "06 // RESEARCH / EXPERIMENTAL",
      title: "Explorer avant d’industrialiser.",
      lead: "La recherche RCS sert à tester des idées, des interfaces et des architectures avant de les intégrer à un système réel.",
      items: [
        [
          "01",
          "Prototypage technique",
          "Validation rapide d’une idée, d’une interaction ou d’une architecture avant développement complet.",
        ],
        [
          "02",
          "Interfaces avancées",
          "Expériences 3D, visualisations WebGL et interfaces instrumentales lorsque leur usage est justifié.",
        ],
        [
          "03",
          "Automation & tooling",
          "Scripts et outils internes destinés à réduire les manipulations répétitives et fiabiliser les procédures.",
        ],
        [
          "04",
          "Architecture expérimentale",
          "Étude de nouveaux modèles d’intégration, de déploiement et d’orchestration.",
        ],
        [
          "05",
          "Quality engineering",
          "Tests, audits statiques, parcours E2E et stratégies de rollback pour rendre les expérimentations réversibles.",
        ],
      ],
    },
    projects: {
      eyebrow: "07 // RCS PROJECTS",
      title: "Systèmes actifs. Futurs systèmes.",
      lead: "RCS distingue les capacités en activité de ses prochains projets : des systèmes à explorer, documenter et prototyper sans les présenter comme déjà réalisés.",
      techLabel: "TECH",
      futureEyebrow: "07.A // FUTURS SYSTÈMES RCS",
      futureTitle: "Projets futurs. Conçus pour rester maîtrisés.",
      futureLead:
        "Ces six projets constituent la prochaine trajectoire de RCS. Chacun commencera par un prototype local, réversible et documenté ; aucun n'est encore en production.",
      items: [
        {
          code: "PRJ-001",
          title: "RCS Core",
          status: "ACTIVE",
          type: "INSTITUTIONAL WEB SYSTEM",
          description:
            "Interface institutionnelle multilingue de Raiju Cloud System, auto-hébergée sur environnement Linux.",
          tech: "Next.js · React · SVG · CSS · Debian · Nginx",
        },
        {
          code: "PRJ-002",
          title: "Multi-agent orchestration",
          status: "SUPERVISED",
          type: "INTELLIGENCE WORKFLOW",
          description:
            "Workflow borné avec agents éphémères, artefact structuré, contradiction privée par Dragon Two et validation humaine.",
          tech: "Ephemeral agents · Artifact lock · Dragon Two · Human validation",
        },
        {
          code: "PRJ-003",
          title: "Linux / VPS environments",
          status: "LAB / PRODUCTION",
          type: "SYSTEM OPERATIONS",
          description:
            "Administration, déploiement, permissions, diagnostics, sauvegardes et procédures de rollback.",
          tech: "SSH · Debian · Git · HTTP · Nginx · VPS",
        },
      ],
      futureItems: [
        {
          code: "FUT-001",
          title: "RCS Agent Passport",
          status: "PROJET FUTUR",
          type: "GOUVERNANCE DES AGENTS",
          description:
            "Un cadre d'identité, de permissions limitées, d'expiration, de révocation et de validation humaine pour encadrer les actions d'un agent IA.",
          tech: "Profils d'identité · Permissions bornées · Journal d'audit",
        },
        {
          code: "FUT-002",
          title: "RCS Offline Node",
          status: "PROJET FUTUR",
          type: "IA LOCALE / CONTINUITÉ",
          description:
            "Un assistant local fondé sur des documents contrôlés, utile sans Internet, lorsque la confidentialité prime ou quand le quota cloud est indisponible.",
          tech: "Modèle local · Index documentaire · Espace hors ligne",
        },
        {
          code: "FUT-003",
          title: "RCS Digital Continuity Box",
          status: "PROJET FUTUR",
          type: "RÉSILIENCE NUMÉRIQUE",
          description:
            "Une trousse locale de procédures, contacts, exports ouverts et checklists pour maintenir l'essentiel pendant une panne numérique.",
          tech: "Procédures locales · Exports ouverts · Tests de reprise",
        },
        {
          code: "FUT-004",
          title: "RCS Compute Commons",
          status: "PROJET FUTUR",
          type: "CALCUL DISTRIBUÉ CONTRÔLÉ",
          description:
            "Un environnement où des machines autorisées coopèrent sur des tâches publiques ou fictives, avec quotas, traçabilité et arrêt vérifiable.",
          tech: "Nœuds authentifiés · Quotas de ressources · Tâches vérifiables",
        },
        {
          code: "FUT-005",
          title: "RCS AI Energy Router",
          status: "PROJET FUTUR",
          type: "POLITIQUE D'EXÉCUTION IA",
          description:
            "Un routeur explicable qui compare coût, délai, confidentialité, qualité requise et énergie estimée avant de choisir un mode d'exécution.",
          tech: "Politique lisible · Simulateur local · Estimations documentées",
        },
        {
          code: "FUT-006",
          title: "RCS Passport",
          status: "PROJET FUTUR",
          type: "PORTABILITÉ DES AGENTS",
          description:
            "Un entretien guidé et un format ouvert pour décrire, exporter et faire évoluer la mission, les limites et les réglages d'un agent.",
          tech: "Entretien guidé · Export texte · Journal d'évolution",
        },
      ],
    },
    director: {
      eyebrow: "08 // DIRECTION",
      title: "Hugues Henrotte",
      role: "FOUNDER & SYSTEMS DIRECTOR",
      lead: "Raiju Cloud System est dirigé par Hugues Henrotte, avec un travail centré sur le développement web, Linux, les environnements serveur, l’automatisation et l’orchestration IA.",
      body: "Le rôle de la direction est de cadrer les besoins, arbitrer les choix techniques et conserver la validation humaine sur les décisions engageantes. Le CV reste disponible pour le détail du parcours et de la formation.",
      viewCv: "CONSULTER LE CV",
      downloadCv: "TÉLÉCHARGER PDF",
    },
    contact: {
      eyebrow: "09 // CONTACT",
      title: "Canal ouvert.",
      lead: "Projet, collaboration, échange technique ou demande professionnelle.",
      labels: {
        director: "DIRECTOR",
        system: "SYSTEM",
        email: "EMAIL",
        phone: "PHONE",
        web: "WEB",
      },
      projectContact: "PROJECT CONTACT",
      technicalContact: "TECHNICAL CONTACT",
      copyEmail: "COPY EMAIL",
      copied: "EMAIL COPIED",
    },
    footer: "INDEPENDENT TECHNOLOGY & SYSTEMS GROUP",
  },

  en: {
    locale: "en",
    htmlLang: "en",
    metadata: {
      title: "Raiju Cloud System | RCS Core",
      description:
        "Raiju Cloud System is an independent technology structure focused on web systems, Linux infrastructure, automation and supervised artificial intelligence.",
      ogLocale: "en_US",
    },
    skipLink: "Skip to main content",
    menu: "MENU",
    navLabel: "Primary navigation",
    languageLabel: "Language",
    nav: [
      { index: "01", label: "CORE", href: "#core" },
      { index: "02", label: "DIVISIONS", href: "#divisions" },
      { index: "03", label: "WEB", href: "#web" },
      { index: "04", label: "SYSTEMS", href: "#systems" },
      { index: "05", label: "AI", href: "#intelligence" },
      { index: "06", label: "RESEARCH", href: "#research" },
      { index: "07", label: "PROJECTS", href: "#projects" },
      { index: "08", label: "DIRECTOR", href: "#director" },
      { index: "09", label: "CONTACT", href: "#contact" },
    ],
    hero: {
      eyebrow: "01 // RCS CORE",
      titleTop: "RAIJU",
      titleBottom: "CLOUD SYSTEM",
      role: "TECHNOLOGY · SYSTEMS · INFRASTRUCTURE · INTELLIGENCE",
      lead: "RCS designs, deploys and explores digital systems: web experiences, Linux infrastructure, automation and supervised artificial intelligence workflows.",
      primaryCta: "EXPLORE CAPABILITIES",
      secondaryCta: "OPEN PROJECTS",
      sceneLabel: "Vector emblem of the RCS Core",
      sceneA: "CORE / RCS",
      sceneB: "VECTOR / ACTIVE",
      sceneC: "RAIJU EMBLEM / CORE MARK",
      facts: sharedFacts,
    },
    divisions: {
      eyebrow: "02 // RCS DIVISIONS",
      title: "One structure. Multiple domains.",
      lead: "Raiju Cloud System organises its work by technical capability. Each division represents a field that can actually be mobilised, without pretending to be a larger organisation than it is.",
      items: [
        {
          code: "DIV-01",
          title: "WEB SYSTEMS",
          description:
            "Design, redesign and development of modern web interfaces and applications.",
          capabilities: "UX · FRONT-END · NEXT.JS · WEBGL",
        },
        {
          code: "DIV-02",
          title: "SYSTEMS & INFRASTRUCTURE",
          description:
            "Linux environments, VPS, web services, deployment and operations.",
          capabilities: "DEBIAN · NGINX · SSH · VPS",
        },
        {
          code: "DIV-03",
          title: "AUTOMATION",
          description:
            "Scripts, workflows and integrations built to reduce repetitive work and improve operational reliability.",
          capabilities: "SCRIPTS · WORKFLOWS · TOOLING",
        },
        {
          code: "DIV-04",
          title: "ARTIFICIAL INTELLIGENCE",
          description:
            "Multi-agent orchestration, assisted research, structured production and human control.",
          capabilities: "AGENTS · ROUTING · QA · HUMAN CONTROL",
        },
        {
          code: "DIV-05",
          title: "RESEARCH / EXPERIMENTAL",
          description:
            "Prototypes, advanced visualisation, web 3D and exploration of new architectures.",
          capabilities: "R&D · THREE.JS · PROTOTYPING",
        },
      ],
    },
    web: {
      eyebrow: "03 // WEB SYSTEMS",
      title: "Web systems engineered as technical products.",
      lead: "Interface, performance, accessibility and application architecture are treated as one coherent system.",
      cards: [
        [
          "NEXT.JS 16",
          "Application architecture",
          "App Router, modern rendering and a clear boundary between server logic and client interaction.",
        ],
        [
          "REACT 19",
          "Interactive systems",
          "Specialised components, controlled state and accessible interfaces.",
        ],
        [
          "THREE.JS",
          "WebGL / 3D",
          "Procedural scenes, spatial visualisation and lightweight interactive experiences.",
        ],
        [
          "GSAP",
          "Motion design",
          "Mechanical transitions, timelines and scroll-driven animation.",
        ],
        [
          "TYPESCRIPT",
          "Reliability",
          "Explicit contracts between data, components and behaviour.",
        ],
        [
          "PLAYWRIGHT",
          "Verification",
          "Critical journeys checked on desktop and mobile before production.",
        ],
      ],
    },
    infrastructure: {
      eyebrow: "04 // SYSTEMS & INFRASTRUCTURE",
      title: "From the public network to the application.",
      lead: "RCS treats infrastructure as part of the system: hosting, Linux, web server, deployment, diagnostics and rollback.",
      canvasLabel: "Interactive server architecture",
      flowCaption: "INTERNET → DNS → OVH VPS → DEBIAN → NGINX → APPLICATION",
      inspector: { status: "STATUS", role: "ROLE", detail: "DETAIL" },
      nodes: [
        {
          id: "internet",
          index: "01",
          label: "INTERNET",
          eyebrow: "PUBLIC NETWORK",
          description: "Public entry point for web traffic.",
          status: "ONLINE",
          detail: "Visitors reach the public domain over HTTPS.",
        },
        {
          id: "dns",
          index: "02",
          label: "DNS",
          eyebrow: "ROUTING",
          description: "Domain resolution.",
          status: "RESOLVED",
          detail:
            "The domain routes requests toward the hosted infrastructure.",
        },
        {
          id: "ovh",
          index: "03",
          label: "OVH VPS",
          eyebrow: "COMPUTE",
          description: "Virtual private server.",
          status: "ACTIVE",
          detail: "The machine hosts the Linux environment and web services.",
        },
        {
          id: "debian",
          index: "04",
          label: "DEBIAN 13",
          eyebrow: "HOST OS",
          description: "Production Linux system.",
          status: "STABLE",
          detail:
            "SSH administration, files, services, updates and recovery procedures.",
        },
        {
          id: "nginx",
          index: "05",
          label: "NGINX",
          eyebrow: "WEB SERVER",
          description: "HTTP distribution layer.",
          status: "SERVING",
          detail:
            "Nginx publishes the application and handles the server-side web layer.",
        },
        {
          id: "application",
          index: "06",
          label: "APPLICATION",
          eyebrow: "NEXT.JS / REACT",
          description: "Interactive web experience.",
          status: "RENDERING",
          detail: "React, Next.js, SVG and CSS compose the public interface.",
        },
      ],
      facts: [
        ["SYSTEM", "Debian Linux"],
        ["HOSTING", "OVH VPS"],
        ["WEB SERVER", "Nginx"],
        ["DEPLOYMENT", "Linux environment"],
        ["FRONT-END", "React / Next.js"],
        ["GRAPHICS", "SVG / CSS"],
        ["MOTION", "CSS / IntersectionObserver"],
        ["AI", "Multi-agent workflows"],
      ],
    },
    intelligence: {
      eyebrow: "05 // INTELLIGENCE SYSTEMS",
      title: "On-demand specialisation. Human control.",
      lead: "Dragon One coordinates up to two request-scoped ephemeral specialists, then submits their artifact to Dragon Two, the permanent private challenger.",
      quality: "QUALITY CONTROL",
      humanValidation: "HUMAN VALIDATION",
      agents: [
        {
          id: "one",
          code: "NODE 01",
          name: "Dragon One",
          role: "ORCHESTRATION",
          summary:
            "Public entry point: scoping, planning, dossier assembly and delivery to the user.",
        },
        {
          id: "ephemeral",
          code: "NODE E01 / E02",
          name: "Ephemeral agents",
          role: "DYNAMIC SPECIALISATION",
          summary:
            "One or two private instances specialised for a bounded mission and released after the request.",
        },
        {
          id: "two",
          code: "NODE 02",
          name: "Dragon Two",
          role: "CHALLENGE",
          summary:
            "Permanent private service: audits the exact artifact and returns a categorical verdict before synthesis.",
        },
      ],
    },
    research: {
      eyebrow: "06 // RESEARCH / EXPERIMENTAL",
      title: "Explore before industrialising.",
      lead: "RCS research is used to test ideas, interfaces and architectures before integrating them into a real system.",
      items: [
        [
          "01",
          "Technical prototyping",
          "Fast validation of an idea, interaction or architecture before full development.",
        ],
        [
          "02",
          "Advanced interfaces",
          "3D experiences, WebGL visualisation and instrumental interfaces when they serve a real purpose.",
        ],
        [
          "03",
          "Automation & tooling",
          "Scripts and internal tools built to reduce repetitive operations and improve consistency.",
        ],
        [
          "04",
          "Experimental architecture",
          "Exploration of new integration, deployment and orchestration models.",
        ],
        [
          "05",
          "Quality engineering",
          "Tests, static audits, E2E journeys and rollback strategies that keep experiments reversible.",
        ],
      ],
    },
    projects: {
      eyebrow: "07 // RCS PROJECTS",
      title: "Active systems. Future systems.",
      lead: "RCS distinguishes active capabilities from its next projects: systems to explore, document and prototype without presenting them as already delivered.",
      techLabel: "TECH",
      futureEyebrow: "07.A // RCS FUTURE SYSTEMS",
      futureTitle: "Future projects. Designed to remain controllable.",
      futureLead:
        "These six projects form RCS's next trajectory. Each will begin as a local, reversible and documented prototype; none is in production yet.",
      items: [
        {
          code: "PRJ-001",
          title: "RCS Core",
          status: "ACTIVE",
          type: "INSTITUTIONAL WEB SYSTEM",
          description:
            "Raiju Cloud System’s multilingual institutional interface, self-hosted on a Linux environment.",
          tech: "Next.js · React · SVG · CSS · Debian · Nginx",
        },
        {
          code: "PRJ-002",
          title: "Multi-agent orchestration",
          status: "SUPERVISED",
          type: "INTELLIGENCE WORKFLOW",
          description:
            "Bounded workflow with ephemeral agents, a structured artifact, private challenge by Dragon Two and human validation.",
          tech: "Ephemeral agents · Artifact lock · Dragon Two · Human validation",
        },
        {
          code: "PRJ-003",
          title: "Linux / VPS environments",
          status: "LAB / PRODUCTION",
          type: "SYSTEM OPERATIONS",
          description:
            "Administration, deployment, permissions, diagnostics, backups and rollback procedures.",
          tech: "SSH · Debian · Git · HTTP · Nginx · VPS",
        },
      ],
      futureItems: [
        {
          code: "FUT-001",
          title: "RCS Agent Passport",
          status: "FUTURE PROJECT",
          type: "AGENT GOVERNANCE",
          description:
            "An identity, scoped-permission, expiry, revocation and human-validation framework that keeps an AI agent's actions within a defined perimeter.",
          tech: "Identity profiles · Scoped permissions · Audit trail",
        },
        {
          code: "FUT-002",
          title: "RCS Offline Node",
          status: "FUTURE PROJECT",
          type: "LOCAL AI / CONTINUITY",
          description:
            "A local assistant grounded in controlled documents, useful without Internet, when privacy matters or when cloud quota is unavailable.",
          tech: "Local model · Document index · Offline workspace",
        },
        {
          code: "FUT-003",
          title: "RCS Digital Continuity Box",
          status: "FUTURE PROJECT",
          type: "DIGITAL RESILIENCE",
          description:
            "A local kit of procedures, contacts, open exports and checklists to keep essential activity moving during a digital outage.",
          tech: "Local procedures · Open exports · Recovery checks",
        },
        {
          code: "FUT-004",
          title: "RCS Compute Commons",
          status: "FUTURE PROJECT",
          type: "CONTROLLED DISTRIBUTED COMPUTE",
          description:
            "An environment where authorised machines cooperate on public or synthetic workloads with quotas, traceability and verifiable stopping rules.",
          tech: "Authenticated nodes · Resource quotas · Verifiable jobs",
        },
        {
          code: "FUT-005",
          title: "RCS AI Energy Router",
          status: "FUTURE PROJECT",
          type: "AI EXECUTION POLICY",
          description:
            "An explainable router that compares cost, delay, privacy, required quality and estimated energy before selecting an execution mode.",
          tech: "Readable policy · Local simulator · Documented estimates",
        },
        {
          code: "FUT-006",
          title: "RCS Passport",
          status: "FUTURE PROJECT",
          type: "AGENT PORTABILITY",
          description:
            "A guided interview and open format to describe, export and evolve an agent's mission, boundaries and configuration.",
          tech: "Guided interview · Text export · Change log",
        },
      ],
    },
    director: {
      eyebrow: "08 // DIRECTION",
      title: "Hugues Henrotte",
      role: "FOUNDER & SYSTEMS DIRECTOR",
      lead: "Raiju Cloud System is directed by Hugues Henrotte, with work centred on web development, Linux, server environments, automation and AI orchestration.",
      body: "The director’s role is to frame requirements, arbitrate technical choices and retain human validation over consequential decisions. The CV remains available for education, experience and project details.",
      viewCv: "VIEW CV",
      downloadCv: "DOWNLOAD PDF",
    },
    contact: {
      eyebrow: "09 // CONTACT",
      title: "Channel open.",
      lead: "Project, collaboration, technical exchange or professional enquiry.",
      labels: {
        director: "DIRECTOR",
        system: "SYSTEM",
        email: "EMAIL",
        phone: "PHONE",
        web: "WEB",
      },
      projectContact: "PROJECT CONTACT",
      technicalContact: "TECHNICAL CONTACT",
      copyEmail: "COPY EMAIL",
      copied: "EMAIL COPIED",
    },
    footer: "INDEPENDENT TECHNOLOGY & SYSTEMS GROUP",
  },

  nl: {
    locale: "nl",
    htmlLang: "nl-BE",
    metadata: {
      title: "Raiju Cloud System | RCS Core",
      description:
        "Raiju Cloud System is een onafhankelijke technologische structuur gespecialiseerd in websystemen, Linux-infrastructuur, automatisering en begeleide artificiële intelligentie.",
      ogLocale: "nl_BE",
    },
    skipLink: "Ga naar de hoofdinhoud",
    menu: "MENU",
    navLabel: "Hoofdnavigatie",
    languageLabel: "Taal",
    nav: [
      { index: "01", label: "CORE", href: "#core" },
      { index: "02", label: "DIVISIONS", href: "#divisions" },
      { index: "03", label: "WEB", href: "#web" },
      { index: "04", label: "SYSTEMS", href: "#systems" },
      { index: "05", label: "AI", href: "#intelligence" },
      { index: "06", label: "RESEARCH", href: "#research" },
      { index: "07", label: "PROJECTS", href: "#projects" },
      { index: "08", label: "DIRECTOR", href: "#director" },
      { index: "09", label: "CONTACT", href: "#contact" },
    ],
    hero: {
      eyebrow: "01 // RCS CORE",
      titleTop: "RAIJU",
      titleBottom: "CLOUD SYSTEM",
      role: "TECHNOLOGY · SYSTEMS · INFRASTRUCTURE · INTELLIGENCE",
      lead: "RCS ontwerpt, implementeert en onderzoekt digitale systemen: webervaringen, Linux-infrastructuur, automatisering en begeleide AI-workflows.",
      primaryCta: "CAPACITEITEN VERKENNEN",
      secondaryCta: "PROJECTEN OPENEN",
      sceneLabel: "Vectorieel embleem van de RCS Core",
      sceneA: "CORE / RCS",
      sceneB: "VECTOR / ACTIVE",
      sceneC: "RAIJU EMBLEM / CORE MARK",
      facts: sharedFacts,
    },
    divisions: {
      eyebrow: "02 // RCS DIVISIONS",
      title: "Eén structuur. Meerdere domeinen.",
      lead: "Raiju Cloud System organiseert zijn werk per technische capaciteit. Elke divisie staat voor een reëel inzetbaar expertisedomein, zonder een kunstmatig grote organisatie voor te stellen.",
      items: [
        {
          code: "DIV-01",
          title: "WEB SYSTEMS",
          description:
            "Ontwerp, vernieuwing en ontwikkeling van moderne webinterfaces en toepassingen.",
          capabilities: "UX · FRONT-END · NEXT.JS · WEBGL",
        },
        {
          code: "DIV-02",
          title: "SYSTEMS & INFRASTRUCTURE",
          description:
            "Linux-omgevingen, VPS, webdiensten, deployment en operationeel beheer.",
          capabilities: "DEBIAN · NGINX · SSH · VPS",
        },
        {
          code: "DIV-03",
          title: "AUTOMATION",
          description:
            "Scripts, workflows en integraties om repetitief werk te verminderen en processen betrouwbaarder te maken.",
          capabilities: "SCRIPTS · WORKFLOWS · TOOLING",
        },
        {
          code: "DIV-04",
          title: "ARTIFICIAL INTELLIGENCE",
          description:
            "Multi-agent orchestration, ondersteund onderzoek, gestructureerde productie en menselijke controle.",
          capabilities: "AGENTS · ROUTING · QA · HUMAN CONTROL",
        },
        {
          code: "DIV-05",
          title: "RESEARCH / EXPERIMENTAL",
          description:
            "Prototypes, geavanceerde visualisatie, web-3D en onderzoek naar nieuwe architecturen.",
          capabilities: "R&D · THREE.JS · PROTOTYPING",
        },
      ],
    },
    web: {
      eyebrow: "03 // WEB SYSTEMS",
      title: "Websystemen ontworpen als technische producten.",
      lead: "Interface, prestaties, toegankelijkheid en applicatie-architectuur worden als één coherent systeem behandeld.",
      cards: [
        [
          "NEXT.JS 16",
          "Applicatie-architectuur",
          "App Router, moderne rendering en een duidelijke scheiding tussen serverlogica en clientinteractie.",
        ],
        [
          "REACT 19",
          "Interactieve systemen",
          "Gespecialiseerde componenten, gecontroleerde state en toegankelijke interfaces.",
        ],
        [
          "THREE.JS",
          "WebGL / 3D",
          "Procedurele scènes, ruimtelijke visualisatie en lichte interactieve ervaringen.",
        ],
        [
          "GSAP",
          "Motion design",
          "Mechanische overgangen, timelines en scrollgestuurde animatie.",
        ],
        [
          "TYPESCRIPT",
          "Betrouwbaarheid",
          "Expliciete contracten tussen data, componenten en gedrag.",
        ],
        [
          "PLAYWRIGHT",
          "Verificatie",
          "Kritieke gebruikerspaden gecontroleerd op desktop en mobiel vóór productie.",
        ],
      ],
    },
    infrastructure: {
      eyebrow: "04 // SYSTEMS & INFRASTRUCTURE",
      title: "Van het publieke netwerk tot de applicatie.",
      lead: "RCS behandelt infrastructuur als deel van het systeem: hosting, Linux, webserver, deployment, diagnose en rollback.",
      canvasLabel: "Interactieve serverarchitectuur",
      flowCaption: "INTERNET → DNS → OVH VPS → DEBIAN → NGINX → APPLICATION",
      inspector: { status: "STATUS", role: "ROLE", detail: "DETAIL" },
      nodes: [
        {
          id: "internet",
          index: "01",
          label: "INTERNET",
          eyebrow: "PUBLIC NETWORK",
          description: "Publiek toegangspunt voor webverkeer.",
          status: "ONLINE",
          detail: "Bezoekers bereiken het publieke domein via HTTPS.",
        },
        {
          id: "dns",
          index: "02",
          label: "DNS",
          eyebrow: "ROUTING",
          description: "Domeinresolutie.",
          status: "RESOLVED",
          detail: "Het domein stuurt verzoeken naar de gehoste infrastructuur.",
        },
        {
          id: "ovh",
          index: "03",
          label: "OVH VPS",
          eyebrow: "COMPUTE",
          description: "Virtuele private server.",
          status: "ACTIVE",
          detail: "De machine host de Linux-omgeving en webdiensten.",
        },
        {
          id: "debian",
          index: "04",
          label: "DEBIAN 13",
          eyebrow: "HOST OS",
          description: "Linux-productiesysteem.",
          status: "STABLE",
          detail:
            "SSH-beheer, bestanden, services, updates en herstelprocedures.",
        },
        {
          id: "nginx",
          index: "05",
          label: "NGINX",
          eyebrow: "WEB SERVER",
          description: "HTTP-distributielaag.",
          status: "SERVING",
          detail:
            "Nginx publiceert de applicatie en beheert de server-side weblaag.",
        },
        {
          id: "application",
          index: "06",
          label: "APPLICATION",
          eyebrow: "NEXT.JS / REACT",
          description: "Interactieve webervaring.",
          status: "RENDERING",
          detail:
            "React, Next.js, SVG en CSS vormen samen de publieke interface.",
        },
      ],
      facts: [
        ["SYSTEM", "Debian Linux"],
        ["HOSTING", "OVH VPS"],
        ["WEB SERVER", "Nginx"],
        ["DEPLOYMENT", "Linux environment"],
        ["FRONT-END", "React / Next.js"],
        ["GRAPHICS", "SVG / CSS"],
        ["MOTION", "CSS / IntersectionObserver"],
        ["AI", "Multi-agent workflows"],
      ],
    },
    intelligence: {
      eyebrow: "05 // INTELLIGENCE SYSTEMS",
      title: "Specialisatie op aanvraag. Menselijke controle.",
      lead: "Dragon One coördineert maximaal twee tijdelijke specialisten voor één aanvraag en legt hun artefact daarna voor aan Dragon Two, de permanente private tegenspreker.",
      quality: "QUALITY CONTROL",
      humanValidation: "HUMAN VALIDATION",
      agents: [
        {
          id: "one",
          code: "NODE 01",
          name: "Dragon One",
          role: "ORCHESTRATION",
          summary:
            "Publiek toegangspunt: afbakening, planning, bundeling van dossiers en oplevering aan de gebruiker.",
        },
        {
          id: "ephemeral",
          code: "NODE E01 / E02",
          name: "Tijdelijke agenten",
          role: "DYNAMISCHE SPECIALISATIE",
          summary:
            "Eén of twee private instanties voor een afgebakende missie, die na de aanvraag worden vrijgegeven.",
        },
        {
          id: "two",
          code: "NODE 02",
          name: "Dragon Two",
          role: "TEGENSPRAAK",
          summary:
            "Permanente private dienst: audit van het exacte artefact en een categorisch oordeel vóór synthese.",
        },
      ],
    },
    research: {
      eyebrow: "06 // RESEARCH / EXPERIMENTAL",
      title: "Onderzoeken vóór industrialiseren.",
      lead: "RCS Research test ideeën, interfaces en architecturen voordat ze in een echt systeem worden geïntegreerd.",
      items: [
        [
          "01",
          "Technische prototyping",
          "Snelle validatie van een idee, interactie of architectuur vóór volledige ontwikkeling.",
        ],
        [
          "02",
          "Geavanceerde interfaces",
          "3D-ervaringen, WebGL-visualisatie en instrumentele interfaces wanneer ze een concreet doel dienen.",
        ],
        [
          "03",
          "Automation & tooling",
          "Scripts en interne tools om repetitieve handelingen te verminderen en processen consistenter te maken.",
        ],
        [
          "04",
          "Experimentele architectuur",
          "Onderzoek naar nieuwe modellen voor integratie, deployment en orchestration.",
        ],
        [
          "05",
          "Quality engineering",
          "Tests, statische audits, E2E-trajecten en rollbackstrategieën om experimenten omkeerbaar te houden.",
        ],
      ],
    },
    projects: {
      eyebrow: "07 // RCS PROJECTS",
      title: "Actieve systemen. Toekomstige systemen.",
      lead: "RCS maakt onderscheid tussen actieve capaciteiten en volgende projecten: systemen die worden verkend, gedocumenteerd en geprototypeerd zonder ze als al gerealiseerd voor te stellen.",
      techLabel: "TECH",
      futureEyebrow: "07.A // TOEKOMSTIGE RCS-SYSTEMEN",
      futureTitle:
        "Toekomstige projecten. Ontworpen om beheersbaar te blijven.",
      futureLead:
        "Deze zes projecten vormen het volgende traject van RCS. Elk start als een lokaal, omkeerbaar en gedocumenteerd prototype; geen ervan is vandaag in productie.",
      items: [
        {
          code: "PRJ-001",
          title: "RCS Core",
          status: "ACTIVE",
          type: "INSTITUTIONAL WEB SYSTEM",
          description:
            "Meertalige institutionele interface van Raiju Cloud System, zelf gehost op een Linux-omgeving.",
          tech: "Next.js · React · SVG · CSS · Debian · Nginx",
        },
        {
          code: "PRJ-002",
          title: "Multi-agent orchestration",
          status: "SUPERVISED",
          type: "INTELLIGENCE WORKFLOW",
          description:
            "Begrensde workflow met tijdelijke agenten, een gestructureerd artefact, private tegenspraak door Dragon Two en menselijke validatie.",
          tech: "Ephemeral agents · Artifact lock · Dragon Two · Human validation",
        },
        {
          code: "PRJ-003",
          title: "Linux / VPS environments",
          status: "LAB / PRODUCTION",
          type: "SYSTEM OPERATIONS",
          description:
            "Beheer, deployment, rechten, diagnose, back-ups en rollbackprocedures.",
          tech: "SSH · Debian · Git · HTTP · Nginx · VPS",
        },
      ],
      futureItems: [
        {
          code: "FUT-001",
          title: "RCS Agent Passport",
          status: "TOEKOMSTIG PROJECT",
          type: "AGENTGOVERNANCE",
          description:
            "Een kader voor identiteit, beperkte rechten, verval, intrekking en menselijke validatie dat de acties van een AI-agent binnen een afgebakende perimeter houdt.",
          tech: "Identiteitsprofielen · Beperkte rechten · Auditlog",
        },
        {
          code: "FUT-002",
          title: "RCS Offline Node",
          status: "TOEKOMSTIG PROJECT",
          type: "LOKALE AI / CONTINUÏTEIT",
          description:
            "Een lokale assistent op basis van gecontroleerde documenten, bruikbaar zonder internet, wanneer privacy belangrijk is of een cloudquotum niet beschikbaar is.",
          tech: "Lokaal model · Documentindex · Offline werkruimte",
        },
        {
          code: "FUT-003",
          title: "RCS Digital Continuity Box",
          status: "TOEKOMSTIG PROJECT",
          type: "DIGITALE VEERKRACHT",
          description:
            "Een lokale kit met procedures, contactpersonen, open exports en checklists om essentiële activiteiten voort te zetten tijdens een digitale storing.",
          tech: "Lokale procedures · Open exports · Herstelcontroles",
        },
        {
          code: "FUT-004",
          title: "RCS Compute Commons",
          status: "TOEKOMSTIG PROJECT",
          type: "GECONTROLEERD VERDEELD REKENWERK",
          description:
            "Een omgeving waarin geautoriseerde machines samenwerken aan publieke of synthetische taken met quota, traceerbaarheid en verifieerbare stopregels.",
          tech: "Geauthenticeerde nodes · Resourcequota · Verifieerbare taken",
        },
        {
          code: "FUT-005",
          title: "RCS AI Energy Router",
          status: "TOEKOMSTIG PROJECT",
          type: "AI-UITVOERINGSBELEID",
          description:
            "Een uitlegbare router die kost, vertraging, privacy, vereiste kwaliteit en geschatte energie vergelijkt voordat hij een uitvoeringsmodus kiest.",
          tech: "Leesbaar beleid · Lokale simulator · Gedocumenteerde schattingen",
        },
        {
          code: "FUT-006",
          title: "RCS Passport",
          status: "TOEKOMSTIG PROJECT",
          type: "AGENTPORTABILITEIT",
          description:
            "Een begeleid interview en open formaat om de missie, grenzen en configuratie van een agent te beschrijven, exporteren en verder te ontwikkelen.",
          tech: "Begeleid interview · Tekstexport · Wijzigingslog",
        },
      ],
    },
    director: {
      eyebrow: "08 // DIRECTION",
      title: "Hugues Henrotte",
      role: "FOUNDER & SYSTEMS DIRECTOR",
      lead: "Raiju Cloud System wordt geleid door Hugues Henrotte, met werk rond webontwikkeling, Linux, serveromgevingen, automatisering en AI-orchestration.",
      body: "De directie kadert behoeften, maakt technische keuzes en behoudt menselijke validatie voor beslissingen met impact. Het cv blijft beschikbaar voor details over opleiding, traject en projecten.",
      viewCv: "CV BEKIJKEN",
      downloadCv: "PDF DOWNLOADEN",
    },
    contact: {
      eyebrow: "09 // CONTACT",
      title: "Kanaal open.",
      lead: "Project, samenwerking, technische uitwisseling of professionele aanvraag.",
      labels: {
        director: "DIRECTOR",
        system: "SYSTEM",
        email: "EMAIL",
        phone: "PHONE",
        web: "WEB",
      },
      projectContact: "PROJECT CONTACT",
      technicalContact: "TECHNICAL CONTACT",
      copyEmail: "COPY EMAIL",
      copied: "EMAIL COPIED",
    },
    footer: "INDEPENDENT TECHNOLOGY & SYSTEMS GROUP",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getCopy(locale: Locale): RcsCopy {
  return copyByLocale[locale];
}
