import { DISCARDED, LAUNCH_DATE, LAUNCH_HOURS, MILESTONES } from "~/content/public-numbers";
import { daysBetween } from "~/shared/lib/dates";
import { useHydrated } from "~/shared/lib/useHydrated";
import { Card } from "~/shared/ui/Card";
import { Container } from "~/shared/ui/Container";
import { Icon } from "~/shared/ui/Icon";
import { Grid, SectionHeader } from "~/shared/ui/Layout";
import { Section } from "~/shared/ui/Section";
import { Accent, Lead, Muted, Pending, Pill, Signature } from "~/shared/ui/Text";
import { HoursTable } from "./HoursTable";
import styles from "./PublicNumbersPage.module.css";
import { Timeline } from "./Timeline";

/** Días desde el lanzamiento: se calcula en el cliente (el HTML estático no sabe qué día es hoy). */
function DaysSinceLaunch() {
  const hydrated = useHydrated();
  if (LAUNCH_DATE === "pending" || !hydrated) return <Pending>[placeholder]</Pending>;
  return <>{daysBetween(LAUNCH_DATE, new Date().toISOString().slice(0, 10))}</>;
}

export function PublicNumbersPage() {
  return (
    <>
      <Section variant="hero" surface="noche" stars labelledBy="pub-h1">
        <Container>
          <Pill>En público</Pill>
          <h1 id="pub-h1">
            Los números de esta marca, <Accent>a la vista</Accent>
          </h1>
          <Lead>
            Cuento la facturación por hitos alcanzados y cuánto tardé en llegar a cada uno. También
            las horas reales y lo que no funcionó.
          </Lead>
          <p className={styles.days}>
            Días desde el lanzamiento: <DaysSinceLaunch />
          </p>
        </Container>
      </Section>

      <Section labelledBy="hitos-titulo">
        <Container size="narrow">
          <SectionHeader>
            <Pill>Hitos de facturación</Pill>
            <h2 id="hitos-titulo">De la primera venta a €5.000 por mes</h2>
          </SectionHeader>
          <Timeline milestones={MILESTONES} launchDate={LAUNCH_DATE} />
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="horas-titulo">
        <Container>
          <SectionHeader>
            <Pill>Horas</Pill>
            <h2 id="horas-titulo">Horas estimadas vs. reales del lanzamiento</h2>
            <Lead>
              Por etapa del lanzamiento. Se completa con los datos reales del plan de lanzamiento.
            </Lead>
          </SectionHeader>
          <HoursTable stages={LAUNCH_HOURS} />
        </Container>
      </Section>

      <Section labelledBy="fallos-titulo">
        <Container>
          <SectionHeader>
            <Pill>Lo que no funcionó</Pill>
            <h2 id="fallos-titulo">También muestro lo que descarté</h2>
            <Lead>
              Del proceso de identidad de la marca. Cada error me ahorró tiempo en la etapa
              siguiente.
            </Lead>
          </SectionHeader>
          <Grid cols={2}>
            {DISCARDED.map((item) => (
              <Card key={item.title} tone="alert">
                <span className={styles.alertLabel}>
                  <Icon name="alert" variant="inline" /> No funcionó · {item.area}
                </span>
                <h3>{item.title}</h3>
                <Muted>{item.problem}</Muted>
                <p className={styles.learning}>
                  <strong>Qué cambié:</strong> {item.change}
                </p>
              </Card>
            ))}
          </Grid>
          <Signature>Yo lo pruebo, vos lo aplicás.</Signature>
        </Container>
      </Section>
    </>
  );
}
