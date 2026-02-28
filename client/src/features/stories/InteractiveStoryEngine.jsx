import { useMemo, useState } from "react";
import styles from "./InteractiveStoryEngine.module.css";

const AGE_DEFAULT = "12-14 ans";

// Donnees pedagogiques par tranche d'age et tonalite.
// On garde des phrases courtes pour que le jeu reste fluide a lire.
const STORY_PROFILES = {
  "7-11 ans": {
    introTone: "ludique",
    scenarioTitle: "Mission numerique",
    reminder: "Prendre son temps, demander de l'aide et proteger sa vie privee.",
    middlePrompt: "Ton personnage recoit une demande bizarre. Que fais-tu ?",
    midChoices: [
      {
        id: "secure",
        label: "Je mets mon compte en prive et je parle a un adulte de confiance",
        impact: "safe",
        learning: "Tres bon reflexe : tu gardes le controle et tu demandes du soutien."
      },
      {
        id: "share",
        label: "Je partage vite pour faire rire le groupe",
        impact: "risk",
        learning: "Attention : partager trop vite peut exposer des infos privees."
      }
    ]
  },
  "12-14 ans": {
    introTone: "realiste",
    scenarioTitle: "Choix sous pression",
    reminder: "Verifier avant d'agir, eviter la pression du groupe, proteger ses donnees.",
    middlePrompt: "La situation s'accelere. Tu dois choisir une strategie.",
    midChoices: [
      {
        id: "secure",
        label: "Je bloque le compte suspect, je fais un signalement et je garde des preuves",
        impact: "safe",
        learning: "Bonne strategie : protection + signalement + preuves."
      },
      {
        id: "share",
        label: "Je reponds et j'envoie des infos pour calmer la situation",
        impact: "risk",
        learning: "Mauvaise piste : donner des infos augmente le risque de manipulation."
      }
    ]
  },
  "15-17 ans": {
    introTone: "responsabilisant",
    scenarioTitle: "Decision responsable",
    reminder: "Tu es acteur de ta securite numerique et de celle de ton groupe.",
    middlePrompt: "Tu as assez d'indices. Quel choix assume-tu ?",
    midChoices: [
      {
        id: "secure",
        label: "Je coupe l'echange, je securise mes reglages et j'alerte un adulte referent",
        impact: "safe",
        learning: "Decision mature : tu limites l'impact et tu mobilises le bon soutien."
      },
      {
        id: "share",
        label: "Je continue l'echange pour voir jusqu'ou ca va",
        impact: "risk",
        learning: "Risque eleve : curiosite + pression = perte de controle."
      }
    ]
  }
};

const CHARACTERS = [
  {
    id: "nino",
    name: "Nino",
    role: "fan de jeux en ligne",
    goodReflex: "n'affiche pas son vrai nom",
    riskyData: "date de naissance complete"
  },
  {
    id: "lina",
    name: "Lina",
    role: "aime creer des videos",
    goodReflex: "demande conseil avant de publier",
    riskyData: "adresse de son ecole"
  },
  {
    id: "sam",
    name: "Sam",
    role: "discute souvent en groupe",
    goodReflex: "utilise des mots de passe differents",
    riskyData: "numero de telephone"
  }
];

const PLACES = [
  {
    id: "home",
    name: "a la maison",
    dataPoint: "wifi familial"
  },
  {
    id: "school",
    name: "apres les cours",
    dataPoint: "reseau public"
  },
  {
    id: "club",
    name: "au club multimedia",
    dataPoint: "ordinateur partage"
  }
];

const ACTIONS = [
  {
    id: "signup_fast",
    label: "creer un compte en 30 secondes",
    baseRisk: "high",
    platformUse: "profil public cree rapidement pour recommander du contenu"
  },
  {
    id: "signup_secure",
    label: "creer un compte avec reglages prives",
    baseRisk: "low",
    platformUse: "donnees minimales, meilleure maitrise du profil"
  },
  {
    id: "join_challenge",
    label: "rejoindre un challenge viral",
    baseRisk: "medium",
    platformUse: "interactions mesurees pour pousser plus de notifications"
  }
];

