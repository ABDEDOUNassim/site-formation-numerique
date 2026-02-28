import { useEffect, useState } from "react";
import { ReflexCardsGame } from "../features/games/ReflexCardsGame";
import { contentApi } from "../services/contentApi";
import { useAuth } from "../context/AuthContext.jsx";

export function ReflexCardsGamePage() {
  const { user, token } = useAuth();
  const [ageBands, setAgeBands] = useState([]);
  const [ageBandId, setAgeBandId] = useState("");

  useEffect(() => {
    contentApi.ageBands().then((res) => {
      setAgeBands(res.data);
      setAgeBandId(user?.ageBandId || res.data[0]?.id || "");
    });
  }, [user?.ageBandId]);

  return (
    <div className="grid">
      <section className="card">
        <h2>Choisir la tranche d'âge</h2>
        <select value={ageBandId} onChange={(e) => setAgeBandId(e.target.value)}>
          {ageBands.map((b) => (
            <option key={b.id} value={b.id}>{b.label}</option>
          ))}
        </select>
      </section>

      {ageBandId && <ReflexCardsGame ageBandId={ageBandId} token={token} />}
    </div>
  );
}
