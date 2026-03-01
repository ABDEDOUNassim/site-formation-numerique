import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { contentApi } from "../services/contentApi";
import { SpriteStory } from "../features/stories/SpriteStory";

const childStoryIllustrations = {
  "club-etoiles-photo-trop-precise": "/images/stories/enfant-photo.svg",
  "dragon-gentil-chat-jeu": "/images/stories/enfant-inconnu.svg",
  "secret-groupe-arc-en-ciel": "/images/stories/enfant-secret.svg"
};

/* ── Sprite config : moments clefs de l'histoire ──────────────────────────
   after: index du paragraphe APRÈS lequel injecter le sprite (-1 = avant tout)
   frames: tableau de {frame, caption}
──────────────────────────────────────────────────────────────────────────── */
const STORY_SPRITES = {
  "vocal-garde-pour-pression": {
    spriteSrc: "/assets/sprite_vocal.png",
    totalFrames: 5,
    injections: [
      {
        after: -1,
        frames: [{ frame: 0, caption: "Nassim envoie un vocal de confiance" }]
      },
      {
        after: 2,
        frames: [{ frame: 1, caption: "La menace arrive" }]
      },
      {
        after: 10,
        frames: [{ frame: 2, caption: "Il parle à sa sœur" }]
      },
      {
        after: 11,
        frames: [
          { frame: 3, caption: "Signalement sur Pharos" },
          { frame: 4, caption: "Appel au 3018" }
        ]
      }
    ]
  }
};

/* Groupe de sprites affiché sous le paragraphe pour éviter les zones vides */
function SpriteGroup({ frames, spriteSrc, totalFrames }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.6rem",
        justifyContent: "center",
        margin: "0.45rem 0 0.85rem"
      }}
    >
      {frames.map(({ frame, caption }) => (
        <SpriteStory
          key={frame}
          frameIndex={frame}
          caption={caption}
          spriteSrc={spriteSrc}
          totalFrames={totalFrames}
        />
      ))}
    </div>
  );
}

function StoryContentWithSprites({ content, spriteConfig }) {
  const paragraphs = content.split("\n\n");
  const { spriteSrc, totalFrames, injections } = spriteConfig;

  /* Associe chaque sprite à l'index du paragraphe auquel il s'accroche.
     after: -1  → accroché au paragraphe 0 (intro)
     after: N   → accroché au paragraphe N */
  const spriteByPara = {};
  for (const inj of injections) {
    const idx = inj.after === -1 ? 0 : inj.after;
    spriteByPara[idx] = inj.frames;
  }

  return (
    <div>
      {paragraphs.map((para, i) => {
        const frames = spriteByPara[i];
        if (frames) {
          return (
            <div key={"row-" + i}>
              <p style={{ margin: "0 0 0.35rem", lineHeight: 1.7 }}>{para}</p>
              <SpriteGroup frames={frames} spriteSrc={spriteSrc} totalFrames={totalFrames} />
            </div>
          );
        }
        return (
          <p key={"p-" + i} style={{ margin: "0 0 1rem", lineHeight: 1.7 }}>
            {para}
          </p>
        );
      })}
    </div>
  );
}

export function StoryDetailPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    contentApi.story(id).then((res) => setStory(res.data));
  }, [id]);

  if (!story) return <section className="card">Chargement...</section>;

  const spriteConfig = STORY_SPRITES[story.slug];

  return (
    <article className="card">
      <Link to="/jeunes/stories" style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
        Retour aux histoires
      </Link>
      <h2 style={{ marginTop: "0.6rem" }}>{story.title}</h2>

      {childStoryIllustrations[story.slug] && (
        <img
          src={childStoryIllustrations[story.slug]}
          alt={"Illustration " + story.title}
          style={{
            width: "100%",
            borderRadius: "12px",
            border: "1px solid var(--image-border)",
            marginBottom: "0.9rem"
          }}
        />
      )}

      {spriteConfig ? (
        <StoryContentWithSprites content={story.content} spriteConfig={spriteConfig} />
      ) : (
        <p style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>{story.content}</p>
      )}

      <hr style={{ margin: "1.2rem 0", border: "none", borderTop: "1px solid var(--border)" }} />

      <h3>Ce qui se passe</h3>
      <p>{story.whatHappens}</p>
      <h3>Comment se protéger</h3>
      <p>{story.howToProtect}</p>
      <h3>À qui en parler</h3>
      <p>{story.whoToTell}</p>
    </article>
  );
}
