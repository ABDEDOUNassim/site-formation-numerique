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
          Votre navigateur ne prend pas en charge la lecture video.
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
        Retrouve tous les tutos video de protection numerique au meme endroit, classes
        par themes.
      </p>

      <div className="grid" style={{ marginTop: "0.75rem" }}>
        <ThemeSection
          title="Theme 1: Cyberharcelement"
          description="Reagir vite, garder des preuves, et demander de l aide."
          isOpen={openTheme === "cyber"}
          onToggle={() => toggleTheme("cyber")}
        >
          <PortraitVideo
            src="/videos/cyberharcelement-comment-reagir-720p.mp4"
            title="Cyberharcelement: comment reagir ?"
          >
            <ul>
              <li>Ne reponds pas sous la colere.</li>
              <li>Fais des captures d ecran (preuves).</li>
              <li>Bloque, signale et parle a un adulte de confiance.</li>
            </ul>
          </PortraitVideo>
        </ThemeSection>

        <ThemeSection
          title="Theme 2: Securite des comptes"
          description="4 etapes pour reduire les risques de piratage."
          isOpen={openTheme === "securite"}
          onToggle={() => toggleTheme("securite")}
        >
          <PortraitVideo
            src="/videos/securise-ton-compte-4-etapes-720p.mp4"
            title="Securise ton compte en 4 etapes"
          >
            <ol>
              <li>Mot de passe long et unique.</li>
              <li>Double authentification activee.</li>
              <li>Reglages de confidentialite verifies.</li>
              <li>Sessions inconnues supprimees.</li>
            </ol>
          </PortraitVideo>
        </ThemeSection>
      </div>
    </article>
  );
}
