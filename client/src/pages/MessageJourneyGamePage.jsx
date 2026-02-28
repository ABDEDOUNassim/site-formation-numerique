import { MessageVoyageGameV2 } from "../features/games/message-voyage/MessageVoyageGameV2";
import { childApi } from "../services/childApi";
import { useAuth } from "../context/AuthContext.jsx";

export function MessageJourneyGamePage() {
  const { token } = useAuth();

  async function onSaveProgress(score) {
    if (!token) return;
    await childApi.saveProgress(token, {
      gameKey: "message_journey",
      score,
      progressPercent: score
    });
  }

  return <MessageVoyageGameV2 onSaveProgress={onSaveProgress} />;
}
