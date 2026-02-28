export const CARD_TYPES = {
  TRANSMETTRE: "transmettre",
  COPIER: "copier",
  PARTAGER: "partager",
  BLOCAGE: "blocage",
  FIREWALL: "firewall",
  ADULTE: "adulte"
};

export const CARD_DEFS = [
  {
    id: CARD_TYPES.TRANSMETTRE,
    name: "Transmettre",
    learn: "Transmettre = envoyer un message au serveur avant toute diffusion.",
    icon: "📨",
    spriteX: 308,
    spriteY: 30
  },
  {
    id: CARD_TYPES.COPIER,
    name: "Copier",
    learn: "Copier = capture d'ecran ou re-upload d'une image.",
    icon: "📸",
    spriteX: 58,
    spriteY: 280
  },
  {
    id: CARD_TYPES.PARTAGER,
    name: "Partager",
    learn: "Partager = diffusion a d'autres clients.",
    icon: "🔁",
    spriteX: 308,
    spriteY: 280
  },
  {
    id: CARD_TYPES.BLOCAGE,
    name: "Blocage",
    learn: "Blocage = couper le contact avec un compte risque.",
    icon: "⛔",
    spriteX: 307,
    spriteY: 536
  },
  {
    id: CARD_TYPES.FIREWALL,
    name: "Firewall",
    learn: "Firewall = renforcer la protection de circulation des donnees.",
    icon: "🛡️",
    spriteX: 58,
    spriteY: 536
  },
  {
    id: CARD_TYPES.ADULTE,
    name: "Carte Adulte",
    learn: "Adulte conseiller = valider une action de protection pertinente.",
    icon: "🧑‍🏫",
    spriteX: 58,
    spriteY: 30
  }
];

export function drawRandomCard() {
  const index = Math.floor(Math.random() * CARD_DEFS.length);
  return { ...CARD_DEFS[index], instanceId: `${Date.now()}-${Math.random()}` };
}

export function drawHand(size = 5) {
  return Array.from({ length: size }, () => drawRandomCard());
}