function pickAgeLabel(ageBandLabel) {
  if (!ageBandLabel) return AGE_DEFAULT;
  if (ageBandLabel.includes("7") || ageBandLabel.includes("11")) return "7-11 ans";
  if (ageBandLabel.includes("12") || ageBandLabel.includes("14")) return "12-14 ans";
  if (ageBandLabel.includes("15") || ageBandLabel.includes("17")) return "15-17 ans";
  return AGE_DEFAULT;
}

function ImageSlot({ filename, caption }) {
  const [broken, setBroken] = useState(false);

  return (
    <article className={styles.imageCard}>
      <h4>{caption}</h4>
      <div className={styles.imageFrame}>
        {!broken && (
          <img
            src={`/images/stories/generated/${filename}`}
            alt={caption}
            onError={() => setBroken(true)}
          />
        )}
        {broken && (
          <div className={styles.placeholder}>
            <p>Encart image</p>
            <code>{filename}</code>
          </div>
        )}
      </div>
    </article>
  );
}

export function InteractiveStoryEngine({ story, ageBandLabel }) {
  const [setup, setSetup] = useState({ characterId: "", placeId: "", actionId: "" });
  const [phase, setPhase] = useState("setup");
  const [midChoice, setMidChoice] = useState(null);

  const ageLabel = useMemo(() => pickAgeLabel(ageBandLabel), [ageBandLabel]);
  const profile = STORY_PROFILES[ageLabel] || STORY_PROFILES[AGE_DEFAULT];

  // On relit les choix aux objets sources pour generer l'histoire dynamique.
  const selectedCharacter = useMemo(
    () => CHARACTERS.find((item) => item.id === setup.characterId),
    [setup.characterId]
  );
  const selectedPlace = useMemo(
    () => PLACES.find((item) => item.id === setup.placeId),
    [setup.placeId]
  );
  const selectedAction = useMemo(
    () => ACTIONS.find((item) => item.id === setup.actionId),
    [setup.actionId]
  );

  const canStart = Boolean(selectedCharacter && selectedPlace && selectedAction);
  const riskFromSetup = selectedAction?.baseRisk || "medium";

  const introText = useMemo(() => {
    if (!canStart) return "";

    return `${selectedCharacter.name}, ${selectedCharacter.role}, est ${selectedPlace.name}. ` +
      `Iel veut ${selectedAction.label}. L'ambiance est ${profile.introTone}. ` +
      `Premier reflexe utile: ${selectedCharacter.goodReflex}. ` +
      `Le service collecte deja des signaux: ${selectedPlace.dataPoint}.`;
  }, [canStart, selectedCharacter, selectedPlace, selectedAction, profile.introTone]);

  const middleText = useMemo(() => {
    if (!canStart) return "";

    return `Le site propose des options pour accelerer l'inscription. ` +
      `Si ${selectedCharacter.name} va trop vite, la plateforme peut recuperer ${selectedCharacter.riskyData}. ` +
      `Utilisation possible de ces donnees: ${selectedAction.platformUse}.`;
  }, [canStart, selectedCharacter, selectedAction]);

  const finalData = useMemo(() => {
    if (!midChoice || !canStart) return null;

    const safeChoice = midChoice.impact === "safe";
    const safeSetupBonus = riskFromSetup === "low" ? 1 : 0;
    const score = (safeChoice ? 2 : 0) + safeSetupBonus;

    if (safeChoice) {
      return {
        endingTitle: "Fin positive: compte securise",
        endingText:
          `${selectedCharacter.name} garde le controle de son compte. ` +
          `Les infos sensibles restent limitees, et le profil est configure de facon privee.`,
        lesson:
          "Lecon: ralentir, verifier les reglages, puis parler a un adulte en cas de doute.",
        score
      };
    }

    return {
      endingTitle: "Fin a risque: donnees trop exposees",
      endingText:
        `Le contenu circule plus loin que prevu. ${selectedCharacter.name} perd une partie du controle ` +
        `car des donnees ont ete donnees trop vite.`,
      lesson:
        "Lecon: evite les decisions sous pression, coupe l'echange et active les protections.",
      score
    };
  }, [midChoice, canStart, riskFromSetup, selectedCharacter]);

  const fileBase = `${story.slug}-${setup.characterId || "perso"}-${setup.placeId || "lieu"}-${setup.actionId || "action"}`;

  function startStory() {
    if (!canStart) return;
    setPhase("middle");
  }

  function handleMidChoice(choice) {
    setMidChoice(choice);
    setPhase("ending");
  }

  function restart() {
    setSetup({ characterId: "", placeId: "", actionId: "" });
    setMidChoice(null);
    setPhase("setup");
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h3>Mode interactif: {profile.scenarioTitle}</h3>
        <p>{profile.reminder}</p>
      </header>

      <section className={styles.imageSlots}>
        <ImageSlot filename={`${fileBase}-scene-intro.png`} caption="Image 1: debut" />
        <ImageSlot filename={`${fileBase}-scene-choix.png`} caption="Image 2: moment du choix" />
        <ImageSlot filename={`${fileBase}-scene-fin.png`} caption="Image 3: fin" />
      </section>

      {phase === "setup" && (
        <section className={styles.block}>
          <h4>1) Choisis ton personnage, lieu et action de depart</h4>
          <div className={styles.choiceGrid}>
            <div>
              <label>Personnage</label>
              <select
                value={setup.characterId}
                onChange={(event) => setSetup((prev) => ({ ...prev, characterId: event.target.value }))}
              >
                <option value="">Selectionner</option>
                {CHARACTERS.map((item) => (
                  <option value={item.id} key={item.id}>{item.name} - {item.role}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Lieu</label>
              <select
                value={setup.placeId}
                onChange={(event) => setSetup((prev) => ({ ...prev, placeId: event.target.value }))}
              >
                <option value="">Selectionner</option>
                {PLACES.map((item) => (
                  <option value={item.id} key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Action</label>
              <select
                value={setup.actionId}
                onChange={(event) => setSetup((prev) => ({ ...prev, actionId: event.target.value }))}
              >
                <option value="">Selectionner</option>
                {ACTIONS.map((item) => (
                  <option value={item.id} key={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="button" className={styles.mainBtn} disabled={!canStart} onClick={startStory}>
            Demarrer l'histoire interactive
          </button>
        </section>
      )}

      {phase !== "setup" && (
        <section className={styles.block}>
          <h4>2) Debut de l'histoire</h4>
          <p>{introText}</p>
          <p>{middleText}</p>
        </section>
      )}

      {phase === "middle" && (
        <section className={styles.block}>
          <h4>3) Choix au milieu</h4>
          <p>{profile.middlePrompt}</p>
          <div className={styles.actionsRow}>
            {profile.midChoices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className={styles.choiceBtn}
                onClick={() => handleMidChoice(choice)}
              >
                <strong>{choice.label}</strong>
                <span>{choice.learning}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {phase === "ending" && finalData && (
        <section className={styles.block}>
          <h4>4) Fin conditionnee par tes choix</h4>
          <p><strong>{finalData.endingTitle}</strong></p>
          <p>{finalData.endingText}</p>
          <p className={styles.lesson}>{finalData.lesson}</p>
          <p>
            Score reflexe: <strong>{finalData.score}/3</strong>
          </p>
          <div className={styles.summary}>
            <h5>Ce que la plateforme a pu collecter</h5>
            <ul>
              <li>Contexte: {selectedPlace?.dataPoint}</li>
              <li>Donnee sensible exposee potentielle: {selectedCharacter?.riskyData}</li>
              <li>Usage possible: {selectedAction?.platformUse}</li>
            </ul>
          </div>
          <button type="button" className={styles.mainBtn} onClick={restart}>Rejouer avec d'autres choix</button>
        </section>
      )}
    </section>
  );
}
