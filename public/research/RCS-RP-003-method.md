# RCS-RP-003 — Reprendre le contrôle de l’espace disque d’un PC Windows

**Version de travail :** 1.0 — 8 octobre 2026
**DOI Zenodo réservé :** `10.5281/zenodo.23233639` — le dépôt Zenodo n’est pas encore publié.
**Périmètre :** ordinateur personnel Windows, sans serveur, benchmark CPU ou analyse de fichiers personnels.

## Résumé

Cette étude examine une question pratique : comment récupérer ou libérer de l’espace local sur un PC Windows sans supprimer des données utiles ni appliquer une compression inadaptée ? Elle combine une petite expérience contrôlée sur trois fichiers synthétiques avec la documentation de Microsoft et de WizTree. Aucun dossier personnel n’a été analysé. Les essais ont été réalisés le 8 octobre 2026 sur des fichiers temporaires créés pour l’étude, sur un volume NTFS.

Dans l’essai ZIP, un journal synthétique de 8 Mio a été ramené à 57 149 octets (−99,32 %), tandis qu’un fichier binaire pseudo-aléatoire de 8 Mio a produit une archive de 8 391 305 octets (+0,03 %). Recompresser cette archive a encore augmenté sa taille de 0,03 %. La compression NTFS a réduit l’espace stocké du journal de 8 Mio à 1 Mio (−87,5 %), mais n’a rien économisé sur les deux fichiers déjà incompressibles. Ce sont des résultats de contrôle sur des motifs synthétiques, pas des taux garantis pour les fichiers d’un utilisateur.

La conclusion opérationnelle est de commencer par diagnostiquer l’usage du disque, puis de choisir entre nettoyage sélectif, désinstallation, déplacement/archivage, stockage cloud à la demande et compression ciblée. WizTree aide à localiser les consommateurs d’espace ; il ne décide pas de ce qui peut être supprimé. La compression est utile surtout quand les données contiennent de la redondance et sont peu consultées. Les médias et archives déjà compressés ne sont généralement pas de bons candidats à une deuxième compression.

## Question et périmètre

**Question de recherche :** pour une personne qui utilise un PC Windows, quelles actions libèrent réellement de l’espace local avec un risque raisonnable, et dans quels cas faut-il préférer nettoyer, déplacer, archiver, déporter vers le cloud ou compresser ?

RP-003 est une étude d’usage et de gestion de stockage sur un terminal humain. Elle est distincte de RCS-RP-002, qui porte sur les performances d’algorithmes de compression selon le matériel. RP-003 ne compare ni moteurs ni niveaux de compression en vitesse et ne prétend pas identifier un « meilleur algorithme ».

## Méthode

### Documentation

Les recommandations d’interface et les avertissements ci-dessous proviennent des documentations officielles de Microsoft, de l’éditeur de WizTree et de 7-Zip. Ces sources sont externes ; elles ne sont pas des observations produites par nos essais.

### Essai contrôlé

- **Date :** 2026-10-08.
- **Environnement publié :** un poste Windows, un volume NTFS. Le modèle de l’appareil, l’espace total/libre et les données du compte ne sont pas publiés, car ils ne sont pas nécessaires pour répondre à la question.
- **Données :** trois contrôles synthétiques : journal répétitif de 8 388 608 octets ; binaire pseudo-aléatoire de 8 388 608 octets ; archive ZIP de 8 391 305 octets contenant le binaire.
- **ZIP :** commande Windows `Compress-Archive -CompressionLevel Optimal`, avec une seule exécution par cas.
- **NTFS :** copie distincte de chaque entrée, puis compression sélective par `compact /c /q`. Les octets logiques et les octets stockés sont rapportés séparément.
- **Intégrité :** les fichiers extraits des ZIP et les fichiers soumis à NTFS Compression ont été comparés à leurs sources avec SHA-256 ; les contenus sont restés identiques.
- **Mesure :** tailles exactes en octets ; temps d’exécution exclus (une exécution unique ne permet pas une comparaison de performance robuste).

### Résultats mesurés

| Cas | Entrée | ZIP produit | Variation ZIP | Espace NTFS stocké après `compact` | Variation NTFS |
|---|---:|---:|---:|---:|---:|
| Journal synthétique répétitif | 8 388 608 | 57 149 | −99,32 % | 1 048 576 | −87,50 % |
| Binaire pseudo-aléatoire | 8 388 608 | 8 391 305 | +0,03 % | 8 388 608 | 0,00 % |
| ZIP du binaire (déjà compressé) | 8 391 305 | 8 394 026 | +0,03 % | 8 391 305 | 0,00 % |

