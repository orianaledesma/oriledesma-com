import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Text.module.css";

type Children = { children: ReactNode; className?: string | undefined };

/** Etiqueta en píldora ("ESTILO 1" de la plantilla de miniaturas). */
export function Pill({ children, className, block = false }: Children & { block?: boolean }) {
  return <span className={cx(styles.pill, block && styles.block, className)}>{children}</span>;
}

/** Una palabra o dato por sección, en píldora Miel (Marino sobre Celeste). */
export function Accent({ children }: Children) {
  return <span className={styles.accent}>{children}</span>;
}

/** Dato todavía no definido: se muestra a propósito para que no pase desapercibido. */
export function Pending({ children, className }: Children) {
  return <span className={cx(styles.pending, className)}>{children}</span>;
}

/** Bajada de sección. */
export function Lead({ children, className }: Children) {
  return <p className={cx(styles.lead, className)}>{children}</p>;
}

export function Muted({ children, className }: Children) {
  return <p className={cx(styles.muted, className)}>{children}</p>;
}

/** La firma de la marca. */
export function Signature({ children, className, spaced = true }: Children & { spaced?: boolean }) {
  return <p className={cx(styles.signature, spaced && styles.spaced, className)}>{children}</p>;
}

export function LegalNote({ children, className, id }: Children & { id?: string }) {
  return (
    <p id={id} className={cx(styles.legal, className)}>
      {children}
    </p>
  );
}
