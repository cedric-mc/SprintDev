# Product Backlog — UrbanLink
## Romain Castelli, Product Owner

Les 18 User Stories ci-dessous constituent le backlog complet.
Les 10 premières sont détaillées dans le document du workshop.
Les 8 suivantes sont à analyser, estimer et prioriser avec le PO en Sprint Planning.

---

### US-01 à US-10 — voir la page du workshop SprintDev

---

### US-11 — Authentification citoyen
En tant que citoyen, je veux créer un compte et me connecter afin de suivre mes signalements.
*Critère : JWT, email de confirmation, profil citoyen avec historique*

### US-12 — Notification de mise à jour
En tant que citoyen, je veux recevoir un email quand le statut de mon signalement change
afin de savoir où en est ma demande.
*Critère : email envoyé < 5 min après changement de statut, lien vers le signalement*

### US-13 — Interface agent municipal
En tant qu'agent municipal, je veux une interface dédiée pour gérer les signalements
de ma mairie afin de ne voir que ce qui me concerne.
*Critère : login agent, vue filtrée sur sa mairie, boutons de changement de statut*

### US-14 — Commentaire sur un signalement
En tant qu'agent municipal, je veux laisser un commentaire public sur un signalement
afin d'informer le citoyen de l'avancement.
*Critère : commentaire horodaté, visible par le citoyen sur le suivi*

### US-15 — Recherche et filtres avancés
En tant que citoyen, je veux filtrer les signalements par date, catégorie, statut et
distance afin de trouver rapidement ce qui me concerne.
*Critère : filtres combinables, URL partageable avec filtres actifs*

### US-16 — Export des données mairie
En tant qu'agent municipal, je veux exporter les signalements du mois en CSV
afin de les intégrer dans nos outils internes.
*Critère : export CSV filtrable par période, toutes les colonnes incluses*

### US-17 — Suppression de compte RGPD
En tant que citoyen, je veux pouvoir supprimer mon compte et toutes mes données
afin d'exercer mon droit à l'effacement.
*Critère : suppression en cascade (signalements anonymisés, compte supprimé), email de confirmation*

### US-18 — Mode hors-ligne PWA
En tant que citoyen, je veux pouvoir créer un signalement sans connexion internet
afin de pouvoir signaler même dans des zones mal couvertes.
*Critère : Service Worker, sync au retour de la connexion, indicateur visuel offline*

---

*Romain Castelli — UrbanLink — Document fourni le Jour 1 du workshop SprintDev*
