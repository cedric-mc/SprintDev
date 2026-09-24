# US-14 — Commenter un signalement

## User story

En tant qu’agent municipal, je veux laisser un commentaire public sur un signalement afin d’informer le citoyen de l’avancement.

## Cadrage

- **Priorité** : Should Have · **Estimation** : 5 points · **Sprint proposé** : S3
- **Point de départ** : aucune table, route ou interface de commentaires n’existe.

## Critères d’acceptation

- [ ] Seul un agent autorisé sur la mairie du signalement peut publier un commentaire.
- [ ] Un commentaire contient un texte non vide, une date et l’auteur municipal ; le texte est limité en longueur et rendu sans HTML exécutable.
- [ ] Les commentaires sont affichés dans l’ordre chronologique sur le suivi citoyen.
- [ ] Une modification ou suppression est auditée et réservée à l’auteur ou à un administrateur.
- [ ] La publication échoue sans données partielles si le signalement est introuvable.

## Tests et dépendances

- [ ] Contrôle de rôle et mairie, texte vide ou trop long, XSS, ordre chronologique et concurrence.
- Dépend de US-06, US-11 et US-13 ; une notification de commentaire est hors périmètre sauf décision du PO.
