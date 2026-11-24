import type { ReactNode } from "react";
import styles from "./FactSheet.module.css";

export type Fact = { label: string; value: ReactNode };

/** Ficha de datos clave: valor (para quién, nivel, formato, precio…). */
export function FactSheet({ facts }: { facts: readonly Fact[] }) {
  return (
    <dl className={styles.sheet}>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.row}>
          <dt className={styles.label}>{fact.label}</dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
