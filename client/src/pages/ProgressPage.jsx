import { useEffect, useState } from "react";
import { childApi } from "../services/childApi";
import { useAuth } from "../context/AuthContext.jsx";

export function ProgressPage() {
  const { token } = useAuth();
  const [progress, setProgress] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    childApi.progress(token).then((res) => setProgress(res.data));
    childApi.badges(token).then((res) => setBadges(res.data));
  }, [token]);

  return (
    <div className="grid grid-2">
      <section className="card">
        <h2>Progression</h2>
        <ul>
          {progress.map((p) => (
            <li key={p.id}>
              {p.gameKey}: meilleur score {p.bestScore}% (tentatives: {p.attempts})
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Badges</h2>
        <ul>
          {badges.map((b) => (
            <li key={b.id}>{b.Badge?.name || "Badge"}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
