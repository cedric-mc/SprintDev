# US-06 — Tableau de bord municipal

## User story

En tant qu'agent municipal, je veux un tableau de bord avec les statistiques de la semaine afin de prioriser les interventions.

## Cadrage

- **MoSCoW** : Should Have · **Estimation** : 5 points · **Sprint** : S2
- **Point de départ** : `/api/admin/stats` expose un total et un regroupement par statut, mais il est public, ne filtre pas la semaine et aucune interface agent n’existe.

## Critères d’acceptation

- [ ] Le tableau de bord est accessible uniquement à un agent authentifié et affiche les données de sa mairie.
- [ ] Le KPI du nombre de signalements correspond à la semaine sélectionnée, bornes incluses.
- [ ] Le délai moyen de traitement est calculé entre la création et le passage à `resolu` ; les signalements non résolus sont exclus ou identifiés clairement.
- [ ] Les catégories les plus fréquentes sont classées avec leur nombre et respectent la période sélectionnée.
- [ ] Les données personnelles et les signalements d’une autre mairie ne sont pas exposés.
- [ ] Un état chargement, vide et erreur est prévu dans l’interface.

## Tests et dépendances

- [ ] Vérifier les KPI sur une semaine vide, une semaine avec données, un signalement non résolu et des changements de mairie.
- Dépend de US-03, US-08 et US-11 ; l’autorisation est un prérequis avant toute exposition des statistiques.
