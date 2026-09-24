# US-04 — Confirmer la création par email

## User story

En tant que citoyen, je veux recevoir un email de confirmation à la création d'un signalement afin de savoir que ma demande est prise en compte.

## Cadrage

- **MoSCoW** : Should Have · **Estimation** : 3 points · **Sprint** : S2
- **Point de départ** : la route appelle une fonction Nodemailer “fire and forget”, sans validation d’email, sans contenu de catégorie/description et sans gestion observable des erreurs.

## Critères d’acceptation

- [x] Après une création valide, un message est placé dans la table `email_deliveries`, avec statut et nombre de tentatives traçables.
- [x] L’email contient le numéro de suivi, la catégorie, un résumé de la description, le statut `recu` et un lien vers le suivi.
- [x] L’adresse email est obligatoire et validée avant création ; le contrat ne prévoit pas de signalement anonyme.
- [x] L’API répond sans attendre le fournisseur SMTP ; une remise échouée reste en `retry` ou `failed` et n’est pas annoncée comme envoyée.
- [x] Les erreurs journalisent uniquement l’identifiant de livraison, le nombre de tentatives et le message technique.
- [x] En configuration de test, Nodemailer est mocké et les livraisons sont inspectables en base SQLite mémoire.

## Tests de validation

- [x] Email envoyé avec référence, catégorie et lien corrects.
- [x] Email invalide refusé avec 400 ; panne SMTP, retry et état d’échec vérifiables.
- [ ] Délai cible inférieur à 30 secondes en environnement d’intégration.

## Dépendances et décisions

- US-01 pour le contrat de création ; US-11 pour le compte citoyen ; US-12 réutilise le même service d’email.
- Ajouter une configuration SMTP obligatoire en production et un fournisseur de test en CI.
