# RCS-RP-003 — Libérer de l’espace disque sans perdre ses données

**Raiju Cloud System · Research Program · Rapport de recherche**
**Version 2.0 · 8 octobre 2026 · Contributeur : Hugues Henrotte**
**DOI réservé : 10.5281/zenodo.23233639 (dépôt non publié; ne pas citer comme enregistrement publié)**

## Résumé

Cette étude examine des façons sûres et mesurables de récupérer de l’espace sur un ordinateur Windows utilisé par une personne. Elle distingue la suppression de données, la désinstallation, le déplacement ou l’archivage, les fichiers cloud à la demande et la compression. L’expérience compare une archive ZIP PowerShell et la compression NTFS sur 26 fichiers de trois corpus publics — Canterbury, Canterbury Large et Silesia — et cinq cas synthétiques couvrant texte répétitif, JSONL structuré, binaire à forte entropie, archive déjà compressée et répertoire de petits fichiers. Les entrées sont épinglées et vérifiées; les corpus publics ne sont pas redistribués.

Le protocole comporte 110 exécutions de cas appariées, soit 220 mesures ZIP/NTFS, et les 26 sources publiques ainsi que les 220 transformations passent leurs contrôles d’intégrité. Sur les répertoires complets, les archives ZIP réduisent les octets logiques de 73,96 % (Canterbury), 70,80 % (Canterbury Large) et 67,81 % (Silesia). NTFS réduit l’allocation de 49,74 %, 37,46 % et 42,88 % respectivement. Ces corpus sont anciens et riches en contenus compressibles; ces valeurs ne prédisent pas l’espace récupérable dans une bibliothèque personnelle. Les résultats par échantillon, synthèses pondérées, répétitions et contrôles d’intégrité sont joints. La recommandation pratique est de mesurer, localiser les gros consommateurs avec un analyseur tel que WizTree, choisir l’action selon le risque et l’usage, puis vérifier l’espace libéré. Une treemap indique où l’espace est utilisé; elle ne détermine pas ce qui est inutile ou sûr à supprimer.

**Mots-clés :** stockage; Windows; NTFS; WizTree; compression; espace alloué; sauvegarde; hygiène numérique.

## Abstract

This study examines safe and measurable ways to reclaim storage on a Windows personal computer. It distinguishes deletion, uninstalling software, moving or archiving files, cloud files-on-demand, and compression. The experiment compares PowerShell ZIP archives and Windows NTFS compression on 26 files from three public corpora (Canterbury, Canterbury Large, and Silesia) plus five synthetic cases representing repetitive text, structured text, high-entropy data, an already-compressed archive, and many small files. Inputs are pinned and checksum-verified; the public corpora are not redistributed.

Repeated trials distinguish logical file length from allocated space and verify SHA-256 integrity after reversible transformations. No personal file was inspected, and no pre-existing file was changed or deleted. The experiment answers only what these mechanisms did to these samples on one NTFS system; it cannot forecast savings on a reader’s computer. The accompanying data package publishes per-sample results, weighted summaries, repeat variation, and integrity checks. Because savings depend on file contents, a favourable synthetic log is not a forecast for photos, videos, games, documents, or personal libraries. The practical recommendation is to measure first, locate large items with an analyser such as WizTree, choose a risk-appropriate action, and verify the result. A treemap can show where space is used; it cannot decide whether an item is unnecessary or safe to delete.

## 1. Problème et objectifs

Le manque d’espace déclenche parfois des gestes à risque : suppression au hasard, nettoyage automatique mal compris, déplacement sans sauvegarde, ou compression globale de contenus déjà compressés. Ces gestes ne répondent pas au même problème. Une archive ne libère l’espace local que si l’original est ensuite retiré après vérification; une compression en place peut réduire l’allocation tout en gardant un chemin accessible; le cloud à la demande échange de l’espace local contre une dépendance réseau; une suppression libère de la place au prix de la perte de la donnée.

