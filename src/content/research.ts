import type { Locale } from "@/content/i18n";
import type { ResearchProject } from "@/types/research";

export const researchCopy = {
  fr: {
    metadataTitle: "RCS Research | Raiju Cloud System",
    metadataDescription:
      "Travaux techniques et scientifiques de Raiju Cloud System : méthodes, données, limites et résultats documentés.",
    eyebrow: "RCS // RESEARCH PROGRAM",
    title: "Recherche documentée. Résultats transparents.",
    lead: "Un espace indépendant consacré à des questions techniques réelles, étudiées avec une méthodologie explicite et une distinction stricte entre mesures, sources externes et estimations.",
    back: "RETOUR À LA PRÉSENTATION",
    principlesTitle: "Règles de publication",
    principles: [
      "Question et méthode explicites",
      "Provenance des données visible",
      "Limites documentées",
      "Validation humaine avant publication",
    ],
    catalogEyebrow: "01 // PROGRAMME",
    catalogTitle: "Projets de recherche",
    catalogLead:
      "RCS-RP-001 et RCS-RP-002 sont publiés avec leurs rapports et leurs données documentées. Les travaux futurs restent explicitement signalés comme tels.",
    status: {
      planned: "PROJET ENVISAGÉ",
      "in-preparation": "EN PRÉPARATION",
      "in-progress": "EN COURS",
      published: "PUBLIÉ",
    },
    question: "QUESTION ÉTUDIÉE",
    evidenceTitle: "Classification des données",
    evidence: {
      measured: [
        "MESURÉES",
        "Produites directement par le protocole expérimental décrit.",
      ],
      reproduced: [
        "REPRODUITES",
        "Obtenues en répétant un protocole ou un test documenté.",
      ],
      external: ["EXTERNES", "Importées depuis une source tierce identifiée."],
      estimated: [
        "ESTIMÉES",
        "Calculées par un modèle et jamais présentées comme une mesure réelle.",
      ],
    },
    supportEyebrow: "02 // EXTERNAL RESEARCH",
    supportTitle: "Proposer une étude à RCS",
    supportLead:
      "RCS peut accompagner une recherche externe, y compris étudiante, lorsqu’elle repose sur une question réelle, une méthode sérieuse et une documentation transparente. L’envoi ne vaut ni acceptation ni publication.",
    form: {
      identity: "Identité et contact",
      project: "Projet proposé",
      support: "Soutien recherché",
      name: "Nom complet",
      email: "Adresse e-mail",
      affiliation: "Établissement ou organisation (facultatif)",
      title: "Titre provisoire",
      question: "Question ou problématique",
      context: "Contexte",
      methodology: "Méthodologie envisagée",
      notes: "Informations complémentaires (facultatif)",
      pdf: "Note de recherche au format PDF (facultatif)",
      pdfHelp:
        "PDF uniquement, 8 Mio maximum. Le fichier reste privé jusqu’à validation humaine.",
      choices: [
        "Structuration de l’étude",
        "Accompagnement technique",
        "Collecte ou traitement de données",
        "Création de graphiques",
        "Mise en page du rapport",
        "Hébergement et publication",
        "Outils ou infrastructure",
      ],
      consent:
        "Je confirme disposer du droit de transmettre ces informations et ce document à RCS pour examen.",
      submit: "TRANSMETTRE LA PROPOSITION",
      sending: "TRANSMISSION…",
      success: "Proposition reçue. Conservez cette référence :",
      error:
        "La proposition n’a pas pu être transmise. Vérifiez les champs et réessayez.",
    },
  },
  en: {
    metadataTitle: "RCS Research | Raiju Cloud System",
    metadataDescription:
      "Technical and scientific work by Raiju Cloud System: documented methods, data, limitations and results.",
    eyebrow: "RCS // RESEARCH PROGRAM",
    title: "Documented research. Transparent results.",
    lead: "An independent space for real technical questions, explicit methods and a strict distinction between measurements, external sources and estimates.",
    back: "BACK TO PRESENTATION",
    principlesTitle: "Publication rules",
    principles: [
      "Explicit question and method",
      "Visible data provenance",
      "Documented limitations",
      "Human validation before publication",
    ],
    catalogEyebrow: "01 // PROGRAM",
    catalogTitle: "Research projects",
    catalogLead:
      "RCS-RP-001 and RCS-RP-002 are published with their reports and documented data. Future work remains explicitly labelled as such.",
    status: {
      planned: "PLANNED PROJECT",
      "in-preparation": "IN PREPARATION",
      "in-progress": "IN PROGRESS",
      published: "PUBLISHED",
    },
    question: "RESEARCH QUESTION",
    evidenceTitle: "Data classification",
    evidence: {
      measured: [
        "MEASURED",
        "Produced directly by the described experimental protocol.",
      ],
      reproduced: [
        "REPRODUCED",
        "Obtained by repeating a documented protocol or test.",
      ],
      external: ["EXTERNAL", "Imported from an identified third-party source."],
      estimated: [
        "ESTIMATED",
        "Calculated by a model and never presented as a real measurement.",
      ],
    },
    supportEyebrow: "02 // EXTERNAL RESEARCH",
    supportTitle: "Propose a study to RCS",
    supportLead:
      "RCS may support external research, including student work, when it addresses a real question with a serious method and transparent documentation. Submission does not imply acceptance or publication.",
    form: {
      identity: "Identity and contact",
      project: "Proposed project",
      support: "Support requested",
      name: "Full name",
      email: "Email address",
      affiliation: "Institution or organisation (optional)",
      title: "Working title",
      question: "Question or problem",
      context: "Context",
      methodology: "Proposed methodology",
      notes: "Additional information (optional)",
      pdf: "Research note as PDF (optional)",
      pdfHelp:
        "PDF only, 8 MiB maximum. The file remains private until human validation.",
      choices: [
        "Study structuring",
        "Technical guidance",
        "Data collection or processing",
        "Chart creation",
        "Report layout",
        "Hosting and publication",
        "Tools or infrastructure",
      ],
      consent:
        "I confirm that I have the right to submit this information and document to RCS for review.",
      submit: "SUBMIT PROPOSAL",
      sending: "SUBMITTING…",
      success: "Proposal received. Keep this reference:",
      error:
        "The proposal could not be submitted. Check the fields and try again.",
    },
  },
  nl: {
    metadataTitle: "RCS Research | Raiju Cloud System",
    metadataDescription:
      "Technisch en wetenschappelijk werk van Raiju Cloud System: gedocumenteerde methoden, gegevens, beperkingen en resultaten.",
    eyebrow: "RCS // RESEARCH PROGRAM",
    title: "Gedocumenteerd onderzoek. Transparante resultaten.",
    lead: "Een onafhankelijke ruimte voor echte technische vragen, expliciete methoden en een strikt onderscheid tussen metingen, externe bronnen en schattingen.",
    back: "TERUG NAAR PRESENTATIE",
    principlesTitle: "Publicatieregels",
    principles: [
      "Expliciete vraag en methode",
      "Zichtbare herkomst van gegevens",
      "Gedocumenteerde beperkingen",
      "Menselijke validatie vóór publicatie",
    ],
    catalogEyebrow: "01 // PROGRAMMA",
    catalogTitle: "Onderzoeksprojecten",
    catalogLead:
      "RCS-RP-001 en RCS-RP-002 zijn gepubliceerd met hun rapporten en gedocumenteerde gegevens. Toekomstig werk blijft uitdrukkelijk als zodanig aangeduid.",
    status: {
      planned: "GEPLAND PROJECT",
      "in-preparation": "IN VOORBEREIDING",
      "in-progress": "LOPEND",
      published: "GEPUBLICEERD",
    },
    question: "ONDERZOEKSVRAAG",
    evidenceTitle: "Classificatie van gegevens",
    evidence: {
      measured: [
        "GEMETEN",
        "Rechtstreeks geproduceerd door het beschreven experimentele protocol.",
      ],
      reproduced: [
        "GEREPRODUCEERD",
        "Verkregen door een gedocumenteerd protocol of test te herhalen.",
      ],
      external: [
        "EXTERN",
        "Geïmporteerd uit een geïdentificeerde externe bron.",
      ],
      estimated: [
        "GESCHAT",
        "Berekend door een model en nooit voorgesteld als een echte meting.",
      ],
    },
    supportEyebrow: "02 // EXTERNAL RESEARCH",
    supportTitle: "Een studie voorstellen aan RCS",
    supportLead:
      "RCS kan extern onderzoek ondersteunen, ook studentenwerk, wanneer het steunt op een echte vraag, een ernstige methode en transparante documentatie. Een inzending betekent geen aanvaarding of publicatie.",
    form: {
      identity: "Identiteit en contact",
      project: "Voorgesteld project",
      support: "Gevraagde ondersteuning",
      name: "Volledige naam",
      email: "E-mailadres",
      affiliation: "Instelling of organisatie (optioneel)",
      title: "Voorlopige titel",
      question: "Vraag of probleemstelling",
      context: "Context",
      methodology: "Voorgestelde methodologie",
      notes: "Aanvullende informatie (optioneel)",
      pdf: "Onderzoeksnota als PDF (optioneel)",
      pdfHelp:
        "Alleen PDF, maximaal 8 MiB. Het bestand blijft privé tot menselijke validatie.",
      choices: [
        "Structurering van de studie",
        "Technische begeleiding",
        "Gegevensverzameling of -verwerking",
        "Grafieken maken",
        "Rapportopmaak",
        "Hosting en publicatie",
        "Tools of infrastructuur",
      ],
      consent:
        "Ik bevestig dat ik het recht heb deze informatie en dit document ter beoordeling aan RCS te bezorgen.",
      submit: "VOORSTEL INDIENEN",
      sending: "VERZENDEN…",
      success: "Voorstel ontvangen. Bewaar deze referentie:",
      error:
        "Het voorstel kon niet worden verzonden. Controleer de velden en probeer opnieuw.",
    },
  },
} as const;

