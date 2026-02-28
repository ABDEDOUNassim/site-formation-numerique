import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="grid">
      <section className="card hero">
        <div>
          <h1>Plateforme Numérique Responsable</h1>
          <p>
            Une plateforme éducative pour aider les jeunes a comprendre les usages du numerique,
            se proteger en ligne et developper des reflexes concrets.
          </p>
          <div className="pillRow">
            <span className="pill">Prevention sans culpabilisation</span>
            <span className="pill">Modules 7-11 / 12-14 / 15-17</span>
            <span className="pill">Jeux + histoires + code lab</span>
          </div>
          <p className="highlight">
            Mission: transformer la sensibilisation en experience positive, ludique et actionnable.
          </p>
        </div>
        <img className="heroImage" src="/images/hero-mission.svg" alt="Illustration prevention numerique" />
      </section>

      <section className="grid grid-2">
        <Link className="card" to="/structures">
          <h2>Espace Structures</h2>
          <p>Presentation de la formation, programme pedagogique, modalites et prise de contact.</p>
        </Link>
        <Link className="card" to="/jeunes">
          <h2>Espace Jeunes</h2>
          <p>Parcours ludique avec jeux interactifs, histoires Presque Vrai et progression par badges.</p>
        </Link>
      </section>
    </div>
  );
}
