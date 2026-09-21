# Product Backlog — UrbanLink
## Romain Castelli, Product Owner

Les 18 User Stories ci-dessous constituent le backlog complet.
Les 10 premières sont détaillées dans le document du workshop.
Les 8 suivantes sont à analyser, estimer et prioriser avec le PO en Sprint Planning.

---

### US-01 à US-10 — voir la page du workshop SprintDev

| ID | User Story | Critère d'acceptation principal | MoSCoW | Points | Sprint |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **US-01** | En tant que citoyen, je veux créer un signalement avec catégorie, description et photo afin d'alerter ma mairie | Le formulaire valide les champs, le signalement apparaît dans la liste < 2s | **Must Have** | 5 | S1 |
| **US-02** | En tant que citoyen, je veux voir les signalements sur une carte interactive afin de voir ce qui se passe près de chez moi | Carte Leaflet avec markers cliquables, clustering si > 50 points | **Must Have** | 8 | S1 |
| **US-03** | En tant qu'agent municipal, je veux changer le statut d'un signalement (reçu / en cours / résolu) afin de tenir les citoyens informés | Changement de statut via interface admin, notification email au citoyen | **Must Have** | 5 | S1 |
| **US-04** | En tant que citoyen, je veux recevoir un email de confirmation à la création d'un signalement afin de savoir que ma demande est prise en compte | Email reçu < 30s, contient le numéro de suivi et la catégorie | **Should Have** | 3 | S2 |
| **US-05** | En tant que citoyen, je veux filtrer les signalements par catégorie et par statut afin de trouver ce qui m'intéresse | Filtres combinables, résultats mis à jour sans rechargement de page | **Should Have** | 3 | S2 |
| **US-06** | En tant qu'agent municipal, je veux un tableau de bord avec les statistiques de la semaine afin de prioriser les interventions | KPI : nombre de signalements, délai moyen de traitement, catégories les plus fréquentes | **Should Have** | 5 | S2 |
| **US-07** | En tant que citoyen, je veux pouvoir voter pour un signalement existant afin d'indiquer qu'il me concerne aussi | Un vote par citoyen par signalement, compteur visible sur la carte | **Could Have** | 3 | S2? |
| **US-08** | En tant que développeur, je veux une couverture de tests ≥ 70 % sur les routes API afin de pouvoir déployer en confiance | Jest + Supertest, rapport de coverage visible dans la CI | **Must Have** | 5 | S1 |
| **US-09** | En tant que développeur, je veux un pipeline GitHub Actions qui lance lint + tests à chaque push afin d'éviter les régressions | Pipeline visible, vert sur main, badge dans le README | **Must Have** | 3 | S1 |
| **US-10** | En tant que visiteur, je veux une application accessible au clavier et aux lecteurs d'écran afin que tout le monde puisse signaler | Lighthouse Accessibility > 90, navigation clavier complète, aria-labels sur formulaire | **Should Have** | 3 | S2 |

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
