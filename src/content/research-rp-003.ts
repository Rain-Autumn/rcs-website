import type { Locale } from "@/content/i18n";

type StudySection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};
type StudyCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  abstract: string;
  questionLabel: string;
  question: string;
  back: string;
  report: string;
  package: string;
  editableReport: string;
  source: string;
  data: string;
  workbook: string;
  caseSummary: string;
  manifest: string;
  reproduce: string;
  sourcesRegister: string;
  figureCaption: string;
  method: string;
  environment: string;
  date: string;
  reservedDoi: string;
  doiNotice: string;
  resultsTitle: string;
  caseLabel: string;
  inputLabel: string;
  zipLabel: string;
  zipDeltaLabel: string;
  ntfsStoredLabel: string;
  ntfsDeltaLabel: string;
  resultsNote: string;
  sections: StudySection[];
  sourcesTitle: string;
  sources: Array<{ label: string; href: string }>;
  footerNote: string;
};

export const rp003Copy: Record<Locale, StudyCopy> = {
  fr: {
    metadataTitle: "RCS-RP-003 — Espace disque Windows | Raiju Cloud System",
    metadataDescription:
      "Étude pratique sur le diagnostic, le tri et la compression des données d’un PC Windows, avec méthode, mesures synthétiques et limites.",
    eyebrow: "RCS // RESEARCH PROGRAM · RCS-RP-003",
    title: "Reprendre le contrôle de l’espace disque d’un PC Windows",
    abstract:
      "Une étude complète de gestion du stockage combinant 26 fichiers de corpus publics, cinq cas synthétiques, 220 mesures répétées et des recommandations documentées — sans analyser de fichiers personnels.",
    questionLabel: "QUESTION ÉTUDIÉE",
    question:
      "Quelles actions libèrent réellement de l’espace local avec un risque raisonnable, et quand faut-il nettoyer, déplacer, archiver, utiliser le cloud à la demande ou compresser ?",
    back: "RETOUR AUX ÉTUDES",
    report: "TÉLÉCHARGER LE RAPPORT PDF (FR)",
    package: "PAQUET COMPLET DE L’ÉTUDE (ZIP)",
    editableReport: "RAPPORT MODIFIABLE (DOCX)",
    source: "ÉTUDE COMPLÈTE (MARKDOWN)",
    data: "RÉSULTATS CSV",
    workbook: "CLASSEUR DE DONNÉES XLSX",
    caseSummary: "SYNTHÈSE PAR CAS CSV",
    manifest: "MANIFESTE DES 26 FICHIERS",
    reproduce: "SCRIPT DE REPRODUCTION",
    sourcesRegister: "REGISTRE DES SOURCES CSV",
    figureCaption:
      "Figure 1 — Ratio entre taille logique et sortie mesurée pour chaque fichier Silesia; médiane de trois essais. Un ratio plus élevé indique une sortie plus petite.",
    method: "MÉTHODE ET PÉRIMÈTRE",
    environment:
      "26 fichiers publics (225,9 Mo), cinq cas synthétiques et deux méthodes sur un poste Windows/NTFS. 110 exécutions appariées, 220 mesures; 246 contrôles d’intégrité réussis. Aucun fichier personnel analysé.",
    date: "Essais réalisés le 8 octobre 2026 · version 2.0",
    reservedDoi: "DOI ZENODO RÉSERVÉ",
    doiNotice:
      "10.5281/zenodo.23233639 — dépôt Zenodo non publié à ce stade. Le DOI ne doit pas être présenté comme une référence publiée avant la mise en ligne du dépôt.",
    resultsTitle: "Résultats mesurés",
    caseLabel: "Corpus / cas",
    inputLabel: "Entrée (octets)",
    zipLabel: "Archive ZIP (octets)",
    zipDeltaLabel: "Variation ZIP",
    ntfsStoredLabel: "Espace stocké NTFS (octets)",
    ntfsDeltaLabel: "Variation NTFS",
    resultsNote:
      "Les agrégats Canterbury/Silesia sont distincts des cas synthétiques. ZIP compare l’archive à la taille logique; NTFS compare l’allocation avant/après. Les entrées sont vérifiées par SHA-256. Un signe + indique une hausse. Corpus historiques et un seul poste : ces mesures ne prédisent pas l’économie d’un PC personnel.",
    sections: [
      {
        id: "scope",
        title: "Une étude d’usage, pas un benchmark de serveurs",
        paragraphs: [
          "RP-003 porte sur l’entretien du stockage d’un ordinateur utilisé par une personne : comprendre ce qui occupe l’espace, choisir une action adaptée et éviter une perte de données. Il est distinct de RCS-RP-002, qui étudie les performances d’algorithmes selon le matériel.",
          "L’essai traite 26 fichiers de Canterbury, Canterbury Large et Silesia (225 908 846 octets), cinq cas synthétiques et des agrégats par corpus. Les fichiers publics sont validés par empreintes et exécutés trois fois par entrée; les cas synthétiques, cinq fois. L’agrégat Silesia est répété une fois.",
        ],
      },
      {
        id: "interpretation",
        title: "Ce que les mesures permettent de dire",
        paragraphs: [
          "Sur les dossiers complets, ZIP réduit la taille logique de 73,96 % pour Canterbury, 70,80 % pour Canterbury Large et 67,81 % pour Silesia. NTFS réduit l’allocation de 49,74 %, 37,46 % et 42,88 %. Les cinq cas synthétiques vont de −99,66 % à +68,75 % avec ZIP; 1 000 petits fichiers augmentent de 68,75 % en archive. Les données à forte entropie ne gagnent presque rien.",
          "Ce sont des mesures de contenu ancien et synthétique sur un poste, pas des prévisions de bibliothèque personnelle. Aucun temps n’est interprété comme benchmark de performance; latence, CPU, batterie et formats modernes restent hors champ.",
        ],
      },
      {
        id: "workflow",
        title: "Une méthode prudente pour libérer de la place",
        paragraphs: [
          "Procéder par petites étapes et mesurer l’espace libre après chacune :",
        ],
        bullets: [
          "Commencer par Paramètres → Système → Stockage et examiner les recommandations de nettoyage avant de confirmer quoi que ce soit.",
          "Utiliser un analyseur comme WizTree pour localiser les gros consommateurs. Une grande taille affichée ne signifie pas que le fichier est inutile ni supprimable.",
          "Désinstaller les applications inutilisées depuis les paramètres Windows, plutôt que supprimer leurs dossiers à la main.",
          "Déplacer ou archiver les données froides seulement après avoir vérifié une copie et une sauvegarde. Un déplacement sur le même volume ne libère pas d’espace.",
          "Réserver la compression aux données réellement redondantes et tester un petit échantillon. Éviter d’attendre des gains importants sur JPEG, vidéo, audio compressé et archives.",
          "Configurer Storage Sense en vérifiant ses règles pour la Corbeille, Téléchargements et les fichiers cloud ; une suppression automatisée peut être irréversible pour l’utilisateur.",
          "Avec les fichiers cloud « en ligne uniquement », tenir compte de l’accès Internet et des besoins hors ligne. La synchronisation n’est pas une sauvegarde indépendante.",
          "Prévenir le remplissage en choisissant où enregistrer les nouveaux fichiers volumineux et en répétant périodiquement un diagnostic ciblé.",
        ],
      },
      {
        id: "wiztree",
        title: "WizTree : repérer, puis décider",
        paragraphs: [
          "WizTree est un analyseur d’utilisation du disque, pas un nettoyeur automatique. Ses vues peuvent aider à repérer les grands fichiers et dossiers. « Size » correspond à la taille logique ; « Allocated » correspond à l’espace alloué, qui dépend notamment de la compression et des unités d’allocation. Certaines métadonnées NTFS ne sont pas comptées comme des fichiers, donc les totaux peuvent différer des paramètres Windows.",
          "Pour une inspection ordinaire, commencer sans privilèges administrateur. L’éditeur réserve son analyse NTFS à grande vitesse à l’exécution élevée ; ne l’activer que si cette fonction est utile et que l’application est digne de confiance. Ne jamais supprimer un élément système simplement parce qu’il apparaît volumineux dans une treemap.",
        ],
      },
      {
        id: "limits",
        title: "Limites et statut des preuves",
        paragraphs: [
          "Les tableaux sont des mesures réalisées par le protocole décrit. Les conseils sur Storage Sense, OneDrive, NTFS et WizTree sont des informations externes citées ci-dessous, pas des résultats de nos tests.",
        ],
        bullets: [
          "Un poste NTFS, corpus historiques, un seul agrégat Silesia; pas d’échantillon aléatoire d’ordinateurs ni de bibliothèque personnelle.",
          "Aucun scan de fichiers personnels ; aucun outil installé ; aucune donnée existante modifiée ou supprimée.",
          "Aucun benchmark produit de WizTree, aucun essai 7-Zip, aucune mesure de performance d’application.",
          "Les libellés et comportements de Windows peuvent varier selon la version, la langue et les paramètres.",
        ],
      },
    ],
    sourcesTitle: "Sources externes",
    sources: [
      {
        label:
          "University of Canterbury — corpus Canterbury et Canterbury Large",
        href: "https://corpus.canterbury.ac.nz/descriptions/",
      },
      {
        label:
          "University of Canterbury — ratios historiques Canterbury (2001)",
        href: "https://corpus.canterbury.ac.nz/details/cantrbry/RatioByLex.html",
      },
      {
        label: "Silesia Corpus — description officielle",
        href: "https://sun.aei.polsl.pl/~sdeor/index.php?page=silesia",
      },
      {
        label: "Microsoft — paramètres de stockage Windows",
        href: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/storage-settings-in-windows",
      },
      {
        label: "Microsoft — gérer l’espace disque avec Storage Sense",
        href: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/manage-drive-space-with-storage-sense",
      },
      {
        label: "Microsoft — libérer de l’espace disque sous Windows",
        href: "https://support.microsoft.com/en-gb/windows/experience/storage-filemanagement/free-up-drive-space-in-windows",
      },
      {
        label: "Microsoft — OneDrive Files On-Demand",
        href: "https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows",
      },
      {
        label: "Microsoft — supprimer des fichiers ou dossiers OneDrive",
        href: "https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive",
      },
      { label: "WizTree — FAQ", href: "https://wize-tree.com/faq/" },
      { label: "WizTree — guide", href: "https://wize-tree.com/guide/" },
      {
        label: "Microsoft Learn — commande compact",
        href: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/compact",
      },
      {
        label: "Microsoft Learn — Compact OS et compromis stockage/performance",
        href: "https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/optimize/compactos",
      },
    ],
    footerNote:
      "RCS-RP-003 · Étude de stockage pour poste personnel · Version 2.0 · 8 octobre 2026",
  },
  en: {
    metadataTitle: "RCS-RP-003 — Windows disk space | Raiju Cloud System",
    metadataDescription:
      "A practical study of diagnosing, sorting and compressing data on a Windows PC, with synthetic measurements and documented limits.",
    eyebrow: "RCS // RESEARCH PROGRAM · RCS-RP-003",
    title: "Take control of disk space on a Windows PC",
    abstract:
      "A full storage-management study combining 26 public-corpus files, five synthetic cases, 220 repeated measurements and documented guidance—with no personal files analysed.",
    questionLabel: "RESEARCH QUESTION",
    question:
      "Which actions free local space with reasonable risk, and when should a user clean, move, archive, use cloud placeholders or compress?",
    back: "BACK TO RESEARCH",
    report: "DOWNLOAD THE PDF REPORT (FRENCH)",
    package: "DOWNLOAD THE COMPLETE STUDY PACKAGE (ZIP)",
    editableReport: "EDITABLE REPORT (DOCX)",
    source: "FULL STUDY (MARKDOWN)",
    data: "RESULTS CSV",
    workbook: "DATA WORKBOOK (XLSX)",
    caseSummary: "CASE SUMMARY CSV",
    manifest: "26-FILE CORPUS MANIFEST",
    reproduce: "REPRODUCTION SCRIPT",
    sourcesRegister: "SOURCE REGISTER CSV",
    figureCaption:
      "Figure 1 — Ratio of logical input to measured output for each Silesia file; median of three runs. A higher ratio means a smaller output.",
    method: "METHOD AND SCOPE",
    environment:
      "26 public files (225.9 MB), five synthetic cases and two methods on one Windows/NTFS system. 110 paired case executions, 220 measurements; all 246 integrity checks passed. No personal files analysed.",
    date: "Tests performed 8 October 2026 · version 2.0",
    reservedDoi: "ZENODO DOI RESERVED",
    doiNotice:
      "10.5281/zenodo.23233639 — the Zenodo deposit is not yet published. Do not present this DOI as a published record until the deposit is online.",
    resultsTitle: "Measured results",
    caseLabel: "Corpus / case",
    inputLabel: "Input (bytes)",
    zipLabel: "ZIP archive (bytes)",
    zipDeltaLabel: "ZIP change",
    ntfsStoredLabel: "NTFS stored (bytes)",
    ntfsDeltaLabel: "NTFS change",
    resultsNote:
      "Canterbury/Silesia aggregates are distinct from synthetic cases. ZIP compares archive bytes with logical input; NTFS compares allocated bytes before/after. Inputs were SHA-256 verified. A + sign means an increase. Historical corpora and one system cannot predict savings for a personal PC.",
    sections: [
      {
        id: "scope",
        title: "A user-storage study, not a server benchmark",
        paragraphs: [
          "RP-003 concerns storage management on a computer used by a person: understand what consumes space, choose a suitable action and avoid data loss. It is distinct from RCS-RP-002, which studies hardware-dependent compression algorithm performance.",
          "The experiment covers 26 Canterbury, Canterbury Large and Silesia files (225,908,846 bytes), five synthetic cases, and corpus aggregates. Public files are checksum-verified and each tested three times; synthetic cases five times. The Silesia aggregate is run once.",
        ],
      },
      {
        id: "interpretation",
        title: "What the measurements support",
        paragraphs: [
          "On complete corpora, ZIP reduced logical size by 73.96% for Canterbury, 70.80% for Canterbury Large and 67.81% for Silesia. NTFS reduced allocated space by 49.74%, 37.46% and 42.88%. The five synthetic ZIP cases ranged from −99.66% to +68.75%; archiving 1,000 small files increased size by 68.75%. High-entropy data gained almost nothing.",
          "These are measurements of historical and synthetic content on one system, not forecasts for a personal library. Timings are not treated as performance benchmarks; latency, CPU, battery and modern formats remain outside scope.",
        ],
      },
      {
        id: "workflow",
        title: "A cautious way to free space",
        paragraphs: [
          "Work in small steps and check free space after each one:",
        ],
        bullets: [
          "Start with Settings → System → Storage and review Windows cleanup recommendations before confirming anything.",
          "Use a disk-usage analyser such as WizTree to locate large items. A large file is not automatically unnecessary or safe to delete.",
          "Uninstall unused applications through Windows Settings instead of manually deleting their folders.",
          "Move or archive cold data only after verifying a copy and a backup. Moving files within the same volume does not free space.",
          "Reserve compression for genuinely redundant data and test a small sample. Do not expect large gains from JPEG, video, compressed audio or archives.",
          "Review Storage Sense rules for the Recycle Bin, Downloads and cloud files; automated deletion can remove items the user meant to keep.",
          "Cloud files marked online-only depend on connectivity and may not be available offline. Synchronisation is not an independent backup.",
          "Prevent recurrence by choosing where new large files are saved and periodically repeating a targeted review.",
        ],
      },
      {
        id: "wiztree",
        title: "WizTree: locate, then decide",
        paragraphs: [
          "WizTree is a disk-usage analyser, not an automatic cleaner. Its views can help locate large files and folders. “Size” is logical file size; “Allocated” is the space allocated on disk and can differ due to compression and allocation units. Some NTFS metadata is not counted as files, so totals can differ from Windows Storage settings.",
          "For an ordinary inspection, start without administrator privileges. The vendor says its high-speed NTFS scan requires elevation; only use that mode when needed and when you trust the application. Never delete a system item just because it looks large in a treemap.",
        ],
      },
      {
        id: "limits",
        title: "Limitations and evidence status",
        paragraphs: [
          "The tables are measurements produced by the described protocol. Advice about Storage Sense, OneDrive, NTFS and WizTree comes from the external sources below; it was not tested in this experiment.",
        ],
        bullets: [
          "One NTFS system and historical corpora, including a single Silesia aggregate run; no random sample of computers or personal libraries.",
          "No personal files scanned; no tool installed; no existing data modified or deleted.",
          "No WizTree product benchmark, no 7-Zip test and no application-performance measurement.",
          "Windows labels and behaviour may vary by version, language and settings.",
        ],
      },
    ],
    sourcesTitle: "External sources",
    sources: [
      {
        label:
          "University of Canterbury — Canterbury and Large Canterbury corpora",
        href: "https://corpus.canterbury.ac.nz/descriptions/",
      },
      {
        label: "University of Canterbury — historical Canterbury ratios (2001)",
        href: "https://corpus.canterbury.ac.nz/details/cantrbry/RatioByLex.html",
      },
      {
        label: "Silesia Corpus — official description",
        href: "https://sun.aei.polsl.pl/~sdeor/index.php?page=silesia",
      },
      {
        label: "Microsoft — Storage settings in Windows",
        href: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/storage-settings-in-windows",
      },
      {
        label: "Microsoft — Manage drive space with Storage Sense",
        href: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/manage-drive-space-with-storage-sense",
      },
      {
        label: "Microsoft — Free up drive space in Windows",
        href: "https://support.microsoft.com/en-gb/windows/experience/storage-filemanagement/free-up-drive-space-in-windows",
      },
      {
        label: "Microsoft — OneDrive Files On-Demand",
        href: "https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows",
      },
      {
        label: "Microsoft — delete files or folders in OneDrive",
        href: "https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive",
      },
      { label: "WizTree — FAQ", href: "https://wize-tree.com/faq/" },
      { label: "WizTree — Guide", href: "https://wize-tree.com/guide/" },
      {
        label: "Microsoft Learn — compact command",
        href: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/compact",
      },
      {
        label:
          "Microsoft Learn — Compact OS and storage/performance trade-offs",
        href: "https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/optimize/compactos",
      },
    ],
    footerNote:
      "RCS-RP-003 · Personal-computer storage study · Version 2.0 · 8 October 2026",
  },
  nl: {
    metadataTitle: "RCS-RP-003 — Schijfruimte Windows | Raiju Cloud System",
    metadataDescription:
      "Praktische studie over opslag analyseren, opruimen en comprimeren op een Windows-pc, met synthetische metingen en duidelijke beperkingen.",
    eyebrow: "RCS // RESEARCH PROGRAM · RCS-RP-003",
    title: "Beheer de schijfruimte van een Windows-pc",
    abstract:
      "Een volledige studie naar opslagbeheer met 26 bestanden uit openbare corpora, vijf synthetische gevallen, 220 herhaalde metingen en onderbouwde richtlijnen — zonder persoonlijke bestanden te analyseren.",
    questionLabel: "ONDERZOEKSVRAAG",
    question:
      "Welke acties maken lokale ruimte vrij met een aanvaardbaar risico, en wanneer moet een gebruiker opruimen, verplaatsen, archiveren, cloud-placeholders gebruiken of comprimeren?",
    back: "TERUG NAAR ONDERZOEK",
    report: "PDF-RAPPORT DOWNLOADEN (FRANS)",
    package: "COMPLEET STUDIEPAKKET DOWNLOADEN (ZIP)",
    editableReport: "BEWERKBAAR RAPPORT (DOCX)",
    source: "VOLLEDIGE STUDIE (MARKDOWN)",
    data: "RESULTATEN-CSV",
    workbook: "DATAWERKBOEK (XLSX)",
    caseSummary: "SAMENVATTING PER GEVAL CSV",
    manifest: "CORPUSMANIFEST (26 BESTANDEN)",
    reproduce: "REPRODUCTIESCRIPT",
    sourcesRegister: "BRONNENREGISTER CSV",
    figureCaption:
      "Figuur 1 — Verhouding tussen logische invoer en gemeten uitvoer voor elk Silesia-bestand; mediaan van drie tests. Een hogere verhouding betekent een kleinere uitvoer.",
    method: "METHODE EN REIKWIJDTE",
    environment:
      "26 openbare bestanden (225,9 MB), vijf synthetische gevallen en twee methoden op één Windows/NTFS-systeem. 110 gepaarde uitvoeringen, 220 metingen; alle 246 integriteitscontroles geslaagd. Geen persoonlijke bestanden geanalyseerd.",
    date: "Tests uitgevoerd op 8 oktober 2026 · versie 2.0",
    reservedDoi: "ZENODO-DOI GERESERVEERD",
    doiNotice:
      "10.5281/zenodo.23233639 — de Zenodo-depositie is nog niet gepubliceerd. Presenteer deze DOI niet als een gepubliceerde registratie voordat de depositie online staat.",
    resultsTitle: "Gemeten resultaten",
    caseLabel: "Corpus / geval",
    inputLabel: "Invoer (bytes)",
    zipLabel: "ZIP-archief (bytes)",
    zipDeltaLabel: "ZIP-wijziging",
    ntfsStoredLabel: "NTFS opgeslagen (bytes)",
    ntfsDeltaLabel: "NTFS-wijziging",
    resultsNote:
      "Canterbury/Silesia-aggregaten staan los van de synthetische gevallen. ZIP vergelijkt archiefbytes met logische invoer; NTFS vergelijkt toegewezen bytes vóór/na. Invoer is met SHA-256 gecontroleerd. Een + betekent een toename. Historische corpora en één systeem voorspellen geen besparing op een persoonlijke pc.",
    sections: [
      {
        id: "scope",
        title: "Een studie naar pc-opslag, geen serverbenchmark",
        paragraphs: [
          "RP-003 gaat over opslagbeheer op een computer die door een persoon wordt gebruikt: begrijpen wat ruimte inneemt, een passende actie kiezen en gegevensverlies voorkomen. De studie verschilt van RCS-RP-002, dat hardwareafhankelijke prestaties van compressiealgoritmen onderzoekt.",
          "Het experiment omvat 26 bestanden uit Canterbury, Canterbury Large en Silesia (225.908.846 bytes), vijf synthetische gevallen en corpusaggregaten. Openbare bestanden zijn op checksums gecontroleerd en elk driemaal getest; synthetische gevallen vijfmaal. De Silesia-aggregatie is eenmaal uitgevoerd.",
        ],
      },
      {
        id: "interpretation",
        title: "Wat de metingen aantonen",
        paragraphs: [
          "Op volledige corpora verlaagde ZIP de logische omvang met 73,96% voor Canterbury, 70,80% voor Canterbury Large en 67,81% voor Silesia. NTFS verminderde de toegewezen ruimte met 49,74%, 37,46% en 42,88%. De vijf synthetische ZIP-gevallen liepen uiteen van −99,66% tot +68,75%; 1.000 kleine bestanden werden in ZIP 68,75% groter. Bestanden met hoge entropie leverden vrijwel niets op.",
          "Dit zijn metingen van historische en synthetische gegevens op één systeem, geen voorspelling voor een persoonlijke bibliotheek. Tijden gelden niet als benchmark; latentie, CPU, batterij en moderne formaten vallen buiten het bereik.",
        ],
      },
      {
        id: "workflow",
        title: "Voorzichtig ruimte vrijmaken",
        paragraphs: [
          "Werk in kleine stappen en controleer de vrije ruimte na elke stap:",
        ],
        bullets: [
          "Begin in Instellingen → Systeem → Opslag en bekijk de Windows-opruimaanbevelingen voordat je iets bevestigt.",
          "Gebruik een schijfanalyseprogramma zoals WizTree om grote bestanden te vinden. Een groot bestand is niet automatisch overbodig of veilig te verwijderen.",
          "Verwijder ongebruikte apps via Windows-instellingen in plaats van mappen handmatig te wissen.",
          "Verplaats of archiveer oude gegevens pas nadat een kopie en back-up zijn gecontroleerd. Verplaatsen binnen hetzelfde volume maakt geen ruimte vrij.",
          "Gebruik compressie voor gegevens met echte redundantie en test eerst een klein voorbeeld. Verwacht geen grote winst bij JPEG, video, gecomprimeerde audio of archieven.",
          "Controleer de Storage Sense-regels voor de Prullenbak, Downloads en cloudbestanden; automatische verwijdering kan bestanden wissen die je wilde bewaren.",
          "Cloudbestanden die alleen online staan, zijn afhankelijk van de verbinding en zijn mogelijk offline niet beschikbaar. Synchronisatie is geen onafhankelijke back-up.",
          "Voorkom herhaling door de opslaglocatie voor nieuwe grote bestanden te kiezen en regelmatig gericht te controleren.",
        ],
      },
      {
        id: "wiztree",
        title: "WizTree: vinden en dan beslissen",
        paragraphs: [
          "WizTree is een schijfgebruik-analyseprogramma, geen automatische opschoner. De weergaven helpen grote bestanden en mappen te vinden. “Size” is de logische bestandsgrootte; “Allocated” is de toegewezen schijfruimte en kan verschillen door compressie en allocatie-eenheden. Sommige NTFS-metadata telt niet als bestand, waardoor totalen van Windows Opslag kunnen afwijken.",
          "Begin voor een gewone controle zonder administratorrechten. Volgens de leverancier vereist de snelle NTFS-scan verhoogde rechten; gebruik die alleen wanneer nodig en wanneer je de toepassing vertrouwt. Verwijder nooit een systeembestand alleen omdat het groot lijkt in een treemap.",
        ],
      },
      {
        id: "limits",
        title: "Beperkingen en bewijsstatus",
        paragraphs: [
          "De tabellen bevatten metingen uit het beschreven protocol. Advies over Storage Sense, OneDrive, NTFS en WizTree komt van de externe bronnen hieronder en is niet in dit experiment getest.",
        ],
        bullets: [
          "Eén NTFS-systeem en historische corpora, met slechts één Silesia-aggregaatmeting; geen willekeurige steekproef van pc's of persoonlijke bibliotheken.",
          "Geen persoonlijke bestanden gescand; geen tools geïnstalleerd; geen bestaande gegevens gewijzigd of verwijderd.",
          "Geen WizTree-productbenchmark, geen 7-Zip-test en geen applicatieprestatiemeting.",
          "Windows-labels en gedrag kunnen verschillen per versie, taal en instelling.",
        ],
      },
    ],
    sourcesTitle: "Externe bronnen",
    sources: [
      {
        label:
          "University of Canterbury — Canterbury en Canterbury Large-corpora",
        href: "https://corpus.canterbury.ac.nz/descriptions/",
      },
      {
        label:
          "University of Canterbury — historische Canterbury-ratio's (2001)",
        href: "https://corpus.canterbury.ac.nz/details/cantrbry/RatioByLex.html",
      },
      {
        label: "Silesia Corpus — officiële beschrijving",
        href: "https://sun.aei.polsl.pl/~sdeor/index.php?page=silesia",
      },
      {
        label: "Microsoft — Opslaginstellingen in Windows",
        href: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/storage-settings-in-windows",
      },
      {
        label: "Microsoft — schijfruimte beheren met Storage Sense",
        href: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/manage-drive-space-with-storage-sense",
      },
      {
        label: "Microsoft — schijfruimte vrijmaken in Windows",
        href: "https://support.microsoft.com/en-gb/windows/experience/storage-filemanagement/free-up-drive-space-in-windows",
      },
      {
        label: "Microsoft — OneDrive Files On-Demand",
        href: "https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows",
      },
      {
        label: "Microsoft — bestanden of mappen in OneDrive verwijderen",
        href: "https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive",
      },
      { label: "WizTree — FAQ", href: "https://wize-tree.com/faq/" },
      { label: "WizTree — handleiding", href: "https://wize-tree.com/guide/" },
      {
        label: "Microsoft Learn — compact-opdracht",
        href: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/compact",
      },
      {
        label: "Microsoft Learn — Compact OS en afweging opslag/prestaties",
        href: "https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/optimize/compactos",
      },
    ],
    footerNote:
      "RCS-RP-003 · Opslagstudie voor persoonlijke pc · Versie 2.0 · 8 oktober 2026",
  },
};

