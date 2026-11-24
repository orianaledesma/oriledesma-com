import { Container } from "~/shared/ui/Container";
import { Section } from "~/shared/ui/Section";
import { Pending } from "~/shared/ui/Text";
import styles from "./LegalPage.module.css";

/** Privacidad y términos: el texto legal todavía no está definido. */
export function LegalPage({ title, placeholder }: { title: string; placeholder: string }) {
  return (
    <Section labelledBy="legal-h1" className={styles.legal}>
      <Container size="text">
        <h1 id="legal-h1">{title}</h1>
        <p>
          <Pending>{placeholder}</Pending>
        </p>
      </Container>
    </Section>
  );
}
