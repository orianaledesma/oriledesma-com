import { cx } from "~/shared/lib/cx";
import styles from "./Steps.module.css";

export type Step = { title: string; text: string };

type Props = {
  steps: readonly Step[];
  /** `auto` reparte en tantas columnas como entren (mín. 240px). */
  columns?: 3 | 4 | "auto";
};

/** Pasos numerados. El número lo pone CSS (counter), así la lista sigue siendo un <ol> real. */
export function Steps({ steps, columns = 3 }: Props) {
  return (
    <ol className={cx(styles.steps, styles[`cols${columns}`])}>
      {steps.map((step) => (
        <li key={step.title} className={styles.step}>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.text}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
