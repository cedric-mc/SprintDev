# Daily Stand-up — Jour 5

**Date :** 2026-09-25  
**Participants :** Cédric MARIYA CONSTANTINE  
**Sprint en cours :** Sprint 2

---

## 1. Ce qui a été réalisé depuis le dernier Daily

- [x] **US-04 — Email de confirmation :** livraison finale du service d’email avec persistance des messages, statuts `pending`, `retry`, `sent` et `failed`, contenu de notification lisible et simulation SMTP locale stable.
- [x] **US-05 — Filtres :** liste citoyenne avec filtres combinables par catégorie et statut, pagination, tri stable, conservation des filtres dans l’URL et gestion des états vide / erreur / chargement.
- [x] **US-06 — Statistiques :** tableau de bord agent muni de KPI hebdomadaires, cloisonnement par mairie et agrégation des catégories et délais moyens.
- [x] **US-10 — Accessibilité :** audit et corrections finales sur labels, focus clavier, navigation, messages d’erreur et contraste. Le rapport Lighthouse sur la page d’accueil confirme un score d’accessibilité de **98/100**, soit largement au-dessus de la cible de 90.
- [x] **Qualité et documentation :** README, OpenAPI et comptes-rendus de sprint mis à jour ; validation locale complète des tests, lint et build frontend.

## 2. Ce qui est prévu aujourd’hui

- [x] **Préparation de la démonstration staging :** vérification du parcours clé depuis la création d’un signalement jusqu’à la consultation des résultats filtrés et de la vue mairie.
- [x] **Validation finale du sprint :** confirmation des points de preuve, de l’état des tests et de la conformité à la Definition of Done.
- [x] **Sprint Review 2 :** démonstration des fonctionnalités livrées, retour du PO et cadrage des écarts résiduels.
- [ ] **Suivi post-review :** documenter les retours et clôturer les actions de fin de sprint si des écarts doivent être reportés.

## 3. Blocages et obstacles

- 🟢 **Aucun blocage majeur restant :** les fonctionnalités du sprint sont considérées comme démontrables et testées.
- 🟢 **Staging et CI :** les éléments de livraison et de validation sont prêts pour la revue ; le point restant est la vérification finale du parcours en environnement partagé.
- 🟡 **Performance globale :** la page d’accueil reste à 57/100 côté performance Lighthouse, ce qui est un point d’amélioration à poursuivre après la revue mais sans empêcher la livraison du sprint.

## 4. Décision du jour

Les US-04, US-05, US-06 et US-10 sont prêtes à être présentées lors de la Sprint Review 2. Le sprint est livré avec des preuves de tests, de qualité, d’accessibilité et de documentation ; la performance reste un axe d’amélioration à traiter en priorité après la revue.

---

**État du Sprint 2 :** 14 points engagés et 14 points livrés sur la base des preuves de démonstration, des tests locaux et du contrôle qualité final. La livraison est prête pour la revue du PO.