const projectBase = {
  fr: [
    {
      id: "RCS-RP-001",
      slug: "supervised-multi-agent-orchestration",
      status: "published",
      title: "Supervised Multi-Agent Orchestration",
      question:
        "Comment répartir, coordonner et contrôler le travail de plusieurs agents spécialisés tout en conservant une validation humaine traçable ?",
      summary:
        "Rapport technique v1.0 publié le 18 août 2026. Il établit la faisabilité de l’architecture initiale à six rôles et documente ses limites ; le démonstrateur opérationnel a depuis évolué vers des spécialistes éphémères.",
      topics: [
        "ORCHESTRATION",
        "DESIGN SCIENCE",
        "TRACEABILITY",
        "HUMAN CONTROL",
      ],
      evidence: [],
      publicationDate: "2026-08-18",
      doi: "10.5281/zenodo.21994886",
      publicationUrl: "https://doi.org/10.5281/zenodo.21994886",
      authorOrcid: "https://orcid.org/0009-0009-7729-6552",
    },
    {
      id: "RCS-RP-002",
      slug: "hardware-aware-compression-performance",
      status: "published",
      title: "Hardware-Aware Compression Performance Study",
      question:
        "Comment le processeur, la mémoire, le système et la configuration influencent-ils les performances d’algorithmes de compression ?",
      summary:
        "Rapport technique v0.2 publié le 26 août 2026. Il combine un modèle transparent de 1 100 scénarios sur 100 CPU AMD et Intel, fondé sur des sources externes, et un pilote local de 11 profils sur Intel Core i7-13620H. Estimations et mesures restent séparées.",
      topics: ["COMPRESSION", "CPU", "MEMORY", "BENCHMARKS"],
      evidence: [],
      publicationDate: "2026-08-26",
      doi: "10.5281/zenodo.22110548",
      publicationUrl: "https://doi.org/10.5281/zenodo.22110548",
      authorOrcid: "https://orcid.org/0009-0009-7729-6552",
    },
  ],
  en: [
    {
      id: "RCS-RP-001",
      slug: "supervised-multi-agent-orchestration",
      status: "published",
      title: "Supervised Multi-Agent Orchestration",
      question:
        "How can specialised agents be assigned, coordinated and controlled while retaining traceable human validation?",
      summary:
        "Technical report v1.0 published on 18 August 2026. It establishes the feasibility of the initial six-role architecture and documents its limits; the live demonstrator has since evolved to request-scoped ephemeral specialists.",
      topics: [
        "ORCHESTRATION",
        "DESIGN SCIENCE",
        "TRACEABILITY",
        "HUMAN CONTROL",
      ],
      evidence: [],
      publicationDate: "2026-08-18",
      doi: "10.5281/zenodo.21994886",
      publicationUrl: "https://doi.org/10.5281/zenodo.21994886",
      authorOrcid: "https://orcid.org/0009-0009-7729-6552",
    },
    {
      id: "RCS-RP-002",
      slug: "hardware-aware-compression-performance",
      status: "published",
      title: "Hardware-Aware Compression Performance Study",
      question:
        "How do CPU, memory, operating system and hardware configuration affect compression algorithm performance?",
      summary:
        "Technical report v0.2 published on 26 August 2026. It combines a transparent 1,100-scenario model for 100 AMD and Intel CPUs, based on external sources, with a local 11-profile pilot on an Intel Core i7-13620H. Estimates and measurements remain distinct.",
      topics: ["COMPRESSION", "CPU", "MEMORY", "BENCHMARKS"],
      evidence: [],
      publicationDate: "2026-08-26",
      doi: "10.5281/zenodo.22110548",
      publicationUrl: "https://doi.org/10.5281/zenodo.22110548",
      authorOrcid: "https://orcid.org/0009-0009-7729-6552",
    },
  ],
  nl: [
    {
      id: "RCS-RP-001",
      slug: "supervised-multi-agent-orchestration",
      status: "published",
      title: "Supervised Multi-Agent Orchestration",
      question:
        "Hoe kunnen gespecialiseerde agents worden verdeeld, gecoördineerd en gecontroleerd met behoud van traceerbare menselijke validatie?",
      summary:
        "Technisch rapport v1.0, gepubliceerd op 18 augustus 2026. Het toont de haalbaarheid van de oorspronkelijke architectuur met zes rollen en documenteert de beperkingen; de operationele demonstrator is intussen geëvolueerd naar tijdelijke specialisten per aanvraag.",
      topics: [
        "ORCHESTRATION",
        "DESIGN SCIENCE",
        "TRACEABILITY",
        "HUMAN CONTROL",
      ],
      evidence: [],
      publicationDate: "2026-08-18",
      doi: "10.5281/zenodo.21994886",
      publicationUrl: "https://doi.org/10.5281/zenodo.21994886",
      authorOrcid: "https://orcid.org/0009-0009-7729-6552",
    },
    {
      id: "RCS-RP-002",
      slug: "hardware-aware-compression-performance",
      status: "published",
      title: "Hardware-Aware Compression Performance Study",
      question:
        "Hoe beïnvloeden CPU, geheugen, besturingssysteem en hardwareconfiguratie de prestaties van compressiealgoritmen?",
      summary:
        "Technisch rapport v0.2, gepubliceerd op 26 augustus 2026. Het combineert een transparant model van 1.100 scenario's op 100 AMD- en Intel-cpu's, gebaseerd op externe bronnen, met een lokale proef met 11 profielen op een Intel Core i7-13620H. Schattingen en metingen blijven gescheiden.",
      topics: ["COMPRESSION", "CPU", "MEMORY", "BENCHMARKS"],
      evidence: [],
      publicationDate: "2026-08-26",
      doi: "10.5281/zenodo.22110548",
      publicationUrl: "https://doi.org/10.5281/zenodo.22110548",
      authorOrcid: "https://orcid.org/0009-0009-7729-6552",
    },
  ],
} as const;

export function getResearchProjects(locale: Locale): ResearchProject[] {
  return projectBase[locale] as unknown as ResearchProject[];
}
