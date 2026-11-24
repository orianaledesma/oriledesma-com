import type { CSSProperties, ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Layout.module.css";

type Base = { className?: string | undefined; children: ReactNode };

/** Grilla responsive de 2, 3 o 4 columnas. */
export function Grid({
  cols,
  as: Tag = "div",
  className,
  children,
}: Base & { cols: 2 | 3 | 4; as?: "div" | "ul" }) {
  return <Tag className={cx(styles.grid, styles[`cols${cols}`], className)}>{children}</Tag>;
}

/** Dos columnas desiguales: texto + visual. `inverse` le da más ancho a la primera. */
export function Split({
  inverse = false,
  alignStart = false,
  className,
  children,
}: Base & { inverse?: boolean; alignStart?: boolean }) {
  return (
    <div
      className={cx(
        styles.split,
        inverse && styles.inverse,
        alignStart && styles.alignStart,
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Encabezado de sección: píldora, título y bajada, con ancho de lectura. */
export function SectionHeader({ className, children, style }: Base & { style?: CSSProperties }) {
  return (
    <div className={cx(styles.header, className)} style={style}>
      {children}
    </div>
  );
}

/** Grilla del hero: texto a la izquierda, visual a la derecha (se apilan en mobile). */
export function HeroGrid({
  alignStart = false,
  className,
  children,
}: Base & { alignStart?: boolean }) {
  return (
    <div className={cx(styles.heroGrid, alignStart && styles.alignStart, className)}>
      {children}
    </div>
  );
}
