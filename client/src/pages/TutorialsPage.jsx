import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { contentApi } from "../services/contentApi";
import styles from "./TutorialsPage.module.css";

const PROGRESS_KEY = "tutorial_progress_v1";

const THEME_META = {
  "securite-compte": { label: "Sécurité du compte", emoji: "🔐", level: "Essentiel" },
  "partage-photo": { label: "Partage de photo", emoji: "📷", level: "Pratique" },
  inconnus: { label: "Inconnus en ligne", emoji: "🧭", level: "Vigilance" },
  secrets: { label: "Secrets et pression", emoji: "🤝", level: "Réflexe" },
  cyberharcelement: { label: "Cyberharcèlement", emoji: "🛡️", level: "Soutien" },
  manipulation: { label: "Manipulation", emoji: "🧠", level: "Analyse" }
};

function getThemeMeta(theme) {
  return THEME_META[theme] || { label: "Protection numérique", emoji: "💡", level: "Réflexe" };
}

function readProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = JSON.parse(raw || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function writeProgress(value) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(value));
  } catch {
    // no-op
  }
}

export function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]);
  const [ageBands, setAgeBands] = useState([]);
  const [ageBandId, setAgeBandId] = useState("");
  const [themeFilter, setThemeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  useEffect(() => {
    contentApi.ageBands().then((res) => {
      setAgeBands(res.data);
      setAgeBandId(res.data[0]?.id || "");
    });
  }, []);

  useEffect(() => {
    if (!ageBandId) return;
    contentApi.tutorials(ageBandId).then((res) => setTutorials(res.data));
  }, [ageBandId]);

  const filteredTutorials = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tutorials.filter((item) => {
      const okTheme = themeFilter === "all" || item.theme === themeFilter;
      const okText =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query);

      return okTheme && okText;
    });
  }, [tutorials, themeFilter, search]);

  const themes = useMemo(
    () => [...new Set(tutorials.map((item) => item.theme).filter(Boolean))],
    [tutorials]
  );

  const completedCount = useMemo(
    () => tutorials.filter((item) => progress[item.id]).length,
    [tutorials, progress]
  );

  const missionTutorial = filteredTutorials[0] || tutorials[0] || null;

  function toggleDone(id) {
    setProgress((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      writeProgress(next);
      return next;
    });
  }

  return (
    <section className={`card ${styles.wrapper}`}>
      <h2>Tutos de protection</h2>

      <div className={styles.hero}>
        <div className={styles.heroMain}>
          <h3>Parcours fun et concret</h3>
          <p>
            Choisis ta tranche d'âge, valide des mini-objectifs, puis applique les bons réflexes
            dans ta vraie vie numérique.
          </p>
        </div>

        <div className={styles.heroSide}>
          <h4>Espace vidéos</h4>
          <p>Retrouve les tutoriels vidéo classés par thème dans un seul espace.</p>
          <Link to="/jeunes/tutorials/videos" className={styles.videoLink}>
            Voir l'espace vidéo
          </Link>
        </div>
      </div>

      <div className={styles.filters}>
        <label>
          Tranche d'âge
          <select value={ageBandId} onChange={(event) => setAgeBandId(event.target.value)}>
            {ageBands.map((band) => (
              <option key={band.id} value={band.id}>
                {band.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Thème
          <select value={themeFilter} onChange={(event) => setThemeFilter(event.target.value)}>
            <option value="all">Tous les thèmes</option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {getThemeMeta(theme).label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Recherche
          <input
            className={styles.searchInput}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ex: mot de passe, photo, inconnu"
          />
        </label>
      </div>

      <div className={styles.stats}>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Tutos disponibles</span>
          <span className={styles.statValue}>{tutorials.length}</span>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Résultats filtrés</span>
          <span className={styles.statValue}>{filteredTutorials.length}</span>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Tutos maîtrisés</span>
          <span className={styles.statValue}>{completedCount}</span>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Mission du jour</span>
          <span className={styles.statValue}>{missionTutorial ? "✅" : "—"}</span>
        </article>
      </div>

      {missionTutorial && (
        <article className="card">
          <h3>Mission du jour</h3>
          <p>
            Commence par: <strong>{missionTutorial.title}</strong>
          </p>
          <Link className={styles.cardLink} to={`/jeunes/tutorials/${missionTutorial.id}`}>
            Lancer cette mission
          </Link>
        </article>
      )}

      <div className={styles.grid}>
        {filteredTutorials.map((tutorial) => {
          const theme = getThemeMeta(tutorial.theme);
          const done = Boolean(progress[tutorial.id]);

          return (
            <article key={tutorial.id} className={styles.tutorialCard}>
              <div className={styles.cardHead}>
                <span className={styles.themeBadge}>
                  <span>{theme.emoji}</span>
                  <span>{theme.label}</span>
                </span>
                <span className={styles.levelPill}>{theme.level}</span>
              </div>

              <Link to={`/jeunes/tutorials/${tutorial.id}`} className={styles.titleLink}>
                <h3>{tutorial.title}</h3>
              </Link>

              <p className={styles.meta}>
                Format: fiche pratique courte • objectif: autonomie numérique
              </p>

              <div className={styles.actionRow}>
                <button
                  type="button"
                  className={`${styles.cardBtn} ${done ? styles.cardBtnDone : ""}`}
                  onClick={() => toggleDone(tutorial.id)}
                >
                  {done ? "Maîtrisé" : "Marquer maîtrisé"}
                </button>

                <Link className={styles.cardLink} to={`/jeunes/tutorials/${tutorial.id}`}>
                  Ouvrir
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {filteredTutorials.length === 0 && (
        <div className={styles.empty}>
          Aucun tutoriel ne correspond à ce filtre. Essaie un autre thème ou vide la recherche.
        </div>
      )}
    </section>
  );
}
