import { useMemo, useReducer } from "react";
import { PHASES, MESSAGE_TYPES, TRAVEL_STEPS, DEBRIEF_QUESTIONS } from "./roles";

function buildInitialState() {
  return {
    phase: PHASES.WELCOME,
    mode: null, // "solo" | "team"

    // Team player names
    playerNames: {
      expediteur: "",
      server1: "Serveur 1",
      server2: "Serveur 2",
      plateforme: "La Plateforme",
      contact: "",
      inconnu: "L'Inconnu",
    },

    // Compose
    selectedMessageId: null,

    // Travel
    travelStep: 0,
    copies: {
      server1: false,
      server2: false,
      plateforme: false,
      contact: false,
      inconnu: false,
    },

    // Contact decision
    contactDecision: null, // "keep" | "forward"

    // Delete
    deletionAttempted: false,
    expediteurDeleted: false,

    // Debrief
    debriefStep: 0,
    debriefAnswers: {}, // questionId -> option value

    // Team mode: which role is currently acting
    teamHandoffPending: false,
    teamHandoffRole: null,
  };
}

function applyTravelCopy(copies, stepIndex) {
  const step = TRAVEL_STEPS[stepIndex];
  if (!step?.copyHolder) return copies;
  return { ...copies, [step.copyHolder]: true };
}

function reducer(state, action) {
  switch (action.type) {

    case "SELECT_MODE":
      return {
        ...state,
        mode: action.mode,
        phase: action.mode === "team" ? PHASES.SETUP : PHASES.COMPOSE,
      };

    case "SET_PLAYER_NAME":
      return {
        ...state,
        playerNames: { ...state.playerNames, [action.role]: action.name },
      };

    case "CONFIRM_SETUP":
      return { ...state, phase: PHASES.COMPOSE };

    case "SELECT_MESSAGE":
      return { ...state, selectedMessageId: action.id };

    case "START_TRAVEL":
      return {
        ...state,
        phase: PHASES.TRAVELING,
        travelStep: 0,
        copies: applyTravelCopy(state.copies, 0),
      };

    case "NEXT_STEP": {
      const nextStep = state.travelStep + 1;
      if (nextStep >= TRAVEL_STEPS.length) {
        // All steps done → go to contact decision
        return { ...state, phase: PHASES.CONTACT_DECISION };
      }
      return {
        ...state,
        travelStep: nextStep,
        copies: applyTravelCopy(state.copies, nextStep),
      };
    }

    case "CONTACT_DECISION": {
      const forwarded = action.decision === "forward";
      return {
        ...state,
        contactDecision: action.decision,
        copies: { ...state.copies, inconnu: forwarded },
        phase: PHASES.DELETE_ATTEMPT,
      };
    }

    case "ATTEMPT_DELETE":
      return {
        ...state,
        deletionAttempted: true,
        expediteurDeleted: true,
        phase: PHASES.REVEAL,
      };

    case "SKIP_DELETE":
      return { ...state, phase: PHASES.REVEAL };

    case "GO_TO_DEBRIEF":
      return { ...state, phase: PHASES.DEBRIEF, debriefStep: 0 };

    case "ANSWER_DEBRIEF":
      return {
        ...state,
        debriefAnswers: {
          ...state.debriefAnswers,
          [DEBRIEF_QUESTIONS[state.debriefStep].id]: action.value,
        },
      };

    case "NEXT_DEBRIEF":
      if (state.debriefStep >= DEBRIEF_QUESTIONS.length - 1) {
        return { ...state, phase: PHASES.FINISHED };
      }
      return { ...state, debriefStep: state.debriefStep + 1 };

    case "RESET":
      return buildInitialState();

    default:
      return state;
  }
}

export function useMessageVoyageGame() {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  const selectedMessage = useMemo(
    () => MESSAGE_TYPES.find((m) => m.id === state.selectedMessageId) ?? null,
    [state.selectedMessageId]
  );

  const copyCount = useMemo(
    () => Object.values(state.copies).filter(Boolean).length,
    [state.copies]
  );

  const totalHolders = useMemo(() => {
    const holders = [];
    if (!state.expediteurDeleted) holders.push({ key: "expediteur", label: "Toi (original)", emoji: "📱", color: "#4caf50" });
    else holders.push({ key: "expediteur", label: "Toi (supprimé)", emoji: "📱🗑️", color: "#9e9e9e", deleted: true });
    if (state.copies.server1) holders.push({ key: "server1", label: state.playerNames.server1, emoji: "🖥️", color: "#1976d2" });
    if (state.copies.server2) holders.push({ key: "server2", label: state.playerNames.server2, emoji: "🖥️", color: "#1976d2" });
    if (state.copies.plateforme) holders.push({ key: "plateforme", label: state.playerNames.plateforme, emoji: "🏢", color: "#7b1fa2" });
    if (state.copies.contact) holders.push({ key: "contact", label: state.playerNames.contact || "Contact de confiance", emoji: "👤", color: "#ef6c00" });
    if (state.copies.inconnu) holders.push({ key: "inconnu", label: state.playerNames.inconnu, emoji: "❓", color: "#c62828" });
    return holders;
  }, [state.copies, state.expediteurDeleted, state.playerNames]);

  const currentTravelStep = TRAVEL_STEPS[state.travelStep] || null;
  const currentDebriefQuestion = DEBRIEF_QUESTIONS[state.debriefStep] || null;
  const currentDebriefAnswer = state.debriefAnswers[currentDebriefQuestion?.id];

  return {
    state,
    dispatch,
    selectedMessage,
    copyCount,
    totalHolders,
    currentTravelStep,
    currentDebriefQuestion,
    currentDebriefAnswer,
    travelSteps: TRAVEL_STEPS,
    debriefQuestions: DEBRIEF_QUESTIONS,
  };
}
