# US-18 — Créer un signalement hors ligne

## User story

En tant que citoyen, je veux préparer un signalement sans connexion internet afin de le synchroniser dès que le réseau revient.

## Cadrage

- **Priorité** : Could Have · **Estimation** : 13 points · **Sprint proposé** : S4
- **Point de départ** : le client n’a ni Service Worker, ni manifest PWA, ni stockage local ; la création actuelle dépend immédiatement de l’API.

## Critères d’acceptation

- [ ] L’application installable met en cache son shell et affiche clairement l’état en ligne/hors ligne.
- [ ] Un formulaire valide peut être enregistré localement avec un identifiant temporaire et l’état `en_attente`.
- [ ] Au retour du réseau, la synchronisation envoie chaque élément une seule fois, conserve les échecs et affiche le résultat.
- [ ] Une photo hors ligne respecte les limites de taille et ne reste pas indéfiniment dans le stockage local.
- [ ] La perte du navigateur, le redémarrage et l’absence de quota n’entraînent pas de faux succès silencieux.

## Tests et dépendances

- [ ] Installation et cache, création hors ligne, reconnexion, doublon, erreur API, quota local et photo.
- Dépend de US-01, US-07 et US-09 ; nécessite une stratégie de synchronisation documentée et un test sur navigateur mobile.
