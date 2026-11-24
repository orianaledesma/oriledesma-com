import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Notice.module.css";

/** Aviso en franja blanca (idioma, equipos). */
export function Notice({ icon, children }: { icon?: IconName; children: ReactNode }) {
  return (
    <p className={styles.notice} data-surface="raised">
      {icon && <Icon name={icon} variant="inline" className={styles.icon} />}
      <span>{children}</span>
    </p>
  );
}
