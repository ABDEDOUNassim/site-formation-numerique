# Plateforme Numérique Responsable

## Structure
- `server` : API Node.js / Express / Sequelize / PostgreSQL
- `client` : frontend React / Vite
- `docs` : documentation technique et déploiement

## Local
### Backend
```bash
cd server
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

### Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Production (Render + Supabase)
- Blueprint Render versionné: `render.yaml`
- Guide complet: `docs/deploy-render-supabase.md`

Pré-requis clés prod:
- `DB_SYNC_ON_STARTUP=false`
- `JWT_SECRET` fort
- `FRONTEND_URLS` restreint au domaine frontend
