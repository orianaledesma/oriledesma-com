import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Window.module.css";

type Props = {
  tone?: "marino" | "celeste";
  tilted?: boolean;
  /** Pie de la ventana, dentro de la pantalla. */
  caption?: ReactNode;
  className?: string | undefined;
  children: ReactNode;
};

/** La "pantalla" girada de las miniaturas: marco de ventana con tres puntos. */
export function Window({ tone = "celeste", tilted = true, caption, className, children }: Props) {
  return (
    <figure className={cx(styles.window, styles[tone], tilted && styles.tilted, className)}>
      <div className={styles.bar} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={styles.screen}>
        {children}
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </div>
    </figure>
  );
}
