import { SecureSignupGame } from "../features/games/SecureSignupGame";
import { childApi } from "../services/childApi";
import { useAuth } from "../context/AuthContext.jsx";

export function SecureSignupGamePage() {
  const { token } = useAuth();

  async function onSaveProgress(score) {
    await childApi.saveProgress(token, {
      gameKey: "secure_signup",
      score,
      progressPercent: score
    });
    alert("Progression sauvegardée");
  }

  return <SecureSignupGame onSaveProgress={onSaveProgress} />;
}
