export function VideoTutorialPage() {
  return (
    <article className="card">
      <h2>Tuto video: Cyberharcelement - Comment reagir ?</h2>
      <p>
        Cette video explique les bons reflexes pour reagir rapidement en cas de cyberharcelement,
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
          Votre navigateur ne prend pas en charge la lecture video.
        </video>
      </div>

      <h3>Objectifs du tuto</h3>
      <ul>
        <li>Comprendre les premiers signaux du cyberharcelement.</li>
        <li>Savoir quoi faire dans le bon ordre pour se proteger.</li>
        <li>Identifier les adultes et relais a contacter rapidement.</li>
      </ul>

      <h3>Plan d action en 5 etapes</h3>
      <ol>
        <li>Ne reponds pas sous la colere.</li>
        <li>Fais des captures d ecran (preuves).</li>
        <li>Bloque le compte qui attaque.</li>
        <li>Signale le contenu ou le profil sur la plateforme.</li>
        <li>Parle a un adulte de confiance (parent, CPE, educateur).</li>
      </ol>

      <p className="highlight">
        Message cle: demander de l aide est une force. Tu n as pas a gerer ca seul.
      </p>
    </article>
  );
}
