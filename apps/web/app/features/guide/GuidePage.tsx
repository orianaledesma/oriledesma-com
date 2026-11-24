import logoVertical from "~/assets/logo/logo-vertical-fondo-claro.svg";
import { GuideForm } from "~/features/leads/GuideForm";
import { Card } from "~/shared/ui/Card";
import { Container } from "~/shared/ui/Container";
import { HeroGrid } from "~/shared/ui/Layout";
import { Section } from "~/shared/ui/Section";
import { Accent, LegalNote, Lead, Pending, Pill, Signature } from "~/shared/ui/Text";
import styles from "./GuidePage.module.css";

/** Temas de cada día: se completan cuando la guía esté escrita. */
const DAYS = Array.from({ length: 7 }, (_, i) => i + 1);

export function GuidePage() {
  return (
    <Section variant="hero" surface="celeste" labelledBy="guia-h1">
      <Container>
        <HeroGrid alignStart>
          <div>
            <img className={styles.logo} src={logoVertical} alt="" width="200" height="151" />
            <Pill block>Guía gratis</Pill>
            <h1 id="guia-h1">
              Tus primeros <Accent>7 días</Accent> con IA
            </h1>
            <Lead>
              Un paso por día para empezar a usar la IA en tu negocio, sin saber de tecnología. Te
              llega por email.
            </Lead>
            <Card as="div" className={styles.formCard}>
              <GuideForm source="guide-page" />
              <LegalNote className={styles.legal}>
                Te llega la guía y, después, un email por semana con lo que voy probando. Podés
                darte de baja cuando quieras.
              </LegalNote>
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
