import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contentApi } from "../services/contentApi";
import { InteractiveStoryEngine } from "../features/stories/InteractiveStoryEngine";

const childStoryIllustrations = {
  "club-etoiles-photo-trop-precise": "/images/stories/enfant-photo.svg",
  "dragon-gentil-chat-jeu": "/images/stories/enfant-inconnu.svg",
  "secret-groupe-arc-en-ciel": "/images/stories/enfant-secret.svg"
};

export function StoryDetailPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [ageBands, setAgeBands] = useState([]);

  useEffect(() => {
    contentApi.story(id).then((res) => setStory(res.data));
  }, [id]);

  useEffect(() => {
    contentApi.ageBands().then((res) => setAgeBands(res.data));
  }, []);

  if (!story) return <section className="card">Chargement...</section>;

  const ageBandLabel =
    ageBands.find((item) => item.id === story.ageBandId)?.label || "";

  return (
    <article className="card">
      <h2>{story.title}</h2>
      <p>
        <strong>Mode histoire interactive:</strong> fais des choix au debut et au milieu pour
        conditionner la fin.
      </p>
      {childStoryIllustrations[story.slug] && (
        <img
          src={childStoryIllustrations[story.slug]}
          alt={`Illustration ${story.title}`}
          style={{
            width: "100%",
            borderRadius: "12px",
            border: "1px solid #c9def0",
            marginBottom: "0.9rem"
          }}
        />
      )}
      <InteractiveStoryEngine story={story} ageBandLabel={ageBandLabel} />
      <hr style={{ margin: "1rem 0", border: "none", borderTop: "1px solid var(--border)" }} />
      <h3>Version lecture classique</h3>
      <p style={{ whiteSpace: "pre-line", lineHeight: 1.65 }}>{story.content}</p>
      <h3>Ce qui se passe</h3>
      <p>{story.whatHappens}</p>
      <h3>Comment se protéger</h3>
      <p>{story.howToProtect}</p>
      <h3>À qui en parler</h3>
      <p>{story.whoToTell}</p>
    </article>
  );
}