RP-003 étudie la gestion du stockage d’un terminal humain, pas d’un serveur. L’objectif est de comparer des transformations de stockage en conditions contrôlées, documenter les outils intégrés et WizTree à partir de leurs éditeurs, puis proposer une démarche prudente et vérifiable.

### Question de recherche

Pour un utilisateur de PC Windows, quelles stratégies peuvent réellement réduire l’occupation locale, dans quelles situations la compression est-elle pertinente, et quelles vérifications réduisent le risque de perdre des données utiles ?

### Hypothèses

- H1 : les réductions varient avec la redondance et le format; un taux unique ne représente pas les types de fichiers.
- H2 : une archive générique peut ajouter un surcoût sur des données déjà compressées ou à forte entropie.
- H3 : NTFS Compression peut diminuer l’espace alloué tout en conservant le contenu logique, sans garantir un gain pour chaque format.
- H4 : répétitions, vérification d’intégrité et distinction taille logique/allouée sont nécessaires à l’interprétation.

## 2. Cadre conceptuel et mesures

**Supprimer** retire la donnée et peut affecter Corbeille, instantanés, synchronisation et sauvegardes. C’est une décision de conservation, pas une optimisation neutre. **Désinstaller** une application via le mécanisme prévu n’est pas équivalent à supprimer son dossier. **Déplacer** dans un autre dossier du même volume ne libère généralement pas d’espace; déplacer vers un autre volume peut en libérer après validation de la copie. **Archiver** crée une copie regroupée, et ne produit un gain local net que si l’archive est vérifiée et les originaux retirés volontairement. **Fichiers cloud à la demande** peuvent retirer le contenu local, mais son accès peut dépendre d’Internet; synchronisation et sauvegarde indépendante ne sont pas synonymes. **Compression en place** conserve les chemins d’accès tout en modifiant l’allocation; coût CPU, latence, compatibilité et batterie ne sont pas mesurés ici. **Nettoyage ciblé** suit les catégories et réglages de Windows.

- **Taille logique** : longueur des fichiers en octets avant transformation.
- **Octets alloués** : espace attribué par le système de fichiers; clusters et compression expliquent l’écart avec la taille logique.
- **Taille ZIP** : longueur de l’archive, en-têtes et métadonnées inclus.
- **Variation** : (sortie / référence pertinente − 1) × 100; négatif = réduction, positif = augmentation.
- **Ratio entrée/sortie** : référence / sortie; supérieur à 1 signifie que la sortie est plus petite. La référence est logique pour ZIP et allouée avant compression pour NTFS; ces mesures ne sont pas interchangeables.
- **Intégrité** : manifeste SHA-256 des chemins relatifs et contenus après extraction ZIP ou compression NTFS.

L’allocation mesurée fichier par fichier n’est pas une prévision exacte de la jauge « espace libre » de l’ensemble du volume : métadonnées, granularité, fragmentation et autres activités interviennent. L’étude rapporte des fichiers contrôlés, non l’espace libre total d’un ordinateur.

## 3. Données et provenance

Les 26 fichiers publics proviennent de Canterbury, Canterbury Large et Silesia. Canterbury couvre notamment texte, code, HTML, feuille de calcul, fax et exécutable. Canterbury Large ajoute trois échantillons de grande taille. Silesia élargit les formats à des archives logicielles, bases de données, texte, PDF, HTML/XML, exécutable et imagerie médicale non compressée. `corpus-manifest.csv` liste les catégories, tailles, empreintes, URL et commits. Chaque source est vérifiée avant essai par longueur, MD5 disponible chez le miroir et SHA-256 du manifeste.

Les pages universitaires sont les références descriptives. Le téléchargement direct de Canterbury depuis l’hôte officiel renvoyait HTTP 403; les octets sont récupérés depuis des miroirs GitHub publics fixés à des commits immuables, puis comparés aux longueurs officielles et sommes disponibles. Le miroir Silesia fournit les MD5, tous revérifiés. Ces miroirs ne sont pas présentés comme approuvés par les auteurs. Les fichiers sources ne sont pas redistribués dans le dépôt RCS; seules les empreintes, résultats et scripts le sont.

