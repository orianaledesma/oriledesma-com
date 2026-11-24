import type { ReactNode } from "react";
import styles from "./Price.module.css";

export function Price({ amount, note }: { amount: string; note: ReactNode }) {
  return (
    <p className={styles.price}>
      {amount}
      <small className={styles.note}>{note}</small>
    </p>
  );
}
