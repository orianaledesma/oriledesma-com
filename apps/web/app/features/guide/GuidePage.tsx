import logoVertical from "~/assets/logo/logo-vertical-fondo-claro.svg";
import { GuideForm } from "~/features/leads/GuideForm";
import { guideCopy } from "./copy";
import { Card } from "~/shared/ui/Card";
import { Container } from "~/shared/ui/Container";
import { HeroGrid } from "~/shared/ui/Layout";
import { Section } from "~/shared/ui/Section";
import { Accent, LegalNote, Lead, Pending, Pill, Signature } from "~/shared/ui/Text";
import styles from "./GuidePage.module.css";

/** Temas de cada día: se completan cuando la guía esté escrita. */
const DAYS = Array.from({ length: 7 }, (_, i) => i + 1);

export function GuidePage() {
  const copy = guideCopy();
  return (
    <Section variant="hero" surface="celeste" labelledBy="guia-h1">
      <Container>
        <HeroGrid alignStart>
          <div>
            <img className={styles.logo} src={logoVertical} alt="" width="200" height="151" />
            <Pill block>{copy.pill}</Pill>
            <h1 id="guia-h1">
              Tus primeros <Accent>7 días</Accent> con IA
            </h1>
            <Lead>{copy.lead}</Lead>
            <Card as="div" className={styles.formCard}>
              <GuideForm source="guide-page" />
              <LegalNote className={styles.legal}>{copy.legal}</LegalNote>
            </Card>
          </div>
          <div>
            <h2 className={styles.daysTitle}>Qué trae cada día</h2>
            <ol className={styles.days}>
              {DAYS.map((day) => (
                <li key={day}>
                  <span className={styles.dayNumber}>Día {day}</span>
                  <Pending>[tema del día {day}]</Pending>
                </li>
              ))}
            </ol>
            <Signature>Yo lo pruebo, vos lo aplicás.</Signature>
          </div>
        </HeroGrid>
      </Container>
    </Section>
  );
}
