export const catalog = {
  updated: "2026-10-18",
  operator: "Hugues Henrotte · Raiju Cloud System",
  contact: "contact@raijucloudsystem.com",
  en: {
    label: "RCS / INTEGRATIONS",
    heading: "Tools, where you need them.",
    intro:
      "RCS tools for external platforms. Explore our integrations and their documentation.",
    serviceSummary: "Academic deadline reminders, delivered in Discord.",
    serviceStatus: "Restricted access · Currently free",
    serviceBody: [
      "Deadlines Reminder helps authorised administrators prepare and schedule reminders for their community. Each import is previewed and must be confirmed before it is recorded.",
      "The service currently operates only in servers expressly configured by RCS. Public installation is not available through this portal.",
      "No AI API, member activity profiling or general conversation archive. This is an independent reminder tool, not an official educational or Discord service.",
    ],
    terms: {
      title: "Terms of use",
      intro:
        "These terms describe the current Deadlines Reminder service. They do not replace Discord’s rules or the official instructions of your educational institution.",
      sections: [
        {
          title: "Service and operator",
          paragraphs: [
            "Deadlines Reminder is an independent tool provided by Hugues Henrotte under the name Raiju Cloud System (RCS). Contact: contact@raijucloudsystem.com. It is not operated by Discord and is not an official service of an educational institution.",
          ],
        },
        {
          title: "Access and operation",
          paragraphs: [
            "The service is currently free and limited to servers expressly configured by RCS. Its presentation here does not guarantee that public installation is available.",
            "In the current configuration, members holding the authorised administrator role may import and manage reminders from the designated channel. Imports require confirmation before they are recorded. Reminders are published in the configured destination channel.",
          ],
        },
        {
          title: "Check the original information",
          paragraphs: [
            "The bot distributes information supplied by authorised people; it does not check instructions with the institution. Always verify dates, times, time zones and submission requirements against the official educational source. A reminder does not replace that source.",
          ],
        },
        {
          title: "Acceptable use",
          paragraphs: [
            "Follow the server rules and Discord’s rules. Do not import passwords, tokens, sensitive data or unnecessary personal information. Do not use the service for spam, harassment or unlawful content. Report problems or misuse to contact@raijucloudsystem.com.",
          ],
        },
        {
          title: "Availability",
          paragraphs: [
            "RCS does not guarantee continuous availability or timely delivery of every reminder. Interruptions, permission changes or Discord outages may prevent delivery. Users remain responsible for their deadlines. This statement does not limit their mandatory legal rights.",
          ],
        },
        {
          title: "Cancellation is not erasure",
          paragraphs: [
            "After confirmation, /deadlines delete cancels the deadline and its pending reminders. It does not delete previously published messages or retained records; a delivery already in progress may still arrive. For data-related requests, see the privacy policy or email contact@raijucloudsystem.com.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      intro:
        "This page describes data handling by Deadlines Reminder and this static integrations portal.",
      sections: [
        {
          title: "Operator and purposes",
          paragraphs: [
            "Hugues Henrotte, operating under the name Raiju Cloud System (RCS), runs Deadlines Reminder. Privacy contact: contact@raijucloudsystem.com. Data is used to check access rights, prepare and record confirmed deadlines, prevent identical imports, deliver reminders and track their status.",
            "The bot processes commands and imports addressed to it, the necessary Discord identifiers and roles checked for authorisation. It does not build a general conversation archive or member activity profiles.",
          ],
        },
        {
          title: "Confirmed records",
          paragraphs: [
            "After confirmation, a SQLite database stores the server, destination channel and import author identifiers; the course, title, emoji, description, deadline, reminder times, mention setting, deduplication fingerprint and technical timestamps. It also stores cancellation or delivery states and, where available, the delivered message identifier and an error code.",
          ],
        },
        {
          title: "Drafts",
          paragraphs: [
            "Drafts are held in process memory and are not written to the database. Confirmation expires after ten minutes; that validity period is not a guarantee of deletion at exactly ten minutes. Drafts disappear when processed, cleaned up or when the process stops.",
          ],
        },
        {
          title: "Discord, recipients and no AI",
          paragraphs: [
            "Import messages, previews and published reminders also remain on Discord according to channel permissions and Discord’s rules. Draft expiry does not delete those messages. Reminders are visible to people with access to the destination channel; imports and previews follow their channel permissions.",
            "Discord and the technical providers necessary for hosting participate in operating the service. People authorised by RCS may access data for operation and support. Discord’s privacy policy is available at https://discord.com/privacy.",
            "The bot uses no artificial intelligence API. RCS does not sell its data or use it for advertising, member profiling or model training.",
          ],
        },
        {
          title: "Retention and recovery backups",
          paragraphs: [
            "The current version has no automatic purge or configured maximum retention period for confirmed records. Cancelling a deadline changes its state without erasing the record.",
            "Encrypted recovery backups may contain earlier copies. A change or deletion in the active database does not automatically remove those copies or messages stored on Discord. Requests therefore need to be considered across these different locations.",
          ],
        },
        {
          title: "This static portal",
          paragraphs: [
            "This portal adds no cookies, forms, tracking scripts or application database. It is separate from the bot’s SQLite database and Discord messages.",
            "Cloudflare provides hosting and may process technical connection metadata, such as IP addresses and request information, to deliver and protect the website. Its privacy policy is available at https://www.cloudflare.com/privacypolicy/.",
          ],
        },
        {
          title: "Your rights and requests",
          paragraphs: [
            "Depending on the applicable conditions, you may request access, correction, erasure, restriction or portability of your personal data and object to its processing. If processing is based on consent, you may withdraw that consent. Write to contact@raijucloudsystem.com with the server and, if possible, the deadline reference. Do not send passwords or tokens. Only information necessary to verify the request should be supplied.",
            "Applicable GDPR requests must normally receive a response within one month. A permitted extension may apply to complex or numerous requests; its reason must be communicated within that first month. This response period is not a promise that every copy can be technically erased within a fixed period.",
            "/deadlines delete is not a data-erasure procedure. Requests about messages hosted on Discord may also require action by server administrators or use of Discord’s tools.",
          ],
        },
        {
          title: "Questions and complaints",
          paragraphs: [
            "Contact contact@raijucloudsystem.com about privacy questions, corrections or suspected misuse. You may also lodge a complaint with the Belgian Data Protection Authority or another competent supervisory authority. Information: https://www.autoriteprotectiondonnees.be/citoyen/agir/introduire-une-plainte.",
          ],
        },
      ],
    },
  },
  fr: {
    label: "RCS / INTÉGRATIONS",
    heading: "Des outils, là où vous en avez besoin.",
    intro:
      "Les outils RCS pour les plateformes externes. Retrouvez nos intégrations et leur documentation.",
    serviceSummary:
      "Des rappels d’échéances scolaires, directement dans Discord.",
    serviceStatus: "Accès restreint · Gratuit actuellement",
    serviceBody: [
      "Deadlines Reminder permet aux administrateurs autorisés de préparer et de programmer les rappels de leur communauté. Chaque import fait l’objet d’un aperçu et doit être confirmé avant son enregistrement.",
      "Le service fonctionne actuellement uniquement sur les serveurs expressément configurés par RCS. Ce portail ne propose pas d’installation publique.",
      "Aucune API d’IA, aucun profilage de l’activité des membres, aucune archive générale des conversations. Un outil indépendant de rappel, pas un service officiel de l’établissement ou de Discord.",
    ],
    terms: {
      title: "Conditions d’utilisation",
      intro:
        "Ces conditions décrivent le service actuel de Deadlines Reminder. Elles ne remplacent ni les règles de Discord ni les consignes officielles de votre établissement.",
      sections: [
        {
          title: "Service et responsable",
          paragraphs: [
            "Deadlines Reminder est un outil indépendant proposé par Hugues Henrotte sous le nom Raiju Cloud System (RCS). Contact : contact@raijucloudsystem.com. Il n’est ni édité par Discord ni un service officiel d’un établissement d’enseignement.",
          ],
        },
        {
          title: "Accès et fonctionnement",
          paragraphs: [
            "Le service est actuellement gratuit et réservé aux serveurs expressément configurés par RCS. Sa présentation ici ne garantit pas qu’une installation publique soit disponible.",
            "Dans la configuration actuelle, les membres possédant le rôle d’administration autorisé peuvent importer et gérer les rappels depuis le salon prévu à cet effet. Une confirmation est nécessaire avant l’enregistrement d’un import. Les rappels sont publiés dans le salon de destination configuré.",
          ],
        },
        {
          title: "Vérifier les informations d’origine",
          paragraphs: [
            "Le bot diffuse les informations fournies par les personnes autorisées ; il ne vérifie pas les consignes auprès de l’établissement. Vérifiez toujours les dates, heures, fuseaux horaires et modalités de remise sur la source pédagogique officielle. Un rappel ne remplace pas cette source.",
          ],
        },
        {
          title: "Utilisation acceptable",
          paragraphs: [
            "Respectez les règles du serveur et celles de Discord. N’importez ni mots de passe, ni jetons, ni données sensibles, ni informations personnelles inutiles. N’utilisez pas le service pour spammer, harceler ou diffuser du contenu illicite. Signalez les problèmes ou abus à contact@raijucloudsystem.com.",
          ],
        },
        {
          title: "Disponibilité",
          paragraphs: [
            "RCS ne garantit ni une disponibilité permanente ni la livraison de chaque rappel à l’heure prévue. Une interruption, une modification des permissions ou une indisponibilité de Discord peut empêcher un envoi. Les utilisateurs restent responsables de leurs échéances. Cette précision ne limite pas leurs droits impératifs.",
          ],
        },
        {
          title: "Annuler ne signifie pas effacer",
          paragraphs: [
            "La commande /deadlines delete annule l’échéance et ses rappels encore en attente après confirmation. Elle ne supprime pas les messages déjà publiés ni les enregistrements conservés ; un envoi déjà en cours peut encore arriver. Pour une demande concernant les données, consultez la politique de confidentialité ou écrivez à contact@raijucloudsystem.com.",
          ],
        },
      ],
    },
    privacy: {
      title: "Politique de confidentialité",
      intro:
        "Cette page décrit le traitement des données par Deadlines Reminder et par ce portail statique d’intégrations.",
      sections: [
        {
          title: "Responsable et finalités",
          paragraphs: [
            "Hugues Henrotte, sous le nom Raiju Cloud System (RCS), exploite Deadlines Reminder. Contact confidentialité : contact@raijucloudsystem.com. Les données servent à vérifier les droits d’accès, préparer et enregistrer les échéances confirmées, éviter les imports identiques, envoyer les rappels et suivre leur état.",
            "Le bot traite les commandes et imports qui lui sont destinés, les identifiants Discord nécessaires et les rôles consultés pour contrôler les autorisations. Il ne constitue pas une archive générale des conversations et ne produit pas de profil d’activité des membres.",
          ],
        },
        {
          title: "Enregistrements confirmés",
          paragraphs: [
            "Après confirmation, une base SQLite conserve les identifiants du serveur, du salon de destination et de l’auteur de l’import ; le cours, le titre, l’emoji, la description, l’échéance, les horaires des rappels, le mode de mention, une empreinte de déduplication et les dates techniques. Elle conserve aussi les états d’annulation ou de livraison et, lorsqu’ils existent, l’identifiant du message envoyé et un code d’erreur.",
          ],
        },
        {
          title: "Brouillons",
          paragraphs: [
            "Les brouillons sont conservés dans la mémoire du processus, sans être enregistrés dans la base. Leur confirmation expire après dix minutes ; cette durée de validité n’est pas une garantie d’effacement exactement à la dixième minute. Ils disparaissent lors de leur traitement, de leur nettoyage ou de l’arrêt du processus.",
          ],
        },
        {
          title: "Discord, destinataires et absence d’IA",
          paragraphs: [
            "Les messages d’import, aperçus et rappels publiés restent également sur Discord selon les permissions du salon et les règles de Discord. L’expiration d’un brouillon ne supprime pas ces messages. Les rappels sont visibles par les personnes ayant accès au salon de destination ; les imports et aperçus le sont selon les permissions de leur salon.",
            "Discord et les prestataires techniques nécessaires à l’hébergement interviennent dans le fonctionnement du service. Les personnes habilitées par RCS peuvent accéder aux données pour l’exploitation et le support. La politique de confidentialité de Discord est disponible sur https://discord.com/privacy.",
            "Le bot n’utilise aucune API d’intelligence artificielle. Ses données ne sont ni vendues ni utilisées par RCS pour la publicité, le profilage des membres ou l’entraînement de modèles.",
          ],
        },
        {
          title: "Conservation et sauvegardes de récupération",
          paragraphs: [
            "La version actuelle ne comporte pas de purge automatique ni de durée maximale de conservation configurée pour les enregistrements confirmés. L’annulation d’une échéance modifie son état sans effacer son enregistrement.",
            "Des sauvegardes chiffrées de récupération peuvent contenir des copies antérieures. Une modification ou suppression dans la base active ne retire pas automatiquement ces copies ni les messages présents sur Discord. Toute demande doit donc être examinée sur ces différents supports.",
          ],
        },
        {
          title: "Ce portail statique",
          paragraphs: [
            "Ce portail n’ajoute ni cookies, ni formulaires, ni scripts de suivi, ni base de données applicative. Il est distinct de la base SQLite du bot et des messages Discord.",
            "Cloudflare assure l’hébergement et peut traiter des métadonnées techniques de connexion, comme les adresses IP et les informations des requêtes, pour distribuer et protéger le site. Sa politique de confidentialité est disponible sur https://www.cloudflare.com/privacypolicy/.",
          ],
        },
        {
          title: "Vos droits et vos demandes",
          paragraphs: [
            "Selon les conditions applicables, vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données personnelles et vous opposer à leur traitement. Si un traitement repose sur votre consentement, vous pouvez le retirer. Écrivez à contact@raijucloudsystem.com en précisant le serveur et, si possible, la référence de l’échéance. N’envoyez aucun mot de passe ni jeton. Seuls les éléments nécessaires à la vérification de la demande doivent être fournis.",
            "Une demande relevant du RGPD doit normalement recevoir une réponse dans un délai d’un mois. Une prolongation autorisée peut s’appliquer aux demandes complexes ou nombreuses ; son motif doit être communiqué pendant ce premier mois. Ce délai de réponse n’est pas une promesse d’effacement technique de toute copie sous un délai fixe.",
            "La commande /deadlines delete n’est pas une procédure d’effacement des données. Une demande concernant des messages hébergés par Discord peut également nécessiter l’intervention des responsables du serveur ou l’utilisation des outils de Discord.",
          ],
        },
        {
          title: "Questions et réclamations",
          paragraphs: [
            "Contactez contact@raijucloudsystem.com pour une question de confidentialité, une correction ou un abus présumé. Vous pouvez également introduire une réclamation auprès de l’Autorité de protection des données belge ou d’une autre autorité de contrôle compétente. Informations : https://www.autoriteprotectiondonnees.be/citoyen/agir/introduire-une-plainte.",
          ],
        },
      ],
    },
  },
};
