import styles from "./SpriteStory.module.css";

export function SpriteStory({
  frameIndex = 0,
  caption = "",
  spriteSrc = "/assets/sprite_vocal.png",
  totalFrames = 5
}) {
  return (
    <figure className={styles.item} role="img" aria-label={caption}>
      <div className={styles.thumb}>
        <div
          className={styles.spriteFrame}
          style={{
            backgroundImage: `url('${spriteSrc}')`,
            backgroundPositionX: `${-512 * frameIndex}px`,
            backgroundSize: `${512 * totalFrames}px 512px`
          }}
          aria-hidden="true"
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
