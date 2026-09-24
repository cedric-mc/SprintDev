# US-17 — Supprimer un compte conformément au RGPD

## User story

En tant que citoyen, je veux supprimer mon compte et exercer mon droit à l’effacement afin que mes données personnelles ne soient plus conservées inutilement.

## Cadrage

- **Priorité** : Must Have · **Estimation** : 8 points · **Sprint proposé** : S3
- **Point de départ** : aucun compte citoyen ni procédure RGPD n’existe ; les signalements contiennent actuellement l’email en clair et n’ont pas de clé étrangère.

## Critères d’acceptation

- [ ] La demande exige une session valide et une confirmation explicite ; une réauthentification peut être exigée.
- [ ] Le compte est supprimé et les signalements sont anonymisés selon une règle validée par le PO, sans supprimer les statistiques utiles.
- [ ] Les commentaires, tokens, préférences et fichiers associés sont traités dans la même procédure ou documentés comme exception légale.
- [ ] L’opération est transactionnelle, idempotente et laisse un audit non nominatif.
- [ ] Un email de confirmation est envoyé sans révéler de données supprimées ; la session et les tokens sont invalidés.

## Tests et dépendances

- [ ] Confirmation refusée, compte absent, cascade/anonymisation, fichier supprimé, échec email et reprise transactionnelle.
- Dépend de US-10 et US-11 ; nécessite une décision juridique sur durée de conservation et anonymisation.
