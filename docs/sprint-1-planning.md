# Sprint Planning 1 — UrbanLink

**Date :** 2026-09-21
**Sprint :** Sprint 1  
**Durée :** J1 à J3 matin, selon le calendrier du workshop
**Participants :** Cédric MARIYA CONSTANTINE

## Sprint Goal

**Sécuriser et fiabiliser le socle UrbanLink afin qu’un citoyen puisse créer un signalement, le consulter sur une carte, et qu’un agent puisse en suivre le statut, avec une première couverture de tests et une CI exécutée à chaque push.**

## Backlog sélectionné

| ID | User Story | MoSCoW | Points | Sprint |
| --- | --- | --- | ---: | --- |
| US-09 | Lancer lint et tests via GitHub Actions à chaque push | Must Have | 3 | S1 |
| US-08 | Atteindre une couverture de tests API d’au moins 70 % | Must Have | 5 | S1 |
| US-01 | Créer un signalement avec catégorie, description et photo | Must Have | 5 | S1 |
| US-02 | Voir les signalements sur une carte interactive | Must Have | 8 | S1 |
| US-03 | Changer le statut d’un signalement | Must Have | 5 | S1 |

**Total planifié : 26 points.**

## Découpage technique

### US-01 — 5 points

- Définir le contrat de création JSON/multipart.
- Ajouter validation serveur et validation du formulaire.
- Limiter les types et tailles de photos.
- Protéger l’affichage contre le HTML utilisateur.
- Tester création valide, champs invalides, coordonnées et upload.

### US-02 — 8 points

- Corriger le chargement CSS et les icônes Leaflet.
- Afficher les signalements dont les coordonnées sont valides.
- Ajouter des popups sans email citoyen.
- Ajouter le clustering au-delà de 50 points.
- Rendre la carte responsive et tester les états chargement/erreur/vide.

### US-03 — 5 points

- Valider les statuts `recu`, `en_cours` et `resolu`.
- Protéger la route de modification par authentification et rôle agent.
- Vérifier l’autorisation liée à la mairie.
- Préparer l’historique des changements et le déclenchement de notification.
- Tester les accès 401/403, statuts invalides et mise à jour réussie.

### US-08 — 5 points

- Utiliser Supertest avec l’application Express importable sans écoute réseau.
- Isoler la base de test avec SQLite en mémoire et migrations dédiées.
- Couvrir les routes signalements, mairies, admin, health check et authentification.
- Atteindre au moins 70 % sur les routes API critiques.
- Publier le rapport de couverture dans la CI.

### US-09 — 3 points

- Déclencher le workflow à chaque push et sur les pull requests vers `main`/`develop`.
- Installer avec `npm ci`.
- Exécuter `npm run lint`, puis Jest avec couverture.
- Vérifier que tout échec rend le workflow rouge.
- Configurer le contrôle CI comme obligatoire sur `main` dans GitHub et conserver le badge README.

## Ordre de réalisation

1. **Socle qualité :** US-08 et US-09, avec une première CI verte.
2. **Création :** US-01 et ses tests API/front-end.
3. **Carte :** US-02 après stabilisation du contrat de lecture.
4. **Statut :** US-03 après clarification de l’authentification et des rôles.
5. **Fin de sprint :** intégration, code review, correction des critères d’acceptation et préparation de la démonstration.

## Definition of Done du sprint

- Les cinq US sont démontrées avec leurs critères d’acceptation vérifiés.
- Les tests ajoutés passent localement et dans GitHub Actions.
- La couverture API atteint au moins 70 % ou l’écart est documenté et accepté par le PO.
- Le lint est vert.
- Chaque US possède une branche et une PR relue par l’autre membre.
- Aucun secret, email citoyen ou stack trace n’est exposé dans les parcours livrés.
- Le README et la documentation nécessaire sont à jour.
- Une version démontrable est disponible sur staging avant la Sprint Review.

## Risques et décisions à obtenir

- **Capacité :** 26 points sont planifiés ; confirmer la vélocité réelle du binôme.
- **US-03 :** l’authentification et les rôles ne sont pas encore implémentés ; décider si leur socle est inclus dans l’US ou traité comme prérequis.
- **US-02 :** choisir la bibliothèque de clustering compatible avec React-Leaflet.
- **CI :** vérifier dans GitHub la protection de `main` et le statut réel du workflow.
- **Staging :** confirmer l’environnement et son URL avant la Sprint Review.

## Hors périmètre du Sprint 1

- US-04, US-05, US-06, US-07 et US-10, prévus pour le Sprint 2 dans la priorisation actuelle.
- US-11 à US-18, à planifier selon la capacité et la validation du PO.
