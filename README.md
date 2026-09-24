# UrbanLink

![UrbanLink CI](https://github.com/cedric-mc/SprintDev/actions/workflows/ci.yml/badge.svg)

**UrbanLink** est une application Civic Tech facilitant la mise en relation entre les citoyens et leur mairie. Elle permet aux habitants de remonter facilement des signalements (voirie, propreté, éclairage) et aux agents municipaux de les traiter efficacement via un tableau de bord dédié.

Ce projet s'inscrit dans le cadre du **Workshop SprintDev (M1 LDF)**. L'objectif de ce projet intensif de 5 jours est de reprendre un MVP existant pour le stabiliser, le refactoriser, le documenter et l'enrichir de nouvelles fonctionnalités, le tout en appliquant la méthodologie Scrum et les standards de qualité de l'industrie (CI/CD, tests automatisés).

## Contributeur

- Cédric MARIYA CONSTANTINE
- École PMN - 2025/2026

## Espace mairie

Lancer les migrations et les données de démonstration :

```bash
npm run migrate
npm run seed
npm start
npm run dev --prefix client
```

Ouvrir `http://localhost:3000/admin/connexion`.

Compte de démonstration : `agent1@urbanlink.test` / `UrbanLink123!`
