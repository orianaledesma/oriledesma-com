import { Link } from "react-router";
import { COURSE_STAGES } from "~/content/course";
import { PATHS } from "~/config/routes";
import { COURSE } from "~/config/site";
import { Actions, Button } from "~/shared/ui/Button";
import { Card } from "~/shared/ui/Card";
import { CheckList } from "~/shared/ui/CheckList";
import { Container } from "~/shared/ui/Container";
import { Faq, type FaqItem } from "~/shared/ui/Faq";
import { Highlight } from "~/shared/ui/Highlight";
import { Grid, HeroGrid, SectionHeader } from "~/shared/ui/Layout";
import { Price } from "~/shared/ui/Price";
import { Section } from "~/shared/ui/Section";
import { Steps } from "~/shared/ui/Steps";
import { Accent, LegalNote, Lead, Muted, Pending, Pill, Signature } from "~/shared/ui/Text";
import styles from "./CoursePage.module.css";
import { CourseSeatsMeter } from "./CourseSeatsMeter";

const price = `US$${COURSE.priceUsd}`;
const startDate = <Pending>[fecha de inicio]</Pending>;

const FAQ: FaqItem[] = [
  {
    question: "¿Cuándo empieza?",
    answer: (
      <p>
        La primera cohorte arranca el {startDate}. Son {COURSE.seats} lugares.
      </p>
    ),
  },
  {
    question: "¿Necesito saber de tecnología o de diseño?",
    answer: (
      <p>
        No. Cada etapa se explica desde cero y con la marca real como ejemplo. Te alcanza con tener
        ganas de armar tu marca y unas horas por semana.
      </p>
    ),
  },
  {
    question: "¿Cuánto tiempo le tengo que dedicar?",
    answer: (
      <p>
        Cada etapa tiene una clase grabada de hasta 30 minutos y un vivo de demostración de{" "}
        <Pending>[duración del vivo]</Pending>. Lo que tardes en aplicarlo a tu marca depende de
        vos.
      </p>
    ),
  },
  {
    question: "¿Y si no puedo estar en el vivo?",
    answer: <p>Todas las clases y todos los vivos quedan grabados. Los mirás cuando puedas.</p>,
  },
  {
    question: "¿Cómo se elige el negocio del vivo?",
    answer: (
      <p>
        En cada etapa hago la demostración con el negocio de un alumno de la cohorte, uno por vivo.
        Así ves el paso a paso aplicado a un caso distinto del mío.
      </p>
    ),
  },
  {
    question: "¿Cómo pago?",
    answer: (
      <p>
        Con tarjeta, a través de <Pending>[Stripe o Lemon Squeezy]</Pending>. El precio es {price}.
      </p>
    ),
  },
  {
    question: "¿Hay devolución?",
    answer: (
      <p>
        <Pending>[política de devolución a definir]</Pending>
      </p>
    ),
  },
];

