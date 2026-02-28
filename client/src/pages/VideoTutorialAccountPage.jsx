export function VideoTutorialAccountPage() {
  return (
    <article className="card">
      <h2>Tuto vidéo: Sécurise ton compte en 4 étapes</h2>
      <p>
        Ce tuto te montre un plan clair et rapide pour protéger ton compte contre le piratage
        et la perte de contrôle.
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
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      </div>

      <h3>Les 4 étapes du tuto</h3>
      <ol>
        <li>Créer un mot de passe long et unique.</li>
        <li>Activer la double authentification.</li>
        <li>Rendre le profil plus privé (messages, visibilité).</li>
        <li>Vérifier les connexions actives et supprimer les sessions inconnues.</li>
      </ol>

      <h3>Bon réflexe à retenir</h3>
      <p className="highlight">
        Un compte sécurisé, c'est un compte surveillé: mets à jour tes réglages régulièrement.
      </p>
    </article>
  );
}
