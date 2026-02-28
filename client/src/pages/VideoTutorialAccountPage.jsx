export function VideoTutorialAccountPage() {
  return (
    <article className="card">
      <h2>Tuto video: Securise ton compte en 4 etapes</h2>
      <p>
        Ce tuto te montre un plan clair et rapide pour proteger ton compte contre le piratage
        et la perte de controle.
      </p>

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
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "contain"
          }}
        >
          <source src="/videos/securise-ton-compte-4-etapes-720p.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture video.
        </video>
      </div>

      <h3>Les 4 etapes du tuto</h3>
      <ol>
        <li>Creer un mot de passe long et unique.</li>
        <li>Activer la double authentification.</li>
        <li>Rendre le profil plus prive (messages, visibilite).</li>
        <li>Verifier les connexions actives et supprimer les sessions inconnues.</li>
      </ol>

      <h3>Bon reflexe a retenir</h3>
      <p className="highlight">
        Un compte securise, c est un compte surveille: mets a jour tes reglages regulierement.
      </p>
    </article>
  );
}
