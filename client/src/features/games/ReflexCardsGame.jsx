import { useEffect, useState } from "react";
import { contentApi } from "../../services/contentApi";
import { childApi } from "../../services/childApi";
import {
  BADGES,
  getBadgeForScore,
  getLocalQuestions,
  getThemeVisual,
} from "./reflexQuestionsData";
import styles from "./ReflexCardsGame.module.css";

const CARD_SLOTS = ["A", "B", "C"];
const XP_CORRECT = 20;
const XP_WRONG = 5;
const XP_STREAK_BONUS = 10; // bonus après 2 bonnes réponses consécutives
const QUIZ_SIZE = 8;
const QUIZ_HISTORY_LIMIT = 48;
const QUIZ_HISTORY_PREFIX = "reflex_quiz_history_";

function isValidQuestion(item) {
  return Boolean(
    item &&
    item.id &&
    item.situationText &&
    item.optionA &&
    item.optionB &&
    item.optionC &&
    ["A", "B", "C"].includes(item.correctOption) &&
    typeof item.explanation === "string"
  );
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function dedupeQuestions(items) {
  const seenIds = new Set();
  const seenFingerprints = new Set();
  const unique = [];

  for (const item of items) {
    const fingerprint = [
      normalizeText(item.situationText),
      normalizeText(item.optionA),
      normalizeText(item.optionB),
      normalizeText(item.optionC),
      item.correctOption
    ].join("|");

    if (seenIds.has(item.id) || seenFingerprints.has(fingerprint)) continue;
    seenIds.add(item.id);
    seenFingerprints.add(fingerprint);
    unique.push(item);
  }

  return unique;
}

function buildQuizQuestions(primaryPool, fallbackPool, count = QUIZ_SIZE, excludedIds = new Set()) {
  const uniquePrimary = dedupeQuestions(primaryPool.filter(isValidQuestion));
  const uniqueFallback = dedupeQuestions(fallbackPool.filter(isValidQuestion));

  // Passe 1: éviter les questions déjà jouées récemment.
  const freshPrimary = uniquePrimary.filter((q) => !excludedIds.has(q.id));
  const chosen = shuffleArray(freshPrimary).slice(0, count);

  if (chosen.length >= count) return chosen;

  const chosenIds = new Set(chosen.map((q) => q.id));
  const chosenTexts = new Set(chosen.map((q) => normalizeText(q.situationText)));

  const freshFallback = uniqueFallback.filter((q) => !excludedIds.has(q.id));
  const extra = freshFallback.filter(
    (q) => !chosenIds.has(q.id) && !chosenTexts.has(normalizeText(q.situationText))
  );

  const withFresh = [...chosen, ...shuffleArray(extra).slice(0, count - chosen.length)];
  if (withFresh.length >= count) return withFresh;

  // Passe 2: si on manque de volume, on autorise les anciennes questions
  // mais toujours sans doublon dans la partie courante.
  const rescuePool = dedupeQuestions([...uniquePrimary, ...uniqueFallback]).filter(
    (q) => !withFresh.some((picked) => picked.id === q.id)
  );

  return [...withFresh, ...shuffleArray(rescuePool).slice(0, count - withFresh.length)];
}

function readQuizHistory(ageBandId) {
  try {
    const raw = localStorage.getItem(`${QUIZ_HISTORY_PREFIX}${ageBandId}`);
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => typeof id === "string");
  } catch {
    return [];
  }
}

function writeQuizHistory(ageBandId, questionIds) {
  try {
    const current = readQuizHistory(ageBandId);
    const merged = [...current, ...questionIds];
    const unique = [...new Set(merged)];
    const capped = unique.slice(Math.max(0, unique.length - QUIZ_HISTORY_LIMIT));
    localStorage.setItem(`${QUIZ_HISTORY_PREFIX}${ageBandId}`, JSON.stringify(capped));
  } catch {
    // no-op en cas de stockage indisponible
  }
}

// ─── SOUS-COMPOSANTS ──────────────────────────────────────────────────────────

/** Barre de HUD : progression, XP, streak */
function HUD({ index, total, xp, streak }) {
  const pct = Math.round(((index) / total) * 100);
  return (
    <div className={styles.hud}>
      <div className={styles.hudLeft}>
        <span className={styles.hudQuestion}>
          Question <strong>{index + 1}</strong>/{total}
        </span>
        <div className={styles.hudBar}>
          <div className={styles.hudBarFill} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className={styles.hudRight}>
        <div className={styles.hudXp}>⚡ {xp} XP</div>
        {streak >= 2 && (
          <div className={styles.hudStreak}>🔥 ×{streak}</div>
        )}
      </div>
    </div>
  );
}

