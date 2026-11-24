import type { ReactNode } from "react";
import styles from "./SeatsMeter.module.css";

type Props = {
  total: number;
  remaining: number;
  /** Texto de la barra ("Quedan 12 de 20 lugares"). */
  label: string;
  /** Nombre accesible de la barra. */
  ariaLabel: string;
  /** Titular sobre la barra ("20 lugares en la primera cohorte"). */
  children?: ReactNode;
  busy?: boolean;
};

/** Barra de cupos. Presentacional: el dato lo trae el contenedor desde la API. */
export function SeatsMeter({ total, remaining, label, ariaLabel, children, busy = false }: Props) {
  const percent = total > 0 ? Math.max(2, (remaining / total) * 100) : 0;
  return (
    <div className={styles.meter} aria-busy={busy || undefined}>
      {children}
      <div
        className={styles.track}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={remaining}
        aria-valuetext={label}
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
