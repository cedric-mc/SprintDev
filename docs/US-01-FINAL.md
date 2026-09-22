# US-01 — Créer un signalement

## User story

En tant que citoyen, je veux créer un signalement avec catégorie, description et photo afin d’alerter ma mairie.

## Cadrage

- **MoSCoW** : Must Have · **Estimation** : 5 points · **Sprint** : S1
- **Point de départ** : `POST /api/signalements` existe, mais accepte des champs vides, ne contrôle ni les coordonnées ni le fichier et stocke l’email en clair.

## Critères d’acceptation

- [x] Le formulaire comporte des labels associés pour le titre, la description, la catégorie, l’email, la latitude, la longitude et la photo.
- [ ] Le titre, la catégorie, la description, l’email et les coordonnées sont validés côté client et côté serveur ; une erreur 400 décrit chaque champ invalide. La catégorie n’est pas encore contrôlée par une liste blanche côté serveur.
- [ ] La catégorie appartient à la liste métier configurée et le statut initial est `recu`. Le statut initial est bien `recu`, mais les catégories inconnues sont encore acceptées par l’API.
- [x] La latitude est comprise entre -90 et 90 et la longitude entre -180 et 180 ; les valeurs non numériques sont refusées.
- [x] Une photo est facultative, limitée aux types MIME JPEG, PNG et WebP et à 5 Mo ; aucun fichier arbitraire n’est accepté.
- [ ] Une création valide retourne `201` avec l’identifiant et le signalement est visible dans la liste en moins de 2 secondes. La création retourne bien `201`, mais le délai n’est pas mesuré par un test.
- [x] L’interface affiche un message de succès non technique et conserve les données en cas d’erreur.
- [x] Les données saisies par l’utilisateur sont affichées sans exécuter de HTML ou de script dans l’interface React.

## Tests de validation

- [ ] API : payload valide, champs absents, email invalide, coordonnées hors limites, catégorie inconnue. Le payload valide, l’email invalide et les coordonnées hors limites sont couverts ; les champs absents et la catégorie inconnue ne le sont pas explicitement.
- [ ] API : photo autorisée, photo trop volumineuse et type MIME interdit. Le type MIME interdit est couvert ; les cas autorisé et trop volumineux restent à ajouter.
- [ ] Interface : succès, erreur serveur, navigation clavier et labels accessibles.
- [ ] Performance : création et rafraîchissement de la liste en moins de 2 secondes dans l’environnement cible.

## Dépendances et décisions

- Validation serveur, configuration Multer et stockage des uploads réalisés ; la whitelist métier des catégories reste à compléter.
- Le formulaire utilise désormais `FormData` pour envoyer les champs et la photo en multipart ; la validation de la catégorie et les tests front restent à compléter.
- L’adresse email reste une donnée personnelle ; son traitement est complété par US-11 et US-17.
