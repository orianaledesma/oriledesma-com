import { PAST_LIVES_PLACEHOLDERS, UPCOMING_LIVES } from "~/content/lives";
import { LIVE_PLATFORMS, SOCIAL } from "~/config/site";
import { LiveApplicationForm } from "~/features/leads/LiveApplicationForm";
import { Actions, Button } from "~/shared/ui/Button";
import { Card } from "~/shared/ui/Card";
import { Container } from "~/shared/ui/Container";
import { FactSheet } from "~/shared/ui/FactSheet";
import { Grid, HeroGrid, SectionHeader } from "~/shared/ui/Layout";
import { Section } from "~/shared/ui/Section";
import { Steps } from "~/shared/ui/Steps";
import { Accent, Lead, Pending, Pill, Signature } from "~/shared/ui/Text";
import { VideoThumb } from "~/shared/ui/VideoThumb";
import { Agenda } from "./Agenda";
import styles from "./LivesPage.module.css";

const CRITERIA = [
  {
    title: "Un proceso concreto",
    text: "Una tarea que se repite y te come horas: pedidos, mensajes, turnos, catálogo.",
  },
  {
    title: "Que le sirva a otros",
    text: "Un caso que otros dueños puedan copiar en su propio negocio.",
  },
  {
    title: "Que se pueda mostrar",
    text: "Que aceptes que tu negocio aparezca en el vivo y en la grabación.",
  },
];

export function LivesPage() {
  return (
    <>
      <Section variant="hero" surface="noche" stars labelledBy="vivos-h1">
        <Container>
          <HeroGrid>
            <div>
              <Pill>Consultoría en vivo del mes · gratis</Pill>
              <h1 id="vivos-h1">
                Un negocio del público, un sistema con IA, <Accent>en vivo</Accent>
              </h1>
              <Lead>
                Cada mes elijo un negocio entre los que se postulan y le armo un sistema con IA en
                vivo, en {LIVE_PLATFORMS}, de principio a fin y con el tiempo real.
              </Lead>
              <Actions>
                <Button href="#postular">Postulá tu negocio</Button>
                <Button href="#proximos" variant="secondary">
                  Ver los próximos vivos
                </Button>
              </Actions>
            </div>
            <Card as="div">
              <FactSheet
                facts={[
                  { label: "Próximo vivo", value: <Pending>[fecha y hora]</Pending> },
                  { label: "Dónde", value: LIVE_PLATFORMS },
                  { label: "Duración", value: <Pending>[duración]</Pending> },
                  { label: "Costo", value: "Gratis" },
                  {
                    label: "Canales",
                    value: (
                      <>
                        <a href={SOCIAL.youtube} target="_blank" rel="noopener">
                          YouTube @OriledesmaIA
                        </a>
                        <br />
                        Twitch <Pending>[usuario de Twitch]</Pending>
                        <br />
                        Kick <Pending>[usuario de Kick]</Pending>
                      </>
                    ),
                  },
                ]}
              />
            </Card>
          </HeroGrid>
        </Container>
      </Section>

      <Section surface="celeste" labelledBy="elijo-titulo">
        <Container>
          <SectionHeader>
            <Pill>Cómo elijo el negocio</Pill>
            <h2 id="elijo-titulo">Qué busco en las postulaciones</h2>
          </SectionHeader>
          <Steps steps={CRITERIA} />
        </Container>
      </Section>

      <Section surface="blanca" id="postular" labelledBy="postular-titulo">
        <Container size="narrow">
          <SectionHeader>
            <Pill>Formulario</Pill>
            <h2 id="postular-titulo">Postulá tu negocio</h2>
            <Lead>Te aviso por email si tu negocio queda elegido para el próximo vivo.</Lead>
          </SectionHeader>
          <LiveApplicationForm />
        </Container>
      </Section>

      <Section id="proximos" labelledBy="proximos-titulo">
        <Container>
          <SectionHeader>
            <Pill>Agenda</Pill>
            <h2 id="proximos-titulo">Próximos vivos</h2>
          </SectionHeader>
          <Agenda events={UPCOMING_LIVES} />
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="anteriores-titulo">
        <Container>
          <SectionHeader>
            <Pill>Grabaciones</Pill>
            <h2 id="anteriores-titulo">Vivos anteriores</h2>
          </SectionHeader>
          <Grid cols={3}>
            {Array.from({ length: PAST_LIVES_PLACEHOLDERS }, (_, i) => (
              <article key={i}>
                <VideoThumb
                  word="EN VIVO"
                  note="Vivo anterior · 1280 × 720"
                  size="sm"
                  showPlay={false}
                  label="Miniatura del vivo (placeholder)"
                />
                <h3 className={styles.pastTitle}>
                  <Pending>[Título del vivo {i + 1}]</Pending>
                </h3>
              </article>
            ))}
          </Grid>
          <Signature>Yo lo pruebo, vos lo aplicás.</Signature>
        </Container>
      </Section>
    </>
  );
}
