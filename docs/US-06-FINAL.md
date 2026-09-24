# US-06 — Tableau de bord municipal

## User story

En tant qu'agent municipal, je veux un tableau de bord avec les statistiques de la semaine afin de prioriser les interventions.

## Cadrage

- **MoSCoW** : Should Have · **Estimation** : 5 points · **Sprint** : S2
- **Point de départ** : `/api/admin/stats` expose un total et un regroupement par statut, mais il est public, ne filtre pas la semaine et aucune interface agent n’existe.

## Critères d’acceptation

- [x] Le tableau de bord est accessible uniquement à un agent authentifié et affiche les données de sa mairie.
- [x] Le KPI du nombre de signalements correspond à la période sélectionnée, bornes incluses.
- [x] Le délai moyen de traitement est calculé entre la création et le premier passage à `resolu` ; les signalements non résolus sont exclus du calcul.
- [x] Les catégories les plus fréquentes sont classées avec leur nombre et respectent la période sélectionnée.
- [x] Les données personnelles et les signalements d’une autre mairie ne sont pas exposés.
- [x] Un état chargement, vide et erreur est prévu dans l’interface.

## Tests et dépendances

- [x] Vérifier les KPI sur une période vide, une période avec données, un signalement non résolu et des données d’une autre mairie.
- Dépend de US-03, US-08 et US-11 ; l’autorisation est un prérequis avant toute exposition des statistiques.
