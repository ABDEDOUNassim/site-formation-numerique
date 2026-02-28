import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authApi";
import { useAuth } from "../context/AuthContext.jsx";

export function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await login({ identifier, password });
      auth.login(response.data.token, response.data.user);
      navigate("/jeunes");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="card">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>Pseudo ou email<input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required /></label>
        <label>Mot de passe<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Pas de compte ? <Link to="/register">Créer un compte enfant</Link></p>
    </section>
  );
}
