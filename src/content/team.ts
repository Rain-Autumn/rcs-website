import type { Locale } from "@/content/i18n";
import type { TeamMember } from "@/types/team";

export const teamCopy = {
  fr: {
    metadataTitle: "Équipe RCS | Raiju Cloud System",
    metadataDescription:
      "Les personnes, rôles et compétences qui composent Raiju Cloud System.",
    eyebrow: "RCS // TEAM DIRECTORY",
    title: "Une équipe identifiable. Des rôles explicites.",
    lead: "RCS documente les personnes qui contribuent réellement à la structure, leurs responsabilités, leurs domaines de travail et leurs certifications.",
    back: "RETOUR À LA PRÉSENTATION",
    principlesTitle: "Principes d’équipe",
    principles: [
      "Identité publique vérifiable",
      "Rôle et périmètre explicites",
      "Compétences documentées",
      "Aucune équipe fictive",
    ],
    directoryEyebrow: "01 // DIRECTORY",
    directoryTitle: "Membres de RCS",
    directoryLead:
      "La structure compte actuellement un membre déclaré. Cette page évoluera avec les contributions réelles.",
    specialties: "DOMAINES",
    certifications: "CERTIFICATIONS",
    showCertifications: "AFFICHER",
    hideCertifications: "REPLIER",
    issued: "ÉMISE",
    credential: "IDENTIFIANT",
    noCertifications: "Aucune certification renseignée.",
    type: {
      direction: "DIRECTION",
      member: "MEMBRE",
      collaborator: "COLLABORATION",
    },
    adminEyebrow: "02 // ADMINISTRATION",
    adminTitle: "Ajouter un membre",
    adminLead:
      "Accès réservé. Le formulaire applique la même structure de données à chaque nouveau membre.",
  },
  en: {
    metadataTitle: "RCS Team | Raiju Cloud System",
    metadataDescription:
      "The people, roles and capabilities behind Raiju Cloud System.",
    eyebrow: "RCS // TEAM DIRECTORY",
    title: "Identifiable people. Explicit roles.",
    lead: "RCS documents the people who genuinely contribute to the structure, their responsibilities, fields of work and certifications.",
    back: "BACK TO PRESENTATION",
    principlesTitle: "Team principles",
    principles: [
      "Verifiable public identity",
      "Explicit role and scope",
      "Documented capabilities",
      "No fictional team",
    ],
    directoryEyebrow: "01 // DIRECTORY",
    directoryTitle: "RCS members",
    directoryLead:
      "The structure currently has one declared member. This page will evolve with real contributions.",
    specialties: "FIELDS",
    certifications: "CERTIFICATIONS",
    showCertifications: "SHOW",
    hideCertifications: "COLLAPSE",
    issued: "ISSUED",
    credential: "CREDENTIAL",
    noCertifications: "No certification listed.",
    type: {
      direction: "DIRECTION",
      member: "MEMBER",
      collaborator: "COLLABORATION",
    },
    adminEyebrow: "02 // ADMINISTRATION",
    adminTitle: "Add a member",
    adminLead:
      "Restricted access. The form applies the same data structure to every new member.",
  },
  nl: {
    metadataTitle: "RCS-team | Raiju Cloud System",
    metadataDescription:
      "De personen, rollen en vaardigheden achter Raiju Cloud System.",
    eyebrow: "RCS // TEAM DIRECTORY",
    title: "Identificeerbare mensen. Duidelijke rollen.",
    lead: "RCS documenteert de personen die werkelijk bijdragen aan de structuur, hun verantwoordelijkheden, werkgebieden en certificeringen.",
    back: "TERUG NAAR PRESENTATIE",
    principlesTitle: "Teamprincipes",
    principles: [
      "Verifieerbare publieke identiteit",
      "Duidelijke rol en reikwijdte",
      "Gedocumenteerde vaardigheden",
      "Geen fictief team",
    ],
    directoryEyebrow: "01 // DIRECTORY",
    directoryTitle: "RCS-leden",
    directoryLead:
      "De structuur telt momenteel één aangegeven lid. Deze pagina evolueert met echte bijdragen.",
    specialties: "DOMEINEN",
    certifications: "CERTIFICERINGEN",
    showCertifications: "TONEN",
    hideCertifications: "INKLAPPEN",
    issued: "UITGEGEVEN",
    credential: "REFERENTIE",
    noCertifications: "Geen certificering vermeld.",
    type: {
      direction: "DIRECTIE",
      member: "LID",
      collaborator: "SAMENWERKING",
    },
    adminEyebrow: "02 // BEHEER",
    adminTitle: "Een lid toevoegen",
    adminLead:
      "Beperkte toegang. Het formulier past dezelfde gegevensstructuur toe op elk nieuw lid.",
  },
} as const;

export const founder: TeamMember = {
  id: "RCS-TM-001",
  name: "Hugues Henrotte",
  orcid: "https://orcid.org/0009-0009-7729-6552",
  type: "direction",
  translations: {
    fr: {
      role: "Fondateur & Directeur des systèmes",
      bio: "Fondateur de Raiju Cloud System. Son travail porte sur le développement web, Linux, les environnements serveur, l’automatisation et l’orchestration IA supervisée.",
    },
    en: {
      role: "Founder & Systems Director",
      bio: "Founder of Raiju Cloud System. His work focuses on web development, Linux, server environments, automation and supervised AI orchestration.",
    },
    nl: {
      role: "Oprichter & Systems Director",
      bio: "Oprichter van Raiju Cloud System. Zijn werk richt zich op webontwikkeling, Linux, serveromgevingen, automatisering en begeleide AI-orchestration.",
    },
  },
  specialties: [
    "WEB SYSTEMS",
    "LINUX",
    "INFRASTRUCTURE",
    "AUTOMATION",
    "AI ORCHESTRATION",
  ],
  certifications: [
    {
      provider: "Amazon Web Services (AWS)",
      title: "AWS Knowledge: Cloud Essentials - Training Badge",
      issued: "2026-08",
    },
    {
      provider: "Microsoft",
      title:
        "Microsoft Applied Skills : Migrer des charges de travail SQL Server vers Azure SQL Database",
      issued: "2026-08",
      credentialId: "FF1896B698E90600",
    },
    {
      provider: "Microsoft",
      title:
        "Microsoft Applied Skills : Créer un agent dans Microsoft Copilot Studio",
      issued: "2026-08",
      credentialId: "8DDAC1CBF710F1DE",
    },
    {
      provider: "Google",
      title: "Create a Secure Data Lake on Cloud Storage Skill Badge",
      issued: "2026-04",
    },
    {
      provider: "Google",
      title: "Cloud Architecture: Design, Implement, and Manage Skill Badge",
      issued: "2026-04",
    },
    {
      provider: "Google",
      title:
        "Migrate MySQL data to Cloud SQL using Database Migration Service Skill Badge",
      issued: "2026-04",
    },
    {
      provider: "Google",
      title: "The Basics of Google Cloud Compute Skill Badge",
      issued: "2026-03",
    },
  ],
};

export function localizedMember(member: TeamMember, locale: Locale) {
  return { ...member, ...member.translations[locale] };
}
