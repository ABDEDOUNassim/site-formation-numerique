# Architecture MVP

## Monorepo
- `server`: API Express + Sequelize + PostgreSQL
- `client`: React + Vite + React Router
- `docs`: documentation technique et produit

## Principes sécurité
- Auth JWT et mots de passe hashés (bcrypt)
- Validation Zod côté API
- Rate limiting sur login/inscription/contact
- Données minimales pour mineurs (pseudo + tranche d'âge)
- Histoires enfants stockées en privé uniquement
