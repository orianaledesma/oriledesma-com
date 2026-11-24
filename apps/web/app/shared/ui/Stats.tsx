import { cx } from "~/shared/lib/cx";
import styles from "./Stats.module.css";

export type Stat = { value: string; label: string };

/** Datos grandes con filete Celeste ("13 agentes", "2,4M"). */
export function Stats({ stats, single = false }: { stats: readonly Stat[]; single?: boolean }) {
  return (
    <ul className={cx(styles.stats, single && styles.single)}>
      {stats.map((stat) => (
        <li key={stat.label} className={styles.stat}>
          <span className={styles.value}>{stat.value}</span>
          <span className={styles.label}>{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