Les corpus sont historiques. Canterbury reflète des collections des années 1990 et ses ratios historiques sont indiqués comme mis à jour en 2001. Silesia est également un corpus de référence ancien. Ils ne représentent pas les bibliothèques actuelles de jeux, vidéos modernes, HEIC, caches d’applications récentes ou installations Windows actuelles. Les ratios Canterbury publiés sont cités uniquement pour illustrer une variation selon fichier et méthode; ils ne sont ni agrégés avec les observations 2026 ni présentés comme benchmark logiciel moderne.

Les cinq cas synthétiques, générés localement et de façon déterministe : (1) journal répétitif de 8 MiB; (2) JSON Lines de 65 536 événements; (3) binaire de 8 MiB produit par générateur pseudorandom déterministe fondé sur SHA-256; (4) ZIP de ce binaire; (5) dossier de 1 000 petits fichiers de 96 octets. Aucun contenu ne vient d’un utilisateur. Journal et JSONL isolent la redondance; le binaire et son ZIP représentent des cas peu compressibles ou déjà compressés.

## 4. Protocole

### Environnement et sécurité

Essais du 8 octobre 2026 sur un poste Windows et un volume NTFS. Le modèle matériel, nom d’utilisateur, volume total, espace libre et données du compte ne sont pas publiés et ne servent pas à l’analyse. Aucun dossier personnel n’a été scanné; aucun outil installé, réglage système changé, nettoyage ou suppression de données existantes n’a été réalisé. Chaque transformation porte uniquement sur une copie d’essai dans un répertoire temporaire dédié.

### Bras A — ZIP

PowerShell `Compress-Archive -CompressionLevel Optimal` crée une archive à partir d’une copie du fichier ou dossier. La taille de l’archive est mesurée en octets; l’extraction est vérifiée par manifeste SHA-256 et taille logique. Le temps enregistré est descriptif, non un comparatif de performance standardisé.

### Bras B — NTFS

Une copie séparée reçoit `compact.exe /c /q /s:<répertoire>`. L’allocation est mesurée avant et après, par fichier, via l’API Windows `GetCompressedFileSizeW`. Le manifeste logique est comparé à l’original. Le runner s’arrête à la première différence d’empreinte ou erreur de source.

### Répétitions et analyse

Chaque fichier public est mesuré trois fois sur une copie indépendante. Canterbury et Canterbury Large sont aussi mesurés comme répertoires agrégés, trois répétitions chacun; le répertoire Silesia est mesuré une fois du fait de son coût, tandis que ses 12 fichiers ont chacun trois répétitions. Les cinq cas synthétiques ont cinq répétitions. Les tailles doivent être déterministes; les répétitions vérifient la stabilité du protocole, pas l’incertitude d’un échantillon de personnes ou machines.

Les synthèses par fichier rapportent nombre de répétitions, moyenne, médiane, minimum, maximum et écart-type d’échantillon. Les résultats par catégorie sont pondérés par octets : somme des sorties / somme des références, et non moyenne simple des pourcentages de fichiers, afin qu’un petit échantillon ne pèse pas autant qu’un gros. Pour ZIP, référence = octets logiques; pour NTFS, référence = octets alloués avant compression. Le tableau par cas et répétitions brutes permet de contrôler ces calculs.

## 5. Résultats

Les tableaux ci-dessous sont calculés depuis `results.csv`. Le tableau de corpus agrégé est distinct des lignes de fichiers : les résultats agrégés ne sont pas additionnés une seconde fois au corpus. Le tableau synthétique représente les cinq motifs contrôlés. Les annexes et le classeur livrent toutes les répétitions et tous les fichiers. Ces taux décrivent les entrées testées sur cet appareil, pas une économie garantie.

### Résumé global par corpus

Sur les répertoires entiers, Canterbury (2 810 784 octets logiques) produit une archive médiane de 731 938 octets (−73,96 %); l’allocation NTFS passe à 1 412 745 octets (−49,74 %). Canterbury Large (11 159 482 octets) atteint 3 259 131 octets en ZIP (−70,80 %) et 6 979 584 octets alloués par NTFS (−37,46 %). Silesia (211 938 580 octets) donne 68 221 469 octets ZIP (−67,81 %) et 121 049 088 octets alloués NTFS (−42,88 %). L’agrégat Silesia n’a qu’une répétition; ses fichiers individuels en ont trois.

