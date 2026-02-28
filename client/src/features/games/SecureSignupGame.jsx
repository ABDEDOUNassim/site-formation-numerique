import { useMemo, useState } from "react";
import styles from "./SecureSignupGame.module.css";

// ─── DONNÉES ──────────────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: "gaming",
    name: "PixelKingdom",
    genre: "Jeu en ligne",
    emoji: "🎮",
    color: "#7c3aed",
    colorLight: "#ede9fe",
    gradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
    mascot: "🧙",
    welcomeMsg: "Rejoins l'aventure et affronte des milliers de joueurs en ligne !",
    dataUseMsg: "PixelKingdom peut revendre tes données à des annonceurs pour te cibler avec des publicités de jeux et d'articles de sport.",
    steps: [
      {
        id: "pseudo",
        question: "Choisis ton pseudo de joueur",
        context: "Ce nom sera visible par tous les joueurs dans les chats et les classements.",
        icon: "✏️",
        choices: [
          { id: "real", label: "Mon vrai prénom + mon âge", example: "ex: Lucas12", safe: false, score: 0,
            feedback: "⚠️ Ton prénom et ton âge sont des infos personnelles. N'importe quel inconnu peut maintenant t'identifier !",
            dataItem: { label: "Ton prénom réel", emoji: "👤", risk: "high" } },
          { id: "invented", label: "Un pseudo inventé", example: "ex: DragonSlayer_X", safe: true, score: 20,
            feedback: "🛡️ Parfait ! Un pseudo inventé ne révèle rien sur qui tu es vraiment.",
            dataItem: null },
        ],
      },
      {
        id: "birthday",
        question: "Quelle est ta date de naissance ?",
        context: "Le jeu doit vérifier que tu as l'âge minimum pour jouer.",
        icon: "🎂",
        choices: [
          { id: "full", label: "Ma date complète", example: "ex: 12/03/2013", safe: false, score: 0,
            feedback: "⚠️ Ton âge exact et ta date de naissance sont des données précieuses pour les annonceurs !",
            dataItem: { label: "Ta date de naissance", emoji: "🎂", risk: "medium" } },
          { id: "year", label: "Juste mon année de naissance", example: "ex: 2013", safe: false, score: 10,
            feedback: "🟡 Mieux ! Le site sait que tu es mineur, mais reste une donnée dans leurs serveurs.",
            dataItem: { label: "Ton année de naissance", emoji: "📅", risk: "low" } },
          { id: "skip", label: "Je ne remplis pas (champ optionnel)", example: "(laisser vide)", safe: true, score: 20,
            feedback: "🛡️ Excellent ! Ne jamais donner ce qui n'est pas obligatoire.",
            dataItem: null },
        ],
      },
      {
        id: "photo",
        question: "Quelle photo de profil ?",
        context: "Tous les joueurs verront cette image quand tu joues.",
        icon: "📷",
        choices: [
          { id: "real", label: "Ma vraie photo", example: "Une photo de mon visage", safe: false, score: 0,
            feedback: "⚠️ Ta photo peut être téléchargée par n'importe qui et utilisée sans ta permission !",
            dataItem: { label: "Ton visage (photo)", emoji: "📸", risk: "high" } },
          { id: "avatar", label: "Un avatar ou un perso du jeu", example: "🧙 Un guerrier, un robot...", safe: true, score: 20,
            feedback: "🛡️ Super choix ! Un avatar protège ton identité et c'est plus fun !",
            dataItem: null },
        ],
      },
      {
        id: "privacy",
        question: "Ton profil est visible par...",
        context: "Tu peux choisir qui peut voir tes infos et te contacter.",
        icon: "🔒",
        choices: [
          { id: "public", label: "Tout le monde (profil public)", example: "N'importe qui peut te trouver", safe: false, score: 0,
            feedback: "⚠️ Un profil public expose tes infos à des millions d'inconnus dans le monde !",
            dataItem: { label: "Profil visible par tous", emoji: "🌍", risk: "high" } },
          { id: "private", label: "Seulement mes amis (profil privé)", example: "Seuls tes contacts approuvés", safe: true, score: 20,
            feedback: "🛡️ Excellent ! En mode privé, tu contrôles qui peut t'approcher.",
            dataItem: null },
        ],
      },
      {
        id: "password",
        question: "Crée ton mot de passe",
        context: "Il protège tout ton compte. Plus il est solide, mieux c'est.",
        icon: "🔑",
        choices: [
          { id: "weak", label: "Mon prénom + ma date de naissance", example: "ex: Lucas2013", safe: false, score: 0,
            feedback: "⚠️ Ce mot de passe se devine en quelques secondes ! Un hacker peut voler ton compte.",
            dataItem: { label: "Mot de passe trop simple", emoji: "🔓", risk: "high" } },
          { id: "medium", label: "Mon équipe préférée + un chiffre", example: "ex: PSG42", safe: false, score: 8,
            feedback: "🟡 Mieux, mais trop court ! Il faut au moins 10 caractères variés.",
            dataItem: { label: "Mot de passe faible", emoji: "🔑", risk: "medium" } },
          { id: "strong", label: "Une phrase avec majuscules, chiffres et symboles", example: "ex: Chien!Vert@Lune9", safe: true, score: 20,
            feedback: "🛡️ Parfait ! Ce type de mot de passe résiste aux logiciels de piratage.",
            dataItem: null },
        ],
      },
    ],
  },
  {
    id: "social",
    name: "StarGram",
    genre: "Réseau social",
    emoji: "📸",
    color: "#e91e8c",
    colorLight: "#fdf2f8",
    gradient: "linear-gradient(135deg, #e91e8c, #f97316)",
    mascot: "⭐",
    welcomeMsg: "Partage tes meilleurs moments avec tes amis et gagne des abonnés !",
    dataUseMsg: "StarGram analyse chaque photo que tu publies (lieu, personnes, heure) et suit ta localisation pour te montrer des pubs et revendre ton profil à des marques.",
    steps: [
      {
        id: "pseudo",
        question: "Quel est ton nom d'utilisateur ?",
        context: "Ce nom apparaîtra sur tes publications et dans les recherches.",
        icon: "✏️",
        choices: [
          { id: "real", label: "Mon vrai nom complet", example: "ex: Lucas_Martin", safe: false, score: 0,
            feedback: "⚠️ Ton nom complet permet de te retrouver facilement sur tous les réseaux et dans la vraie vie !",
            dataItem: { label: "Ton nom complet", emoji: "👤", risk: "high" } },
          { id: "invented", label: "Un pseudo créatif", example: "ex: StarBoy_404", safe: true, score: 20,
            feedback: "🛡️ Super ! Un pseudo créatif garde ton anonymat tout en étant fun.",
            dataItem: null },
        ],
      },
      {
        id: "photo",
        question: "Ta photo de profil",
        context: "Souvent visible même pour les personnes qui ne te suivent pas encore.",
        icon: "📷",
        choices: [
          { id: "selfie", label: "Un selfie de mon visage", example: "Photo de moi", safe: false, score: 0,
            feedback: "⚠️ Ta photo peut être volée, modifiée ou utilisée sans ta permission par n'importe qui !",
            dataItem: { label: "Ton visage (selfie)", emoji: "📸", risk: "high" } },
          { id: "landscape", label: "Une photo que j'aime (pas moi)", example: "Coucher de soleil 🌅, animal...", safe: true, score: 20,
            feedback: "🛡️ Bonne idée ! Une belle photo sans montrer ton visage.",
            dataItem: null },
        ],
      },
      {
        id: "bio",
        question: "Que mets-tu dans ta bio ?",
        context: "Ta biographie est visible par TOUT LE MONDE, même sans compte.",
        icon: "📝",
        choices: [
          { id: "full", label: "Mon école, ma ville, mon âge", example: "13 ans 🏫 Collège Hugo, Lyon", safe: false, score: 0,
            feedback: "⚠️ Avec ton école et ta ville, quelqu'un pourrait te localiser dans la vraie vie !",
            dataItem: { label: "Ton école et ta ville", emoji: "🏫", risk: "high" } },
          { id: "hobby", label: "Juste mes centres d'intérêt", example: "Musique 🎵 Foot ⚽ Cinéma 🎬", safe: true, score: 20,
            feedback: "🛡️ Parfait ! Partager ses passions sans révéler où tu vis ni où tu vas à l'école.",
            dataItem: null },
        ],
      },
      {
        id: "location",
        question: "Actives-tu la géolocalisation ?",
        context: "StarGram peut ajouter ta position GPS sur chaque photo publiée.",
        icon: "📍",
        choices: [
          { id: "always", label: "Oui — pour que mes amis voient où je suis", example: "Position visible sur chaque post", safe: false, score: 0,
            feedback: "⚠️ N'importe qui peut suivre tes déplacements en temps réel. C'est très dangereux !",
            dataItem: { label: "Ta position en temps réel", emoji: "📍", risk: "high" } },
          { id: "never", label: "Non — je désactive la géolocalisation", example: "Position jamais partagée", safe: true, score: 20,
            feedback: "🛡️ Excellent réflexe ! Où tu es physiquement est une info très privée.",
            dataItem: null },
        ],
      },
      {
        id: "privacy",
        question: "Ton compte StarGram est...",
        context: "En public, tes photos et ta bio sont visibles partout dans le monde.",
        icon: "🔒",
        choices: [
          { id: "public", label: "Public — pour avoir plus d'abonnés !", example: "Tout le monde peut te suivre", safe: false, score: 0,
            feedback: "⚠️ Un compte public expose toutes tes publications à des millions d'inconnus !",
            dataItem: { label: "Tout ton contenu visible", emoji: "🌍", risk: "high" } },
          { id: "private", label: "Privé — seulement mes amis approuvés", example: "Tu valides chaque abonné", safe: true, score: 20,
            feedback: "🛡️ Parfait ! Tu gardes le contrôle sur qui te suit.",
            dataItem: null },
        ],
      },
    ],
  },
  {
    id: "video",
    name: "VideoPlanet",
    genre: "Plateforme vidéo",
    emoji: "🎬",
    color: "#dc2626",
    colorLight: "#fff1f2",
    gradient: "linear-gradient(135deg, #dc2626, #ea580c)",
    mascot: "🚀",
    welcomeMsg: "Des millions de vidéos t'attendent. Crée ton compte pour sauvegarder tes favoris !",
    dataUseMsg: "VideoPlanet analyse chaque vidéo regardée pour créer ton profil psychologique et te montrer de plus en plus de contenu addictif — et vendre ce profil à des annonceurs.",
    steps: [
      {
        id: "pseudo",
        question: "Ton nom de chaîne",
        context: "Ce nom sera associé à tous tes commentaires et listes de lecture.",
        icon: "✏️",
        choices: [
          { id: "real", label: "Mon vrai prénom", example: "ex: Lucas", safe: false, score: 0,
            feedback: "⚠️ Ton prénom réel relie ton identité à toutes tes activités sur le site.",
            dataItem: { label: "Ton prénom réel", emoji: "👤", risk: "medium" } },
          { id: "invented", label: "Un surnom inventé", example: "ex: RocketViewer99", safe: true, score: 20,
            feedback: "🛡️ Super ! Un surnom inventé protège ton identité en ligne.",
            dataItem: null },
        ],
      },
      {
        id: "cookies",
        question: "Les cookies et la collecte de données",
        context: "VideoPlanet veut suivre tout ce que tu fais sur internet.",
        icon: "🍪",
        choices: [
          { id: "all", label: "Accepter tous les cookies", example: "Cliquer sur 'Tout accepter'", safe: false, score: 0,
            feedback: "⚠️ En acceptant tout, tu autorises le site à te suivre sur TOUS les sites internet que tu visites !",
            dataItem: { label: "Tout ton historique de navigation", emoji: "🍪", risk: "high" } },
          { id: "necessary", label: "Seulement les cookies nécessaires", example: "Personnaliser mes préférences", safe: true, score: 20,
            feedback: "🛡️ Excellent ! Les cookies nécessaires font tourner le site sans te tracer.",
            dataItem: null },
        ],
      },
      {
        id: "history",
        question: "Ton historique de visionnage",
        context: "Veux-tu que le site garde la liste de toutes tes vidéos regardées ?",
        icon: "📺",
        choices: [
          { id: "keep", label: "Oui — pour retrouver mes vidéos facilement", example: "Historique activé", safe: false, score: 0,
            feedback: "⚠️ Chaque vidéo regardée est analysée pour connaître tes opinions, tes peurs, tes envies...",
            dataItem: { label: "Toutes tes vidéos regardées", emoji: "📺", risk: "medium" } },
          { id: "delete", label: "Non — je désactive l'historique", example: "Paramètres → Désactiver", safe: true, score: 20,
            feedback: "🛡️ Bien vu ! Sans historique, le site peut beaucoup moins te profiler.",
            dataItem: null },
        ],
      },
      {
        id: "notifications",
        question: "Les notifications",
        context: "VideoPlanet veut t'envoyer des notifications pour que tu reviennesle plus souvent possible.",
        icon: "🔔",
        choices: [
          { id: "all", label: "Toutes les notifications activées", example: "Chaque nouvelle vidéo, chaque like...", safe: false, score: 0,
            feedback: "⚠️ Les notifications sont conçues pour te rendre accro au site. Elles te gardent connecté sans que tu le décides vraiment.",
            dataItem: { label: "Ton temps passé sur le site", emoji: "⏰", risk: "medium" } },
          { id: "none", label: "Aucune notification", example: "Je reviens quand je veux", safe: true, score: 20,
            feedback: "🛡️ Excellent ! Tu reprends le contrôle de ton temps d'écran.",
            dataItem: null },
        ],
      },
      {
        id: "password",
        question: "Crée ton mot de passe",
        context: "Il protège tout ton compte et ta liste de vidéos sauvegardées.",
        icon: "🔑",
        choices: [
          { id: "weak", label: "Un mot simple facile à retenir", example: "ex: football", safe: false, score: 0,
            feedback: "⚠️ Un mot du dictionnaire se casse en moins d'une seconde avec un logiciel de piratage !",
            dataItem: { label: "Mot de passe trop faible", emoji: "🔓", risk: "high" } },
          { id: "strong", label: "Une phrase avec majuscules, chiffres et symboles", example: "ex: Fusee!Bleue#2024", safe: true, score: 20,
            feedback: "🛡️ Parfait ! Ce type de mot de passe résiste aux attaques informatiques.",
            dataItem: null },
        ],
      },
    ],
  },
];

