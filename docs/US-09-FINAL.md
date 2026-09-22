# US-09 — Pipeline GitHub Actions

## User story

En tant que développeur, je veux un pipeline GitHub Actions qui lance lint + tests à chaque push afin d'éviter les régressions.

## Cadrage

- **MoSCoW** : Must Have · **Estimation** : 3 points · **Sprint** : S1
- **Point de départ** : `.github/workflows/ci.yml` lançait lint et Jest sur les pushes de `main` et `develop` ainsi que les pull requests ; le badge README pointe déjà vers ce workflow.

## Critères d’acceptation

- [ ] Le workflow s’exécute à chaque push et sur les pull requests ciblant `main`.
- [ ] Il installe les dépendances avec `npm ci`, exécute `npm run lint` puis les tests Jest avec couverture.
- [ ] Un échec de lint ou de test rend le pipeline rouge ; le statut est configuré comme contrôle obligatoire dans la protection de `main`.
- [ ] Le pipeline est visible et vert sur `main` après exécution réelle.
- [ ] Le badge du README pointe vers le workflow et reflète son dernier état.

## Tests et dépendances

- [ ] Vérifier un push sur une branche quelconque, une pull request, un échec de lint et un échec de test.
- [ ] Vérifier dans GitHub que le contrôle `Lint & Jest Tests` est requis pour fusionner dans `main`.
- Dépend de US-08 pour disposer de tests significatifs ; nécessite des secrets et une base de test non sensibles dans GitHub Actions.