### Cas synthétiques

Sur les cas synthétiques (médiane de cinq essais), ZIP réduit le journal de 8 MiB à 28 714 octets (−99,66 %) et le JSONL à 184 883 octets (−97,80 %). NTFS ramène chacun à 1 048 576 octets alloués (−87,50 %). Le binaire à forte entropie de 8 MiB devient un ZIP de 8 391 324 octets (+0,03 %); sa propre archive, de 8 391 324 octets, devient un ZIP imbriqué de 8 394 034 octets (+0,03 %). NTFS ne réduit ni l’un ni l’autre. Pour 1 000 petits fichiers représentant 96 000 octets logiques, ZIP augmente l’archive à 161 997 octets (+68,75 %) et NTFS n’économise aucun octet alloué dans cette expérience. Le coût fixe de l’archive peut dépasser le contenu quand les fichiers sont très petits.

### Corpus publics

Les résultats par fichier sont générés dans l’annexe A : tous les échantillons et méthodes, taille logique, référence, sortie médiane, variation et nombre d’essais. Les cinq cas synthétiques vont de −99,66 % à +68,75 % pour ZIP, ce qui soutient H1; les résultats par fichier des corpus varient aussi largement. Sur le binaire/ZIP synthétique, ZIP ajoute environ 0,03 %, en accord avec H2. NTFS réduit l’allocation de certaines données et en laisse d’autres inchangées, ce qui correspond à H3 sans en faire une garantie. H4 est soutenue par les répétitions et 220 contrôles de transformation réussis; les 26 empreintes de source sont également vérifiées.

### Durées

Les durées end-to-end du CSV incluent création ZIP ou commande NTFS sans contrôle thermique ni isolation des activités d’arrière-plan. Elles ne sont pas un classement de vitesse. Aucune conclusion sur CPU, latence, énergie ou batterie n’en est tirée.

## 6. Discussion

Le comportement dépend du contenu, non du seul suffixe ou de la taille affichée. Le texte répétitif offre plus de redondance; un média ou une archive déjà compressée a souvent moins de motifs à éliminer et l’enveloppe ZIP peut augmenter la taille. Les corpus diversifient les entrées mais leur âge empêche de prédire le résultat de formats populaires actuels.

ZIP et NTFS répondent à des usages différents. ZIP crée une archive distincte, pratique au transport et rangement, mais requiert extraction pour l’usage normal. NTFS agit sur l’allocation tout en gardant les chemins accessibles. Aucun outil ne détermine quels fichiers sont inutiles. Une archive ne libère l’espace local que si l’archive est validée, sa sauvegarde prévue et les originaux retirés volontairement.

Taille logique et octets alloués répondent à deux questions. WizTree les expose et décrit des causes d’écart, dont compression, unités d’allocation et certaines métadonnées. Une treemap n’indique ni valeur du contenu, statut de sauvegarde ni dépendances d’application. L’élévation de privilèges élargit aussi l’inspection; commencer avec droits utilisateur et n’élever que pour un besoin précis réduit l’exposition.

Storage Sense agit suivant les catégories et paramètres. Le bon usage est de lire la configuration de Corbeille, Téléchargements et fichiers cloud avant confirmation et de mesurer après. L’automatisation n’est pas une recommandation universelle de suppression. Les fichiers cloud disponibles uniquement en ligne réduisent le stockage local mais peuvent nécessiter Internet; suppression et synchronisation peuvent se propager.

## 7. Procédure pratique

