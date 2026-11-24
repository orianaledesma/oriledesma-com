import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Card.module.css";

type Props = {
  as?: "article" | "div" | "li";
  /** Borde Marino para la opción recomendada. */
  highlighted?: boolean;
  /** Filete rojo superior: "esto no funcionó". */
  tone?: "default" | "alert";
  compact?: boolean;
  id?: string;
  labelledBy?: string;
  className?: string | undefined;
  children: ReactNode;
};

/** Tarjeta: contenido claro sobre el fondo de "raised" que define la sección contenedora. */
export function Card({
  as: Tag = "article",
  highlighted = false,
  tone = "default",
  compact = false,
  id,
  labelledBy,
  className,
  children,
}: Props) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-surface="raised"
      className={cx(
        styles.card,
        highlighted && styles.highlighted,
        tone === "alert" && styles.alert,
        compact && styles.compact,
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Pie de tarjeta: queda siempre abajo, aunque las tarjetas de la fila tengan alturas distintas. */
export function CardFooter({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className={styles.badge}>{children}</span>;
}

/** Rubro o categoría en mayúsculas sobre el título. */
export function Kicker({ children }: { children: ReactNode }) {
  return <span className={styles.kicker}>{children}</span>;
}
