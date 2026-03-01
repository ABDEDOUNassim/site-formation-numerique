import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { contentApi } from "../services/contentApi";
import styles from "./TutorialDetailPage.module.css";

const PROGRESS_KEY = "tutorial_progress_v1";

function readProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); }
  catch { return {}; }
}
function writeProgress(val) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(val)); } catch { /* noop */ }
}

function parseGame(content) {
  try {
    const parsed = JSON.parse(content);
    if (parsed?.type === "quiz" && Array.isArray(parsed.questions)) return parsed;
  } catch { /* noop */ }
  return null;
}

/* ── Quiz game component ── */
function QuizGame({ game, tutorialId, onComplete }) {
  const [step, setStep] = useState("intro"); // intro | question | result
  const [qIndex, setQIndex] = useState(0);
  const [chosen, setChosen] = useState(null); // index of chosen option
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // {correct: bool}[]

  const questions = game.questions;
  const q = questions[qIndex];

  function handleChoose(optIndex) {
    if (chosen !== null) return;
    const correct = optIndex === q.correct;
    setChosen(optIndex);
    setScore((s) => s + (correct ? 1 : 0));
    setAnswers((a) => [...a, { correct }]);
  }

  function handleNext() {
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setChosen(null);
    } else {
      setStep("result");
      onComplete(score + (chosen === q.correct ? 1 : 0), questions.length);
    }
  }

  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (step === "intro") {
    return (
      <div className={styles.gameCard}>
        <div className={styles.gameIntroEmoji}>{game.emoji || "🎮"}</div>
        <h2 className={styles.gameTitle}>{game.intro}</h2>
        <p className={styles.gameSubtitle}>{questions.length} questions · environ 2 min</p>
        <button className={styles.btnPrimary} onClick={() => setStep("question")}>
          C'est parti !
        </button>
      </div>
    );
  }

  if (step === "result") {
    const finalScore = answers.filter((a) => a.correct).length;
    const pct = Math.round((finalScore / questions.length) * 100);
    let medal, msg;
    if (pct === 100) { medal = "🏆"; msg = "Parfait ! Tu maîtrises ce sujet."; }
    else if (pct >= 60) { medal = "🌟"; msg = "Bien joué ! Encore un peu d'entraînement."; }
    else { medal = "💪"; msg = "Continue, tu vas y arriver !"; }

    return (
      <div className={styles.gameCard}>
        <div className={styles.gameIntroEmoji}>{medal}</div>
        <h2 className={styles.gameTitle}>{msg}</h2>
        <div className={styles.scoreBar}>
          <div className={styles.scoreBarFill} style={{ width: `${pct}%` }} />
        </div>
        <p className={styles.scoreText}>{finalScore} / {questions.length} bonnes réponses</p>
        {game.outro && <p className={styles.gameOutro}>{game.outro}</p>}
        <div className={styles.resultActions}>
          <button
            className={styles.btnSecondary}
            onClick={() => { setStep("intro"); setQIndex(0); setChosen(null); setScore(0); setAnswers([]); }}
          >
            Rejouer
          </button>
          <Link className={styles.btnPrimary} to="/jeunes/tutorials">
            ← Retour aux tutos
          </Link>
        </div>
      </div>
    );
  }

  /* Question step */
  const optionLetters = ["A", "B", "C", "D"];
  return (
    <div className={styles.gameCard}>
      <div className={styles.progressRow}>
        {questions.map((_, i) => (
          <div
            key={i}
            className={`${styles.progressDot} ${
              i < qIndex ? styles.progressDotDone :
              i === qIndex ? styles.progressDotCurrent : ""
            }`}
          />
        ))}
      </div>
      <p className={styles.questionCounter}>Question {qIndex + 1} / {questions.length}</p>
      <h3 className={styles.questionText}>{q.emoji && <span>{q.emoji} </span>}{q.q}</h3>
      <div className={styles.optionsList}>
        {q.options.map((opt, i) => {
          let cls = styles.optionBtn;
          if (chosen !== null) {
            if (i === q.correct) cls = `${styles.optionBtn} ${styles.optionCorrect}`;
            else if (i === chosen) cls = `${styles.optionBtn} ${styles.optionWrong}`;
            else cls = `${styles.optionBtn} ${styles.optionFaded}`;
          }
          return (
            <button key={i} className={cls} onClick={() => handleChoose(i)} disabled={chosen !== null}>
              <span className={styles.optionLetter}>{optionLetters[i]}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div className={`${styles.feedback} ${chosen === q.correct ? styles.feedbackGood : styles.feedbackBad}`}>
          <span>{chosen === q.correct ? "✅ Bonne réponse !" : "❌ Pas tout à fait…"}</span>
          <p>{q.explain}</p>
        </div>
      )}
      {chosen !== null && (
        <button className={styles.btnPrimary} onClick={handleNext}>
          {qIndex + 1 < questions.length ? "Question suivante →" : "Voir mon score →"}
        </button>
      )}
    </div>
  );
}

/* ── Main page ── */
export function TutorialDetailPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    contentApi.tutorial(id).then((res) => setTutorial(res.data));
    const prog = readProgress();
    setCompleted(Boolean(prog[id]));
  }, [id]);

  function handleComplete(score, total) {
    if (score >= Math.ceil(total * 0.6)) {
      const prog = readProgress();
      prog[id] = true;
      writeProgress(prog);
      setCompleted(true);
    }
  }

  if (!tutorial) return <section className="card">Chargement…</section>;

  const game = parseGame(tutorial.content);

  if (game) {
    return (
      <section className={`card ${styles.wrapper}`}>
        <div className={styles.topBar}>
          <Link to="/jeunes/tutorials" className={styles.backLink}>← Tutos</Link>
          {completed && <span className={styles.masteredBadge}>✅ Maîtrisé</span>}
        </div>
        <QuizGame game={game} tutorialId={id} onComplete={handleComplete} />
      </section>
    );
  }

  /* Fallback: plain text */
  return (
    <section className={`card ${styles.wrapper}`}>
      <div className={styles.topBar}>
        <Link to="/jeunes/tutorials" className={styles.backLink}>← Tutos</Link>
      </div>
      <header className={styles.header}>
        <h2>{tutorial.title}</h2>
      </header>
      <article className={styles.block}>
        <p className={styles.content}>{tutorial.content}</p>
      </article>
    </section>
  );
}
