# US-05 — Filtrer la liste des signalements

## User story

En tant que citoyen, je veux filtrer les signalements par catégorie et par statut afin de trouver ce qui m'intéresse.

## Cadrage

- **MoSCoW** : Should Have · **Estimation** : 3 points · **Sprint** : S2
- **Point de départ** : la page et l’API chargent tous les signalements ; aucun filtre, pagination ou état vide n’est implémenté.

## Critères d’acceptation

- [ ] La liste propose des filtres par catégorie et statut, combinables et réinitialisables.
- [ ] Les résultats sont mis à jour sans rechargement de page et le nombre de résultats est annoncé.
- [ ] Une requête filtrée ne renvoie que les enregistrements correspondant à tous les critères actifs.
- [ ] Les paramètres sont validés côté serveur ; les valeurs inconnues ne provoquent ni erreur SQL ni élargissement de résultat.
- [ ] L’interface gère chargement, erreur, résultat vide et pagination ; elle n’affiche pas l’email citoyen.
- [ ] Les filtres sont accessibles au clavier et leur état est lisible par un lecteur d’écran.

## Tests de validation

- [ ] Catégorie seule, statut seul, combinaison, réinitialisation et résultat vide.
- [ ] Paramètres absents ou invalides, pagination stable et aucun N+1 introduit.
- [ ] Conservation des filtres lors d’une navigation interne ; le partage par URL est livré par US-15.

## Dépendances et décisions

- Refactoriser `GET /api/signalements` pour accepter un contrat de pagination et de filtres.
- US-02 consomme les mêmes résultats ; US-15 étend les filtres à la date et à la distance.
