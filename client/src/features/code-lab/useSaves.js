/* ─────────────────────────────────────────────────────────────────────────────
   useSaves.js
   Gestion des sauvegardes CodeLab dans le localStorage.
   3 slots de sauvegarde par projet, identifiés par projectId + index (0‑2).

   Shape d'une sauvegarde :
   {
     projectId : string,
     slot      : 0 | 1 | 2,
     label     : string,        // renommable par l'enfant
     stepIndex : number,
     view      : "guide"|"free",
     html      : string,
     css       : string,
     js        : string,
     activeTab : "html"|"css"|"js",
     bestScore : number | null,  // null pour les projets sans score
     timestamp : number,         // Date.now()
   }
───────────────────────────────────────────────────────────────────────────── */

const PREFIX   = "codelab_save";
const MAX_SLOTS = 3;

function key(projectId, slot) {
  return `${PREFIX}_${projectId}_${slot}`;
}

/** Renvoie un tableau de 3 éléments : save object ou null si slot vide. */
export function getSaves(projectId) {
  return Array.from({ length: MAX_SLOTS }, (_, i) => {
    try {
      const raw = localStorage.getItem(key(projectId, i));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
}

/** Écrit une sauvegarde dans un slot. */
export function writeSave(projectId, slotIndex, data) {
  const saves = getSaves(projectId);
  const existing = saves[slotIndex];
  const save = {
    projectId,
    slot      : slotIndex,
    label     : existing?.label ?? `Sauvegarde ${slotIndex + 1}`,
    stepIndex : data.stepIndex ?? 0,
    view      : data.view ?? "guide",
    html      : data.html ?? "",
    css       : data.css ?? "",
    js        : data.js ?? "",
    activeTab : data.activeTab ?? "html",
    bestScore : data.bestScore ?? null,
    timestamp : Date.now(),
  };
  try {
    localStorage.setItem(key(projectId, slotIndex), JSON.stringify(save));
  } catch (e) {
    console.warn("CodeLab: impossible de sauvegarder", e);
  }
}

/** Supprime un slot de sauvegarde. */
export function deleteSave(projectId, slotIndex) {
  localStorage.removeItem(key(projectId, slotIndex));
}

/** Renomme un slot sans modifier le reste. */
export function renameSave(projectId, slotIndex, newLabel) {
  try {
    const raw = localStorage.getItem(key(projectId, slotIndex));
    if (!raw) return;
    const save = JSON.parse(raw);
    save.label = newLabel.trim() || `Sauvegarde ${slotIndex + 1}`;
    localStorage.setItem(key(projectId, slotIndex), JSON.stringify(save));
  } catch {
    /* ignore */
  }
}

/** Retourne true si au moins un slot est rempli pour ce projet. */
export function hasAnySave(projectId) {
  return Array.from({ length: MAX_SLOTS }, (_, i) =>
    localStorage.getItem(key(projectId, i))
  ).some(Boolean);
}

/** Formate un timestamp en "28 fév · 14h32" */
export function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString("fr-FR", {
      day    : "numeric",
      month  : "short",
      hour   : "2-digit",
      minute : "2-digit",
    }).replace(",", " ·");
  } catch {
    return "";
  }
}
