# Daily Stand-up — Jour 3

**Date :** 2026-09-23  
**Participants :** Cédric MARIYA CONSTANTINE  
**Sprint en cours :** Sprint 2, démarrage après la Sprint Review 1

---

## 1. Ce qui a été réalisé depuis le dernier Daily

- [x] **US-01 — Création d’un signalement :** validation côté client et serveur, catégories autorisées, coordonnées contrôlées, upload image limité à JPEG/PNG/WebP et 5 Mo, messages non techniques.
- [x] **US-02 — Carte interactive :** CSS et icônes Leaflet, conversion stricte des coordonnées, états chargement/vide/erreur, popup sans donnée personnelle, lien vers le détail et clustering au-delà de 50 points.
- [x] **US-03 — Changement de statut :** route protégée par JWT et rôle agent, autorisation par mairie, statuts limités à `recu`, `en_cours` et `resolu`, transition atomique, historique complet et notification citoyen.
- [x] **Interface mairie :** connexion agent/admin, tableau de bord filtré par mairie et modification du statut avec retour d’erreur.
- [x] **US-08 — Tests API :** 19 tests passent sur SQLite en mémoire ; couverture globale supérieure à 70 %.
- [x] **US-09 — CI :** lint et tests exécutés automatiquement sur les pushes et les pull requests vers `main`.
- [x] **Migration Vite :** remplacement de `react-scripts` par Vite + React, build de production validé.
- [x] **Résolution du rebase :** conflits résolus, aucun marqueur restant, lint, tests et build validés.

## 2. Ce qui est prévu aujourd’hui

- [x] **Sprint Planning 2 :** sélectionner les US Should Have et fixer le Sprint Goal.
- [ ] **US-04 — Email de confirmation :** fiabiliser le contenu, le numéro de suivi et le traitement des erreurs SMTP.
- [ ] **US-05 — Filtres :** ajouter des filtres combinables par catégorie et statut sans rechargement.
- [ ] **US-06 — Statistiques :** compléter le tableau de bord avec les KPI hebdomadaires demandés.
- [ ] **US-10 — Accessibilité :** auditer la navigation clavier, les labels, les rôles et le contraste ; viser Lighthouse Accessibility > 90.
- [ ] **Qualité et livraison :** ajouter les tests des nouvelles fonctionnalités, mettre à jour le README et préparer le déploiement staging.

## 3. Blocages et obstacles

- 🟡 **Staging :** l’URL de staging et les secrets SMTP doivent être confirmés avant la Sprint Review 2.
- 🟡 **CI / GitHub :** la protection de `main` et le caractère obligatoire du contrôle doivent être vérifiés dans GitHub.
- 🟢 **US-03 :** aucun blocage fonctionnel ; l’US est considérée terminée et démontrable.
- 🟢 **Aucun autre blocage bloquant identifié.**

## 4. Décision du jour

La vélocité observée du Sprint 1 est de **26 points planifiés et livrés techniquement**. Pour le Sprint 2, l’équipe retient **14 points** afin de préserver le temps nécessaire aux tests, à l’accessibilité, au staging et aux cérémonies de fin de workshop.

---

**Objectif du Sprint 2 :** rendre UrbanLink plus utile et exploitable au quotidien grâce aux notifications fiables, aux filtres citoyens, aux statistiques mairie et à une expérience accessible, avec une version déployable et documentée.
