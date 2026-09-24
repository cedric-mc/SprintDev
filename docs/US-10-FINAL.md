# US-10 — Accessibilité de l’application

## User story

En tant que visiteur, je veux une application accessible au clavier et aux lecteurs d'écran afin que tout le monde puisse signaler.

## Cadrage

- **MoSCoW** : Should Have · **Estimation** : 3 points · **Sprint** : S2
- **Point de départ** : le formulaire utilise des placeholders sans labels associés, la navigation contient des liens HTML directs et aucune mesure Lighthouse ou stratégie d’accessibilité n’est configurée.

## Critères d’acceptation

- [ ] Lighthouse Accessibility obtient un score supérieur à 90 sur les parcours principaux.
- [ ] Tous les champs du formulaire possèdent un `label` associé, un nom accessible et une erreur annoncée.
- [ ] La navigation complète, le formulaire, la carte et les messages de résultat sont utilisables au clavier sans piège de focus.
- [ ] Les éléments interactifs ont un nom accessible et les changements de chargement, succès et erreur sont annoncés.
- [ ] Le contraste, le focus visible, les titres et la structure sémantique sont vérifiés sur desktop et mobile.

## Tests et dépendances

- [ ] Audit Lighthouse, navigation clavier sans souris et test avec lecteur d’écran sur le formulaire.
- Dépend de US-01, US-02 et US-05 ; doit être vérifiée sur les parcours de création, liste, carte et filtres.
