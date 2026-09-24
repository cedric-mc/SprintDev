# US-07 — Voter pour un signalement

## User story

En tant que citoyen, je veux pouvoir voter pour un signalement existant afin d'indiquer qu'il me concerne aussi.

## Cadrage

- **MoSCoW** : Could Have · **Estimation** : 3 points · **Sprint** : S2 ?
- **Point de départ** : aucune table de votes, route API ou interface de compteur n’existe ; l’identité citoyenne est également absente.

## Critères d’acceptation

- [ ] Un citoyen authentifié peut voter et retirer son vote sans rechargement de page.
- [ ] Une contrainte unique garantit au maximum un vote par citoyen et par signalement.
- [ ] Le compteur est visible sur la carte et reste exact après actualisation.
- [ ] Un signalement inexistant, un vote répété ou un utilisateur non authentifié produisent une réponse explicite.
- [ ] Le vote ne révèle pas l’identité des autres votants.

## Tests et dépendances

- [ ] Créer, retirer, répéter un vote et voter sur un signalement inexistant.
- Dépend de l’authentification citoyen et de US-02 ; le sprint S2 reste à confirmer avec le PO.
