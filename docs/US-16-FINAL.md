# US-16 — Exporter les données de la mairie

## User story

En tant qu’agent municipal, je veux exporter les signalements du mois en CSV afin de les intégrer dans nos outils internes.

## Cadrage

- **Priorité** : Should Have · **Estimation** : 5 points · **Sprint proposé** : S3
- **Point de départ** : aucune route d’export n’existe ; la route admin actuelle expose au contraire des données sensibles sans protection.

## Critères d’acceptation

- [ ] Seul un agent autorisé exporte les données de sa mairie, sur une période validée par l’API.
- [ ] La période par défaut couvre le mois courant et peut être remplacée par des dates début/fin.
- [ ] Le CSV contient les colonnes documentées : identifiant, titre, description, catégorie, statut, coordonnées, dates et référence mairie.
- [ ] Les emails, tokens, chemins physiques et secrets sont exclus du fichier.
- [ ] Le contenu CSV échappe correctement séparateurs, guillemets et retours à la ligne ; le téléchargement utilise un nom et un type corrects.

## Tests et dépendances

- [ ] Export vide, une ligne, caractères accentués, guillemets, période invalide et cloisonnement mairie.
- Dépend de US-07, US-08, US-10 et US-13 ; prévoir une limite ou un streaming pour les gros volumes.