export function CoursePage() {
  return (
    <>
      <Section variant="hero" surface="celeste" labelledBy="curso-h1">
        <Container>
          <HeroGrid>
            <div>
              <Pill>Curso · primera cohorte</Pill>
              <h1 id="curso-h1">{COURSE.name}</h1>
              <Lead>
                Armá tu marca siguiendo el lanzamiento real de Ori Ledesma IA, paso a paso. Todo lo
                que hice para lanzar esta marca, con el tiempo real y lo que no funcionó.
              </Lead>
              <Actions>
                <Button href="#comprar">Reservar mi lugar</Button>
                <Button href="#etapas" variant="secondary">
                  Ver las etapas
                </Button>
              </Actions>
            </div>
            <Highlight flat>
              <div>
                <Price amount={price} note={<>pago único · empieza el {startDate}</>} />
                <CourseSeatsMeter />
              </div>
            </Highlight>
          </HeroGrid>
        </Container>
      </Section>

      <Section id="etapas" labelledBy="etapas-titulo">
        <Container>
          <SectionHeader>
            <Pill>{COURSE_STAGES.length} etapas</Pill>
            <h2 id="etapas-titulo">El mismo camino que hice yo</h2>
            <Lead>
              Una clase grabada de hasta 30 minutos por etapa y, después, un vivo de demostración
              con el negocio de un alumno.
            </Lead>
          </SectionHeader>
          <Steps steps={COURSE_STAGES} columns="auto" />
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="formato-titulo">
        <Container>
          <Grid cols={2} className={styles.format}>
            <div>
              <Pill>Formato</Pill>
              <h2 id="formato-titulo">Clase grabada + vivo con un alumno</h2>
              <p>
                En cada etapa mirás la clase cuando puedas. Después hacemos un vivo en el que aplico
                ese paso al negocio de un alumno de la cohorte, para que veas cómo cambia en un caso
                distinto del mío.
              </p>
              <Muted>Un negocio de alumno por vivo. Todo queda grabado.</Muted>
            </div>
            <div>
              <Pill>Incluye</Pill>
              <CheckList
                items={[
                  `${COURSE.lessons} clases grabadas de hasta 30 minutos`,
                  "Vivos de demostración con negocios de alumnos",
                  "Las plantillas y los prompts que uso yo",
                  "La comunidad del grupo",
                  "Todas las grabaciones",
                ]}
              />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section labelledBy="para-titulo">
        <Container>
          <SectionHeader>
            <Pill>¿Es para vos?</Pill>
            <h2 id="para-titulo">Para quién es y para quién no</h2>
          </SectionHeader>
          <Grid cols={2}>
            <Card>
              <h3>Es para vos si…</h3>
              <CheckList
                items={[
                  "Tenés un negocio o estás por lanzar uno y querés armar su marca con IA.",
                  "Arrancás de cero con la IA y querés un paso a paso, sin jerga.",
                  "Querés ver un caso real, con tiempos y números, no teoría.",
                  "Preferís aprender a hacerlo vos antes que tercerizarlo.",
                ]}
              />
            </Card>
            <Card>
              <h3>No es para vos si…</h3>
              <CheckList
                negative
                items={[
                  <>
                    Buscás que alguien te arme todo: para eso está la{" "}
                    <Link to={PATHS.implementation}>implementación</Link>.
                  </>,
                  "Querés aprender a programar.",
                  "Buscás la herramienta de IA del momento en lugar de un sistema.",
                ]}
              />
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="testimonios-titulo">
        <Container>
          <h2 id="testimonios-titulo" className="sr-only">
            Testimonios
          </h2>
          <div className={styles.empty}>
            <Pill>Testimonios</Pill>
            <p>Testimonios de la primera cohorte (próximamente)</p>
          </div>
        </Container>
      </Section>

      <Section id="comprar" labelledBy="comprar-titulo">
        <Container>
          <Highlight tone="noche">
            <div>
              <Pill>Primera cohorte</Pill>
              <h2 id="comprar-titulo">Reservá tu lugar</h2>
              <Lead>
                Empieza el {startDate}. Son <Accent>{COURSE.seats} lugares</Accent> y uno de ustedes
                es el negocio de cada vivo.
              </Lead>
            </div>
            <div>
              <Price amount={price} note="pago único con tarjeta" />
              {/* El checkout se conecta cuando se elija proveedor (Stripe o Lemon Squeezy). */}
              <Actions>
                <Button href="#comprar" aria-describedby="nota-pago">
                  Comprar el curso
                </Button>
              </Actions>
              <LegalNote id="nota-pago" className={styles.legal}>
                Botón de pago simulado. <Pending>[Stripe o Lemon Squeezy]</Pending>
              </LegalNote>
            </div>
          </Highlight>
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="faq-curso">
        <Container>
          <SectionHeader>
            <Pill>Preguntas frecuentes</Pill>
            <h2 id="faq-curso">Antes de reservar</h2>
          </SectionHeader>
          <Faq items={FAQ} />
          <Signature>Yo lo pruebo, vos lo aplicás.</Signature>
        </Container>
      </Section>
    </>
  );
}
