# Déploiement Production - Render + Supabase

Ce guide est opérationnel pour ce repo.

## 1) Préparer Supabase
1. Crée un projet Supabase PostgreSQL.
2. Récupère la chaîne de connexion `DATABASE_URL` (format PostgreSQL).
3. Vérifie que la base est accessible depuis Render.

## 2) Variables API Render
Service: `numerique-responsable-api`

Variables obligatoires:
- `NODE_ENV=production`
- `DATABASE_URL=...`
- `JWT_SECRET=<secret long et unique>`
- `FRONTEND_URLS=https://numerique-responsable-client.onrender.com`
- `DB_SYNC_ON_STARTUP=false`
- `TRUST_PROXY=true`
- `DB_SSL=auto`
- `DB_SSL_REJECT_UNAUTHORIZED=false`
- `JWT_EXPIRES_IN=7d`
- `ADMIN_SEED_EMAIL=<email admin>`
- `ADMIN_SEED_PASSWORD=<mot de passe fort>`

## 3) Variables Front Render
Service: `numerique-responsable-client`

- `VITE_API_URL=https://numerique-responsable-api.onrender.com/api`

## 4) Déploiement via Blueprint
Le repo contient `render.yaml`.

- Render > New > Blueprint
- Sélectionne le repo
- Vérifie les valeurs d'env
- Lance le déploiement

## 5) Migrations et seed
Le backend exécute automatiquement les migrations au démarrage:
- `npm run migrate && npm start`

Script disponible:
- `npm run migrate`
- `npm run migrate:status`
- `npm run migrate:down`
- `npm run seed` (à lancer manuellement, jamais automatiquement en prod)

## 6) Vérifications post-déploiement
1. API health: `GET /health`
2. API ready: `GET /ready`
3. Frontend: ouverture d'une route interne (`/jeunes/tutorials`) sans 404 (rewrite SPA)
4. Login enfant + accès jeux
5. Création de demande contact

## 7) Politique prod appliquée dans le code
- `DB_SYNC_ON_STARTUP` bloqué en prod (erreur explicite si `true`).
- Schéma piloté par migrations versionnées (`umzug`).
- CORS strict avec allowlist (`FRONTEND_URLS`).

## 8) Rollback
- Si migration problématique: `npm run migrate:down` (1 étape)
- Redéployer l'API ensuite.
