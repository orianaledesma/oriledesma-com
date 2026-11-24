import { useT } from "~/i18n";
import styles from "./SkipLink.module.css";

export const MAIN_CONTENT_ID = "contenido";

export function SkipLink() {
  const t = useT();
  return (
    <a className={styles.skip} href={`#${MAIN_CONTENT_ID}`}>
      {t.skipToContent}
    </a>
  );
}
