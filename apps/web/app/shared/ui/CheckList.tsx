import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./CheckList.module.css";

/** Lista con tilde (o con guion si `negative`: "no es para vos si…"). */
export function CheckList({
  items,
  negative = false,
}: {
  items: readonly ReactNode[];
  negative?: boolean;
}) {
  return (
    <ul className={cx(styles.list, negative && styles.negative)}>
      {items.map((item, i) => (
        // El contenido es estático y no se reordena: el índice es una key estable.
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
