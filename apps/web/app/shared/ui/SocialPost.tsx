import symbolDark from "~/assets/logo/simbolo-fondo-oscuro.svg";
import symbolLight from "~/assets/logo/simbolo-fondo-claro.svg";
import { cx } from "~/shared/lib/cx";
import styles from "./SocialPost.module.css";

export type PostTone = "blanco" | "marino" | "celeste";
export type SocialPostData = { tag: string; title: string; tone: PostTone };

type Props = SocialPostData & {
  /** `square` para la biblioteca de Aprendé, `portrait` (4:5) para el feed. */
  shape?: "portrait" | "square";
  compact?: boolean;
};

/** Post de la grilla de redes, dibujado con la marca (placeholder hasta integrar Instagram). */
export function SocialPost({ tag, title, tone, shape = "portrait", compact = false }: Props) {
  return (
    <div
      className={cx(styles.post, styles[tone], styles[shape], compact && styles.compact)}
      role="img"
      aria-label={`Post: ${title}`}
    >
      <span className={styles.tag}>{tag}</span>
      <span className={styles.title}>{title}</span>
      <img
        className={styles.logo}
        src={tone === "marino" ? symbolDark : symbolLight}
        alt=""
        width="126"
        height="108"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function SocialFeed({ posts }: { posts: readonly SocialPostData[] }) {
  return (
    <div className={styles.feed}>
      {posts.map((post) => (
        <SocialPost key={post.title} {...post} compact />
      ))}
    </div>
  );
}
