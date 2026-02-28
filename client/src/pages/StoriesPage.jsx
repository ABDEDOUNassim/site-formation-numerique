import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentApi } from "../services/contentApi";

const childStoryIllustrations = {
  "club-etoiles-photo-trop-precise": "/images/stories/enfant-photo.svg",
  "dragon-gentil-chat-jeu": "/images/stories/enfant-inconnu.svg",
  "secret-groupe-arc-en-ciel": "/images/stories/enfant-secret.svg"
};

export function StoriesPage() {
  const [stories, setStories] = useState([]);
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
    contentApi.stories(ageBandId).then((res) => setStories(res.data));
  }, [ageBandId]);

  return (
    <section className="card">
      <h2>Histoires Presque Vrai</h2>
      <label>
        Tranche d'âge
        <select value={ageBandId} onChange={(e) => setAgeBandId(e.target.value)}>
          {ageBands.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
        </select>
      </label>

      <div className="grid">
        {stories.map((story) => (
          <Link key={story.id} to={`/jeunes/stories/${story.id}`} className="card">
            {childStoryIllustrations[story.slug] && (
              <img
                src={childStoryIllustrations[story.slug]}
                alt={`Illustration ${story.title}`}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "0.65rem",
                  border: "1px solid #c9def0"
                }}
              />
            )}
            <h3>{story.title}</h3>
            <p>{story.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
