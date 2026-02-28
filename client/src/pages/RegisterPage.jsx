import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { registerChild } from "../services/authApi";
import { contentApi } from "../services/contentApi";

export function RegisterPage() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [ageBandId, setAgeBandId] = useState("");
  const [ageBands, setAgeBands] = useState([]);
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    contentApi.ageBands().then((res) => {
      setAgeBands(res.data);
      if (res.data[0]) setAgeBandId(res.data[0].id);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await registerChild({ pseudo, password, ageBandId });
      auth.login(response.data.token, response.data.user);
      navigate("/jeunes");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="card">
      <h1>Inscription enfant</h1>
      <p>Le compte utilise un pseudo. Aucun nom réel n'est obligatoire.</p>
      <form onSubmit={handleSubmit}>
        <label>Pseudo<input value={pseudo} onChange={(e) => setPseudo(e.target.value)} required /></label>
        <label>Mot de passe<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <label>Tranche d'âge
          <select value={ageBandId} onChange={(e) => setAgeBandId(e.target.value)}>
            {ageBands.map((band) => (
              <option key={band.id} value={band.id}>{band.label}</option>
            ))}
          </select>
        </label>
        <button type="submit">Créer mon compte</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}
