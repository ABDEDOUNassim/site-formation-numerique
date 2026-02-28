import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentApi } from "../services/contentApi";
import styles from "./StoriesPage.module.css";

const childStoryIllustrations = {
  "club-etoiles-photo-trop-precise": "/images/stories/enfant-photo.svg",
  "dragon-gentil-chat-jeu": "/images/stories/enfant-inconnu.svg",
  "secret-groupe-arc-en-ciel": "/images/stories/enfant-secret.svg"
};

const storyThemeIllustrations = {
  image: "/images/stories/enfant-photo.svg",
  secrets: "/images/stories/enfant-secret.svg",
  inconnus: "/images/stories/enfant-inconnu.svg",
  manipulation: "/images/youth-games.svg",
  cyberharcelement: "/images/hero-mission.svg"
};

function getStoryImage(story) {
  if (childStoryIllustrations[story.slug]) return childStoryIllustrations[story.slug];
  if (storyThemeIllustrations[story.theme]) return storyThemeIllustrations[story.theme];
  return "/images/hero-mission.svg";
}

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
    <section className={`card ${styles.wrapper}`}>
      <h2>Histoires Presque Vrai</h2>
      <label>
        Tranche d'âge
        <select value={ageBandId} onChange={(e) => setAgeBandId(e.target.value)}>
          {ageBands.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
        </select>
      </label>

      <div className={styles.articlesGrid}>
        {stories.map((story) => (
          <Link key={story.id} to={`/jeunes/stories/${story.id}`} className={`card ${styles.storyCard}`}>
            <img
              src={getStoryImage(story)}
              alt={`Illustration ${story.title}`}
              className={styles.storyImage}
            />
            <h3>{story.title}</h3>
            <p>{story.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
