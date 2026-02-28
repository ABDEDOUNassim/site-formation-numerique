import { Link, Outlet } from "react-router-dom";

export function StructuresPage() {
  return (
    <div className="grid" style={{ gap: "0.75rem" }}>
      <section className="card hero">
        <div>
          <h1>Espace Structures</h1>
          <p>
            Formation prevention numerique pour MECS, colleges, lycees, associations et PJJ.
            Le contenu est adapte aux contextes educatifs et aux realites terrain.
          </p>
          <div className="pillRow">
            <span className="pill">Interventions interactives</span>
            <span className="pill">Supports pedagogiques fournis</span>
            <span className="pill">Approche bienveillante</span>
          </div>
        </div>
        <img className="heroImage" src="/images/structures-training.svg" alt="Illustration formation structures" />
      </section>

      <section className="card">
        <div className="grid grid-2">
          <Link className="card" to="formation">Présentation formation</Link>
          <Link className="card" to="programme">Programme</Link>
          <Link className="card" to="modalites">Modalités</Link>
          <Link className="card" to="contact">Contact</Link>
          <Link className="card" to="downloads">Téléchargements</Link>
        </div>
      </section>
      <Outlet />
    </div>
  );
}
