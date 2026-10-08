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
  source: string;
  data: string;
  fixtures: string;
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
      "Une étude pratique sur les façons de récupérer ou libérer de l’espace local sans supprimer des données utiles ni appliquer une compression inadaptée. Elle combine documentation officielle et essais contrôlés sur des fichiers synthétiques, sans analyser les fichiers personnels du poste.",
    questionLabel: "QUESTION ÉTUDIÉE",
    question:
      "Quelles actions libèrent réellement de l’espace local avec un risque raisonnable, et quand faut-il nettoyer, déplacer, archiver, utiliser le cloud à la demande ou compresser ?",
    back: "RETOUR AUX ÉTUDES",
    report: "TÉLÉCHARGER LE RAPPORT PDF (FR)",
    source: "MÉTHODE (MARKDOWN)",
    data: "RÉSULTATS CSV",
    fixtures: "FICHIERS DE TEST SYNTHÉTIQUES (8,1 MIO)",
    method: "MÉTHODE ET PÉRIMÈTRE",
    environment:
      "Un poste Windows et un volume NTFS. Seuls des fichiers temporaires synthétiques ont été utilisés ; aucun dossier personnel n’a été parcouru. Trois cas, une exécution par cas. Les temps ne sont pas rapportés.",
    date: "Essais réalisés le 8 octobre 2026",
    reservedDoi: "DOI ZENODO RÉSERVÉ",
    doiNotice:
      "10.5281/zenodo.23233639 — dépôt Zenodo non publié à ce stade. Le DOI ne doit pas être présenté comme une référence publiée avant la mise en ligne du dépôt.",
    resultsTitle: "Résultats mesurés",
    caseLabel: "Cas synthétique",
    inputLabel: "Entrée (octets)",
    zipLabel: "Archive ZIP (octets)",
    zipDeltaLabel: "Variation ZIP",
    ntfsStoredLabel: "Espace stocké NTFS (octets)",
    ntfsDeltaLabel: "Variation NTFS",
    resultsNote:
      "ZIP : Compress-Archive, niveau Optimal. NTFS : compact /c /q sur des copies distinctes. Les contenus ont été vérifiés par SHA-256 après extraction ou compression. Pourcentage positif = taille accrue ; résultats arrondis à deux décimales. Ces contrôles synthétiques ne prédisent pas les économies d’un dossier réel.",
    sections: [
      {
        id: "scope",
        title: "Une étude d’usage, pas un benchmark de serveurs",
        paragraphs: [
          "RP-003 porte sur l’entretien du stockage d’un ordinateur utilisé par une personne : comprendre ce qui occupe l’espace, choisir une action adaptée et éviter une perte de données. Il est distinct de RCS-RP-002, qui étudie les performances d’algorithmes selon le matériel.",
          "L’expérience a utilisé un journal répétitif de 8 Mio, un binaire pseudo-aléatoire de 8 Mio et une archive ZIP contenant ce binaire. Le journal est un cas très favorable à la compression ; les deux autres représentent des données peu compressibles ou déjà compressées.",
        ],
      },
      {
        id: "interpretation",
        title: "Ce que les mesures permettent de dire",
        paragraphs: [
          "Sur le journal synthétique, ZIP a fortement réduit la taille et NTFS Compression a réduit l’espace stocké à un huitième. Sur le binaire aléatoire et son archive, ZIP a ajouté un petit surcoût et NTFS Compression n’a pas diminué l’espace stocké. Une deuxième compression n’est donc pas une stratégie universelle.",
          "Ces chiffres décrivent trois motifs fabriqués et une seule exécution sur un poste. Ils ne donnent ni pourcentage moyen par catégorie de fichiers ni mesure de vitesse, de latence, de CPU ou de batterie. Une sauvegarde avant suppression reste indispensable.",
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
          "Trois fichiers synthétiques, une répétition par cas et un seul volume NTFS : la représentativité est limitée.",
          "Aucun scan de fichiers personnels ; aucun outil installé ; aucune donnée existante modifiée ou supprimée.",
          "Aucun benchmark produit de WizTree, aucun essai 7-Zip, aucune mesure de performance d’application.",
          "Les libellés et comportements de Windows peuvent varier selon la version, la langue et les paramètres.",
        ],
      },
    ],
    sourcesTitle: "Sources externes",
    sources: [
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
      "RCS-RP-003 · Étude de stockage pour poste personnel · Version 1.0 · 8 octobre 2026",
  },
  en: {
    metadataTitle: "RCS-RP-003 — Windows disk space | Raiju Cloud System",
    metadataDescription:
      "A practical study of diagnosing, sorting and compressing data on a Windows PC, with synthetic measurements and documented limits.",
    eyebrow: "RCS // RESEARCH PROGRAM · RCS-RP-003",
    title: "Take control of disk space on a Windows PC",
    abstract:
      "A practical study of ways to recover or free local space without deleting useful data or applying unsuitable compression. It combines official documentation with controlled tests on synthetic files; no personal files were analysed.",
    questionLabel: "RESEARCH QUESTION",
    question:
      "Which actions free local space with reasonable risk, and when should a user clean, move, archive, use cloud placeholders or compress?",
    back: "BACK TO RESEARCH",
    report: "DOWNLOAD THE PDF REPORT (FRENCH)",
    source: "METHOD (MARKDOWN)",
    data: "RESULTS CSV",
    fixtures: "SYNTHETIC TEST FIXTURES (8.1 MIB)",
    method: "METHOD AND SCOPE",
    environment:
      "One Windows PC and an NTFS volume. Only synthetic temporary files were used; no personal folders were scanned. Three cases, one run per case. Timings are not reported.",
    date: "Tests performed on 8 October 2026",
    reservedDoi: "ZENODO DOI RESERVED",
    doiNotice:
      "10.5281/zenodo.23233639 — the Zenodo deposit is not yet published. Do not present this DOI as a published record until the deposit is online.",
    resultsTitle: "Measured results",
    caseLabel: "Synthetic case",
    inputLabel: "Input (bytes)",
    zipLabel: "ZIP archive (bytes)",
    zipDeltaLabel: "ZIP change",
    ntfsStoredLabel: "NTFS stored (bytes)",
    ntfsDeltaLabel: "NTFS change",
    resultsNote:
      "ZIP: Compress-Archive, Optimal level. NTFS: compact /c /q on separate copies. Contents were checked with SHA-256 after extraction or compression. A positive percentage means a size increase; values are rounded to two decimals. These synthetic controls do not predict savings for a real folder.",
    sections: [
      {
        id: "scope",
        title: "A user-storage study, not a server benchmark",
        paragraphs: [
          "RP-003 concerns storage management on a computer used by a person: understand what consumes space, choose a suitable action and avoid data loss. It is distinct from RCS-RP-002, which studies hardware-dependent compression algorithm performance.",
          "The experiment used an 8 MiB repetitive log, an 8 MiB pseudo-random binary file, and a ZIP archive containing that binary file. The log is an intentionally favourable case for compression; the other two represent low-redundancy or already-compressed data.",
        ],
      },
      {
        id: "interpretation",
        title: "What the measurements support",
        paragraphs: [
          "For the synthetic log, ZIP greatly reduced size and NTFS Compression reduced stored space to one eighth. For the random binary file and its archive, ZIP added a small amount of overhead and NTFS Compression did not reduce stored space. Recompressing is therefore not a universal strategy.",
          "These figures describe three constructed patterns and one run on one PC. They are not average savings by file category and include no speed, latency, CPU or battery measurements. Keep a verified backup before deleting anything.",
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
          "Three synthetic files, one run per case and one NTFS volume: representativeness is limited.",
          "No personal files scanned; no tool installed; no existing data modified or deleted.",
          "No WizTree product benchmark, no 7-Zip test and no application-performance measurement.",
          "Windows labels and behaviour may vary by version, language and settings.",
        ],
      },
    ],
    sourcesTitle: "External sources",
    sources: [
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
      "RCS-RP-003 · Personal-computer storage study · Version 1.0 · 8 October 2026",
  },
  nl: {
    metadataTitle: "RCS-RP-003 — Schijfruimte Windows | Raiju Cloud System",
    metadataDescription:
      "Praktische studie over opslag analyseren, opruimen en comprimeren op een Windows-pc, met synthetische metingen en duidelijke beperkingen.",
    eyebrow: "RCS // RESEARCH PROGRAM · RCS-RP-003",
    title: "Beheer de schijfruimte van een Windows-pc",
    abstract:
      "Een praktische studie over lokale ruimte terugwinnen zonder nuttige gegevens te verwijderen of ongeschikte compressie toe te passen. De studie combineert officiële documentatie met gecontroleerde tests op synthetische bestanden; persoonlijke bestanden zijn niet geanalyseerd.",
    questionLabel: "ONDERZOEKSVRAAG",
    question:
      "Welke acties maken lokale ruimte vrij met een aanvaardbaar risico, en wanneer moet een gebruiker opruimen, verplaatsen, archiveren, cloud-placeholders gebruiken of comprimeren?",
    back: "TERUG NAAR ONDERZOEK",
    report: "PDF-RAPPORT DOWNLOADEN (FRANS)",
    source: "METHODE (MARKDOWN)",
    data: "RESULTATEN-CSV",
    fixtures: "SYNTHETISCHE TESTBESTANDEN (8,1 MIB)",
    method: "METHODE EN REIKWIJDTE",
    environment:
      "Eén Windows-pc en een NTFS-volume. Alleen synthetische tijdelijke bestanden zijn gebruikt; persoonlijke mappen zijn niet gescand. Drie gevallen, één uitvoering per geval. Tijden worden niet gerapporteerd.",
    date: "Tests uitgevoerd op 8 oktober 2026",
    reservedDoi: "ZENODO-DOI GERESERVEERD",
    doiNotice:
      "10.5281/zenodo.23233639 — de Zenodo-depositie is nog niet gepubliceerd. Presenteer deze DOI niet als een gepubliceerde registratie voordat de depositie online staat.",
    resultsTitle: "Gemeten resultaten",
    caseLabel: "Synthetisch geval",
    inputLabel: "Invoer (bytes)",
    zipLabel: "ZIP-archief (bytes)",
    zipDeltaLabel: "ZIP-wijziging",
    ntfsStoredLabel: "NTFS opgeslagen (bytes)",
    ntfsDeltaLabel: "NTFS-wijziging",
    resultsNote:
      "ZIP: Compress-Archive, niveau Optimal. NTFS: compact /c /q op afzonderlijke kopieën. Inhoud is met SHA-256 gecontroleerd na uitpakken of comprimeren. Een positief percentage betekent een toename; waarden zijn afgerond op twee decimalen. Deze synthetische controles voorspellen geen besparing voor een echte map.",
    sections: [
      {
        id: "scope",
        title: "Een studie naar pc-opslag, geen serverbenchmark",
        paragraphs: [
          "RP-003 gaat over opslagbeheer op een computer die door een persoon wordt gebruikt: begrijpen wat ruimte inneemt, een passende actie kiezen en gegevensverlies voorkomen. De studie verschilt van RCS-RP-002, dat hardwareafhankelijke prestaties van compressiealgoritmen onderzoekt.",
          "Het experiment gebruikte een repetitief logbestand van 8 MiB, een pseudo-willekeurig binair bestand van 8 MiB en een ZIP-archief met dat binaire bestand. Het log is een bewust gunstig compressiegeval; de andere twee staan voor weinig redundante of al gecomprimeerde data.",
        ],
      },
      {
        id: "interpretation",
        title: "Wat de metingen aantonen",
        paragraphs: [
          "Voor het synthetische logbestand verkleinde ZIP de bestandsgrootte sterk en bracht NTFS-compressie de opgeslagen ruimte terug tot een achtste. Voor het willekeurige binaire bestand en het archief voegde ZIP een kleine overhead toe en bespaarde NTFS-compressie geen opslagruimte. Opnieuw comprimeren is dus geen universele oplossing.",
          "Deze cijfers beschrijven drie geconstrueerde patronen en één uitvoering op één pc. Het zijn geen gemiddelde besparingen per bestandstype en er zijn geen snelheid-, latentie-, CPU- of batterijmetingen. Maak een gecontroleerde back-up voordat je iets verwijdert.",
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
          "Drie synthetische bestanden, één uitvoering per geval en één NTFS-volume: de representativiteit is beperkt.",
          "Geen persoonlijke bestanden gescand; geen tools geïnstalleerd; geen bestaande gegevens gewijzigd of verwijderd.",
          "Geen WizTree-productbenchmark, geen 7-Zip-test en geen applicatieprestatiemeting.",
          "Windows-labels en gedrag kunnen verschillen per versie, taal en instelling.",
        ],
      },
    ],
    sourcesTitle: "Externe bronnen",
    sources: [
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
      "RCS-RP-003 · Opslagstudie voor persoonlijke pc · Versie 1.0 · 8 oktober 2026",
  },
};

export const rp003Results = [
  {
    key: "log",
    name: {
      fr: "Journal répétitif",
      en: "Repetitive log",
      nl: "Repetitief logbestand",
    },
    input: "8 388 608",
    zip: "57 149",
    zipDelta: "−99,32 %",
    ntfs: "1 048 576",
    ntfsDelta: "−87,50 %",
  },
  {
    key: "random",
    name: {
      fr: "Binaire pseudo-aléatoire",
      en: "Pseudo-random binary",
      nl: "Pseudo-willekeurig binair bestand",
    },
    input: "8 388 608",
    zip: "8 391 305",
    zipDelta: "+0,03 %",
    ntfs: "8 388 608",
    ntfsDelta: "0,00 %",
  },
  {
    key: "archive",
    name: {
      fr: "ZIP déjà compressé",
      en: "Already-compressed ZIP",
      nl: "Al gecomprimeerd ZIP-bestand",
    },
    input: "8 391 305",
    zip: "8 394 026",
    zipDelta: "+0,03 %",
    ntfs: "8 391 305",
    ntfsDelta: "0,00 %",
  },
] as const;
