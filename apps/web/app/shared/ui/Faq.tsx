import type { ReactNode } from "react";
import styles from "./Faq.module.css";

export type FaqItem = { question: string; answer: ReactNode };

/**
 * Preguntas frecuentes con <details>/<summary>: accesible y funcional sin JavaScript,
 * y el contenido queda en el HTML prerenderizado para SEO.
 */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.question}>{item.question}</summary>
          <div className={styles.answer}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
