import symbol from "~/assets/logo/simbolo-marino-mono.svg";
import { cx } from "~/shared/lib/cx";
import { Picture } from "./Picture";
import { PHOTOS } from "./photos";
import styles from "./PhotoArch.module.css";

type Props = {
  alt: string;
  caption?: string;
  size?: "md" | "sm";
  priority?: boolean;
};

/** El arco Celeste con la foto: recurso de los banners de la marca. */
export function PhotoArch({ alt, caption, size = "md", priority = false }: Props) {
  return (
    <figure className={cx(styles.arch, styles[size])}>
      <div className={styles.shape}>
        <img className={styles.symbol} src={symbol} alt="" width="528" height="446" />
        <Picture
          photo={PHOTOS.arco}
          alt={alt}
          sizes="(min-width: 900px) 440px, 90vw"
          className={styles.photo}
          priority={priority}
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
