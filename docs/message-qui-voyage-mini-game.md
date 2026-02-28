# Mini-jeu "Le Message Qui Voyage" (V1)

## Lancer
- Frontend: `cd client && npm run dev`
- Ouvrir: `/jeunes/games/message-journey`

## Ce que contient la V1
- Zones de jeu: Client Emetteur, Serveur, Autres Clients, Adulte Conseiller.
- Main de cartes jouables: Transmettre, Copier, Partager, Blocage, Firewall, Carte Adulte.
- Score et journal d'evenements.
- Mode Demo (auto-play) et option pour activer/desactiver les animations.
- Fin de partie avec feedback educatif.

## Regles implementees (V1)
- Objectif: valider 3 messages authentiques.
- Un message doit passer par le serveur avant partage.
- Risque de copie adverse apres transmission/partage.
- Carte Adulte: annule une copie adverse une fois par manche.
- Score: +1 message valide, +2 partage reussi, -1 copie adverse, +1 bonus adulte.

## Personnaliser les visuels de cartes
- Sprite actuel: `client/public/images/games/message-voyage-sprite.svg`
- Dos de carte: `client/public/images/games/card-back-network.svg`
- Ordre des cartes attendu dans le sprite (6 colonnes):
  1. Transmettre
  2. Copier
  3. Partager
  4. Blocage
  5. Firewall
  6. Carte Adulte

Si tu remplaces le sprite, conserve ce meme ordre ou adapte `spriteIndex` dans `client/src/features/games/message-voyage/cards.js`.

## Fichiers cles
- Logique jeu: `client/src/features/games/message-voyage/useMessageVoyageGame.js`
- Donnees cartes: `client/src/features/games/message-voyage/cards.js`
- UI jeu: `client/src/features/games/message-voyage/MessageVoyageGameV2.jsx`
- Animations/styles: `client/src/features/games/message-voyage/MessageVoyageGameV2.module.css`
