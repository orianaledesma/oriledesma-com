import type { LiveEvent } from "~/content/schema";
import { formatDate } from "~/shared/lib/dates";
import { Chip } from "~/shared/ui/Chip";
import { Pending } from "~/shared/ui/Text";
import styles from "./Agenda.module.css";

const KIND_LABEL: Record<LiveEvent["kind"], string> = {
  consultoria: "Consultoría",
  curso: "Vivo del curso",
};

export function Agenda({ events }: { events: readonly LiveEvent[] }) {
  return (
    <ul className={styles.agenda}>
      {events.map((event) => (
        <li key={event.title} className={styles.item}>
          <span className={styles.date}>
            {event.date === "pending" ? (
              <Pending>[fecha]</Pending>
            ) : (
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            )}
          </span>
          <div>
            <strong>{event.title}</strong>
            <br />
            <span className={styles.detail}>
              {event.detailPending ? <Pending>{event.detail}</Pending> : event.detail}
            </span>
          </div>
          <Chip>{KIND_LABEL[event.kind]}</Chip>
        </li>
      ))}
    </ul>
  );
}
