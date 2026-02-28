import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentApi } from "../services/contentApi";

export function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]);
  const [ageBands, setAgeBands] = useState([]);
  const [ageBandId, setAgeBandId] = useState("");

  useEffect(() => {
    contentApi.ageBands().then((res) => {
      setAgeBands(res.data);
      setAgeBandId(res.data[0]?.id || "");
    });
  }, []);

  useEffect(() => {
    if (!ageBandId) return;
    contentApi.tutorials(ageBandId).then((res) => setTutorials(res.data));
  }, [ageBandId]);

  return (
    <section className="card">
      <h2>Tutos de protection</h2>
      <div className="card" style={{ marginBottom: "0.9rem", background: "#f6fcff" }}>
        <h3>Espace tutos video</h3>
        <p>Retrouve tous les tutos video dans un seul espace.</p>
        <Link to="/jeunes/tutorials/videos">Voir l espace video</Link>
      </div>
            <label>
        Tranche d'âge
        <select value={ageBandId} onChange={(e) => setAgeBandId(e.target.value)}>
          {ageBands.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
        </select>
      </label>
      <div className="grid">
        {tutorials.map((t) => (
          <Link to={`/jeunes/tutorials/${t.id}`} key={t.id} className="card">
            <h3>{t.title}</h3>
            <p>Thème: {t.theme}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
