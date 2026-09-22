# US-13 — Fournir une interface agent municipal

## User story

En tant qu’agent municipal, je veux une interface dédiée à ma mairie afin de gérer uniquement les signalements qui me concernent.

## Cadrage

- **Priorité** : Must Have · **Estimation** : 8 points · **Sprint proposé** : S2
- **Point de départ** : l’application ne possède qu’une navigation citoyenne et `/api/admin` est public ; aucun agent ni filtrage par mairie n’est modélisé.

## Critères d’acceptation

- [ ] Un agent se connecte avec son rôle et sa mairie ; un citoyen ne peut pas accéder à l’espace agent.
- [ ] Le tableau de bord ne contient que les signalements de la mairie de l’agent.
- [ ] L’agent peut ouvrir le détail et modifier le statut avec confirmation et retour d’erreur.
- [ ] Les listes disposent d’un état chargement, vide, erreur et pagination.
- [ ] Un agent ne peut ni lire ni modifier les données d’une autre mairie, même en changeant l’identifiant dans l’URL.

## Tests et dépendances

- [ ] Accès par rôle, cloisonnement par mairie, changement autorisé et refusé, expiration de session.
- Dépend de US-03, US-08, US-10 et US-11 ; réutilise US-07.
