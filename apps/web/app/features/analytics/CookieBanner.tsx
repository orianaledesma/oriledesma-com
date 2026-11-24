import { Link } from "react-router";
import { PATHS } from "~/config/routes";
import { useLocale } from "~/i18n";
import { Button } from "~/shared/ui/Button";
import type { ConsentChoice } from "./consent";
import styles from "./CookieBanner.module.css";

const COPY = {
  es: {
    label: "Cookies",
    text: "Uso Google Analytics para saber qué contenido sirve. Solo se activa si aceptás.",
    more: "Más info",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  en: {
    label: "Cookies",
    text: "I use Google Analytics to learn which content helps. It only runs if you accept.",
    more: "Learn more",
    accept: "Accept",
    reject: "Reject",
  },
};

/** Banner no modal: no tapa el contenido ni atrapa el foco. Rechazar pesa lo mismo que aceptar (RGPD). */
export function CookieBanner({ onChoose }: { onChoose: (choice: ConsentChoice) => void }) {
  const copy = COPY[useLocale()];
  return (
    <section className={styles.banner} aria-label={copy.label} data-surface="raised">
      <p className={styles.text}>
        {copy.text} <Link to={PATHS.privacy}>{copy.more}</Link>
      </p>
      <div className={styles.actions}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            onChoose("denied");
          }}
        >
          {copy.reject}
        </Button>
        <Button
          size="sm"
          onClick={() => {
            onChoose("granted");
          }}
        >
          {copy.accept}
        </Button>
      </div>
    </section>
  );
}
