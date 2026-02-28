import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CodeLab.module.css";
import { PROJECTS } from "./codelabProjects";
import {
  deleteSave,
  formatDate,
  getSaves,
  hasAnySave,
  renameSave,
  writeSave,
} from "./useSaves";

/* ─────────────────────────────────────────────────────────────────────────────
   Constantes
───────────────────────────────────────────────────────────────────────────── */
const EDITOR_TABS = [
  { id: "html", label: "HTML",          color: "#e34c26", icon: "📄" },
  { id: "css",  label: "CSS",           color: "#264de4", icon: "🎨" },
  { id: "js",   label: "JS",            color: "#f0b429", icon: "⚙️" },
];
const SINGLE_TAB = { id: "html", label: "Code complet", color: "#10b981", icon: "📄" };

function stars(n) { return "⭐".repeat(n); }

/* Construit le srcDoc pour le mode "separated" */
function buildSrcDoc(html, css, js) {
  return `<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body>${html}${js ? `<script>${js}<\/script>` : ""}</body></html>`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Écran de sélection
───────────────────────────────────────────────────────────────────────────── */
function SelectScreen({ onSelect }) {
  return (
    <div className={styles.selectScreen}>
      <div className={styles.selectHero}>
        <span className={styles.selectIcon}>💻</span>
        <h2 className={styles.selectTitle}>Qu'est-ce qu'on crée aujourd'hui ?</h2>
        <p className={styles.selectSub}>Choisis un projet et construis-le pas à pas !</p>
      </div>
      <div className={styles.projectGrid}>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            className={styles.projectCard}
            style={{ "--c": p.color, "--cl": p.colorLight }}
            onClick={() => onSelect(p)}
          >
            <span className={styles.projectEmoji}>{p.emoji}</span>
            <span className={styles.projectTitle}>{p.title}</span>
            <span className={styles.projectTagline}>{p.tagline}</span>
            <span className={styles.diffBadge} style={{ background: p.color }}>
              {stars(p.difficulty)} {p.difficultyLabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Écran félicitations
───────────────────────────────────────────────────────────────────────────── */
function CongratsScreen({ project, onBackToSelect, onContinue }) {
  return (
    <div className={styles.congrats}>
      <span className={styles.congratsEmoji}>🎉</span>
      <h2 className={styles.congratsTitle}>Félicitations !</h2>
      <p className={styles.congratsText}>
        Tu as terminé <strong>{project.title}</strong> de bout en bout.
        Tu es un vrai développeur !
      </p>
      <div className={styles.congratsActions}>
        <button className={styles.btnContinue} style={{ background: project.color }} onClick={onContinue}>
          ✏️ Continuer à modifier
        </button>
        <button className={styles.btnBack} onClick={onBackToSelect}>
          🏠 Autre projet
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Boîte de pratique (exercice enfant)
───────────────────────────────────────────────────────────────────────────── */
function PracticeBox({ practice }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className={styles.practiceBox}>
      <div className={styles.practiceHeader}>
        <span className={styles.practiceBadge}>✏️ À toi de jouer !</span>
      </div>
      <p className={styles.practicePrompt}>{practice.prompt}</p>
      {practice.hint && !showHint && (
        <button className={styles.btnHint} onClick={() => setShowHint(true)}>
          💡 Voir un indice
        </button>
      )}
      {showHint && (
        <pre className={styles.practiceHint}>{practice.hint}</pre>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Snippet de code affiché dans la sidebar
───────────────────────────────────────────────────────────────────────────── */
function SnippetBlock({ tabId, code, color, label, onInject }) {
  const [done, setDone] = useState(false);

  function handleInject() {
    navigator.clipboard.writeText(code).catch(() => {});
    onInject(tabId, code);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }

  return (
    <div className={styles.snippetBlock}>
      <div className={styles.snippetBlockHeader}>
        <span className={styles.snippetBlockLabel} style={{ color }}>{label}</span>
        <button className={styles.btnInject} style={{ background: color }} onClick={handleInject}>
          {done ? "✅ Inséré !" : "↙ Insérer"}
        </button>
      </div>
      <pre className={styles.snippetCode}>{code}</pre>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar gauche — instructions de l'étape
───────────────────────────────────────────────────────────────────────────── */
function Sidebar({ project, step, stepIndex, onPrev, onNext, onInject }) {
  const total = project.steps.length;
  const isLast = stepIndex === total - 1;
  const isSingle = project.mode === "single";

  return (
    <aside className={styles.sidebar}>
      {/* En-tête coloré */}
      <div className={styles.sidebarHeader} style={{ background: project.color }}>
        <span className={styles.sidebarEmoji}>{project.emoji}</span>
        <div>
          <span className={styles.sidebarProjectName}>{project.title}</span>
          <span className={styles.sidebarStepCount}>Étape {stepIndex + 1} / {total}</span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((stepIndex + 1) / total) * 100}%`, background: project.color }}
        />
      </div>

      {/* Corps scrollable */}
      <div className={styles.sidebarBody}>
        <h3 className={styles.stepTitle}>{step.title}</h3>

        <div className={styles.conceptBox} style={{ borderLeftColor: project.color }}>
          <span className={styles.conceptTag} style={{ background: project.color }}>{step.concept}</span>
          <p className={styles.conceptDesc}>{step.conceptDesc}</p>
        </div>

        <div className={styles.explainList}>
          {step.explains.map((ex, i) => (
            <div key={i} className={styles.explainItem}>
              <span className={styles.explainIcon}>{ex.icon}</span>
              <span className={styles.explainText}>{ex.text}</span>
            </div>
          ))}
        </div>

        {/* Exercice de pratique */}
        {step.practice && <PracticeBox practice={step.practice} />}

        {/* Blocs de code à insérer */}
        <div className={styles.snippetSection}>
          <p className={styles.snippetLabel}>
            {isSingle
              ? "📋 Copie tout le code dans l'onglet :"
              : "📋 Copie dans le bon onglet :"}
          </p>

          {isSingle && step.html && (
            <SnippetBlock
              tabId="html"
              code={step.html}
              color={SINGLE_TAB.color}
              label="📄 Code complet"
              onInject={onInject}
            />
          )}

          {!isSingle && step.html && (
            <SnippetBlock
              tabId="html"
              code={step.html}
              color="#e34c26"
              label="📄 HTML"
              onInject={onInject}
            />
          )}
          {!isSingle && step.css && (
            <SnippetBlock
              tabId="css"
              code={step.css}
              color="#264de4"
              label="🎨 CSS"
              onInject={onInject}
            />
          )}
          {!isSingle && step.js && (
            <SnippetBlock
              tabId="js"
              code={step.js}
              color="#f0b429"
              label="⚙️ JS"
              onInject={onInject}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.sidebarNav}>
        <button className={styles.btnPrev} onClick={onPrev} disabled={stepIndex === 0}>
          ← Préc.
        </button>
        <div className={styles.dots}>
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={i === stepIndex ? styles.dotActive : i < stepIndex ? styles.dotDone : styles.dot}
              style={i === stepIndex ? { background: project.color } : {}}
            />
          ))}
        </div>
        <button
          className={styles.btnNext}
          style={{ background: isLast ? "#22c55e" : project.color }}
          onClick={onNext}
        >
          {isLast ? "🎉 Terminer" : "Suivant →"}
        </button>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Zone éditeur : onglets + textarea + expand + preview
───────────────────────────────────────────────────────────────────────────── */
function EditorZone({ mode, html, css, js, activeTab, onTabChange, onChange }) {
  const textareaRef = useRef(null);
  // expand: null | "code" | "preview"
  const [expand, setExpand] = useState(null);

  const isSingle = mode === "single";
  const tabs = isSingle ? [SINGLE_TAB] : EDITOR_TABS;
  const activeTabInfo = tabs.find((t) => t.id === activeTab) || tabs[0];

  const currentValue = isSingle ? html : activeTab === "html" ? html : activeTab === "css" ? css : js;

  const srcDoc = isSingle ? html : buildSrcDoc(html, css, js);

  function handleChange(e) {
    onChange(activeTab, e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      if (!ta) return;
      const s = ta.selectionStart;
      const next = currentValue.slice(0, s) + "  " + currentValue.slice(ta.selectionEnd);
      onChange(activeTab, next);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + 2; });
    }
  }

  function toggleExpand(target) {
    setExpand((prev) => (prev === target ? null : target));
  }

  const codeHidden    = expand === "preview";
  const previewHidden = expand === "code";

  return (
    <div className={styles.editorZone}>
      {/* ── Onglets HTML / CSS / JS ── */}
      {!codeHidden && (
        <div className={styles.editorTabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={tab.id === activeTab ? styles.editorTabActive : styles.editorTab}
              style={tab.id === activeTab ? { borderBottomColor: tab.color, color: tab.color } : {}}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}

          {/* Bouton agrandir l'éditeur */}
          <button
            className={styles.btnExpand}
            title={expand === "code" ? "Réduire l'éditeur" : "Agrandir l'éditeur"}
            onClick={() => toggleExpand("code")}
          >
            {expand === "code" ? "⊡ Réduire" : "⛶ Agrandir"}
          </button>
        </div>
      )}

      {/* ── Textarea ── */}
      {!codeHidden && (
        <div className={styles.editorWrap}>
          <span className={styles.editorBadge} style={{ background: activeTabInfo.color }}>
            {activeTabInfo.icon} {activeTabInfo.label}
          </span>
          <textarea
            key={activeTab}
            ref={textareaRef}
            className={styles.editor}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={
              isSingle         ? "<!-- Colle ici ton code complet -->" :
              activeTab === "html" ? "<!-- Écris ton HTML ici -->" :
              activeTab === "css"  ? "/* Écris ton CSS ici */" :
                                     "// Écris ton JavaScript ici"
            }
          />
        </div>
      )}

      {/* ── Barre aperçu ── */}
      {!previewHidden && (
        <div className={styles.previewBar}>
          <span className={styles.previewBarLabel}>👁️ Aperçu en direct</span>
          {/* Bouton agrandir le preview */}
          <button
            className={styles.btnExpand}
            title={expand === "preview" ? "Réduire l'aperçu" : "Agrandir l'aperçu"}
            onClick={() => toggleExpand("preview")}
          >
            {expand === "preview" ? "⊡ Réduire" : "⛶ Agrandir"}
          </button>
        </div>
      )}

      {/* ── Bouton "Réduire" visible quand preview agrandi (sans previewBar) ── */}
      {expand === "preview" && (
        <div className={styles.previewBar}>
          <span className={styles.previewBarLabel}>👁️ Aperçu — plein écran</span>
          <button
            className={styles.btnExpand}
            onClick={() => setExpand(null)}
          >
            ⊡ Réduire
          </button>
        </div>
      )}

      {/* ── iframe preview ── */}
      <iframe
        title="Aperçu"
        className={`${styles.preview} ${previewHidden ? styles.hidden : ""}`}
        srcDoc={srcDoc}
        sandbox="allow-scripts"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Modal de chargement / nouvelle partie
───────────────────────────────────────────────────────────────────────────── */
function SaveLoadModal({ project, saves, onLoad, onNewGame, onClose }) {
  const [renaming, setRenaming] = useState(null);   // index du slot en cours de renommage
  const [labelDraft, setLabelDraft] = useState(""); // valeur de l'input de renommage
  const allFull = saves.every(Boolean);

  function startRename(i, currentLabel) {
    setRenaming(i);
    setLabelDraft(currentLabel);
  }

  function commitRename(i) {
    renameSave(project.id, i, labelDraft);
    setRenaming(null);
  }

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalCard}>
        {/* En-tête */}
        <div className={styles.modalHeader}>
          <span className={styles.modalEmoji}>{project.emoji}</span>
          <div>
            <h3 className={styles.modalTitle}>{project.title}</h3>
            <p className={styles.modalSub}>Tu as des sauvegardes !</p>
          </div>
          <button className={styles.btnModalClose} onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        {/* Liste des slots */}
        <div className={styles.saveSlotList}>
          {saves.map((save, i) =>
            save ? (
              /* Slot rempli */
              <div key={i} className={styles.saveSlotFilled} style={{ borderColor: project.color }}>
                <div className={styles.saveSlotTop}>
                  {renaming === i ? (
                    <input
                      className={styles.saveLabelInput}
                      value={labelDraft}
                      autoFocus
                      onChange={(e) => setLabelDraft(e.target.value)}
                      onBlur={() => commitRename(i)}
                      onKeyDown={(e) => { if (e.key === "Enter") commitRename(i); if (e.key === "Escape") setRenaming(null); }}
                    />
                  ) : (
                    <span
                      className={styles.saveLabel}
                      title="Cliquer pour renommer"
                      onClick={() => startRename(i, save.label)}
                    >
                      ✏️ {save.label}
                    </span>
                  )}
                  <button
                    className={styles.btnDeleteSave}
                    title="Supprimer cette sauvegarde"
                    onClick={() => { deleteSave(project.id, i); onClose(); /* force re-render */ }}
                  >
                    🗑
                  </button>
                </div>
                <p className={styles.saveSlotMeta}>
                  Étape {save.stepIndex + 1}/{project.steps.length}
                  {save.bestScore ? ` · 🏆 ${save.bestScore} pts` : ""}
                  {" · "}{formatDate(save.timestamp)}
                </p>
                <button
                  className={styles.btnContinueSave}
                  style={{ background: project.color }}
                  onClick={() => onLoad(save)}
                >
                  Continuer →
                </button>
              </div>
            ) : (
              /* Slot vide */
              <button
                key={i}
                className={styles.saveSlotEmpty}
                onClick={() => onNewGame(i)}
              >
                ➕ Slot {i + 1} — Nouvelle partie
              </button>
            )
          )}
        </div>

        {/* Si tous pleins : option nouvelle partie avec choix d'écrasement */}
        {allFull && (
          <p className={styles.modalAllFull}>
            💡 Pour créer une nouvelle partie, supprime une sauvegarde (🗑) d'abord.
          </p>
        )}

        <button className={styles.btnModalCancel} onClick={onClose}>
          ✖ Retour
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Menu de sauvegarde (dropdown depuis le bouton 💾)
───────────────────────────────────────────────────────────────────────────── */
function SaveMenu({ project, saves, stepIndex, onSave, onClose }) {
  const menuRef = useRef(null);

  /* Fermer en cliquant à l'extérieur */
  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  return (
    <div className={styles.saveMenu} ref={menuRef}>
      <p className={styles.saveMenuTitle}>💾 Sauvegarder dans…</p>
      {saves.map((save, i) => (
        <div key={i} className={styles.saveMenuItem}>
          <div className={styles.saveMenuInfo}>
            {save ? (
              <>
                <span className={styles.saveMenuLabel}>{save.label}</span>
                <span className={styles.saveMenuMeta}>Étape {save.stepIndex + 1}</span>
              </>
            ) : (
              <span className={styles.saveMenuEmpty}>Slot {i + 1} — vide</span>
            )}
          </div>
          <button
            className={styles.btnSaveSlot}
            style={{ background: project.color }}
            onClick={() => onSave(i)}
          >
            {save ? "Écraser" : "Sauvegarder"}
          </button>
        </div>
      ))}
      <button className={styles.saveMenuClose} onClick={onClose}>✕ Fermer</button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Composant principal CodeLab
───────────────────────────────────────────────────────────────────────────── */
export function CodeLab() {
  const [view, setView]           = useState("select"); // select | guide | free | congrats
  const [project, setProject]     = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  const [html, setHtml] = useState("");
  const [css, setCss]   = useState("");
  const [js, setJs]     = useState("");
  const [activeTab, setActiveTab] = useState("html");

  // Onglet mobile : "instructions" | "editeur"
  const [mobilePanel, setMobilePanel] = useState("instructions");

  /* ── Système de sauvegarde ── */
  const [pendingProject, setPendingProject] = useState(null); // projet en attente du modal
  const [showSaveMenu, setShowSaveMenu]     = useState(false); // dropdown 💾
  const [currentScore, setCurrentScore]     = useState(0);     // score iframe via postMessage
  // saves du projet en cours (3 slots), recalculé à chaque render
  const saves = project ? getSaves(project.id) : [null, null, null];

  /* ── Capture du score depuis l'iframe ── */
  useEffect(() => {
    function onMsg(e) {
      if (e.data?.type === "codelab_score")
        setCurrentScore(prev => Math.max(prev, e.data.value ?? 0));
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  /* ── Changer d'étape : on conserve le travail écrit dans les onglets ── */
  function loadStep(p, idx) {
    const step = p.steps[idx];
    setActiveTab(step.focusTab || "html");
  }

  /* ── Démarre un projet (vierge ou depuis une sauvegarde) ── */
  function startProject(p, saveData) {
    setProject(p);
    setCurrentScore(0);
    setPendingProject(null);
    setShowSaveMenu(false);
    if (saveData) {
      setStepIndex(saveData.stepIndex ?? 0);
      setHtml(saveData.html ?? "");
      setCss(saveData.css  ?? "");
      setJs(saveData.js   ?? "");
      setActiveTab(saveData.activeTab ?? (p.steps[saveData.stepIndex ?? 0]?.focusTab ?? "html"));
      setView(saveData.view ?? "guide");
    } else {
      setStepIndex(0);
      setHtml(""); setCss(""); setJs("");
      setActiveTab(p.steps[0].focusTab || "html");
      setView("guide");
    }
    setMobilePanel("instructions");
  }

  /* ── Sélection d'un projet : vérifie si des sauvegardes existent ── */
  function handleSelectProject(p) {
    if (hasAnySave(p.id)) {
      setPendingProject(p); // affiche le modal
    } else {
      startProject(p, null);
    }
  }

  /* ── Sauvegarde dans un slot ── */
  function handleSave(slotIndex) {
    if (!project) return;
    writeSave(project.id, slotIndex, {
      stepIndex,
      view,
      html, css, js,
      activeTab,
      bestScore: currentScore > 0 ? currentScore : null,
    });
    setShowSaveMenu(false);
  }

  function handleNext() {
    if (!project) return;
    const next = stepIndex + 1;
    if (next >= project.steps.length) { setView("congrats"); return; }
    setStepIndex(next);
    loadStep(project, next);
    setMobilePanel("editeur");
  }

  function handlePrev() {
    if (stepIndex === 0) return;
    const prev = stepIndex - 1;
    setStepIndex(prev);
    loadStep(project, prev);
    setMobilePanel("instructions");
  }

  /* ── Injection depuis un snippet ── */
  const handleInject = useCallback((tabId, code) => {
    if (tabId === "html") setHtml(prev => prev ? prev + "\n" + code : code);
    else if (tabId === "css") setCss(prev => prev ? prev + "\n" + code : code);
    else setJs(prev => prev ? prev + "\n" + code : code);
    setActiveTab(tabId);
    setMobilePanel("editeur");
  }, []);

  /* ── Changement direct dans l'éditeur ── */
  function handleEditorChange(tabId, value) {
    if (tabId === "html") setHtml(value);
    else if (tabId === "css") setCss(value);
    else setJs(value);
  }

  function handleBackToSelect() { setView("select"); setProject(null); }
  function handleContinue()     { setView("free"); }

  /* ══════════════════════════════════════════════════════════════════════
     RENDU
  ══════════════════════════════════════════════════════════════════════ */

  /* Modal de chargement (s'affiche par-dessus l'écran de sélection) */
  const saveModal = pendingProject && (
    <SaveLoadModal
      project={pendingProject}
      saves={getSaves(pendingProject.id)}
      onLoad={(saveData) => startProject(pendingProject, saveData)}
      onNewGame={() => startProject(pendingProject, null)}
      onClose={() => setPendingProject(null)}
    />
  );

  if (view === "select") {
    return (
      <section className="card">
        <SelectScreen onSelect={handleSelectProject} />
        {saveModal}
      </section>
    );
  }

  if (view === "congrats") {
    return (
      <section className="card">
        <CongratsScreen project={project} onBackToSelect={handleBackToSelect} onContinue={handleContinue} />
      </section>
    );
  }

  const step = project.steps[stepIndex];

  return (
    <section className={styles.labShell}>
      {/* ── Barre de titre ── */}
      <div className={styles.topBar} style={{ borderBottomColor: project.color }}>
        <button className={styles.btnHome} onClick={handleBackToSelect}>🏠</button>
        <span className={styles.topBarTitle}>
          {project.emoji} {project.title}
          {view === "free" && <em className={styles.freeTag}> — mode libre</em>}
        </span>
        {/* ── Bouton sauvegarde ── */}
        <div className={styles.saveWrapper}>
          <button
            className={styles.btnSave}
            title="Sauvegarder ma progression"
            onClick={() => setShowSaveMenu(s => !s)}
          >
            💾
          </button>
          {showSaveMenu && (
            <SaveMenu
              project={project}
              saves={saves}
              stepIndex={stepIndex}
              onSave={handleSave}
              onClose={() => setShowSaveMenu(false)}
            />
          )}
        </div>
        {view === "guide" && (
          <span className={styles.topBarStep}>{stepIndex + 1} / {project.steps.length}</span>
        )}
      </div>

      {/* ── Onglets mobile ── */}
      <div className={styles.mobilePanelTabs}>
        <button
          className={mobilePanel === "instructions" ? styles.mpTabActive : styles.mpTab}
          style={mobilePanel === "instructions" ? { color: project.color, borderBottomColor: project.color } : {}}
          onClick={() => setMobilePanel("instructions")}
        >
          📖 Instructions
        </button>
        <button
          className={mobilePanel === "editeur" ? styles.mpTabActive : styles.mpTab}
          style={mobilePanel === "editeur" ? { color: project.color, borderBottomColor: project.color } : {}}
          onClick={() => setMobilePanel("editeur")}
        >
          💻 Éditeur
        </button>
      </div>

      {/* ── Zone principale ── */}
      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <div
          className={styles.sidebarCol}
          data-hidden={mobilePanel !== "instructions" ? "true" : "false"}
        >
          {view === "guide" ? (
            <Sidebar
              project={project}
              step={step}
              stepIndex={stepIndex}
              onPrev={handlePrev}
              onNext={handleNext}
              onInject={handleInject}
            />
          ) : (
            <div className={styles.freeSidebar}>
              <span style={{ fontSize: "2.5rem" }}>{project.emoji}</span>
              <p className={styles.freeSidebarText}>
                Tu as terminé le projet ! Continue à modifier le code librement. 🚀
              </p>
              <button className={styles.btnBackSmall} onClick={handleBackToSelect}>
                🏠 Choisir un autre projet
              </button>
            </div>
          )}
        </div>

        {/* Éditeur */}
        <div
          className={styles.editorCol}
          data-hidden={mobilePanel !== "editeur" ? "true" : "false"}
        >
          <EditorZone
            mode={project.mode}
            html={html}
            css={css}
            js={js}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </section>
  );
}
