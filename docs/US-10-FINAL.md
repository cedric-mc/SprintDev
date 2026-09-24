# US-10 — Accessibilité de l’application

## User story

En tant que visiteur, je veux une application accessible au clavier et aux lecteurs d'écran afin que tout le monde puisse signaler.

## Cadrage

- **MoSCoW** : Should Have · **Estimation** : 3 points · **Sprint** : S2
- **Point de départ** : le formulaire utilise des placeholders sans labels associés, la navigation contient des liens HTML directs et aucune mesure Lighthouse ou stratégie d’accessibilité n’est configurée.

## Critères d’acceptation

- [ ] Lighthouse Accessibility obtient un score supérieur à 90 sur les parcours principaux.
- [x] Tous les champs du formulaire possèdent un `label` associé, un nom accessible et une erreur annoncée.
- [x] La navigation, le formulaire, la carte et les messages de résultat disposent de contrôles clavier et d’un lien d’évitement sans piège de focus identifié dans le code.
- [x] Les éléments interactifs ont un nom accessible et les changements de chargement, succès et erreur sont annoncés avec les rôles ARIA adaptés.
- [ ] Le contraste, le focus visible, les titres et la structure sémantique sont vérifiés sur desktop et mobile. Le focus visible et la structure de base sont implémentés ; l’audit visuel reste à effectuer.

## Tests et dépendances

- [ ] Audit Lighthouse, navigation clavier sans souris et test avec lecteur d’écran sur le formulaire ; ces vérifications manuelles restent à réaliser.

## Validation technique

- [x] Le build client Vite passe après l’ajout de la navigation accessible, du lien d’évitement, des styles de focus et des annonces d’erreur.
- [ ] Le score Lighthouse Accessibility supérieur à 90 et la vérification avec un lecteur d’écran restent à documenter.
- Dépend de US-01, US-02 et US-05 ; doit être vérifiée sur les parcours de création, liste, carte et filtres.
