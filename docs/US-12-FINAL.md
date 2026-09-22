# US-12 — Notifier un changement de statut

## User story

En tant que citoyen, je veux recevoir un email quand le statut de mon signalement change afin de savoir où en est ma demande.

## Cadrage

- **Priorité** : Should Have · **Estimation** : 5 points · **Sprint proposé** : S2
- **Point de départ** : aucun événement de statut ni historique n’existe ; la confirmation de création est envoyée de façon non fiable dans la route.

## Critères d’acceptation

- [ ] Un email est créé après chaque changement effectif de statut, avec ancien statut, nouveau statut, référence et lien vers le suivi.
- [ ] L’email est envoyé en moins de 5 minutes dans l’environnement cible ; les retries et échecs sont observables.
- [ ] Une même requête ou un statut inchangé ne produit pas de doublon.
- [ ] Le lien respecte la base URL configurée et n’expose pas de token permanent.
- [ ] Le citoyen peut désactiver ces notifications sans empêcher les emails légalement nécessaires.

## Tests et dépendances

- [ ] Changement `recu` vers `en_cours`, échec SMTP, retry, statut inchangé et lien incorrect.
- Dépend de US-03, US-04 et US-11 ; partager un service email testable.
