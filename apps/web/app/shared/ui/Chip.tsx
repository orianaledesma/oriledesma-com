import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Chip.module.css";

export function Chip({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "pillar" | "numbers";
  children: ReactNode;
}) {
  return <span className={cx(styles.chip, styles[tone])}>{children}</span>;
}

export function ChipList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>;
}
