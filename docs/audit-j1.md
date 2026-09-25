# Audit initial J1 — UrbanLink

**Date :** 2026-09-21
**Équipe :** Cédric MARIYA CONSTANTINE
**Product Owner :** Romain Castelli

## 1. Périmètre et stack observés

- API : Node.js, Express et Knex.
- Base de données : SQLite avec migration initiale et données de seed.
- Client : React 18, React Router, Axios et React-Leaflet.
- Qualité : ESLint, Jest et GitHub Actions.
- Dépôt : l’application est fonctionnelle sur un périmètre MVP, mais la sécurité, la validation, la performance et la couverture de tests restent incomplètes.

## 2. Constats techniques

### Sécurité et confidentialité

- Le middleware JWT existe mais n’est pas branché dans `src/index.js`.
- Les routes `/api/admin` et `/api/debug` sont accessibles sans authentification.
- La route de debug peut exposer la base, la configuration et le secret JWT.
- Le secret JWT est prévu avec une valeur de secours dangereuse et ne doit jamais être journalisé.
- CORS et la taille maximale du JSON sont trop permissifs.
- Les uploads n’imposent ni taille maximale ni type MIME autorisé.
- L’email citoyen est stocké en clair et exposé par certaines réponses publiques.
- Les entrées de création ne sont pas suffisamment validées ou protégées contre l’injection de contenu.

### Qualité back-end

- La logique SQL est principalement dans les routes ; `src/models/signalement.js` n’est pas utilisé.
- `GET /api/signalements` charge toute la table et effectue une requête mairie par signalement : risque N+1 et timeout à grande échelle.
- Il n’y a pas de pagination ni de filtres côté API.
- La migration ne définit pas de clés étrangères, d’index métier, de contraintes de statut ou de timestamps typés.
- La gestion d’erreur expose la stack trace et ne distingue pas assez validation, absence de ressource, autorisation et erreur serveur.
- Le démarrage de l’application a été rendu importable sans ouvrir de port afin de permettre les tests Supertest.

### Qualité front-end

- `useSignalements.js` existe mais n’est pas utilisé par les pages.
- Le formulaire n’a pas de validation front-end complète ni de labels accessibles.
- La page de liste charge tous les signalements, ne gère pas correctement les erreurs et ne propose ni filtre ni pagination.
- La carte Leaflet n’a pas encore de clustering, son CSS doit être vérifié et sa hauteur est fixe.
- L’email citoyen ne doit jamais apparaître dans une popup publique.

### Tests et CI

- Avant le travail J1, aucun test n’était présent et Jest autorisait une exécution sans test.
- Supertest a été ajouté et `tests/api.test.js` couvre le health check et deux routes de lecture sur SQLite en mémoire.
- La validation locale actuelle est verte : lint réussi, 12 tests réussis, couverture globale à 89,13 % et couverture des routes à 88,88 %.
- `.github/workflows/ci.yml` exécute `npm ci`, ESLint et Jest avec couverture. Il a été ajusté pour chaque push.
- Le badge CI est présent dans le README ; la protection de la branche `main` reste à vérifier dans GitHub.

## 3. Top 5 des problèmes critiques

1. **Contrôle d’accès absent :** JWT désactivé et routes admin/debug publiques.
2. **Fuite de données sensibles :** emails citoyens, configuration et secret exposables.
3. **Entrées et uploads non maîtrisés :** validation, XSS potentiel, types et tailles de fichiers non limités.
4. **Performance insuffisante :** absence de pagination et requêtes N+1 sur les signalements.
5. **Qualité initialement non sécurisée par les tests :** couverture initiale nulle ; l’objectif de 70 % est désormais dépassé grâce aux tests API ajoutés.

## 4. Priorisation retenue pour le Sprint 1

- **US-01** — Créer un signalement — 5 points.
- **US-02** — Carte interactive — 8 points.
- **US-03** — Changer le statut — 5 points.
- **US-08** — Couverture de tests API ≥ 70 % — 5 points.
- **US-09** — Pipeline GitHub Actions — 3 points.

**Total planifié : 26 points.** Les US-04 à US-07 et US-10 sont prévues ou analysées pour le Sprint 2 selon la capacité et la validation du PO.

## 5. Definition of Done

Une User Story est considérée terminée lorsque :

- [ ] Les critères d’acceptation sont satisfaits et démontrés.
- [ ] Les tests unitaires ou d’intégration pertinents sont écrits et passent.
- [ ] La couverture des routes critiques progresse vers au moins 70 %.
- [ ] Le lint passe sans erreur.
- [ ] La navigation clavier et l’accessibilité du parcours impacté sont vérifiées.
- [ ] La performance du parcours impacté est vérifiée ; Lighthouse respecte la cible du workshop.
- [ ] Les erreurs et états de chargement sont gérés sans fuite d’information sensible.
- [ ] Une PR ou une validation de cohérence a été effectuée avant intégration, conformément au contexte de travail solo.
- [ ] La CI est verte avant merge vers `develop`.
- [ ] Le README, la documentation API ou les variables d’environnement sont mis à jour si nécessaire.
- [ ] La démonstration sur staging est possible avant la Sprint Review.

## 6. Stratégie Git et risques à suivre

- Une branche par User Story : `feature/US-XX-nom-court`.
- Le merge vers `develop` doit se faire après validation locale et contrôle des tests, dans le cadre d’un travail réalisé seul.
- Merge vers `main` après validation de la Sprint Review.
- Les blocages non résolus dans les deux heures sont signalés au PO.
- À confirmer avec le PO : nom du second développeur, capacité réelle du sprint, protection GitHub de `main` et URL de staging.
