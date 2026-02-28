import { useMemo, useState } from "react";
import styles from "./InteractiveStoryEngine.module.css";
import { HEROES, PLACES, SITUATIONS, getScoreComment } from "./storyData";

/* ─────────────────────────────────────────────────────────────────────────────
   Phases : pick-hero → pick-place → pick-situation → reading → choosing → ending
─────────────────────────────────────────────────────────────────────────────── */

/* Carte de choix (héros / lieu / situation) */
function PickCard({ emoji, title, tagline, selected, onClick, badge }) {
  return (
    <button
      type="button"
      className={`${styles.pickCard} ${selected ? styles.pickCardSelected : ""}`}
      onClick={onClick}
    >
      <span className={styles.pickEmoji}>{emoji}</span>
      <strong className={styles.pickTitle}>{title}</strong>
      <span className={styles.pickTagline}>{tagline}</span>
      {badge && <span className={styles.pickBadge}>{badge}</span>}
    </button>
  );
}

/* Barre de progression en haut */
function ProgressBar({ phase }) {
  const steps = ["pick-hero", "pick-place", "pick-situation", "reading", "choosing", "ending"];
  const current = steps.indexOf(phase);

  const labels = ["Héros", "Lieu", "Situation", "Histoire", "Choix", "Fin"];

  return (
    <div className={styles.progressBar}>
      {labels.map((label, i) => (
        <div
          key={label}
          className={`${styles.progressStep} ${i <= current ? styles.progressDone : ""} ${i === current ? styles.progressActive : ""}`}
        >
          <div className={styles.progressDot} />
          <span className={styles.progressLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* Paragraphe de récit qui apparaît avec une animation */
function StoryParagraph({ children, delay = 0 }) {
  return (
    <p className={styles.storyPara} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Composant principal
─────────────────────────────────────────────────────────────────────────────── */
export function InteractiveStoryEngine() {
  const [phase, setPhase] = useState("pick-hero");
  const [heroId, setHeroId] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [situationId, setSituationId] = useState(null);
  const [choice, setChoice] = useState(null); // choice object from situation.choices

  const hero = useMemo(() => HEROES.find((h) => h.id === heroId), [heroId]);
  const place = useMemo(() => PLACES.find((p) => p.id === placeId), [placeId]);
  const situation = useMemo(() => SITUATIONS.find((s) => s.id === situationId), [situationId]);

  /* Textes narratifs calculés une seule fois quand tous les éléments sont choisis */
  const storyTexts = useMemo(() => {
    if (!hero || !place || !situation) return null;
    return {
      intro: situation.buildIntro(hero, place),
      tension: situation.buildTension(hero, place),
      crisis: situation.buildCrisis(hero),
    };
  }, [hero, place, situation]);

  /* Score final.
     Bon choix sur réseau risqué = +1 bonus (contexte difficile, mais bon réflexe).
     Scores possibles : 0 (mauvais), 3 (bon + réseau sûr), 4 (bon + réseau risqué). */
  const score = useMemo(() => {
    if (!choice || !place) return 0;
    const contextBonus = place.risk === "high" && (choice.scoreBonus ?? 0) > 0 ? 1 : 0;
    return (choice.scoreBonus ?? 0) + contextBonus;
  }, [choice, place]);

  const scoreComment = useMemo(() => getScoreComment(score), [score]);

  /* Textes de conséquence + ending calculés après le choix */
  const endingTexts = useMemo(() => {
    if (!choice || !hero || !place) return null;
    return {
      consequence: choice.buildConsequence(hero, place),
      ending: choice.buildEnding(hero, place),
    };
  }, [choice, hero, place]);

  /* ── Handlers ── */
  function selectHero(id) {
    setHeroId(id);
    setTimeout(() => setPhase("pick-place"), 200);
  }

  function selectPlace(id) {
    setPlaceId(id);
    setTimeout(() => setPhase("pick-situation"), 200);
  }

  function selectSituation(id) {
    setSituationId(id);
    setTimeout(() => setPhase("reading"), 200);
  }

  function handleChoice(c) {
    setChoice(c);
    setPhase("ending");
  }

  function restart() {
    setPhase("pick-hero");
    setHeroId(null);
    setPlaceId(null);
    setSituationId(null);
    setChoice(null);
  }

  /* ── Render ── */
  return (
    <section className={styles.wrapper}>
      {/* En-tête */}
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>🌐 Histoire interactive</h3>
        <p className={styles.headerSub}>
          Construis une histoire et fais les bons choix pour protéger ta vie privée.
        </p>
      </header>

      <ProgressBar phase={phase} />

      {/* ───── PHASE : Choisir le héros ───── */}
      {phase === "pick-hero" && (
        <div className={styles.pickSection}>
          <h4 className={styles.pickQuestion}>Qui est le personnage principal ?</h4>
          <div className={styles.pickGrid}>
            {HEROES.map((h) => (
              <PickCard
                key={h.id}
                emoji={h.emoji}
                title={h.name}
                tagline={h.tagline}
                selected={heroId === h.id}
                onClick={() => selectHero(h.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ───── PHASE : Choisir le lieu ───── */}
      {phase === "pick-place" && (
        <div className={styles.pickSection}>
          <div className={styles.heroChosen}>
            <span>{hero?.emoji}</span> <strong>{hero?.name}</strong> est prêt·e pour l'aventure !
          </div>
          <h4 className={styles.pickQuestion}>Où se déroule l'histoire ?</h4>
          <div className={styles.pickGrid}>
            {PLACES.map((p) => (
              <PickCard
                key={p.id}
                emoji={p.emoji}
                title={p.name}
                tagline={p.tagline}
                selected={placeId === p.id}
                onClick={() => selectPlace(p.id)}
                badge={p.risk === "high" ? "⚠️ Risque élevé" : "✅ Réseau sécurisé"}
              />
            ))}
          </div>
        </div>
      )}

      {/* ───── PHASE : Choisir la situation ───── */}
      {phase === "pick-situation" && (
        <div className={styles.pickSection}>
          <div className={styles.heroChosen}>
            <span>{hero?.emoji}</span> <strong>{hero?.name}</strong> ·{" "}
            <span>{place?.emoji}</span> {place?.name}
          </div>
          <h4 className={styles.pickQuestion}>Quelle situation va affronter {hero?.name} ?</h4>
          <div className={styles.pickGrid}>
            {SITUATIONS.map((s) => (
              <PickCard
                key={s.id}
                emoji={s.emoji}
                title={s.title}
                tagline={s.tagline}
                selected={situationId === s.id}
                onClick={() => selectSituation(s.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ───── PHASE : Lecture de l'histoire ───── */}
      {phase === "reading" && storyTexts && (
        <div className={styles.storyReader}>
          <div className={styles.storyHeader}>
            <span className={styles.storySitEmoji}>{situation?.emoji}</span>
            <div>
              <h4 className={styles.storyTitle}>{situation?.title}</h4>
              <div className={styles.storyMeta}>
                {hero?.emoji} {hero?.name} · {place?.emoji} {place?.name}
              </div>
            </div>
          </div>

          <div className={styles.storyBody}>
            <StoryParagraph delay={0}>{storyTexts.intro}</StoryParagraph>
            <div className={styles.storySeparator} />
            <StoryParagraph delay={150}>{storyTexts.tension}</StoryParagraph>
            <div className={styles.storySeparator} />
            <StoryParagraph delay={300}>{storyTexts.crisis}</StoryParagraph>
          </div>

          <button
            type="button"
            className={styles.btnContinue}
            onClick={() => setPhase("choosing")}
          >
            Le moment du choix →
          </button>
        </div>
      )}

      {/* ───── PHASE : Choix ───── */}
      {phase === "choosing" && situation && (
        <div className={styles.choosingSection}>
          <div className={styles.choosingHeader}>
            <span className={styles.storySitEmoji}>⚡</span>
            <h4 className={styles.choosingTitle}>{situation.choicePrompt}</h4>
          </div>

          <div className={styles.choiceGrid}>
            {situation.choices.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${styles.choiceCard} ${c.impact === "safe" ? styles.choiceCardSafe : styles.choiceCardRisk}`}
                onClick={() => handleChoice(c)}
              >
                <span className={styles.choiceCardEmoji}>{c.emoji}</span>
                <strong className={styles.choiceCardLabel}>{c.label}</strong>
                <span className={styles.choiceCardDetail}>{c.detail}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ───── PHASE : Fin ───── */}
      {phase === "ending" && choice && endingTexts && (
        <div className={styles.endingSection}>
          {/* Titre de fin */}
          <div className={`${styles.endingBanner} ${choice.impact === "safe" ? styles.endingBannerSafe : styles.endingBannerRisk}`}>
            <span className={styles.endingBannerEmoji}>
              {choice.impact === "safe" ? "🛡️" : "⚠️"}
            </span>
            <span>
              {choice.impact === "safe"
                ? "Fin positive — données protégées"
                : "Fin à risque — données exposées"}
            </span>
          </div>

          {/* Récit de fin */}
          <div className={styles.storyBody}>
            <StoryParagraph delay={0}>{endingTexts.consequence}</StoryParagraph>
            <div className={styles.storySeparator} />
            <StoryParagraph delay={150}>{endingTexts.ending}</StoryParagraph>
          </div>

          {/* Leçon */}
          <div className={styles.lessonBox}>
            <span className={styles.lessonIcon}>💡</span>
            <p className={styles.lessonText}>{choice.lesson}</p>
          </div>

          {/* Score */}
          <div className={styles.scoreBox}>
            <div className={styles.scoreTitle}>Score réflexe numérique</div>
            <div className={styles.scoreDots}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`${styles.scoreDot} ${i < score ? styles.scoreDotFilled : ""}`}
                />
              ))}
            </div>
            <div className={`${styles.scoreComment} ${styles[`scoreComment_${scoreComment.color}`]}`}>
              {scoreComment.label}
            </div>
            {place?.risk === "high" && choice.impact === "safe" && (
              <div className={styles.scoreBonus}>
                +1 bonus — bon réflexe sur un réseau à risque, c'est encore plus fort !
              </div>
            )}
          </div>

          {/* Données collectées */}
          <div className={styles.dataBox}>
            <h5 className={styles.dataTitle}>Ce que la situation impliquait pour tes données</h5>
            <ul className={styles.dataList}>
              <li>
                <span className={styles.dataKey}>Contexte :</span> {place?.detail}
              </li>
              <li>
                <span className={styles.dataKey}>Donnée sensible :</span> {hero?.riskyData}
              </li>
              <li>
                <span className={styles.dataKey}>Bon réflexe :</span> {hero?.safeReflex}
              </li>
            </ul>
          </div>

          {/* Rejouer */}
          <button type="button" className={styles.btnRestart} onClick={restart}>
            🔄 Rejouer avec d'autres choix
          </button>
        </div>
      )}
    </section>
  );
}
