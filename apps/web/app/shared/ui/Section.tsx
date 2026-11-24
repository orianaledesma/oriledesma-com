import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Section.module.css";

export type Surface = "niebla" | "blanca" | "celeste" | "noche";

type Props = {
  surface?: Surface;
  /** Estrellas decorativas de la estética "Noche". */
  stars?: boolean;
  /** `hero` usa el padding del encabezado de página. */
  variant?: "section" | "hero";
  centered?: boolean;
  id?: string;
  /** id del título que nombra la sección (aria-labelledby). */
  labelledBy?: string;
  /** Nombre accesible cuando la sección no tiene título visible. */
  label?: string;
  className?: string | undefined;
  children: ReactNode;
};

export function Section({
  surface = "niebla",
  stars = false,
  variant = "section",
  centered = false,
  id,
  labelledBy,
  label,
  className,
  children,
}: Props) {
  return (
    <section
      id={id}
      data-surface={surface}
      data-stars={stars || undefined}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cx(styles[variant], centered && styles.centered, className)}
    >
      {children}
    </section>
  );
}
