# US-04 — Confirmer la création par email

## User story

En tant que citoyen, je veux recevoir un email de confirmation à la création d'un signalement afin de savoir que ma demande est prise en compte.

## Cadrage

- **MoSCoW** : Should Have · **Estimation** : 3 points · **Sprint** : S2
- **Point de départ** : la route appelle une fonction Nodemailer “fire and forget”, sans validation d’email, sans contenu de catégorie/description et sans gestion observable des erreurs.

## Critères d’acceptation

- [ ] Après une création valide, un message est placé dans un mécanisme d’envoi fiable et traçable.
- [ ] L’email contient le numéro de suivi, la catégorie, un résumé de la description, le statut `recu` et un lien vers le suivi.
- [ ] L’adresse email est validée avant création ou le contrat permet explicitement un signalement anonyme ; le choix est documenté.
- [ ] L’API ne bloque pas inutilement la réponse HTTP sur le fournisseur SMTP et n’annonce pas un envoi réussi si la remise a échoué.
- [ ] Les erreurs sont journalisées sans mot de passe, token ni contenu personnel inutile.
- [ ] En configuration de test, les emails sont capturables sans envoi réel.

## Tests de validation

- [ ] Email envoyé avec référence, catégorie et lien corrects.
- [ ] Email invalide refusé avec 400 ; panne SMTP, retry et état d’échec vérifiables.
- [ ] Délai cible inférieur à 30 secondes en environnement d’intégration.

## Dépendances et décisions

- US-01 pour le contrat de création ; US-11 pour le compte citoyen ; US-12 réutilise le même service d’email.
- Ajouter une configuration SMTP obligatoire en production et un fournisseur de test en CI.
