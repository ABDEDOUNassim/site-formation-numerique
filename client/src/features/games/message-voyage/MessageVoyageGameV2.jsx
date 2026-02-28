import { useEffect, useState } from "react";
import { useMessageVoyageGame } from "./useMessageVoyageGame";
import { PHASES, MESSAGE_TYPES, TRAVEL_STEPS, DEBRIEF_QUESTIONS } from "./roles";
import styles from "./MessageVoyageGameV2.module.css";

// ─── Écran d'accueil ───────────────────────────────────────────────────────────
function WelcomeScreen({ dispatch }) {
  return (
    <div className={styles.screen}>
      <div className={styles.welcomeHero}>
        <div className={styles.welcomeEmoji}>📱</div>
        <h2 className={styles.welcomeTitle}>Le Message Qui Voyage</h2>
        <p className={styles.welcomeSubtitle}>
          Tu envoies une photo à un ami. Simple, non ?<br />
          Découvre combien de copies existent à la fin.
        </p>
      </div>
      <div className={styles.modeGrid}>
        <button
          type="button"
          className={`${styles.modeCard} ${styles.modeCardSolo}`}
          onClick={() => dispatch({ type: "SELECT_MODE", mode: "solo" })}
        >
          <span className={styles.modeEmoji}>🧑</span>
          <strong>Solo</strong>
          <p>Tu joues l'Expéditeur. Le reste est simulé.</p>
        </button>
        <button
          type="button"
          className={`${styles.modeCard} ${styles.modeCardTeam}`}
          onClick={() => dispatch({ type: "SELECT_MODE", mode: "team" })}
        >
          <span className={styles.modeEmoji}>👥</span>
          <strong>En équipe</strong>
          <p>Chacun joue un rôle. On passe l'écran à tour de rôle.</p>
        </button>
      </div>
      <div className={styles.roleList}>
        <p className={styles.roleListTitle}>Les rôles du jeu :</p>
        <div className={styles.roleChips}>
          {[
            { emoji: "📱", name: "L'Expéditeur", desc: "envoie le message" },
            { emoji: "🖥️", name: "Le Serveur ×2", desc: "copie et transmet" },
            { emoji: "🏢", name: "La Plateforme", desc: "archive tout" },
            { emoji: "👤", name: "Contact de confiance", desc: "peut transférer" },
            { emoji: "❓", name: "L'Inconnu", desc: "ne devrait pas voir" },
          ].map((r) => (
            <div key={r.name} className={styles.roleChip}>
              <span>{r.emoji}</span>
              <div>
                <strong>{r.name}</strong>
                <span> — {r.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Setup équipe ──────────────────────────────────────────────────────────────
function SetupScreen({ state, dispatch }) {
  const fields = [
    { role: "expediteur", label: "L'Expéditeur 📱", placeholder: "Prénom du joueur" },
    { role: "contact", label: "Contact de confiance 👤", placeholder: "Prénom du joueur" },
    { role: "inconnu", label: "L'Inconnu ❓", placeholder: "Prénom du joueur" },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.phaseHeader}>
        <span className={styles.phaseTag}>Mode équipe</span>
        <h2>Qui joue quel rôle ?</h2>
        <p>Les serveurs et la plateforme sont automatiques.</p>
      </div>
      <div className={styles.setupFields}>
        {fields.map(({ role, label, placeholder }) => (
          <label key={role} className={styles.setupField}>
            <span>{label}</span>
            <input
              type="text"
              maxLength={20}
              placeholder={placeholder}
              value={state.playerNames[role]}
              onChange={(e) => dispatch({ type: "SET_PLAYER_NAME", role, name: e.target.value })}
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        className={styles.btnPrimary}
        onClick={() => dispatch({ type: "CONFIRM_SETUP" })}
      >
        Commencer →
      </button>
    </div>
  );
}

// ─── Composition du message ────────────────────────────────────────────────────
function ComposeScreen({ state, dispatch, selectedMessage }) {
  const senderName = state.playerNames.expediteur || "L'Expéditeur";

  return (
    <div className={styles.screen}>
      {state.mode === "team" && (
        <div className={styles.handoffBanner}>
          <span>📱</span> Passe l'écran à <strong>{senderName}</strong>
        </div>
      )}
      <div className={styles.roleCard}>
        <span className={styles.roleCardEmoji}>📱</span>
        <div>
          <strong>{senderName}</strong>
          <p>Tu es l'Expéditeur — tu choisis ce que tu envoies.</p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Que veux-tu envoyer ?</h3>
      <div className={styles.messageGrid}>
        {MESSAGE_TYPES.map((msg) => (
          <button
            key={msg.id}
            type="button"
            onClick={() => dispatch({ type: "SELECT_MESSAGE", id: msg.id })}
            className={`${styles.messageOption} ${state.selectedMessageId === msg.id ? styles.messageOptionSelected : ""}`}
          >
            <span className={styles.messageEmoji}>{msg.emoji}</span>
            <span className={styles.messageLabel}>{msg.label}</span>
            <div className={styles.sensitivityBar}>
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`${styles.sensitivityDot} ${level <= msg.sensitivity ? styles.sensitivityDotActive : ""}`}
                />
              ))}
              <span className={styles.sensitivityLabel}>
                {msg.sensitivity === 1 ? "Peu sensible" : msg.sensitivity === 2 ? "Assez sensible" : "Très sensible"}
              </span>
            </div>
            {state.selectedMessageId === msg.id && (
              <p className={styles.messageHint}>{msg.hint}</p>
            )}
          </button>
        ))}
      </div>

      {selectedMessage && (
        <div className={styles.sendBar}>
          <div className={styles.sendPreview}>
            <span>{selectedMessage.emoji}</span>
            <span>{selectedMessage.label}</span>
            <span className={styles.sendTo}>→ Contact de confiance</span>
          </div>
          <button
            type="button"
            className={styles.btnSend}
            onClick={() => dispatch({ type: "START_TRAVEL" })}
          >
            Envoyer 📤
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Voyage du message ─────────────────────────────────────────────────────────
function TravelingScreen({ state, dispatch, currentTravelStep, selectedMessage, copyCount }) {
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    setShowBadge(false);
    const t = setTimeout(() => setShowBadge(true), 300);
    return () => clearTimeout(t);
  }, [state.travelStep]);

  const isLastStep = state.travelStep >= TRAVEL_STEPS.length - 1;

  return (
    <div className={styles.screen}>
      <div className={styles.phaseHeader}>
        <span className={styles.phaseTag}>Le message voyage</span>
        <h2>{currentTravelStep?.title}</h2>
      </div>

      {/* Barre de progression */}
      <div className={styles.travelProgress}>
        {TRAVEL_STEPS.map((step, i) => (
          <div key={step.id} className={styles.travelProgressItem}>
            <div
              className={`${styles.travelNode} ${i < state.travelStep ? styles.travelNodeDone : ""} ${i === state.travelStep ? styles.travelNodeActive : ""}`}
            >
              {i < state.travelStep ? "✓" : step.emoji}
            </div>
            {i < TRAVEL_STEPS.length - 1 && (
              <div className={`${styles.travelConnector} ${i < state.travelStep ? styles.travelConnectorDone : ""}`} />
            )}
          </div>
        ))}
      </div>

      {/* Carte d'événement */}
      <div
        key={state.travelStep}
        className={styles.eventCard}
        style={{ "--event-bg": currentTravelStep?.bgColor, "--event-bg-dark": currentTravelStep?.bgColorDark }}
      >
        <div className={styles.eventCardEmoji}>{currentTravelStep?.emoji}</div>
        <p className={styles.eventCardDesc}>{currentTravelStep?.description}</p>

        {currentTravelStep?.badgeText && showBadge && (
          <div
            className={styles.copyBadge}
            style={{ "--badge-color": currentTravelStep?.badgeColor }}
          >
            {currentTravelStep.badgeText}
          </div>
        )}
      </div>

      {/* Compteur de copies */}
      <div className={styles.copyCounter}>
        <span className={styles.copyCounterNumber}>{copyCount}</span>
        <span className={styles.copyCounterLabel}>
          {copyCount <= 1 ? "copie en circulation" : "copies en circulation"}
        </span>
      </div>

      {/* Message envoyé */}
      <div className={styles.messagePill}>
        {selectedMessage?.emoji} «&nbsp;{selectedMessage?.label}&nbsp;»
      </div>

      <button
        type="button"
        className={styles.btnPrimary}
        onClick={() => dispatch({ type: "NEXT_STEP" })}
      >
        {isLastStep ? "Voir la décision du contact →" : "Continuer →"}
      </button>
    </div>
  );
}

// ─── Décision du contact ───────────────────────────────────────────────────────
function ContactDecisionScreen({ state, dispatch, selectedMessage }) {
  const contactName = state.playerNames.contact || "Contact de confiance";
  const isTeam = state.mode === "team";

  return (
    <div className={styles.screen}>
      {isTeam && (
        <div className={styles.handoffBanner}>
          <span>👤</span> Passe l'écran à <strong>{contactName}</strong>
        </div>
      )}
      <div className={styles.roleCard}>
        <span className={styles.roleCardEmoji}>👤</span>
        <div>
          <strong>{contactName}</strong>
          <p>Tu as reçu un message. Que fais-tu ?</p>
        </div>
      </div>

      <div className={styles.receivedMessage}>
        <p className={styles.receivedFrom}>
          {state.playerNames.expediteur || "L'Expéditeur"} t'a envoyé :
        </p>
        <div className={styles.receivedContent}>
          <span>{selectedMessage?.emoji}</span>
          <span>{selectedMessage?.label}</span>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Que fais-tu avec ce message ?</h3>
      <div className={styles.decisionGrid}>
        <button
          type="button"
          className={`${styles.decisionCard} ${styles.decisionKeep}`}
          onClick={() => dispatch({ type: "CONTACT_DECISION", decision: "keep" })}
        >
          <span>🔒</span>
          <strong>Je le garde pour moi</strong>
          <p>Je respecte la vie privée de la personne qui m'a fait confiance.</p>
        </button>
        <button
          type="button"
          className={`${styles.decisionCard} ${styles.decisionForward}`}
          onClick={() => dispatch({ type: "CONTACT_DECISION", decision: "forward" })}
        >
          <span>↩️</span>
          <strong>Je le transfère à quelqu'un d'autre</strong>
          <p>Je le partage — même à quelqu'un que l'expéditeur ne connaît pas.</p>
        </button>
      </div>
    </div>
  );
}

// ─── Tentative de suppression ──────────────────────────────────────────────────
function DeleteAttemptScreen({ state, dispatch, totalHolders, selectedMessage }) {
  const [deleteClicked, setDeleteClicked] = useState(false);

  function handleDelete() {
    setDeleteClicked(true);
    setTimeout(() => dispatch({ type: "ATTEMPT_DELETE" }), 1800);
  }

  const persistentHolders = totalHolders.filter((h) => h.key !== "expediteur");

  return (
    <div className={styles.screen}>
      {state.mode === "team" && (
        <div className={styles.handoffBanner}>
          <span>📱</span> Passe l'écran à <strong>{state.playerNames.expediteur || "L'Expéditeur"}</strong>
        </div>
      )}
      <div className={styles.phaseHeader}>
        <span className={styles.phaseTag}>🗑️ Suppression</span>
        <h2>Tu veux supprimer le message</h2>
        <p>Tu regrettes peut-être de l'avoir envoyé. Tu appuies sur « Supprimer ».</p>
      </div>

      <div className={styles.messagePill}>
        {selectedMessage?.emoji} «&nbsp;{selectedMessage?.label}&nbsp;»
      </div>

      {!deleteClicked ? (
        <div className={styles.deleteZone}>
          <button
            type="button"
            className={styles.btnDelete}
            onClick={handleDelete}
          >
            🗑️ Supprimer le message
          </button>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={() => dispatch({ type: "SKIP_DELETE" })}
          >
            Passer cette étape →
          </button>
        </div>
      ) : (
        <div className={styles.deleteAnimation}>
          <div className={styles.deletePhone}>
            <span>📱</span>
            <div className={styles.deleteCheckmark}>✓ Supprimé</div>
          </div>
          <div className={styles.deletePersist}>
            <p>Mais ces copies existent toujours&nbsp;:</p>
            <div className={styles.deleteHolderList}>
              {persistentHolders.map((h) => (
                <div key={h.key} className={styles.deleteHolder}>
                  {h.emoji} {h.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Révélation ────────────────────────────────────────────────────────────────
function RevealScreen({ state, dispatch, totalHolders, selectedMessage }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const activeCopies = totalHolders.filter((h) => !h.deleted).length;

  useEffect(() => {
    if (revealedCount >= totalHolders.length) return;
    const t = setTimeout(() => setRevealedCount((n) => n + 1), 520);
    return () => clearTimeout(t);
  }, [revealedCount, totalHolders.length]);

  return (
    <div className={styles.screen}>
      <div className={styles.phaseHeader}>
        <span className={styles.phaseTag}>🔍 Révélation</span>
        <h2>Qui a une copie ?</h2>
        <p>
          {selectedMessage?.emoji} «&nbsp;{selectedMessage?.label}&nbsp;»
        </p>
      </div>

      <div className={styles.revealGrid}>
        {totalHolders.map((holder, i) => (
          <div
            key={holder.key}
            className={`${styles.revealCard} ${i < revealedCount ? styles.revealCardVisible : ""} ${holder.deleted ? styles.revealCardDeleted : ""}`}
            style={{ "--holder-color": holder.color, transitionDelay: `${i * 0.08}s` }}
          >
            <span className={styles.revealEmoji}>{holder.emoji}</span>
            <strong>{holder.label}</strong>
            {holder.deleted ? (
              <span className={styles.revealTag} style={{ background: "#9e9e9e" }}>Supprimé ✗</span>
            ) : (
              <span className={styles.revealTag} style={{ background: holder.color }}>A une copie 📋</span>
            )}
          </div>
        ))}
      </div>

      {revealedCount >= totalHolders.length && (
        <div className={styles.revealSummary}>
          <div className={styles.copyCountBig}>
            <span>{activeCopies}</span>
            <p>{activeCopies <= 1 ? "copie active" : "copies actives"}</p>
          </div>
          {state.deletionAttempted && (
            <div className={styles.revealInsight}>
              🗑️ Tu as supprimé le message de ton téléphone, mais&nbsp;
              <strong>{activeCopies} copie{activeCopies > 1 ? "s" : ""} persistent</strong>.
            </div>
          )}
          {state.copies.inconnu && (
            <div className={styles.revealInsight} style={{ "--insight-color": "#c62828" }}>
              ❓ L'Inconnu a reçu quelque chose qu'il n'aurait pas dû voir.
            </div>
          )}
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => dispatch({ type: "GO_TO_DEBRIEF" })}
          >
            Débriefing →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Débriefing ────────────────────────────────────────────────────────────────
function DebriefScreen({ state, dispatch, currentDebriefQuestion, currentDebriefAnswer }) {
  const total = DEBRIEF_QUESTIONS.length;
  const current = state.debriefStep + 1;
  const answered = !!currentDebriefAnswer;

  return (
    <div className={styles.screen}>
      <div className={styles.phaseHeader}>
        <span className={styles.phaseTag}>💬 Débriefing {current}/{total}</span>
        <h2>{currentDebriefQuestion?.icon} {currentDebriefQuestion?.question}</h2>
      </div>

      <div className={styles.debriefOptions}>
        {currentDebriefQuestion?.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => dispatch({ type: "ANSWER_DEBRIEF", value: opt.value })}
            className={`${styles.debriefOption} ${currentDebriefAnswer === opt.value ? styles.debriefOptionSelected : ""}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {answered && (
        <div className={styles.debriefLesson}>
          <span className={styles.debriefLessonEmoji}>{currentDebriefQuestion?.lessonEmoji}</span>
          <p>{currentDebriefQuestion?.lesson}</p>
        </div>
      )}

      {answered && (
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => dispatch({ type: "NEXT_DEBRIEF" })}
        >
          {current < total ? "Question suivante →" : "Terminer →"}
        </button>
      )}
    </div>
  );
}

// ─── Écran de fin ──────────────────────────────────────────────────────────────
function FinishedScreen({ state, dispatch, totalHolders }) {
  const activeCopies = totalHolders.filter((h) => !h.deleted).length;

  return (
    <div className={styles.screen}>
      <div className={styles.finishedHero}>
        <div className={styles.finishedEmoji}>🎓</div>
        <h2>Mission accomplie !</h2>
        <p>Vous avez découvert comment voyage un message numérique.</p>
      </div>

      <div className={styles.finalStats}>
        <div className={styles.finalStat}>
          <span>{activeCopies}</span>
          <p>copies actives</p>
        </div>
        <div className={styles.finalStat}>
          <span>{state.copies.inconnu ? "⚠️" : "✅"}</span>
          <p>{state.copies.inconnu ? "Un inconnu a vu le message" : "Pas d'accès non autorisé"}</p>
        </div>
        <div className={styles.finalStat}>
          <span>{state.deletionAttempted ? "🗑️" : "💾"}</span>
          <p>{state.deletionAttempted ? "Suppression tentée" : "Message conservé"}</p>
        </div>
      </div>

      <div className={styles.finalLesson}>
        <h3>Ce qu'il faut retenir</h3>
        <ul>
          <li>Un message numérique crée des copies à chaque étape du réseau.</li>
          <li>Supprimer un message ne supprime pas les copies sur les serveurs.</li>
          <li>Un contact de confiance peut, volontairement ou non, transférer un message.</li>
          <li>Plus un message est sensible, plus il faut réfléchir avant d'envoyer.</li>
        </ul>
      </div>

      <button
        type="button"
        className={styles.btnPrimary}
        onClick={() => dispatch({ type: "RESET" })}
      >
        Rejouer 🔁
      </button>
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────────
export function MessageVoyageGameV2({ onSaveProgress }) {
  const {
    state,
    dispatch,
    selectedMessage,
    copyCount,
    totalHolders,
    currentTravelStep,
    currentDebriefQuestion,
    currentDebriefAnswer,
  } = useMessageVoyageGame();

  useEffect(() => {
    if (state.phase !== PHASES.FINISHED || !onSaveProgress) return;
    const activeCopies = totalHolders.filter((h) => !h.deleted).length;
    // Score : moins de copies = meilleur résultat pédagogique
    const score = Math.max(0, 100 - (activeCopies - 1) * 15);
    onSaveProgress(score);
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  function renderPhase() {
    switch (state.phase) {
      case PHASES.WELCOME:
        return <WelcomeScreen dispatch={dispatch} />;
      case PHASES.SETUP:
        return <SetupScreen state={state} dispatch={dispatch} />;
      case PHASES.COMPOSE:
        return <ComposeScreen state={state} dispatch={dispatch} selectedMessage={selectedMessage} />;
      case PHASES.TRAVELING:
        return (
          <TravelingScreen
            state={state}
            dispatch={dispatch}
            currentTravelStep={currentTravelStep}
            selectedMessage={selectedMessage}
            copyCount={copyCount}
          />
        );
      case PHASES.CONTACT_DECISION:
        return (
          <ContactDecisionScreen
            state={state}
            dispatch={dispatch}
            selectedMessage={selectedMessage}
          />
        );
      case PHASES.DELETE_ATTEMPT:
        return (
          <DeleteAttemptScreen
            state={state}
            dispatch={dispatch}
            totalHolders={totalHolders}
            selectedMessage={selectedMessage}
          />
        );
      case PHASES.REVEAL:
        return (
          <RevealScreen
            state={state}
            dispatch={dispatch}
            totalHolders={totalHolders}
            selectedMessage={selectedMessage}
          />
        );
      case PHASES.DEBRIEF:
        return (
          <DebriefScreen
            state={state}
            dispatch={dispatch}
            currentDebriefQuestion={currentDebriefQuestion}
            currentDebriefAnswer={currentDebriefAnswer}
          />
        );
      case PHASES.FINISHED:
        return (
          <FinishedScreen
            state={state}
            dispatch={dispatch}
            totalHolders={totalHolders}
          />
        );
      default:
        return null;
    }
  }

  // Indicateur de progression global
  const phaseOrder = [
    PHASES.WELCOME, PHASES.SETUP, PHASES.COMPOSE, PHASES.TRAVELING,
    PHASES.CONTACT_DECISION, PHASES.DELETE_ATTEMPT, PHASES.REVEAL,
    PHASES.DEBRIEF, PHASES.FINISHED,
  ];
  const phaseIndex = phaseOrder.indexOf(state.phase);
  const progressPct = state.phase === PHASES.WELCOME
    ? 0
    : Math.round(((phaseIndex) / (phaseOrder.length - 1)) * 100);

  return (
    <article className={`card ${styles.game}`}>
      {state.phase !== PHASES.WELCOME && state.phase !== PHASES.FINISHED && (
        <div className={styles.globalProgress}>
          <div className={styles.globalProgressBar} style={{ width: `${progressPct}%` }} />
        </div>
      )}
      {renderPhase()}
    </article>
  );
}