Les deltas sont calculés par rapport aux octets d’entrée de chaque méthode. Un delta positif signifie que le résultat occupe davantage d’octets. Les tailles ZIP désignent les fichiers d’archive, pas les clusters physiques utilisés par le système de fichiers. Pour NTFS, « stocké » est le nombre d’octets rapporté par `compact`, pas la taille logique du fichier. L’arrondi des pourcentages est à deux décimales.

## Interprétation

Le journal répétitif est un cas volontairement très favorable à la compression : sa réduction ne prédit pas le résultat d’un dossier réel. Les données aléatoires et l’archive ZIP illustrent au contraire pourquoi compresser à l’aveugle peut ne rien gagner et ajouter un petit surcoût de conteneur. Une archive ZIP est pratique pour regrouper ou transporter des fichiers ; elle n’est pas automatiquement un moyen de réduire davantage des fichiers déjà compressés.

NTFS Compression conserve les fichiers accessibles par leur chemin ordinaire, mais les données sont stockées compressées. Les chiffres de cette expérience ne mesurent ni consommation CPU, ni latence, ni effet sur la batterie, ni performances d’applications. Il faut donc l’évaluer sur un petit dossier non critique avant de l’activer largement, et ne pas l’appliquer aveuglément à tout le volume.

## Procédure conseillée pour un poste personnel

1. **Mesurer avant d’agir.** Consulter Paramètres → Système → Stockage et les recommandations de nettoyage de Windows. Noter l’espace disponible ; refaire la mesure après chaque action.
2. **Localiser les gros postes.** WizTree peut représenter l’espace par dossier et fichier. Comparer « Size » (taille logique) et « Allocated » (espace alloué) : elles peuvent diverger, notamment avec la compression, les unités d’allocation et certaines métadonnées NTFS. Un total de treemap n’est pas nécessairement identique au total Windows.
3. **Nettoyer avec examen.** Lire les catégories proposées par Windows avant de nettoyer. Vérifier spécialement Corbeille, Téléchargements, anciennes installations Windows et contenus cloud. Éviter de supprimer manuellement des fichiers système identifiés uniquement par leur taille.
4. **Désinstaller plutôt que bricoler.** Retirer les applications inutilisées depuis Paramètres → Applications, après vérification que leurs données utiles sont sauvegardées.
5. **Déplacer ou archiver les données froides.** Copier vers un autre support, vérifier l’ouverture ou le hash de la copie et disposer d’une sauvegarde avant d’enlever l’original. Déplacer vers un autre dossier du même disque ne libère pas d’espace ; déplacer vers un autre volume peut en libérer.
6. **Choisir la compression avec discernement.** Tester d’abord sur des textes, journaux ou données peu redondantes mais répétitives. Ne pas attendre de gains importants sur JPEG/PNG, MP4, audio compressé ou archives ZIP/7z déjà compressées. Garder une copie récupérable.
7. **Traiter le cloud comme un compromis d’accès.** Les fichiers « en ligne uniquement » peuvent économiser l’espace local, mais leur ouverture dépend d’une connexion. Une synchronisation cloud n’est pas une sauvegarde indépendante : une suppression synchronisée peut se propager.
8. **Configurer l’automatisation prudemment.** Storage Sense peut supprimer certains éléments selon des règles. Vérifier explicitement les règles pour la Corbeille et Téléchargements ; ne pas supposer que son comportement par défaut est identique à une configuration personnalisée.
9. **Prévenir la récidive.** Choisir où enregistrer les nouveaux contenus volumineux, désinstaller les logiciels réellement inutilisés et refaire périodiquement un diagnostic ciblé plutôt qu’un « nettoyage miracle ».

### WizTree : rôle et limites

WizTree est un analyseur d’utilisation du disque : il aide à repérer où l’espace est consommé et à distinguer taille logique et espace alloué. Il n’est ni un outil de compression ni une autorisation de suppression. La documentation de l’éditeur indique que l’analyse NTFS à grande vitesse utilise les droits administrateur ; pour une inspection ordinaire, commencer en droits utilisateur et n’élever les privilèges que si une fonctionnalité précise le nécessite et si l’application est fiable. Les liens matériels (hard links), les métadonnées NTFS et les tailles allouées expliquent certaines différences de totaux.

## Limites