const SCORE_BADGES = [
  { min: 90, emoji: "🏆", label: "Champion de la Sécurité !", color: "#f59e0b" },
  { min: 70, emoji: "🥈", label: "Bon réflexe !", color: "#6b7280" },
  { min: 50, emoji: "🌱", label: "Tu progresses !", color: "#22c55e" },
  { min: 0, emoji: "📚", label: "À améliorer — rejoue !", color: "#ef4444" },
];

function getBadge(score, max) {
  const pct = Math.round((score / max) * 100);
  return SCORE_BADGES.find((b) => pct >= b.min) || SCORE_BADGES.at(-1);
}

// ─── SOUS-COMPOSANTS ──────────────────────────────────────────────────────────

function ByteSpeech({ msg, mood }) {
  return (
    <div className={`${styles.mascotRow} ${styles.byteRow}`}>
      <div className={`${styles.mascotAvatar} ${styles.byteAvatar}`}>
        {mood === "happy" ? "🤖😄" : mood === "warn" ? "🤖😬" : "🤖"}
      </div>
      <div className={styles.byteBubble}>{msg}</div>
    </div>
  );
}

function DatavoreSpeech({ msg, mood }) {
  return (
    <div className={`${styles.mascotRow} ${styles.datavoreRow}`}>
      <div className={styles.datavoreBubble}>{msg}</div>
      <div className={`${styles.mascotAvatar} ${styles.datavoreAvatar}`}>
        {mood === "excited" ? "🕵️😈" : mood === "angry" ? "🕵️😤" : "🕵️"}
      </div>
    </div>
  );
}

