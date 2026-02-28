# Checklist Go-Live Production

## Statut actuel
- Objectif: passer d'un MVP demo a un deploiement production fiable.
- Etat: base solide, mais durcissement encore necessaire avant ouverture publique.

## 30 points de controle

### 1) Configuration & secrets
1. `NODE_ENV=production` en production.
2. `JWT_SECRET` fort (>= 32 chars) et non versionne.
3. Variables `.env` separees par environnement (dev/staging/prod).
4. `DB_SYNC_ON_STARTUP=false` en production.
5. `FRONTEND_URLS` limite aux domaines de confiance.

### 2) Base de donnees
6. Utiliser migrations versionnees (ne pas dependre de `sync`).
7. Sauvegardes automatiques actives (Supabase).
8. Procedure de restauration testee.
9. Index verifies sur champs critiques (auth, requetes publiques).
10. Compte DB avec permissions minimales.

### 3) API & securite
11. Rate limiting renforce sur auth/contact.
12. Validation d'entrees complete sur tous les endpoints.
13. Helmet actif avec politique adaptee.
14. CORS strict (allowlist uniquement).
15. Aucun secret expose dans les logs/reponses.

### 4) Authentification
16. Hash bcrypt correctement configure.
17. Strategie refresh token/revocation definie.
18. Expiration token et comportement deconnexion verifies.
19. Gestion des comptes inactifs/suspendus.
20. Audit des endpoints admin protege.

### 5) Conformite mineurs
21. Donnees minimales uniquement (pseudo + tranche age).
22. Aucun espace social/messagerie active pour mineurs.
23. Histoires enfants privees (controle API + BDD).
24. Politique de retention/suppression documentee.
25. Mentions legales + politique confidentialite publiees.

### 6) Qualite logicielle
26. Tests unitaires backend critiques.
27. Tests integration API (auth, tutos, stories, jeux).
28. Smoke test frontend (routing + appels API).
29. Pipeline CI (lint/test/build) bloquant avant deploy.
30. Procedure rollback documentee.

## 5 durcissements deja implémentés dans ce repo
1. Validation stricte des variables d'environnement (`zod`) dans `server/src/config/env.js`.
2. CORS allowlist multi-domaines via `FRONTEND_URLS` dans `server/src/app.js`.
3. Endpoint readiness DB `/ready` + health enrichi `/health` dans `server/src/app.js`.
4. Logging structuré des requetes avec `x-request-id` dans `server/src/middlewares/requestMeta.js`.
5. Synchronisation DB configurable (`DB_SYNC_ON_STARTUP`) dans `server/src/server.js`.

## Valeurs recommandees production
- `NODE_ENV=production`
- `DB_SYNC_ON_STARTUP=false`
- `TRUST_PROXY=true` (Render)
- `DB_SSL=auto`
- `DB_SSL_REJECT_UNAUTHORIZED=false` (selon provider/cert)
- `FRONTEND_URLS=https://ton-front.onrender.com,https://ton-domaine.fr`
