# Product Backlog — UrbanLink
## Romain Castelli, Product Owner

Les 18 User Stories ci-dessous constituent le backlog complet.
Les 10 premières sont détaillées dans le document du workshop.
Les 8 suivantes sont à analyser, estimer et prioriser avec le PO en Sprint Planning.

---

### US-01 — Création d'un signalement
En tant que citoyen, je veux créer un signalement avec catégorie, description et photo afin d'alerter ma mairie.
*Critère : le formulaire valide les champs, le signalement apparaît dans la liste < 2s*

### US-02 — Carte interactive des signalements
En tant que citoyen, je veux voir les signalements sur une carte interactive afin de voir ce qui se passe près de chez moi.
*Critère : carte Leaflet avec markers cliquables, clustering si > 50 points*

### US-03 — Changement de statut par l'agent
En tant qu'agent municipal, je veux changer le statut d'un signalement (reçu / en cours / résolu) afin de tenir les citoyens informés.
*Critère : changement de statut via interface admin, notification email au citoyen*

### US-04 — Email de confirmation
En tant que citoyen, je veux recevoir un email de confirmation à la création d'un signalement afin de savoir que ma demande est prise en compte.
*Critère : email reçu < 30s, contient le numéro de suivi et la catégorie*

### US-05 — Filtrage des signalements
En tant que citoyen, je veux filtrer les signalements par catégorie et par statut afin de trouver ce qui m'intéresse.
*Critère : filtres combinables, résultats mis à jour sans rechargement de page*

### US-06 — Tableau de bord statistiques
En tant qu'agent municipal, je veux un tableau de bord avec les statistiques de la semaine afin de prioriser les interventions.
*Critère : KPI : nombre de signalements, délai moyen de traitement, catégories les plus fréquentes*

### US-07 — Vote pour un signalement
En tant que citoyen, je veux pouvoir voter pour un signalement existant afin d'indiquer qu'il me concerne aussi.
*Critère : un vote par citoyen par signalement, compteur visible sur la carte*

### US-08 — Couverture de tests API
En tant que développeur, je veux une couverture de tests ≥ 70% sur les routes API afin de pouvoir déployer en confiance.
*Critère : Jest + Supertest, rapport de coverage visible dans la CI*

### US-09 — Pipeline CI/CD
En tant que développeur, je veux un pipeline GitHub Actions qui lance lint + tests à chaque push afin d'éviter les régressions.
*Critère : pipeline visible, vert sur main, badge dans le README*

### US-10 — Accessibilité
En tant que visiteur, je veux une application accessible au clavier et aux lecteurs d'écran afin que tout le monde puisse signaler.
*Critère : Lighthouse Accessibility > 90, navigation clavier complète, aria-labels sur formulaire*

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
