# US-08 — Couvrir les routes API par des tests

## User story

En tant que développeur, je veux une couverture de tests ≥ 70% sur les routes API afin de pouvoir déployer en confiance.

## Cadrage

- **MoSCoW** : Must Have · **Estimation** : 5 points · **Sprint** : S1
- **Point de départ** : Jest était déclaré mais aucun test n’était présent ; Supertest a été ajouté et le script acceptait l’absence de tests.

## Critères d’acceptation

- [x] Jest et Supertest sont configurés pour tester les routes API sans démarrer un serveur externe.
- [x] Les routes critiques couvrent les principaux scénarios de succès, 404 et opérations de mutation.
- [x] La couverture des routes API atteint au moins 70 % selon le rapport Jest : 88,88 % des instructions des routes.
- [x] Le rapport de couverture est produit par `npm test -- --coverage --ci` et visible dans la sortie de la CI.
- [x] Les tests utilisent une base SQLite en mémoire isolée et nettoyée entre les scénarios.

## Tests et dépendances

- [x] Tests API : health check, mairies, signalements, création, changement de statut, suppression, admin et debug.
- [x] Résultat : 12 tests passants, lint vert et couverture globale de 89,13 %.
- [ ] Compléter ultérieurement le middleware d’authentification lorsque le contrat JWT sera activé par les US de sécurité.
- Dépend du contrat des routes ; US-09 publie le résultat dans la CI.
