# US-15 — Rechercher et filtrer avancé

## User story

En tant que citoyen, je veux filtrer les signalements par date, catégorie, statut et distance afin de trouver rapidement ce qui me concerne.

## Cadrage

- **Priorité** : Should Have · **Estimation** : 8 points · **Sprint proposé** : S3
- **Point de départ** : US-05 ne couvre que le besoin de base ; l’API ne filtre ni ne pagine et les dates sont stockées comme chaînes.

## Critères d’acceptation

- [ ] Les filtres date début/fin, catégories, statuts et rayon sont combinables.
- [ ] Le rayon exige un point de référence valide et utilise une distance documentée ; les coordonnées invalides sont refusées.
- [ ] Les filtres actifs sont encodés dans l’URL et restaurés lors du partage ou d’un rechargement.
- [ ] L’API borne les résultats, conserve un tri stable et renvoie les métadonnées de pagination.
- [ ] La liste, la carte et le nombre de résultats restent cohérents avec les mêmes paramètres.

## Tests et dépendances

- [ ] Chaque filtre, toutes les combinaisons, URL malformée, dates inversées, rayon nul et aucun résultat.
- Dépend de US-05 et US-07 ; peut nécessiter une migration de dates et un index géospatial adapté à SQLite.
