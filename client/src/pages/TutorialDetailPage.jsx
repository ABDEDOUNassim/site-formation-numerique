import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { contentApi } from "../services/contentApi";
import styles from "./TutorialDetailPage.module.css";

const CHECKLISTS = {
  "securite-compte": [
    "Mot de passe long et unique activé",
    "Double authentification activée",
    "Profil en privé ou visibilité maîtrisée",
    "Sessions inconnues supprimées"
  ],
  "partage-photo": [
    "Je vérifie le fond de la photo",
    "Je demande l'accord des personnes visibles",
    "Je n'ajoute pas de lieu précis",
    "Je réfléchis avant de publier"
  ],
  inconnus: [
    "Je ne donne pas mes infos personnelles",
    "Je ne clique pas sur des liens suspects",
    "Je bloque le compte douteux",
    "J'en parle à un adulte de confiance"
  ],
  cyberharcelement: [
    "Je garde des preuves (captures)",
    "Je bloque et je signale",
    "Je ne réponds pas sous la colère",
    "Je demande de l'aide rapidement"
  ]
};

const THEME_LABELS = {
  "securite-compte": "Sécurité du compte",
  "partage-photo": "Partage de photo",
  inconnus: "Inconnus en ligne",
  secrets: "Secrets et pression",
  cyberharcelement: "Cyberharcèlement",
  manipulation: "Manipulation"
};

function themeLabel(theme) {
  return THEME_LABELS[theme] || "Protection numérique";
}

function extractQuickActions(content) {
  const sentences = String(content || "")
    .split(/[.!?]\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return sentences.slice(0, 4);
}

export function TutorialDetailPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [ageBands, setAgeBands] = useState([]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    contentApi.tutorial(id).then((res) => setTutorial(res.data));
  }, [id]);

  useEffect(() => {
    contentApi.ageBands().then((res) => setAgeBands(res.data));
  }, []);

  const quickActions = useMemo(
    () => extractQuickActions(tutorial?.content),
    [tutorial?.content]
  );

  if (!tutorial) return <section className="card">Chargement...</section>;

  const ageBandLabel = ageBands.find((item) => item.id === tutorial.ageBandId)?.label || "";
  const checklist = CHECKLISTS[tutorial.theme] || [
    "Je prends le temps avant d'agir",
    "Je vérifie les réglages de confidentialité",
    "Je protège mes informations personnelles",
    "Je demande de l'aide en cas de doute"
  ];

  return (
    <section className={`card ${styles.wrapper}`}>
      <header className={styles.header}>
        <h2>{tutorial.title}</h2>
        <p>Fiche pratique: des actions concrètes pour devenir autonome et responsable en ligne.</p>
        <div className={styles.metaRow}>
          <span className={styles.pill}>Thème: {themeLabel(tutorial.theme)}</span>
          {ageBandLabel && <span className={styles.pill}>Tranche d'âge: {ageBandLabel}</span>}
          <span className={styles.pill}>Format: 5 min</span>
        </div>
      </header>

      <div className={styles.layout}>
        <article className={styles.block}>
          <h3>Contenu du tutoriel</h3>
          <p className={styles.content}>{tutorial.content}</p>
        </article>

        <aside className={styles.block}>
          <h3>Actions rapides</h3>
          <ul className={styles.quickList}>
            {quickActions.map((item, index) => (
              <li key={`${item}-${index}`}>{item}.</li>
            ))}
          </ul>
        </aside>
      </div>

      <article className={styles.block}>
        <h3>Checklist d'entraînement</h3>
        <div className={styles.checklist}>
          {checklist.map((item, index) => (
            <label key={`${item}-${index}`} className={styles.checkItem}>
              <input
                type="checkbox"
                checked={Boolean(checked[index])}
                onChange={(event) =>
                  setChecked((prev) => ({ ...prev, [index]: event.target.checked }))
                }
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </article>

      <article className={styles.challenge}>
        <h3>Défi 24h</h3>
        <p>
          Choisis une action de cette fiche et applique-la aujourd'hui sur un de tes comptes.
          Reviens demain et vérifie ce qui a changé.
        </p>
      </article>
    </section>
  );
}
