import type { Milestone } from "~/content/schema";
import { daysBetween, formatDate } from "~/shared/lib/dates";
import { cx } from "~/shared/lib/cx";
import { Card } from "~/shared/ui/Card";
import { Pending } from "~/shared/ui/Text";
import styles from "./Timeline.module.css";

type Props = { milestones: readonly Milestone[]; launchDate: string };

export function Timeline({ milestones, launchDate }: Props) {
  return (
    <ol className={styles.timeline}>
      {milestones.map((m) => {
        const reached = m.reachedOn !== "pending";
        return (
          <li key={m.title} className={cx(styles.milestone, reached && styles.reached)}>
            <span className={styles.dot} aria-hidden="true" />
            <Card compact>
              <div className={styles.head}>
                <h3 className={styles.title}>{m.title}</h3>
                <span className={cx(styles.status, reached && styles.statusReached)}>
                  {reached ? "Alcanzado" : "En camino"}
                </span>
              </div>
              <p className={styles.description}>{m.description}</p>
              <div className={styles.data}>
                <span>
                  Alcanzado el:{" "}
                  {reached ? (
                    <time dateTime={m.reachedOn}>{formatDate(m.reachedOn)}</time>
                  ) : (
                    <Pending>[fecha]</Pending>
                  )}
                </span>
                <span>
                  Días desde el lanzamiento:{" "}
                  {reached && launchDate !== "pending" ? (
                    daysBetween(launchDate, m.reachedOn)
                  ) : (
                    <Pending>[días]</Pending>
                  )}
                </span>
              </div>
            </Card>
          </li>
        );
      })}
    </ol>
  );
}