1. **Mesurer.** Dans Paramètres → Système → Stockage, noter espace libre, volume et catégories avant action.
2. **Localiser sans supprimer.** Utiliser WizTree ou équivalent provenant d’une source fiable. Commencer sans privilèges élevés; protéger tout export d’inventaire comme une donnée privée.
3. **Classifier.** Séparer applications, caches recréables, fichiers personnels, contenus de jeux, médias, archives, sauvegardes et dossiers synchronisés. Vérifier propriétaire et dépendances.
4. **Choisir l’action minimale.** Désinstaller via Windows; nettoyer les éléments identifiés; déplacer vers un autre volume; archiver; utiliser Files On-Demand si accès réseau acceptable; compresser une copie d’échantillon redondant.
5. **Sauvegarder et vérifier.** Vérifier l’ouverture d’une copie indépendante avant suppression; ne pas confondre synchronisation et sauvegarde.
6. **Une action à la fois.** Ne pas modifier à la main Windows, Program Files ou données d’application sur seule base de leur taille.
7. **Re-mesurer.** Confirmer espace libre, bon fonctionnement des applications, récupération des archives et possibilité de restauration.
8. **Prévenir la récidive.** Revoir téléchargements hors ligne, captures/vidéos, bibliothèques de jeux, destinations des nouveaux fichiers volumineux et rétention des sauvegardes.

### WizTree : repérer, puis décider

WizTree est un analyseur de stockage, pas un nettoyeur automatique. Sa documentation distingue « Size » (taille logique) et « Allocated » (allocation) et explique que les totaux peuvent diverger de Windows. La fonction de balayage NTFS rapide requiert des privilèges élevés selon l’éditeur; ne les utiliser que si la vue correspondante est nécessaire et l’application digne de confiance. Une grande case dans la treemap est un indice d’enquête, jamais une autorisation de suppression : le fichier peut contenir sauvegardes, données de jeu, base de données ou contenu non régénérable.

### Quand essayer la compression

Elle mérite un test sur copie quand les données sont redondantes, peu consultées, restaurables, et que le format d’archive est adapté. Ne pas viser tout un volume ou des données critiques d’emblée. JPEG, HEIC, MP4, audio compressé et archives ZIP/7z/RAR se prêtent généralement mal à une seconde compression importante. Les taux de cette étude ne remplacent pas un échantillon personnel choisi et testé avec consentement hors du périmètre de cette recherche.

## 8. Limites, validité et éthique

**Validité externe.** Un seul poste, NTFS, deux mécanismes et des corpus historiques limitent la généralisation. Aucun exFAT, ReFS, stockage cloud, format moderne AV1/HEIC, cache navigateur actuel, jeu récent ou snapshot n’est testé. Les essais ne constituent pas un échantillon aléatoire de PC de particuliers.

**Validité interne.** Les répétitions contrôlent protocole et tailles, pas la représentativité de la population. Les sources miroir constituent une limite malgré les commits épinglés et checksums. L’API mesure l’allocation des fichiers, non toutes les métadonnées, la fragmentation ou l’espace libre global. Les métadonnées ZIP, versions et activité du système peuvent affecter tailles ou durées marginalement. Les temps sont descriptifs.

**Sources externes.** Microsoft et WizTree décrivent leurs produits; il ne s’agit pas d’un essai indépendant d’efficacité ou de sécurité. La table de ratios historiques Canterbury date de 2001. Aucun produit de nettoyage, analyseur, service cloud ou outil 7-Zip n’a été comparé.

**Protection des données.** Aucun fichier ou volume personnel n’a été inspecté. Les essais utilisent exclusivement des contenus publics ou synthétiques et des copies créées dans le dossier dédié. Les empreintes publiées ne portent pas sur des fichiers privés. Les corpus bruts ne sont pas redistribués. Le runner supprime ses copies d’essai propres lorsqu’il le peut; aucun nettoyage ne cible des données de scratch préexistantes.

## 9. Conclusion

Récupérer de l’espace est un problème de décision et de conservation, pas seulement de compression. Mesurer et localiser précède la suppression; l’action dépend de l’usage, de la redondance, de la destination et de la sauvegarde. Les essais étendus apportent une comparaison reproductible sur plusieurs familles d’entrée, tout en explicitant les limites d’un poste et de corpus anciens. Ils ne donnent ni taux universel ni permission de suppression.

