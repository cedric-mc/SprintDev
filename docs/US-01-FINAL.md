# US-01 — Créer un signalement

## User story

En tant que citoyen, je veux créer un signalement avec catégorie, description et photo afin d’alerter ma mairie.

## Cadrage

- **MoSCoW** : Must Have · **Estimation** : 5 points · **Sprint** : S1
- **Point de départ** : `POST /api/signalements` existe, mais accepte des champs vides, ne contrôle ni les coordonnées ni le fichier et stocke l’email en clair.

## Critères d’acceptation

- [ ] Le formulaire comporte des labels associés pour le titre, la description, la catégorie, l’email, la latitude, la longitude et la photo.
- [ ] Le titre, la catégorie, la description, l’email et les coordonnées sont validés côté client et côté serveur ; une erreur 400 décrit chaque champ invalide.
- [ ] La catégorie appartient à la liste métier configurée et le statut initial est `recu`.
- [ ] La latitude est comprise entre -90 et 90 et la longitude entre -180 et 180 ; les valeurs non numériques sont refusées.
- [ ] Une photo est facultative, limitée à un type MIME et une taille documentés ; aucun fichier arbitraire n’est accepté.
- [ ] Une création valide retourne `201` avec l’identifiant et le signalement est visible dans la liste en moins de 2 secondes.
- [ ] L’interface affiche un message de succès non technique et conserve les données en cas d’erreur.
- [ ] Les données saisies par l’utilisateur sont affichées sans exécuter de HTML ou de script.

## Tests de validation

- [ ] API : payload valide, champs absents, email invalide, coordonnées hors limites, catégorie inconnue.
- [ ] API : photo autorisée, photo trop volumineuse et type MIME interdit.
- [ ] Interface : succès, erreur serveur, navigation clavier et labels accessibles.
- [ ] Performance : création et rafraîchissement de la liste en moins de 2 secondes dans l’environnement cible.

## Dépendances et décisions

- Migration de validation/index et configuration du stockage des uploads.
- Le formulaire actuel envoie un objet JSON et ne permet pas encore réellement l’upload multipart : le contrat API devra être unifié.
- L’adresse email reste une donnée personnelle ; son traitement est complété par US-11 et US-17.
