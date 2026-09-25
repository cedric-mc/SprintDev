# Sprint Review 2 — UrbanLink

**Date :** 2026-09-25  
**Sprint :** Sprint 2  
**Participants :** Cédric MARIYA CONSTANTINE  
**PO :** Romain Castelli

---

## 1. Objectif du sprint

Rendre UrbanLink plus exploitable au quotidien pour les citoyens et les agents municipaux en livrant des notifications fiables, des filtres utilisateurs, des statistiques hebdomadaires et une interface plus accessible, puis démontrer le produit sur staging avec des preuves de qualité.

## 2. User Stories livrées

| ID | User Story | Points | Statut | Preuve / commentaire |
| --- | --- | ---: | --- | --- |
| US-04 | Recevoir un email de confirmation après la création d’un signalement | 3 | Terminée | Email de confirmation avec numéro de suivi, catégorie, résumé et lien de suivi ; gestion des erreurs SMTP sans bloquer la création. |
| US-05 | Filtrer les signalements par catégorie et statut | 3 | Terminée | Filtres combinables, pagination, URL réactive, états chargement/erreur/vide. |
| US-06 | Consulter un tableau de bord avec les statistiques de la semaine | 5 | Terminée | KPI hebdomadaires, agrégation par catégorie, délais moyens et cloisonnement par mairie. |
| US-10 | Utiliser une application accessible au clavier et aux lecteurs d’écran | 3 | Terminée | Audit Lighthouse Accessibility = 98/100, navigation clavier contrôlée, labels et messages d’erreur corrigés. |

**Vélocité réelle du sprint : 14 points**  
**Vélocité a priori du sprint : 14 points**  
**Résultat :** sprint conforme au planning et livré dans les limites de capacité prévues.

## 3. Démonstration réalisée

La démonstration a porté sur les parcours suivants :

- création d’un signalement avec saisie complète et validation utile ;
- réception du message de confirmation email ;
- filtrage des signalements sur la liste citoyenne ;
- consultation du dashboard mairie avec KPI visibles ;
- vérification de la navigation clavier et de la qualité d’accessibilité de l’application.

## 4. Preuves de qualité et validation

### Tests et couverture

- Validation locale des tests d’intégration : **23 tests passants**.
- Couverture globale mesurée : **89,11 % d’instructions** et **92,76 % de lignes**.
- Build frontend validé via Vite.
- Lint exécuté et conforme aux règles établies.

### Lighthouse

Le rapport Lighthouse généré sur la page d’accueil de l’application donne les résultats suivants :

- Performance : **57/100**
- Accessibility : **98/100**
- Best Practices : **100/100**
- SEO : **82/100**

### Points d’attention

- Le score d’accessibilité est largement au-dessus du seuil attendu et constitue une preuve solide de conformité à la DoD.
- La performance reste un point d’amélioration noté, sans empêcher la validation du sprint et sans remettre en cause les fonctionnalités livrées.

## 5. Retour du Product Owner

Le PO confirme que les fonctionnalités demandées ont été livrées dans les délais attendus et que le produit est désormais plus exploitable en production logicielle interne. Les points particulièrement appréciés :

- qualité de l’UX de signalement ;
- fiabilité des notifications ;
- utilité du dashboard agent ;
- conformité d’accessibilité visible dans le rapport Lighthouse.

Les retours demandés pour la suite portent sur la performance globale et la mise en production avec environnement de staging stabilisé.

## 6. Décisions et actions post-review

- Maintenir le niveau qualité actuel sur les US livrées.
- Poursuivre l’optimisation de la performance du front pour améliorer le score Lighthouse Performance.
- Finaliser le cadrage staging et les variables d’environnement pour une mise en service plus fiable.
- Documenter les écarts de performance comme axe de progression lors du prochain cycle.

## 7. Conclusion

Le Sprint 2 est validé comme livré dans les objectifs fixés : les quatre User Stories engagées ont été réalisées, démontrées et validées par des preuves de tests et d’audit. La productivité et la qualité sont cohérentes avec le cadre de travail de workshop et la démo de fin de sprint confirme la bonne direction de UrbanLink.
