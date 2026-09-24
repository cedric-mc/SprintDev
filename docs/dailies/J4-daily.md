# Daily Stand-up — Jour 4

**Date :** 2026-09-24  
**Participants :** Cédric MARIYA CONSTANTINE  
**Sprint en cours :** Sprint 2

---

## 1. Ce qui a été réalisé depuis le dernier Daily

- [x] **US-04 — Email de confirmation :** mise en place d’une boîte d’envoi persistée avec statuts `pending`, `retry`, `sent` et `failed`, contenu comprenant la référence, la catégorie, le résumé, le statut et le lien de suivi. Les erreurs SMTP sont journalisées sans données personnelles inutiles et les tests couvrent les retries.
- [x] **US-05 — Filtres :** filtres combinables par catégorie et statut, pagination, tri stable, validation serveur, conservation des filtres dans l’URL et gestion des états chargement, erreur et résultat vide.
- [x] **US-06 — Statistiques :** tableau de bord agent protégé, cloisonné par mairie et filtrable par période. Les KPI comprennent le volume, le délai moyen jusqu’à `resolu` et les catégories les plus fréquentes.
- [x] **Qualité et documentation :** 23 tests d’intégration passent, la couverture est de 89,11 % des instructions et 92,76 % des lignes, le lint et le build Vite passent. Le README et le contrat OpenAPI sont finalisés.

## 2. Ce qui est prévu aujourd’hui

- [ ] **US-10 — Accessibilité :** les corrections de code sont réalisées, mais l’audit Lighthouse, le test lecteur d’écran et la vérification visuelle desktop/mobile restent à faire avant de déclarer l’US complètement terminée.
- [ ] **Staging :** confirmer l’URL, les variables SMTP et effectuer une démonstration hors localhost.
- [ ] **CI et documentation :** vérifier le statut réel du workflow GitHub Actions, mettre à jour les chiffres de couverture et préparer les éléments de Sprint Review.
- [ ] **Revue finale :** vérifier les checklists des US livrées et ne présenter comme terminées que les fonctionnalités démontrées et testées.

## 3. Blocages et obstacles

- 🟡 **US-10 partiellement finalisée :** les corrections d’accessibilité sont intégrées, mais les preuves Lighthouse, lecteur d’écran et responsive manquent encore.
- 🟡 **Staging :** l’URL de déploiement et les secrets SMTP ne sont pas encore confirmés.
- 🟡 **CI GitHub :** le workflow est présent, mais son statut vert sur `main` et la protection de branche restent à vérifier dans GitHub.
- 🟢 **Backend et tests :** aucun blocage technique identifié sur US-04, US-05 et US-06.

## 4. Décision du jour

US-04, US-05 et US-06 sont considérées comme réalisées techniquement, avec tests locaux et build frontend validés. **US-10 est corrigée techniquement mais reste conditionnelle** : elle ne sera pas présentée comme terminée lors de la Sprint Review sans audit d’accessibilité et preuves correspondantes.

La priorité restante est de documenter cet écart, vérifier la livraison staging et préparer une Review transparente sur les fonctionnalités effectivement démontrables.

---

**État du Sprint 2 :** 11 points techniquement réalisés sur 14 engagés ; US-10, estimée à 3 points, est corrigée côté code mais reste à valider par audit. Les critères de Definition of Done liés à la CI distante, au staging, à Lighthouse, au lecteur d’écran et à la revue GitHub restent à confirmer.
