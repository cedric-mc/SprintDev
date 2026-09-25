# UrbanLink

![UrbanLink CI](https://github.com/cedric-mc/SprintDev/actions/workflows/ci.yml/badge.svg)

**UrbanLink** est une application Civic Tech facilitant la mise en relation entre les citoyens et leur mairie. Elle permet aux habitants de remonter facilement des signalements (voirie, propreté, éclairage) et aux agents municipaux de les traiter efficacement via un tableau de bord dédié.

Ce projet s'inscrit dans le cadre du **Workshop SprintDev (M1 LDF)**. L'objectif de ce projet intensif de 5 jours est de reprendre un MVP existant pour le stabiliser, le refactoriser, le documenter et l'enrichir de nouvelles fonctionnalités, le tout en appliquant la méthodologie Scrum et les standards de qualité de l'industrie (CI/CD, tests automatisés).

## Contributeur

- Cédric MARIYA CONSTANTINE
- École PMN - 2025/2026

## Prérequis

- Node.js 18 ou supérieur
- npm
- Docker Desktop uniquement pour capturer les emails localement avec Mailpit

## Installation locale

Depuis la racine du dépôt :

```bash
npm install
npm install --prefix client
npm run migrate
npm run seed
```

Copier les variables locales ci-dessous dans un fichier `.env` à la racine :

```env
PORT=3001
NODE_ENV=development
DB_PATH=./db/urbanlink.db
JWT_SECRET=change-me-en-local
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_FROM=no-reply@urbanlink.local
TRACKING_URL=http://localhost:5173/signalements
```

Le fichier `.env` ne doit pas être commité. En production, `SMTP_HOST`, `SMTP_USER` et `SMTP_PASS` sont obligatoires.

## Lancer l’application

Terminal 1, API :

```bash
npm start
```

Terminal 2, client :

```bash
npm run dev --prefix client
```

Adresses locales :

- Client : `http://localhost:5173`
- API : `http://localhost:3001`
- Santé API : `http://localhost:3001/health`
- Documentation OpenAPI : [docs/openapi.yaml](docs/openapi.yaml)

## Capturer les emails en local

Mailpit évite tout envoi réel :

```bash
docker run --rm -p 1025:1025 -p 8025:8025 axllent/mailpit
```

Consulter les messages sur `http://localhost:8025`. Après une modification du schéma, relancer `npm run migrate`.

## Compte de démonstration

Ouvrir `http://localhost:5173/admin/connexion`.

Compte de démonstration : `agent1@urbanlink.test` / `UrbanLink123!`

## Tests et couverture

Les tests sont des tests d’intégration HTTP avec Supertest et SQLite en mémoire. Ils ne démarrent pas de serveur externe et mockent Nodemailer.

```bash
npm test -- --runInBand --ci
npm run test:integration
npm run lint
npm --prefix client run build
```

Dernière vérification locale : 23 tests d’intégration passants, `89,11 %` d’instructions et `92,76 %` de lignes couvertes globalement. Le build client passe ; Vite signale seulement que le bundle JavaScript dépasse 500 kB.

## Audit Lighthouse

Le rapport Lighthouse généré le 2026-09-25 sur la page d’accueil de l’application donne les scores suivants :

- Performance : 57/100
- Accessibility : 98/100
- Best Practices : 100/100
- SEO : 82/100

Le rapport complet est disponible dans `client/localhost_2026-09-25_08-30-42.report.html`.

## Routes principales

- `GET /api/signalements` : liste paginée, filtres `categorie` et `statut`.
- `POST /api/signalements` : création multipart avec photo facultative et email de confirmation.
- `GET /api/mairies` et `GET /api/mairies/:id` : consultation des mairies.
- `POST /api/auth/login` : connexion agent et JWT valable 8 heures.
- `PATCH /api/signalements/:id/statut` : changement de statut réservé aux agents autorisés.
- `GET /api/admin/signalements` : liste de la période pour l’espace mairie.
- `GET /api/admin/stats` : KPI de période, catégories et délai moyen des signalements résolus.

Les paramètres, réponses et schémas sont détaillés dans [docs/openapi.yaml](docs/openapi.yaml). Les routes `/api/debug` sont réservées au développement local et ne doivent pas être exposées en production.
