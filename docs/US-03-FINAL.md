# US-03 — Mettre à jour le statut d’un signalement

## User story

En tant qu'agent municipal, je veux changer le statut d'un signalement (reçu / en cours / résolu) afin de tenir les citoyens informés.

## Cadrage

- **MoSCoW** : Must Have · **Estimation** : 5 points · **Sprint** : S1
- **Point de départ** : `PATCH /api/signalements/:id/statut` est public, accepte n’importe quelle valeur et n’enregistre aucun historique ; aucune interface agent n’existe.

## Critères d’acceptation

- [ ] Seul un agent authentifié et autorisé sur la mairie du signalement peut modifier son statut.
- [ ] Seules les valeurs `recu`, `en_cours` et `resolu` sont acceptées ; elles correspondent à reçu, en cours et résolu dans l’interface.
- [ ] La transition est atomique, retourne 404 si le signalement n’existe pas et ne modifie pas les autres champs.
- [ ] Chaque changement conserve l’ancien statut, le nouveau statut, l’auteur et l’horodatage.
- [ ] L’interface agent affiche uniquement les signalements de sa mairie et confirme le succès ou l’erreur sans exposer la stack trace.
- [ ] Un changement réussi déclenche la notification définie par US-12 ; l’échec d’email ne fait pas croire à l’agent que l’email est envoyé.
- [ ] Le citoyen ne peut pas appeler cette route avec ses seuls droits de consultation.

## Tests de validation

- [ ] 401 sans token, 403 pour une autre mairie, 200 pour un agent autorisé.
- [ ] Rejet des statuts invalides, historique complet et concurrence sur deux mises à jour.
- [ ] Notification déclenchée une seule fois par changement effectif.

## Dépendances et décisions

- US-11 pour l’authentification et les rôles ; US-13 pour l’interface agent ; US-12 pour la notification.
- Ajouter tables d’agents et d’historique, ainsi que les clés étrangères nécessaires.