- Trois fichiers synthétiques et une seule répétition par condition ne représentent pas les documents, photos, jeux ou profils d’autres personnes.
- Les octets aléatoires ne simulent pas tous les formats réels ; les résultats ne peuvent pas être extrapolés en pourcentage global d’espace économisé.
- Le poste était NTFS ; la compression NTFS ne s’applique pas de la même manière à tous les systèmes de fichiers.
- Les fonctions de Windows et les pages d’aide évoluent ; les libellés exacts peuvent varier selon la version, la langue et la configuration.
- WizTree n’a pas été évalué comme produit dans un benchmark ; la documentation de son éditeur sert à décrire sa fonction.
- Aucune suppression, installation d’outil, modification système, collecte de fichier personnel ou mesure de performance n’a été réalisée.
- Cette étude n’est pas un avis de récupération de données : avant toute suppression, s’assurer d’avoir une sauvegarde vérifiée.

## Sources

1. Microsoft Support, [Storage settings in Windows](https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/storage-settings-in-windows).
2. Microsoft Support, [Manage drive space with Storage Sense](https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/manage-drive-space-with-storage-sense).
3. Microsoft Support, [Free up drive space in Windows](https://support.microsoft.com/en-gb/windows/experience/storage-filemanagement/free-up-drive-space-in-windows).
4. Microsoft Support, [Save disk space with OneDrive Files On-Demand for Windows](https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows).
5. Microsoft Support, [Delete files or folders in OneDrive](https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive).
6. Antibody Software, [WizTree FAQ](https://wize-tree.com/faq/) and [WizTree Guide](https://wize-tree.com/guide/).
7. Microsoft Learn, [compact](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/compact) command reference.
8. Microsoft Learn, [Compact OS, single-instancing, and image optimization](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/optimize/compactos).
9. 7-Zip, [7z format](https://www.7-zip.org/7z.html), for the distinction between an archive format and a general-purpose storage-cleanup workflow.

## Reproductibilité et fichiers

- `results.csv` contient les nombres rapportés dans les tableaux et les empreintes SHA-256 des entrées, archives et copies NTFS vérifiées.
- `RCS-RP-003-test-fixtures.zip` contient les deux archives issues des contrôles : l’archive du journal répétitif et celle du binaire pseudo-aléatoire. Cette dernière contient le binaire original et a aussi servi de cas « déjà compressé ».
- `reproduce.ps1` rejoue les trois cas. Passez `-FixtureArchivePath <chemin>` pour utiliser les échantillons publiés ; sans fixture, le script génère un nouveau binaire aléatoire. Les métadonnées ZIP et la version de Windows peuvent faire varier les tailles d’archive.
- Pour vérifier les échantillons mesurés : extraire le fichier de fixtures, extraire ensuite les deux ZIP imbriqués, puis comparer les SHA-256 consignés dans `results.csv`. Le script crée un dossier au nom aléatoire dans `%TEMP%` et le supprime après l’essai, sauf avec `-KeepScratch`.
- Le paquet destiné à Zenodo comprend le rapport PDF, ce fichier de méthode, `results.csv`, `reproduce.ps1` et `RCS-RP-003-test-fixtures.zip`.
- Le DOI `10.5281/zenodo.23233639` est pré-réservé. Ne pas le présenter comme un enregistrement publié tant que le dépôt Zenodo n’a pas été publié par son propriétaire.

### Rejouer le contrôle

Décompresser le paquet Zenodo, ouvrir PowerShell sur un volume NTFS, puis lancer `powershell -File .\reproduce.ps1 -FixtureArchivePath .\RCS-RP-003-test-fixtures.zip`. Le script ne demande pas de droits administrateur et n’installe aucun outil. Il crée des fichiers uniquement dans un sous-dossier temporaire au nom aléatoire, vérifie les contenus par SHA-256, affiche les tailles, puis supprime ce sous-dossier. Ajouter `-KeepScratch` conserve les seuls fichiers créés par ce script pour inspection manuelle. Respecter les règles d’exécution de scripts de son appareil ; ne pas désactiver une politique de sécurité pour lancer un test.

La variation ZIP est `(taille de l’archive / taille d’entrée − 1) × 100`. La variation NTFS est `(octets stockés rapportés par compact / taille logique − 1) × 100`. Les valeurs négatives sont des réductions ; zéro signifie aucune différence mesurée. Une nouvelle exécution sur les fixtures doit retrouver les entrées et les ratios arrondis ; l’enveloppe ZIP peut différer si les métadonnées ou la version de Windows changent.

## Licence et attribution

Étude préparée par Raiju Cloud System (RCS). Les résultats expérimentaux originaux sont accompagnés de leur méthode et de leurs limites. Les documentations externes sont citées par leurs éditeurs ; elles ne sont pas reproduites intégralement.
