# US-02 — Consulter les signalements sur une carte

## User story

En tant que citoyen, je veux voir les signalements sur une carte interactive afin de voir ce qui se passe près de chez moi.

## Cadrage

- **MoSCoW** : Must Have · **Estimation** : 8 points · **Sprint** : S1
- **Point de départ** : Leaflet et React-Leaflet sont installés ; la page charge tous les signalements, n’a pas de clustering, a une hauteur fixe et expose actuellement l’email citoyen dans la popup.

## Critères d’acceptation

- [ ] La carte affiche uniquement les signalements ayant des coordonnées valides et propose un état de chargement, vide et erreur.
- [ ] Un marqueur ouvre une popup avec titre, catégorie, statut, date et lien vers le détail ; aucune donnée personnelle n’est affichée publiquement.
- [ ] Les marqueurs sont regroupés lorsque plus de 50 points sont présents et le dégroupement permet d’accéder à chaque signalement.
- [ ] La carte est utilisable au clavier autant que la bibliothèque le permet et possède un intitulé accessible.
- [ ] La hauteur et les contrôles s’adaptent aux écrans mobiles et desktop.
- [ ] Le CSS Leaflet et les icônes sont chargés sans erreur et les coordonnées sont converties en nombres.

## Tests de validation

- [ ] Chargement de points valides, points sans coordonnées, réponse vide et erreur API.
- [ ] Popup sans `citoyen_email`, clic sur le lien de détail et clustering à 51 points.
- [ ] Vérification responsive sur  mobile et desktop ; absence de débordement.

## Dépendances et décisions

- Ajouter une bibliothèque de clustering compatible React-Leaflet ou implémenter l’équivalent validé par le PO.
- US-05 fournit les filtres réutilisables ; US-15 ajoute la distance.
- L’API devra être paginée ou fournir une stratégie de chargement adaptée au volume.
