# US-11 — Authentifier un citoyen

## User story

En tant que citoyen, je veux créer un compte et me connecter afin de suivre mes signalements.

## Cadrage

- **Priorité** : Must Have · **Estimation** : 8 points · **Sprint proposé** : S2
- **Point de départ** : aucun modèle citoyen, route d’inscription, route de connexion ou dépendance JWT active n’est présent ; le middleware existe mais n’est pas utilisé.

## Critères d’acceptation

- [ ] L’inscription valide l’email, impose un mot de passe conforme et stocke uniquement un hash salé.
- [ ] L’email de confirmation contient un token à durée limitée ; un compte non confirmé ne peut pas accéder aux fonctions protégées.
- [ ] La connexion retourne un JWT à durée documentée ; les expirés et invalides renvoient 401 sans détail sensible.
- [ ] Le profil affiche l’identité minimale et l’historique des signalements du citoyen connecté uniquement.
- [ ] Les agents et administrateurs utilisent des rôles distincts des citoyens.

## Tests et dépendances

- [ ] Inscription, doublon, confirmation expirée, connexion, expiration JWT, accès à un autre profil.
- Dépend de US-09 et US-10 ; fournit l’autorisation à US-03, US-13 et US-17.