Pour une personne, la démarche défendable est d’observer avec Windows et un analyseur tel que WizTree, classifier, choisir une action minimale et réversible, sauvegarder, vérifier, puis mesurer de nouveau. La compression est un outil ciblé; elle ne remplace pas le jugement sur la valeur d’un fichier.

## Annexe A — Résultats détaillés

Les tableaux exhaustifs sont produits depuis les données brutes et intégrés à la version PDF/Word lors de la génération. `summary-by-case.csv` présente une ligne par cas et méthode; `results.csv` conserve chacun des 220 essais; le classeur commence par une vue d’ensemble puis contient les données brutes, les synthèses, les contrôles de source et le registre des références. Le jeu public cumule 225 908 846 octets logiques répartis entre les 26 fichiers : Canterbury 2 810 784, Canterbury Large 11 159 482 et Silesia 211 938 580 octets.

## Annexe B — Artefacts et reproduction

- `corpus-manifest.csv` : catégories, octets, SHA-256, MD5, URL et commits pour les 26 entrées.
- `sources.csv` : registre des sources, date de consultation, rôle et limites probatoires.
- `reproduce.ps1` : validation, génération des cas synthétiques, répétitions ZIP/NTFS et checks SHA-256.
- `analyze_results.py` : statistiques descriptives, graphiques et classeur Excel depuis les résultats.
- `results.csv`, `source-checks.csv`, `experiment-metadata.json` : observations et métadonnées.
- `summary-by-case.csv`, graphiques et `RCS-RP-003-data.xlsx` : vues dérivées et données consultables.

Pour reproduire sur Windows/NTFS, préparer le corpus selon le manifeste ou laisser le runner le télécharger, puis lancer `powershell -NoProfile -ExecutionPolicy Bypass -File .\reproduce.ps1 -InputRoot <corpus-root> -OutputDirectory <dossier-sortie> -ScratchRoot <dossier-temporaire-dédié>`. Le bypass ne vaut que pour le processus de cette commande; ne désactivez pas une politique générale de sécurité. Pour analyser, utiliser Python 3 avec `Pillow` et `openpyxl` : `python .\analyze_results.py --input-dir <dossier-sortie> --output-dir <dossier-sortie>`. Les corpus téléchargés ne sont pas intégrés au paquet public.

## Références

1. University of Canterbury. *The Canterbury Corpus* et *Large Canterbury Corpus*. https://corpus.canterbury.ac.nz/descriptions/ (consulté le 8 octobre 2026).
2. University of Canterbury. *Canterbury historical compression ratios*. https://corpus.canterbury.ac.nz/details/cantrbry/RatioByLex.html (page historique; mise à jour indiquée : 3 mai 2001).
3. Silesia Corpus maintainers. *Silesia compression corpus*. https://sun.aei.polsl.pl/~sdeor/index.php?page=silesia (consulté le 8 octobre 2026).
4. Microsoft Support. *Storage settings in Windows*. https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/storage-settings-in-windows.
5. Microsoft Support. *Manage drive space with Storage Sense*. https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/manage-drive-space-with-storage-sense.
6. Microsoft Support. *Free up drive space in Windows*. https://support.microsoft.com/en-gb/windows/experience/storage-filemanagement/free-up-drive-space-in-windows.
7. Microsoft Learn. *compact command*. https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/compact.
8. Microsoft Learn. *Compression attribute*. https://learn.microsoft.com/en-us/windows/win32/fileio/compression-attribute.
9. Microsoft Support. *Save disk space with OneDrive Files On-Demand for Windows*. https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows.
10. Microsoft Support. *Delete files or folders in OneDrive*. https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive.
11. Antibody Software. *WizTree FAQ*. https://wize-tree.com/faq/.
12. Antibody Software. *WizTree Guide*. https://wize-tree.com/guide/.
13. 7-Zip. *7z format*. https://www.7-zip.org/7z.html (context only; not tested).
14. Microsoft Learn. *Compact OS, single-instancing, and image optimization*. https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/optimize/compactos (context only; not tested).
