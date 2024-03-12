# SprintDev — Prise en main du repo UrbanLink

Bienvenue. Ce repo est celui que vous avez reçu de Romain Castelli (PO) la veille du workshop.
Il a été écrit par Baptiste, le dev solo qui est parti en novembre 2024.

---

## 🎯 Mission J1 matin — Audit du repo

Avant d'écrire une seule ligne de code, **auditez ce repo**. L'audit est la base de votre Sprint Planning.
Sans audit sérieux, vous planifiez dans le vide.

## 📂 Structure du projet

```
urbanlink/
├── .env                          ← à examiner en priorité
├── .gitignore                    ← bien configuré ?
├── package.json                  ← scripts disponibles
├── README.md                     ← qualité ?
├── src/
│   ├── index.js                  ← point d'entrée
│   ├── config/db.js              ← connexion SQLite
│   ├── middleware/auth.js        ← middleware JWT (actif ?)
│   └── routes/
│       ├── signalements.js       ← route principale ← commencer ici
│       ├── mairies.js
│       ├── admin.js              ← vérifier les protections
│       └── debug.js              ← que fait cette route ?
├── src/models/signalement.js     ← utilisé quelque part ?
├── client/
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── pages/                ← 3 pages existantes
│       └── hooks/useSignalements.js  ← utilisé ?
├── db/
│   ├── migrations/001_init.js   ← schéma de la DB
│   └── seed.js                  ← données de test
└── docs/                        ← vous mettrez vos CR cérémonies ici
    └── dailies/                 ← un fichier par Daily Stand-up
```

---

## 🔍 Grille d'audit J1 — à compléter avant le Sprint Planning

### A. Sécurité
- [ ] Des secrets sont-ils exposés quelque part ? Lesquels ? Où ?
- [ ] Les routes `/api/admin` et `/api/debug` sont-elles protégées ?
- [ ] Le middleware d'auth est-il actif ? Pourquoi a-t-il été désactivé ?
- [ ] Y a-t-il des risques XSS, injection, ou problèmes RGPD dans le code ?

### B. Qualité du code back-end
- [ ] Y a-t-il une séparation entre routes, modèles et services ?
- [ ] `src/models/signalement.js` est-il utilisé dans les routes ? Que faudrait-il changer ?
- [ ] Y a-t-il des N+1 queries ? Où ? Quel impact ?
- [ ] La gestion d'erreur est-elle cohérente et complète ?

### C. Qualité du front-end
- [ ] `useSignalements.js` est-il utilisé dans les composants ? Que devrait-il remplacer ?
- [ ] Y a-t-il des problèmes d'accessibilité dans les formulaires ?
- [ ] La carte Leaflet a-t-elle des bugs identifiables sans lancer l'app ?
- [ ] Qu'est-ce qui pose un problème de performance à grande échelle ?

### D. Tests et CI
- [ ] Y a-t-il des tests ? Que teste le script `npm test` actuellement ?
- [ ] Y a-t-il un pipeline CI en place ?
- [ ] Listez les 5 routes les plus critiques à tester en priorité.

### E. Architecture et dette technique
- [ ] Identifiez la logique métier dupliquée entre les fichiers.
- [ ] Quelles refactorisations prioriserez-vous dans le Sprint 1 ?
- [ ] Établissez votre Definition of Done pour ce projet.

---

## 📊 Livrable attendu : rapport d'audit

Avant 11h le Jour 1, le binôme présente au PO (5 min) :

1. **Top 5 des problèmes critiques** à corriger en Sprint 1
2. **Liste des US** que vous comptez traiter (depuis le backlog de 18)
3. **Votre Definition of Done** — ce que signifie "une US est terminée" pour vous
4. **Votre stratégie de branchement** (Feature Branch Workflow imposé)

---

## ⚠️ Règles du workshop

- Une branche par User Story : `feature/US-XX-nom-court`
- Aucun merge sur `develop` sans code review approuvée par l'autre membre
- Les CR de Daily sont dans `docs/dailies/YYYY-MM-DD.md`
- La CI doit être verte sur `main` à la soutenance

*Document UrbanLink — Fourni le Jour 1 du workshop SprintDev*
