# Daily Stand-up — Jour 2

**Date :** 2026-09-22
**Participants :** Cédric MARIYA CONSTANTINE
**Sprint en cours :** Sprint 1

---

## 1. Ce qui a été réalisé depuis le dernier Daily

> Note de contexte : il n’y a pas eu de Daily Stand-up le Jour 1, car cette journée a été consacrée à l’audit du dépôt et au Sprint Planning initial.

- [x] **Audit du dépôt :** analyse de l’API Express, du client React, de la base SQLite/Knex, de l’authentification et des routes sensibles.
- [x] **US-01 à US-10 :** rédaction et réalignement des fiches finales avec le backlog du PO, les critères d’acceptation, la MoSCoW, les points et les sprints.
- [x] **US-09 / CI :** vérification du workflow GitHub Actions et modification du déclenchement pour lancer la CI à chaque push.
- [x] **US-08 / Tests :** installation de Supertest, export testable de l’application Express et création de 12 tests API sur une base SQLite en mémoire.
- [x] **Validation locale :** `npm run lint` réussi ; 12 tests sur 12 passent avec une couverture globale de 89,13 % et une couverture des routes de 88,88 %.
- [x] **Documentation :** création des fiches US manquantes et contrôle Markdown des documents `*-FINAL.md`.
- [ ] **Validation de code :** aucune PR externe n’a été ouverte à ce stade ; la validation repose sur les tests et le lint locaux.

## 2. Ce qui est prévu aujourd’hui

- [x] **US-08 :** couverture des principales routes API réalisée ; les tests d’authentification restent dépendants de l’activation du middleware JWT.
- [ ] **US-09 :** vérifier l’exécution du workflow sur GitHub et confirmer la protection de la branche `main`.
- [ ] **US-01 à US-03 :** préparer le découpage technique et les contrats API avant développement.
- [ ] **Tests :** définir une base de test isolée et commencer la couverture des routes signalements.
- [ ] **Validation technique :** ouvrir une branche dédiée par User Story et finaliser les vérifications locales avant intégration.

## 3. Blocages et obstacles (Impediments)

- 🟡 **Technique :** les cas d’authentification JWT ne sont pas encore testés car le middleware reste désactivé dans l’application.
- 🟡 **Agile / Dépendance :** la protection de `main` et le statut vert réel du workflow doivent encore être vérifiés dans GitHub.
- 🟡 **Agile / Dépendance :** le Sprint Goal formel reste à stabiliser dans les livrables Scrum, dans le contexte d’un travail réalisé en solo.
- 🟢 **Aucun autre blocage bloquant identifié.**

---

**Burndown Chart / Objectif du Sprint :** Sprint 1 en préparation, 26 points planifiés ; US-08 et US-09 amorcées, les fonctionnalités US-01 à US-03 restent à réaliser et la couverture complète est à poursuivre.
