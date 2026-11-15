# Retrait réversible d’Evidence Engine — composant local uniquement

Ce dossier contient un Worker autonome de fermeture, pas le backend actuel.
Aucun déploiement ni accès authentifié distant n’a été effectué.

## Comportement préparé

- Toutes les routes et méthodes reçoivent HTTP 410, y compris `/api/chat`,
  `/api/commander-auth`, `/chat.js`, les assets, `/health` et les chemins inconnus.
- La réponse indique le retrait du service et fournit le lien du site RCS.
  HEAD conserve les en-têtes, avec un corps vide.
- Aucun chargement de l’ancienne application, lecture du corps ou des cookies,
  authentification, binding, accès réseau, appel IA ou service d’assets.
- Aucun cookie n’est créé, modifié ou effacé. Aucun secret ni stockage existant
  n’est lu, supprimé ou modifié par ce composant.
- `Cache-Control: no-store` évite de rendre persistante la réponse de fermeture
  et facilite un éventuel retour arrière. L’indexation est explicitement refusée.

## Validation locale

Node.js 22 ou ultérieur, sans installation de dépendances :

```text
node --test
```

Les tests utilisent les objets Web standard Request/Response. Ils vérifient les
méthodes, routes, corps et en-têtes ainsi que l’absence d’utilisation des bindings,
de l’authentification et du réseau. Ils ne valident pas un déploiement Cloudflare.

`wrangler.example.json` est uniquement un exemple : le nom est un placeholder,
aucun domaine n’est déclaré et les accès workers.dev/preview sont désactivés.
Il ne faut pas le publier tel quel ni supposer qu’il décrit le Worker existant.

## Identification requise avant toute publication

Le 15 novembre 2026, le domaine public renvoyait « Evidence Engine — RCS », une
interface Even et les endpoints `/api/chat` et `/api/commander-auth`. La copie
locale `rcs-squadron`, sans dépôt Git, possède les mêmes chemins mais une ancienne
interface Dragon One. Ses configurations ne déclarent pas ce domaine. Cette
ressemblance ne prouve pas que cette copie correspond au déploiement actuel.

Après validation locale et accès utilisateur, identifier dans le compte Cloudflare
le Worker exact, ses domaines/routes, ses versions actives et ses points d’entrée
alternatifs. Relever sa source et sa configuration actuelles avant modification,
sans exposer les valeurs de secrets dans un rapport ou un dépôt public.

## Préservation et retour arrière

1. Conserver le code/configuration actuels, l’identifiant de la version ou du
   déploiement actif et le relevé des associations de domaines/routes. Ne pas
   remplacer la production à partir de la copie ancienne non identifiée.
2. Vérifier les dépendances actuelles, notamment les classes Durable Objects,
   leurs migrations et les éventuels anciens entrypoints publics. Cet exemple
   sans bindings ne constitue pas une migration d’un Worker existant. Si le
   remplacement impose une migration destructive ou un retrait de classe,
   arrêter cette voie : ne pas ajouter une migration de suppression.
3. Choisir une opération réversible adaptée à l’état réel : version de fermeture
   compatible avec le Worker confirmé, ou Worker de fermeture distinct avec
   réaffectation contrôlée de ses routes. Ne pas supprimer l’ancien Worker,
   ses secrets, ses bindings, ses namespaces ou ses données pour le désactiver.
   Un domaine réaffecté seul ne ferme pas les éventuels autres points d’entrée :
   ils doivent être identifiés et traités dans le périmètre autorisé.
4. Préparer la commande exacte et son inverse avec les identifiants confirmés,
   vérifier le dry-run, puis publier uniquement dans le cadre autorisé.
5. Vérifier ensuite root, API, auth, assets, HEAD et OPTIONS : tous doivent
   répondre 410 et aucun ancien formulaire, JavaScript ou résultat IA ne doit
   être servi. Les contrôles d’API ne doivent pas transmettre de conversation.
6. Pour rétablir le service, restaurer la version précédente enregistrée ou les
   associations de routes précédentes selon l’opération choisie. Contrôler les
   réponses publiques sans déclencher de génération. Aucune recréation de
   secrets ou de données ne doit être nécessaire.

L’accès authentifié et le mécanisme de rollback exact restent à confirmer sur
l’hébergement actuel. Le composant local seul n’a pas arrêté le service en ligne.
