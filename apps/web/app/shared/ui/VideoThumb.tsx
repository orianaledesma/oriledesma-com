import { cx } from "~/shared/lib/cx";
import { Icon } from "./Icon";
import styles from "./VideoThumb.module.css";

type Props = {
  /** La palabra de la miniatura ("PROBADO"). Se le suma el punto Miel. */
  word: string;
  note?: string;
  size?: "md" | "sm";
  /** Con `href` es un link al video; sin él, una imagen decorativa con nombre accesible. */
  href?: string;
  label: string;
  showPlay?: boolean;
};

/** Miniatura estilo "Noche, una palabra" (placeholder hasta integrar YouTube). */
export function VideoThumb({ word, note, size = "md", href, label, showPlay = true }: Props) {
  const content = (
    <>
      <span className={styles.word} aria-hidden="true">
        {word}
        <b>.</b>
      </span>
      {showPlay && (
        <span className={styles.play} aria-hidden="true">
          <Icon name="play" variant="inline" />
        </span>
      )}
      {note && (
        <span className={styles.note} aria-hidden="true">
          {note}
        </span>
      )}
    </>
  );
  const className = cx(styles.thumb, styles[size]);

  return href ? (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      data-surface="noche"
      data-stars
    >
      {content}
    </a>
  ) : (
    <div className={className} role="img" aria-label={label} data-surface="noche" data-stars>
      {content}
    </div>
  );
}
