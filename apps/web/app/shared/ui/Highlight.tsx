import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Highlight.module.css";

type Props = {
  /** `light`: bloque blanco. `noche`: bloque Marino con estrellas. */
  tone?: "light" | "noche";
  /** Sin sombra, con filete (para usarlo dentro de un hero). */
  flat?: boolean;
  className?: string | undefined;
  children: ReactNode;
};

/** Bloque destacado de dos columnas (curso, vivo del mes, guía). */
export function Highlight({ tone = "light", flat = false, className, children }: Props) {
  return (
    <div
      data-surface={tone === "light" ? "raised" : "noche"}
      data-stars={tone === "noche" || undefined}
      className={cx(styles.highlight, styles[tone], flat && styles.flat, className)}
    >
      {children}
    </div>
  );
}