export const rp003Results = [
  {
    key: "canterbury",
    name: {
      fr: "Canterbury · 11 fichiers · 3 essais",
      en: "Canterbury · 11 files · 3 runs",
      nl: "Canterbury · 11 bestanden · 3 tests",
    },
    input: "2 810 784",
    zip: "731 938",
    zipDelta: "−73,96 %",
    ntfs: "1 412 745",
    ntfsDelta: "−49,74 %",
  },
  {
    key: "canterbury-large",
    name: {
      fr: "Canterbury Large · 3 fichiers · 3 essais",
      en: "Canterbury Large · 3 files · 3 runs",
      nl: "Canterbury Large · 3 bestanden · 3 tests",
    },
    input: "11 159 482",
    zip: "3 259 131",
    zipDelta: "−70,80 %",
    ntfs: "6 979 584",
    ntfsDelta: "−37,46 %",
  },
  {
    key: "silesia",
    name: {
      fr: "Silesia · 12 fichiers · 1 essai agrégé",
      en: "Silesia · 12 files · 1 aggregate run",
      nl: "Silesia · 12 bestanden · 1 aggregatietest",
    },
    input: "211 938 580",
    zip: "68 221 469",
    zipDelta: "−67,81 %",
    ntfs: "121 049 088",
    ntfsDelta: "−42,88 %",
  },
  {
    key: "log",
    name: {
      fr: "Synthétique · journal répétitif · 5 essais",
      en: "Synthetic · repetitive log · 5 runs",
      nl: "Synthetisch · repetitief log · 5 tests",
    },
    input: "8 388 608",
    zip: "28 714",
    zipDelta: "−99,66 %",
    ntfs: "1 048 576",
    ntfsDelta: "−87,50 %",
  },
  {
    key: "jsonl",
    name: {
      fr: "Synthétique · JSONL structuré · 5 essais",
      en: "Synthetic · structured JSONL · 5 runs",
      nl: "Synthetisch · gestructureerde JSONL · 5 tests",
    },
    input: "8 388 608",
    zip: "184 883",
    zipDelta: "−97,80 %",
    ntfs: "1 048 576",
    ntfsDelta: "−87,50 %",
  },
  {
    key: "random",
    name: {
      fr: "Synthétique · binaire à forte entropie · 5 essais",
      en: "Synthetic · high-entropy binary · 5 runs",
      nl: "Synthetisch · binaire met hoge entropie · 5 tests",
    },
    input: "8 388 608",
    zip: "8 391 324",
    zipDelta: "+0,03 %",
    ntfs: "8 388 608",
    ntfsDelta: "0,00 %",
  },
  {
    key: "archive",
    name: {
      fr: "Synthétique · ZIP déjà compressé · 5 essais",
      en: "Synthetic · already-compressed ZIP · 5 runs",
      nl: "Synthetisch · al gecomprimeerde ZIP · 5 tests",
    },
    input: "8 391 324",
    zip: "8 394 034",
    zipDelta: "+0,03 %",
    ntfs: "8 391 324",
    ntfsDelta: "0,00 %",
  },
  {
    key: "small-files",
    name: {
      fr: "Synthétique · 1 000 petits fichiers · 5 essais",
      en: "Synthetic · 1,000 small files · 5 runs",
      nl: "Synthetisch · 1.000 kleine bestanden · 5 tests",
    },
    input: "96 000",
    zip: "161 997",
    zipDelta: "+68,75 %",
    ntfs: "96 000",
    ntfsDelta: "0,00 %",
  },
] as const;
