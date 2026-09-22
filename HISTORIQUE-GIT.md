# Historique Git — UrbanLink

## Commandes pour explorer l'historique

```bash
git log --oneline --all --graph --decorate
git log --pretty=format:"%h | %an | %ad | %s" --date=short
git show <hash>
git log --all --grep="TODO\|FIXME\|bug\|auth"
```

## Branches du repo

- `main` — code "stable" (avec tous les problèmes)
- `dev` — branche de développement abandonnée mi-octobre
- `feature/notifications` — commencée, jamais terminée

## Ce que l'historique révèle

Parcourez les messages de commit. Ils racontent l'histoire du projet.
Notez les patterns, les TODO jamais résolus, les "fix rapide" qui s'accumulent.