function DataChip({ item }) {
  const colors = { high: "#fecdd3", medium: "#fde68a", low: "#bbf7d0" };
  const textColors = { high: "#9f1239", medium: "#78350f", low: "#14532d" };
  return (
    <div
      className={styles.dataChip}
      style={{ background: colors[item.risk], color: textColors[item.risk] }}
    >
      {item.emoji} {item.label}
    </div>
  );
}

// ─── ÉCRAN : Sélection du scénario ────────────────────────────────────────────

function ScenarioSelectScreen({ scenarios, completedScenarios, onSelect }) {
  return (
    <div className={styles.screen}>
      <div className={styles.selectHero}>
        <div className={styles.selectHeroIcon}>🛡️</div>
        <h2 className={styles.selectTitle}>Inscription Sécurisée</h2>
        <p className={styles.selectSubtitle}>
          Apprends à créer des comptes sans donner trop d'infos perso !
        </p>
      </div>

      <ByteSpeech
        msg="Salut ! Je suis BYTE, ton garde du corps numérique. Choisis une appli et entraîne-toi à créer un compte de façon sécurisée !"
        mood="happy"
      />

      <div className={styles.scenarioGrid}>
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className={styles.scenarioCard}
            style={{ "--sc": s.color, "--sc-light": s.colorLight }}
            onClick={() => onSelect(s.id)}
          >
            {completedScenarios.has(s.id) && (
              <div className={styles.doneBadge}>✓ Fait</div>
            )}
            <span className={styles.scenarioEmoji}>{s.emoji}</span>
            <strong className={styles.scenarioName}>{s.name}</strong>
            <span className={styles.scenarioGenre}>{s.genre}</span>
          </button>
        ))}
      </div>

      <DatavoreSpeech
        msg="Hé hé hé... J'espère que tu vas tout remplir avec tes vraies infos 😈"
        mood="default"
      />
    </div>
  );
}

