import { useEffect, useState } from "react";

const nodes = [
  "Téléphone",
  "Serveur",
  "Partage privé",
  "Capture d'écran",
  "Copie",
  "Repartage"
];

export function MessageJourneyGame({ onSaveProgress }) {
  const [step, setStep] = useState(0);

  // Animation simple: toutes les 1.2 secondes on passe à l'étape suivante.
  useEffect(() => {
    if (step >= nodes.length - 1) return;
    const timer = setTimeout(() => setStep((s) => s + 1), 1200);
    return () => clearTimeout(timer);
  }, [step]);

  const percent = Math.round(((step + 1) / nodes.length) * 100);

  return (
    <section className="card">
      <h2>Jeu: Le message qui voyage</h2>
      <p>Observe comment une donnée peut circuler et être dupliquée.</p>

      <div className="grid grid-2">
        {nodes.map((node, i) => (
          <div
            key={node}
            className="card"
            style={{
              opacity: i <= step ? 1 : 0.35,
              borderColor: i === step ? "#0f8b8d" : "#d6e5f4"
            }}
          >
            {i + 1}. {node}
          </div>
        ))}
      </div>

      <p>Progression: {percent}%</p>
      {step === nodes.length - 1 && (
        <>
          <p>
            Message clé: même un envoi "privé" peut être copié. Réfléchis avant de partager.
          </p>
          <button type="button" onClick={() => onSaveProgress(percent)}>Enregistrer ma progression</button>
        </>
      )}
    </section>
  );
}