/** Carte flip 3D */
function FlipCard({ slot, option, flipped, chosen, isCorrect, correctSlot, onFlip, onChoose, disabled }) {
  const visual = getThemeVisual(option?.theme);
  const showResult = chosen !== null;
  const isChosen = chosen === slot;
  const isRight = slot === correctSlot;

  let frontClass = styles.front;
  if (showResult) {
    if (isChosen && isCorrect) frontClass += ` ${styles.frontCorrect}`;
    else if (isChosen && !isCorrect) frontClass += ` ${styles.frontWrong}`;
    else if (isRight) frontClass += ` ${styles.frontRevealCorrect}`;
  }

  return (
    <div className={styles.cardScene}>
      <div className={`${styles.card3d} ${flipped ? styles.flipped : ""}`}>
        {/* DOS */}
        <button
          type="button"
          className={styles.back}
          style={{ background: `linear-gradient(140deg, ${visual.soft}, #ffffff)`, borderColor: visual.accent }}
          onClick={() => onFlip(slot)}
          disabled={flipped}
          aria-label={`Retourner la carte ${slot}`}
        >
          <span className={styles.backThemeEmoji}>{visual.emoji}</span>
          <span className={styles.backChip} style={{ background: visual.accent }}>
            {visual.label}
          </span>
          <span className={styles.backTitle}>Carte Mystère</span>
          <span className={styles.backHint}>👆 Clique pour retourner</span>
        </button>

        {/* FACE */}
        <div className={`${styles.face} ${frontClass}`}>
          <span className={styles.frontSlot}>Réponse {slot}</span>
          <p className={styles.frontText}>{option?.text ?? "—"}</p>
          {showResult ? (
            <div className={styles.frontResult}>
              {isChosen && isCorrect && <span className={styles.resultCorrect}>✅ Bonne réponse !</span>}
              {isChosen && !isCorrect && <span className={styles.resultWrong}>❌ Pas tout à fait...</span>}
              {!isChosen && isRight && <span className={styles.resultHint}>👆 C'était ça</span>}
            </div>
          ) : (
            <button
              type="button"
              className={styles.chooseBtn}
              style={{ background: visual.accent }}
              onClick={() => onChoose(slot)}
              disabled={disabled}
            >
              Choisir cette carte
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ÉCRAN INTRO ──────────────────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <div className={styles.introScreen}>
      <div className={styles.introHero}>
        <div className={styles.introRobot}>🤖</div>
        <h2 className={styles.introTitle}>Cartes Réflexes</h2>
        <p className={styles.introSubtitle}>
          Retourne les cartes mystères, choisis la meilleure réaction<br />
          et deviens <strong>Champion de l'Autonomie Numérique !</strong>
        </p>
      </div>

      {/* Chemin des badges */}
      <div className={styles.badgePath}>
        {BADGES.map((b, i) => (
          <div key={b.id} className={styles.badgePathItem}>
            <div className={styles.badgePathNode} style={{ background: b.bg, borderColor: b.color }}>
              <span>{b.emoji}</span>
            </div>
            <span className={styles.badgePathLabel}>{b.label}</span>
            {i < BADGES.length - 1 && <div className={styles.badgePathArrow}>▶</div>}
          </div>
        ))}
      </div>

      <div className={styles.introRules}>
        <div className={styles.introRule}><span>🃏</span><span>Retourne les cartes pour découvrir les réponses</span></div>
        <div className={styles.introRule}><span>🎯</span><span>Choisis la meilleure réaction dans chaque situation</span></div>
        <div className={styles.introRule}><span>⚡</span><span>Gagne des XP et débloque des badges</span></div>
        <div className={styles.introRule}><span>🔥</span><span>Enchaîne les bonnes réponses pour des bonus !</span></div>
      </div>

      <button type="button" className={styles.btnStart} onClick={onStart}>
        Commencer l'aventure 🚀
      </button>
    </div>
  );
}

// ─── ÉCRAN DE JEU ─────────────────────────────────────────────────────────────

function PlayingScreen({ question, index, total, xp, streak, chosen, onFlip, onChoose, onNext, flippedCards, isSubmitting }) {
  const visual = getThemeVisual(question.theme);
  const isCorrect = chosen !== null && chosen === question.correctOption;
  const canChoose = chosen === null;
  const hasFlippedOne = Object.values(flippedCards).some(Boolean);

  const optionMap = {
    A: { text: question.optionA, theme: question.theme },
    B: { text: question.optionB, theme: question.theme },
    C: { text: question.optionC, theme: question.theme },
  };

  const xpEarned = chosen !== null
    ? (isCorrect ? XP_CORRECT + (streak >= 2 ? XP_STREAK_BONUS : 0) : XP_WRONG)
    : null;

  return (
    <div className={styles.playScreen}>
      <HUD index={index} total={total} xp={xp} streak={streak} />

      {/* Situation */}
      <div className={styles.situationBox} style={{ borderColor: visual.accent }}>
        <div className={styles.situationTheme} style={{ background: visual.accent }}>
          {visual.emoji} {visual.label}
        </div>
        <p className={styles.situationText}>{question.situationText}</p>
        {!hasFlippedOne && (
          <p className={styles.situationHint}>👆 Retourne une carte pour découvrir les réponses</p>
        )}
      </div>

      {/* Cartes */}
      <div className={styles.deck}>
        {CARD_SLOTS.map((slot) => (
          <FlipCard
            key={slot}
            slot={slot}
            option={optionMap[slot]}
            flipped={flippedCards[slot]}
            chosen={chosen}
            isCorrect={isCorrect}
            correctSlot={question.correctOption}
            onFlip={onFlip}
            onChoose={onChoose}
            disabled={!canChoose || isSubmitting}
          />
        ))}
      </div>

      {/* Feedback après réponse */}
      {chosen !== null && (
        <div className={`${styles.feedback} ${isCorrect ? styles.feedbackOk : styles.feedbackKo}`}>
          <div className={styles.feedbackTop}>
            <span className={styles.feedbackEmoji}>{isCorrect ? "🎉" : "💡"}</span>
            <div>
              <strong>{isCorrect ? "Bonne décision !" : "Pas tout à fait..."}</strong>
              {xpEarned && (
                <span className={styles.feedbackXp}>
                  +{xpEarned} XP {streak >= 3 ? "🔥" : ""}
                </span>
              )}
            </div>
          </div>
          <p className={styles.feedbackExplanation}>{question.explanation}</p>
          <button
            type="button"
            className={styles.btnNext}
            onClick={onNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : index + 1 < total ? "Suivant →" : "Voir mon résultat 🏁"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ÉCRAN RÉSULTATS ──────────────────────────────────────────────────────────

function ResultsScreen({ results, questions, totalXp, onReplay }) {
  const score = results.filter((r) => r.isCorrect).length;
  const total = questions.length;
  const badge = getBadgeForScore(score, total);
  const pct = Math.round((score / total) * 100);

  return (
    <div className={styles.resultsScreen}>
      {/* Badge principal */}
      <div className={styles.badgeReveal} style={{ background: badge.bg, borderColor: badge.color }}>
        <div className={styles.badgeRevealEmoji}>{badge.emoji}</div>
        <div>
          <div className={styles.badgeRevealLabel} style={{ color: badge.color }}>{badge.label}</div>
          <div className={styles.badgeRevealDesc}>{badge.description}</div>
        </div>
      </div>

      {/* Score */}
      <div className={styles.scoreBlock}>
        <div className={styles.scoreNumbers}>
          <span className={styles.scoreMain} style={{ color: badge.color }}>{score}</span>
          <span className={styles.scoreTotal}>/ {total}</span>
        </div>
        <div className={styles.scoreBarWrap}>
          <div className={styles.scoreBarFill} style={{ width: `${pct}%`, background: badge.color }} />
        </div>
        <div className={styles.scoreXp}>⚡ {totalXp} XP gagnés</div>
      </div>

      {/* Paliers débloqués */}
      <div className={styles.badgeLadder}>
        {BADGES.map((b) => {
          const unlocked = pct >= b.minPct;
          return (
            <div
              key={b.id}
              className={`${styles.ladderItem} ${unlocked ? styles.ladderItemUnlocked : ""}`}
              style={unlocked ? { borderColor: b.color, background: b.bg } : {}}
            >
              <span className={styles.ladderEmoji}>{b.emoji}</span>
              <span className={styles.ladderLabel}>{b.label}</span>
              <span className={styles.ladderCheck}>{unlocked ? "✓" : "🔒"}</span>
            </div>
          );
        })}
      </div>

      {/* Détail par question */}
      <div className={styles.detailList}>
        <h3 className={styles.detailTitle}>Détail de tes réponses</h3>
        {results.map((r, i) => {
          const q = questions.find((q) => q.id === r.questionId);
          const visual = getThemeVisual(q?.theme);
          return (
            <div key={r.questionId} className={`${styles.detailItem} ${r.isCorrect ? styles.detailOk : styles.detailKo}`}>
              <div className={styles.detailHeader}>
                <span className={styles.detailNum}>{i + 1}</span>
                <span className={styles.detailTheme} style={{ background: visual.soft, color: visual.accent }}>
                  {visual.emoji} {visual.label}
                </span>
                <span className={styles.detailResult}>{r.isCorrect ? "✅" : "❌"}</span>
                <span className={styles.detailXp}>+{r.xpEarned} XP</span>
              </div>
              <p className={styles.detailExplanation}>{r.explanation}</p>
            </div>
          );
        })}
      </div>

      <button type="button" className={styles.btnStart} onClick={onReplay}>
        🔁 Rejouer
      </button>
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

export function ReflexCardsGame({ ageBandId, token }) {
  const [phase, setPhase] = useState("intro");   // "intro" | "playing" | "results"
  const [questions, setQuestions] = useState([]);
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Jeu en cours
  const [index, setIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({ A: false, B: false, C: false });
  const [chosen, setChosen] = useState(null);           // option choisie sur question courante
  const [results, setResults] = useState([]);            // tableau de toutes les réponses
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chargement des questions quand ageBandId change
  useEffect(() => {
    if (!ageBandId) return;
    setLoading(true);
    const localPool = getLocalQuestions(ageBandId, 20);
    const recentIds = new Set(readQuizHistory(ageBandId));

    contentApi
      .cards(ageBandId, 30)
      .then((res) => {
        const apiQuestions = Array.isArray(res.data) ? res.data : [];
        const quizQuestions = buildQuizQuestions(apiQuestions, localPool, QUIZ_SIZE, recentIds);

        if (quizQuestions.length >= QUIZ_SIZE) {
          setQuestions(quizQuestions);
          setIsLocalMode(false);
          writeQuizHistory(ageBandId, quizQuestions.map((q) => q.id));
        } else {
          const fallbackQuiz = buildQuizQuestions(localPool, [], QUIZ_SIZE, recentIds);
          setQuestions(fallbackQuiz);
          setIsLocalMode(true);
          writeQuizHistory(ageBandId, fallbackQuiz.map((q) => q.id));
        }
      })
      .catch(() => {
        const fallbackQuiz = buildQuizQuestions(localPool, [], QUIZ_SIZE, recentIds);
        setQuestions(fallbackQuiz);
        setIsLocalMode(true);
        writeQuizHistory(ageBandId, fallbackQuiz.map((q) => q.id));
      })
      .finally(() => setLoading(false));
  }, [ageBandId]);

  function startGame() {
    setPhase("playing");
    setIndex(0);
    setFlippedCards({ A: false, B: false, C: false });
    setChosen(null);
    setResults([]);
    setXp(0);
    setStreak(0);
  }

  function handleFlip(slot) {
    setFlippedCards((prev) => ({ ...prev, [slot]: true }));
  }

  function handleChoose(slot) {
    if (chosen !== null || isSubmitting) return;
    const current = questions[index];
    const isCorrect = slot === current.correctOption;
    const newStreak = isCorrect ? streak + 1 : 0;
    const streakBonus = isCorrect && streak >= 2 ? XP_STREAK_BONUS : 0;
    const xpEarned = isCorrect ? XP_CORRECT + streakBonus : XP_WRONG;

    setChosen(slot);
    setStreak(newStreak);
    setXp((prev) => prev + xpEarned);
    setResults((prev) => [
      ...prev,
      {
        questionId: current.id,
        selectedOption: slot,
        isCorrect,
        xpEarned,
        explanation: current.explanation,
      },
    ]);
    // Retourner les cartes non encore retournées pour montrer toutes les options
    setFlippedCards({ A: true, B: true, C: true });
  }

  async function handleNext() {
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      setFlippedCards({ A: false, B: false, C: false });
      setChosen(null);
      return;
    }

    // Dernière question : soumettre à l'API si disponible
    if (!isLocalMode && token) {
      setIsSubmitting(true);
      try {
        await childApi.submitReflex(
          token,
          results.map((r) => ({ questionId: r.questionId, selectedOption: r.selectedOption }))
        );
      } catch {
        // Résultat local toujours disponible
      } finally {
        setIsSubmitting(false);
      }
    }
    setPhase("results");
  }

  function handleReplay() {
    startGame();
  }

  // ── Rendu ──
  if (loading) {
    return (
      <section className={`card ${styles.game}`}>
        <div className={styles.loading}>
          <span className={styles.loadingEmoji}>🃏</span>
          <p>Chargement des cartes…</p>
        </div>
      </section>
    );
  }

  if (phase === "intro") {
    return (
      <section className={`card ${styles.game}`}>
        <IntroScreen onStart={startGame} />
      </section>
    );
  }

  const current = questions[index];

  if (phase === "playing" && current) {
    return (
      <section className={`card ${styles.game}`}>
        <PlayingScreen
          question={current}
          index={index}
          total={questions.length}
          xp={xp}
          streak={streak}
          chosen={chosen}
          flippedCards={flippedCards}
          onFlip={handleFlip}
          onChoose={handleChoose}
          onNext={handleNext}
          isSubmitting={isSubmitting}
        />
      </section>
    );
  }

  if (phase === "results") {
    return (
      <section className={`card ${styles.game}`}>
        <ResultsScreen
          results={results}
          questions={questions}
          totalXp={xp}
          onReplay={handleReplay}
        />
      </section>
    );
  }

  return null;
}
