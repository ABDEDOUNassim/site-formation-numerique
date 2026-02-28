import { useState } from "react";

function PortraitVideo({ src, title, children }) {
  return (
    <section className="card" style={{ background: "#f9fdff" }}>
      <h3>{title}</h3>
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          borderRadius: "12px",
          border: "1px solid #c7ddf0",
          background: "#000",
          overflow: "hidden",
          aspectRatio: "9 / 16"
        }}
      >
        <video
          controls
          preload="metadata"
          playsInline
          style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
        >
          <source src={src} type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      </div>
      <div style={{ marginTop: "0.8rem" }}>{children}</div>
    </section>
  );
}

function ThemeSection({ title, description, isOpen, onToggle, children }) {
  return (
    <section className="card" style={{ background: "#f7fcff" }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          border: "1px solid #cde2f4",
          borderRadius: "10px",
          padding: "0.75rem",
          background: "#ffffff"
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: "0.35rem 0 0" }}>{description}</p>
        <p style={{ margin: "0.4rem 0 0", color: "#3e5f7d", fontSize: "0.9rem" }}>
          {isOpen ? "Masquer le contenu" : "Afficher le contenu"}
        </p>
      </button>

      {isOpen && (
        <div className="grid" style={{ marginTop: "0.75rem" }}>
          {children}
        </div>
      )}
    </section>
  );
}

export function VideoTutorialsHubPage() {
  const [openTheme, setOpenTheme] = useState(null);

  function toggleTheme(themeId) {
    setOpenTheme((prev) => (prev === themeId ? null : themeId));
  }

  return (
    <article className="card">
      <h2>Espace tutos video</h2>
      <p>
        Retrouve tous les tutoriels vidéo de protection numérique au même endroit, classés
        par thèmes.
      </p>

      <div className="grid" style={{ marginTop: "0.75rem" }}>
        <ThemeSection
          title="Thème 1: Cyberharcèlement"
          description="Réagir vite, garder des preuves et demander de l'aide."
          isOpen={openTheme === "cyber"}
          onToggle={() => toggleTheme("cyber")}
        >
          <PortraitVideo
            src="/videos/cyberharcelement-comment-reagir-720p.mp4"
            title="Cyberharcèlement: comment réagir ?"
          >
            <ul>
              <li>Ne réponds pas sous la colère.</li>
              <li>Fais des captures d'écran (preuves).</li>
              <li>Bloque, signale et parle à un adulte de confiance.</li>
            </ul>
          </PortraitVideo>
        </ThemeSection>

        <ThemeSection
          title="Thème 2: Sécurité des comptes"
          description="4 étapes pour réduire les risques de piratage."
          isOpen={openTheme === "securite"}
          onToggle={() => toggleTheme("securite")}
        >
          <PortraitVideo
            src="/videos/securise-ton-compte-4-etapes-720p.mp4"
            title="Sécurise ton compte en 4 étapes"
          >
            <ol>
              <li>Mot de passe long et unique.</li>
              <li>Double authentification activée.</li>
              <li>Réglages de confidentialité vérifiés.</li>
              <li>Sessions inconnues supprimées.</li>
            </ol>
          </PortraitVideo>
        </ThemeSection>
      </div>
    </article>
  );
}