// ─── ÉCRAN : Jeu (étape par étape) ───────────────────────────────────────────

function PlayingScreen({ scenario, step, stepIndex, totalSteps, feedbackShown, currentChoice, dataCollected, onSelectChoice, onNext }) {
  const isLastStep = stepIndex === totalSteps - 1;
  const progressPct = ((stepIndex + (feedbackShown ? 1 : 0)) / totalSteps) * 100;

  return (
    <div className={styles.screen}>

      {/* Bannière plateforme */}
      <div className={styles.platformBanner} style={{ background: scenario.gradient }}>
        <span className={styles.platformEmoji}>{scenario.emoji}</span>
        <div>
          <strong className={styles.platformName}>{scenario.name}</strong>
          <span className={styles.platformGenre}>{scenario.genre}</span>
        </div>
        <div className={styles.stepsIndicator}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`${styles.stepDot} ${i < stepIndex ? styles.stepDotDone : ""} ${i === stepIndex ? styles.stepDotActive : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Barre de progression */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progressPct}%`, background: scenario.color }} />
      </div>

      {/* Données collectées (running) */}
      {dataCollected.length > 0 && (
        <div className={styles.dataBag}>
          <span className={styles.dataBagIcon}>🕵️</span>
          <span className={styles.dataBagLabel}>Données collectées : {dataCollected.length}</span>
          <div className={styles.dataBagChips}>
            {dataCollected.map((item, i) => (
              <DataChip key={i} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Question */}
      <div className={styles.stepCard} key={stepIndex}>
        <div className={styles.stepIcon}>{step.icon}</div>
        <h3 className={styles.stepQuestion}>{step.question}</h3>
        <p className={styles.stepContext}>{step.context}</p>
      </div>

      {/* Choix */}
      {!feedbackShown && (
        <div className={styles.choiceGrid}>
          {step.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={styles.choiceBtn}
              onClick={() => onSelectChoice(choice.id)}
            >
              <span className={styles.choiceExample}>{choice.example}</span>
              <span className={styles.choiceLabel}>{choice.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Feedback après choix */}
      {feedbackShown && currentChoice && (
        <div className={`${styles.feedbackPanel} ${currentChoice.safe ? styles.feedbackSafe : styles.feedbackDanger}`}>
          <div className={styles.feedbackChoiceTag}>
            {currentChoice.safe ? "✅ Bon choix !" : "⚠️ Attention !"}
            <span className={styles.feedbackChoiceValue}>{currentChoice.label}</span>
          </div>
          <p className={styles.feedbackText}>{currentChoice.feedback}</p>

          {currentChoice.safe ? (
            <ByteSpeech msg="Super boulot ! DATAVORE n'a rien eu de toi 😄" mood="happy" />
          ) : (
            <>
              <DatavoreSpeech
                msg={currentChoice.dataItem
                  ? `Excellent ! J'ai récupéré : « ${currentChoice.dataItem.label} » 😈`
                  : "Hmm..."}
                mood="excited"
              />
              {currentChoice.dataItem && (
                <div className={styles.dataCollectedAlert}>
                  <span>📋 Ajouté au dossier :</span>
                  <DataChip item={currentChoice.dataItem} />
                </div>
              )}
            </>
          )}

          <button
            type="button"
            className={styles.btnNext}
            style={{ background: scenario.color }}
            onClick={onNext}
          >
            {isLastStep ? "Voir mon bilan 🏁" : "Étape suivante →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ÉCRAN : Récapitulatif ────────────────────────────────────────────────────

function SummaryScreen({ scenario, score, maxScore, dataCollected, onPlayAgain }) {
  const badge = getBadge(score, maxScore);
  const pct = Math.round((score / maxScore) * 100);
  const hasData = dataCollected.length > 0;

  return (
    <div className={styles.screen}>
      <div className={styles.summaryHero} style={{ background: scenario.gradient }}>
        <span className={styles.summaryScenarioEmoji}>{scenario.emoji}</span>
        <strong className={styles.summaryScenarioName}>{scenario.name}</strong>
        <span>— Terminé !</span>
      </div>

      {/* Badge et score */}
      <div className={styles.scoreSection}>
        <div className={styles.scoreBadge} style={{ "--badge-color": badge.color }}>
          <span className={styles.scoreBadgeEmoji}>{badge.emoji}</span>
          <div>
            <strong>{badge.label}</strong>
            <div className={styles.scoreBar}>
              <div className={styles.scoreBarFill} style={{ width: `${pct}%`, background: badge.color }} />
            </div>
            <span className={styles.scoreValue}>{score} / {maxScore} points</span>
          </div>
        </div>
      </div>

      {/* Profil collecté */}
      <div className={styles.profileCard}>
        <h3 className={styles.profileTitle}>
          🕵️ Ce que <strong>{scenario.name}</strong> sait sur toi :
        </h3>
        {hasData ? (
          <>
            <div className={styles.profileChips}>
              {dataCollected.map((item, i) => (
                <DataChip key={i} item={item} />
              ))}
            </div>
            <div className={styles.dataUseBox}>
              <span className={styles.dataUseIcon}>💡</span>
              <p>{scenario.dataUseMsg}</p>
            </div>
          </>
        ) : (
          <div className={styles.noDataBox}>
            <span>🛡️</span>
            <p>Bravo ! Tu n'as donné aucune donnée personnelle à {scenario.name}. DATAVORE est furieux !</p>
          </div>
        )}
      </div>

      {/* Leçon mascotte */}
      <ByteSpeech
        msg={pct >= 80
          ? "Félicitations ! Tu es un vrai expert de la sécurité en ligne. Continue comme ça !"
          : "Tu peux faire mieux ! Rappelle-toi : moins tu donnes d'infos, mieux tu te protèges."}
        mood={pct >= 80 ? "happy" : "warn"}
      />

      {/* Règles à retenir */}
      <div className={styles.rulesBox}>
        <h3>📌 Les règles d'or</h3>
        <ul className={styles.rulesList}>
          <li>🔤 Utilise toujours un <strong>pseudo inventé</strong>, jamais ton vrai nom</li>
          <li>📷 Choisis un <strong>avatar</strong> plutôt qu'une vraie photo</li>
          <li>🔒 Active toujours le <strong>mode privé</strong></li>
          <li>🍪 Refuse les <strong>cookies non nécessaires</strong></li>
          <li>🔑 Crée un <strong>mot de passe long</strong> avec chiffres et symboles</li>
          <li>📍 Ne partage jamais ta <strong>localisation</strong></li>
        </ul>
      </div>

      <div className={styles.summaryActions}>
        <button type="button" className={styles.btnReplay} onClick={onPlayAgain}>
          🔁 Choisir un autre scénario
        </button>
      </div>
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

export function SecureSignupGame({ onSaveProgress }) {
  const [phase, setPhase] = useState("select");
  const [scenarioId, setScenarioId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState(new Set());

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || null;
  const currentStep = scenario?.steps[stepIndex] || null;
  const currentAnswer = currentStep ? answers[currentStep.id] : null;
  const currentChoice = currentStep?.choices.find((c) => c.id === currentAnswer) || null;

  const score = useMemo(() => {
    if (!scenario) return 0;
    return scenario.steps.reduce((acc, step) => {
      const choice = step.choices.find((c) => c.id === answers[step.id]);
      return acc + (choice?.score ?? 0);
    }, 0);
  }, [scenario, answers]);

  const maxScore = scenario ? scenario.steps.length * 20 : 100;

  const dataCollected = useMemo(() => {
    if (!scenario) return [];
    return scenario.steps.flatMap((step) => {
      const choice = step.choices.find((c) => c.id === answers[step.id]);
      return choice?.dataItem ? [choice.dataItem] : [];
    });
  }, [scenario, answers]);

  function selectScenario(id) {
    setScenarioId(id);
    setStepIndex(0);
    setAnswers({});
    setFeedbackShown(false);
    setPhase("playing");
  }

  function selectChoice(choiceId) {
    if (feedbackShown || !currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: choiceId }));
    setFeedbackShown(true);
  }

  function nextStep() {
    if (!scenario) return;
    if (stepIndex < scenario.steps.length - 1) {
      setStepIndex((i) => i + 1);
      setFeedbackShown(false);
    } else {
      setCompletedScenarios((s) => new Set([...s, scenarioId]));
      onSaveProgress?.(Math.round((score / maxScore) * 100));
      setPhase("summary");
    }
  }

  if (phase === "select") {
    return (
      <article className={`card ${styles.game}`}>
        <ScenarioSelectScreen
          scenarios={SCENARIOS}
          completedScenarios={completedScenarios}
          onSelect={selectScenario}
        />
      </article>
    );
  }

  if (phase === "playing" && scenario && currentStep) {
    return (
      <article className={`card ${styles.game}`}>
        <PlayingScreen
          scenario={scenario}
          step={currentStep}
          stepIndex={stepIndex}
          totalSteps={scenario.steps.length}
          feedbackShown={feedbackShown}
          currentChoice={currentChoice}
          dataCollected={dataCollected}
          onSelectChoice={selectChoice}
          onNext={nextStep}
        />
      </article>
    );
  }

  if (phase === "summary" && scenario) {
    return (
      <article className={`card ${styles.game}`}>
        <SummaryScreen
          scenario={scenario}
          score={score}
          maxScore={maxScore}
          dataCollected={dataCollected}
          onPlayAgain={() => setPhase("select")}
        />
      </article>
    );
  }

  return null;
}
