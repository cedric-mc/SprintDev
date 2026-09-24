# Sprint Planning 2 — UrbanLink

**Date :** 2026-09-23  
**Sprint :** Sprint 2  
**Durée :** J3 après-midi à J5  
**Participants :** Cédric MARIYA CONSTANTINE

## Sprint Goal

**Rendre UrbanLink exploitable au quotidien par les citoyens et les agents grâce à des notifications fiables, des filtres combinables, un tableau de bord statistique et une interface accessible, puis livrer une version testée et déployée sur staging.**

## Capacité et engagement

Le Sprint 1 a représenté **26 points techniquement livrés**. Pour le Sprint 2, l’équipe réserve une capacité de **14 points** aux fonctionnalités et garde explicitement du temps pour les tests, l’accessibilité, la documentation, le staging et les cérémonies Review/Rétrospective.

## Backlog sélectionné

| ID | User Story | MoSCoW | Points | Sprint | Engagement |
| --- | --- | --- | ---: | --- | --- |
| US-04 | Recevoir un email de confirmation après la création d’un signalement | Should Have | 3 | S2 | Engagée |
| US-05 | Filtrer les signalements par catégorie et statut | Should Have | 3 | S2 | Engagée |
| US-06 | Consulter un tableau de bord avec les statistiques de la semaine | Should Have | 5 | S2 | Engagée |
| US-10 | Utiliser une application accessible au clavier et aux lecteurs d’écran | Should Have | 3 | S2 | Engagée |

**Total engagé : 14 points.**

### Hors engagement

- **US-07 — Vote :** Could Have, reportée après les fonctionnalités Should Have.
- **US-14 à US-18 :** non retenues dans la capacité de ce sprint.
- Les corrections bloquantes découvertes pendant la Review 1 pourront être ajoutées au sprint uniquement après arbitrage du PO et retrait d’un item de même capacité.

## Découpage technique

### US-04 — 3 points

- Vérifier le contrat de notification déclenché après création.
- Garantir la présence du numéro de suivi, de la catégorie et d’un contenu compréhensible.
- Traiter les erreurs SMTP sans faire échouer la création ni afficher de stack trace.
- Ajouter des tests du service email et du déclenchement unique.

### US-05 — 3 points

- Ajouter des contrôles de catégorie et de statut dans la liste citoyenne.
- Rendre les filtres combinables et réactifs sans rechargement.
- Préserver les états chargement, vide et erreur.
- Ajouter les tests de filtrage côté interface et, si nécessaire, les paramètres de lecture API.

### US-06 — 5 points

- Définir les KPI de la semaine : volume total, délai moyen de traitement et catégories fréquentes.
- Ajouter un endpoint ou compléter l’endpoint admin avec des données bornées dans le temps.
- Afficher les KPI dans l’espace mairie en respectant le cloisonnement par mairie.
- Tester les agrégations, la semaine vide et l’accès non authentifié.

### US-10 — 3 points

- Vérifier les labels, intitulés accessibles, focus clavier et ordre de tabulation.
- Corriger les liens de navigation et les contrôles de formulaire.
- Vérifier le contraste et les messages d’erreur associés aux champs.
- Effectuer un audit Lighthouse et documenter le résultat.

### Qualité et livraison — transversal

- Ajouter les tests unitaires et d’intégration correspondant à chaque US.
- Maintenir la couverture API au-dessus de 70 % et la CI verte.
- Mettre à jour le README, les endpoints et les variables d’environnement.
- Déployer sur staging avant la Sprint Review 2 et vérifier le parcours de démonstration.

## Ordre de réalisation

1. **US-04 :** sécuriser le contrat email et ses tests.
2. **US-05 :** implémenter les filtres citoyens et leurs états UI.
3. **US-06 :** compléter les statistiques et leur affichage mairie.
4. **US-10 :** audit accessibilité continu, puis correction finale avant staging.
5. **Fin de sprint :** CI, revue de code, déploiement, Sprint Review et Rétrospective.

## Definition of Done du Sprint 2

- Les quatre US engagées satisfont leurs critères d’acceptation et sont démontrées sur staging.
- Les tests ajoutés passent localement et dans GitHub Actions.
- La couverture des routes API critiques reste supérieure ou égale à 70 %.
- Le lint et le build Vite sont verts.
- L’audit Lighthouse Accessibility dépasse 90 ou l’écart est documenté et accepté par le PO.
- Les parcours principaux sont utilisables au clavier.
- Le README et la documentation API sont à jour.
- Chaque branche et PR a fait l’objet d’une revue documentée conformément au workflow du workshop.

## Risques et décisions à obtenir du PO

- Confirmer l’URL de staging et les secrets SMTP disponibles.
- Valider la définition exacte du délai moyen de traitement pour US-06.
- Confirmer si les emails de test peuvent être simulés en CI.
- Arbitrer toute nouvelle demande issue de la Sprint Review 1 sans dépasser les 14 points engagés.

## Livrables attendus

- Sprint backlog et burndown mis à jour chaque soir.
- Daily J3, J4 et J5 archivés dans `docs/dailies/`.
- Sprint Review 2 et Rétrospective 2 rédigées après les cérémonies.
- Version staging accessible, CI verte et README opérationnel.
