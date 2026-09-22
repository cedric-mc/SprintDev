# US-02 — Consulter les signalements sur une carte

## User story

En tant que citoyen, je veux voir les signalements sur une carte interactive afin de voir ce qui se passe près de chez moi.

## Cadrage

- **MoSCoW** : Must Have · **Estimation** : 8 points · **Sprint** : S1
- **Point de départ** : Leaflet et React-Leaflet sont installés ; la page charge tous les signalements, n’a pas de clustering, a une hauteur fixe et expose actuellement l’email citoyen dans la popup.

## Critères d’acceptation

- [x] La carte affiche uniquement les signalements ayant des coordonnées valides et propose un état de chargement, vide et erreur.
- [x] Un marqueur ouvre une popup avec titre, catégorie, statut, date et lien vers le détail ; aucune donnée personnelle n’est affichée publiquement.
- [x] Les marqueurs sont regroupés lorsque plus de 50 points sont présents et le dégroupement permet d’accéder à chaque signalement.
- [x] La carte est utilisable au clavier autant que la bibliothèque le permet et possède un intitulé accessible.
- [x] La hauteur et les contrôles s’adaptent aux écrans mobiles et desktop.
- [x] Le CSS Leaflet et les icônes sont chargés sans erreur et les coordonnées sont converties en nombres.

## Tests de validation

- [ ] Chargement de points valides, points sans coordonnées, réponse vide et erreur API. Les états sont implémentés mais aucun test front automatisé n’est encore configuré.
- [ ] Popup sans `citoyen_email`, clic sur le lien de détail et clustering à 51 points. Le build valide l’intégration, mais ces scénarios nécessitent encore des tests de composant ou de navigateur.
- [ ] Vérification responsive sur mobile et desktop ; absence de débordement. La feuille responsive est en place, mais la vérification visuelle reste à effectuer.

## Dépendances et décisions

- `react-leaflet-cluster@2.1.0` a été ajouté, compatible avec React 18 et React-Leaflet 4.
- US-05 fournit les filtres réutilisables ; US-15 ajoute la distance.
- L’API devra être paginée ou fournir une stratégie de chargement adaptée au volume ; la carte charge encore la collection complète.

## Validation technique

- [x] `npm run build` côté client passe avec Vite après intégration de Leaflet et du clustering.
- [ ] Tests front et vérification visuelle mobile/desktop à ajouter lorsque l’outillage de test navigateur sera disponible.
