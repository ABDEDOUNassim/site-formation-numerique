import { Link } from "react-router-dom";

export function YouthHomePage() {
  return (
    <div className="grid">
      <section className="card hero">
        <div>
          <h1>Espace Jeunes</h1>
          <p>Apprends a te proteger en ligne avec des jeux, des histoires et des outils creatifs.</p>
        </div>
        <img className="heroImage" src="/images/youth-games.svg" alt="Illustration espace jeunes et jeux" />
      </section>

      <section className="grid grid-2">
        <Link className="card" to="games/secure-signup">
          <h3>Jeu Inscription securisee</h3>
          <p>Choisir un pseudo, regler la confidentialite et renforcer son mot de passe.</p>
        </Link>
        <Link className="card" to="games/reflex-cards">
          <h3>Jeu Cartes Reflexes</h3>
          <p>Reagir a des situations concretes avec feedback pedagogique immediat.</p>
        </Link>
        <Link className="card" to="games/message-journey">
          <h3>Jeu Message qui voyage</h3>
          <p>Visualiser comment une photo ou un message peut etre copie et repartage.</p>
        </Link>
        <Link className="card" to="stories">
          <h3>Histoires Presque Vrai</h3>
          <p>Recits classes par age avec conseils de protection et adultes ressources.</p>
        </Link>
        <Link className="card" to="my-stories">
          <h3>Mes histoires privees</h3>
          <p>Ecrire, sauvegarder et modifier ses histoires dans un espace personnel prive.</p>
        </Link>
        <Link className="card" to="code-lab">
          <h3>Code Lab HTML</h3>
          <p>Experimenter du code en direct avec un editeur simple et un apercu instantane.</p>
        </Link>
        <Link className="card" to="tutorials">
          <h3>Tutos de protection</h3>
          <p>Fiches courtes: mot de passe, compte prive, partage de photo, parler a un adulte.</p>
        </Link>
        <Link className="card" to="tutorials/videos">
          <h3>Espace tutos video</h3>
          <p>Tous les tutos video au meme endroit: cyberharcelement et securisation de compte.</p>
        </Link>
        <Link className="card" to="progress">
          <h3>Progression et badges</h3>
          <p>Suivre ses scores et celebrer ses progres grace a des badges pedagogiques.</p>
        </Link>
      </section>
    </div>
  );
}
