export function VideoTutorialPage() {
  return (
    <article className="card">
      <h2>Tuto vidéo: Cyberharcèlement - Comment réagir ?</h2>
      <p>
        Cette vidéo explique les bons réflexes pour réagir rapidement en cas de cyberharcèlement,
        sans rester seul.
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
          <source src="/videos/cyberharcelement-comment-reagir-720p.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      </div>

      <h3>Objectifs du tuto</h3>
      <ul>
        <li>Comprendre les premiers signaux du cyberharcèlement.</li>
        <li>Savoir quoi faire dans le bon ordre pour se protéger.</li>
        <li>Identifier les adultes et relais à contacter rapidement.</li>
      </ul>

      <h3>Plan d'action en 5 étapes</h3>
      <ol>
        <li>Ne réponds pas sous la colère.</li>
        <li>Fais des captures d'écran (preuves).</li>
        <li>Bloque le compte qui attaque.</li>
        <li>Signale le contenu ou le profil sur la plateforme.</li>
        <li>Parle à un adulte de confiance (parent, CPE, éducateur).</li>
      </ol>

      <p className="highlight">
        Message clé: demander de l'aide est une force. Tu n'as pas à gérer ça seul.
      </p>
    </article>
  );
}
