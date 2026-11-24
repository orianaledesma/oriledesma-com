import logoDark from "~/assets/logo/logo-horizontal-fondo-oscuro.svg";
import { SOCIAL_POSTS } from "~/content/social-posts";
import { homeStats } from "~/content/proof";
import { WORKSHOPS } from "~/content/workshops";
import { PATHS } from "~/config/routes";
import { COURSE, LIVE_PLATFORMS, SOCIAL } from "~/config/site";
import { CourseSeatsMeter } from "~/features/course/CourseSeatsMeter";
import { GuideForm } from "~/features/leads/GuideForm";
import { PhotoArch } from "~/shared/media/PhotoArch";
import { ProfilePhoto } from "~/shared/media/ProfilePhoto";
import { ArrowLink } from "~/shared/ui/ArrowLink";
import { Actions, Button } from "~/shared/ui/Button";
import { Card, CardFooter, Kicker } from "~/shared/ui/Card";
import { CheckList } from "~/shared/ui/CheckList";
import { Container } from "~/shared/ui/Container";
import { FactSheet } from "~/shared/ui/FactSheet";
import { Faq } from "~/shared/ui/Faq";
import { Highlight } from "~/shared/ui/Highlight";
import { Icon, type IconName } from "~/shared/ui/Icon";
import { Grid, HeroGrid, SectionHeader, Split } from "~/shared/ui/Layout";
import { Price } from "~/shared/ui/Price";
import { Section } from "~/shared/ui/Section";
import { SocialFeed } from "~/shared/ui/SocialPost";
import { Stats } from "~/shared/ui/Stats";
import { Steps } from "~/shared/ui/Steps";
import { Accent, LegalNote, Lead, Pending, Pill, Signature } from "~/shared/ui/Text";
import { VideoThumb } from "~/shared/ui/VideoThumb";
import { AgentsPanel, ChatDemo } from "./ChatDemo";
import { HOME_FAQ } from "./faq";
import styles from "./HomePage.module.css";

const USE_CASES: { icon: IconName; kind: string; quote: string; detail: string }[] = [
  {
    icon: "iceCream",
    kind: "Heladería",
    quote: "Contestar los pedidos de WhatsApp sin estar pegada al celular.",
    detail: "Pedidos, sabores del día, insumos y reseñas en un solo sistema.",
  },
  {
    icon: "gem",
    kind: "Joyería",
    quote:
      "Tener las fotos y las descripciones del catálogo listas sin pasarme la noche escribiendo.",
    detail: "Fotos de producto, descripciones, consultas por DM y catálogo.",
  },
  {
    icon: "bag",
    kind: "Tienda online",
    quote: "Responder las mismas preguntas de envíos y talles sin perder ventas mientras duermo.",
    detail: "Preguntas frecuentes, seguimiento de pedidos y recordatorios.",
  },
  {
    icon: "calendarCheck",
    kind: "Servicio",
    quote: "Confirmar turnos y mandar recordatorios sin hacerlo a mano uno por uno.",
    detail: "Agenda, confirmaciones, recordatorios y pedidos de reseña.",
  },
];

const METHOD = [
  {
    title: "Lo pruebo en mi negocio",
    text: "Cada sistema lo armo y lo uso primero en mis propias marcas.",
  },
  {
    title: "Te muestro los números",
    text: "Horas estimadas y reales, lo que funcionó y lo que no. Todo a la vista.",
  },
  {
    title: "Vos lo aplicás en el tuyo",
    text: "Con el paso a paso, las plantillas y los prompts que uso yo.",
  },
];

/** Resumen corto de cada taller para la home (la ficha completa está en /talleres). */
const WORKSHOP_TEASERS: Record<string, string> = {
  "dia-a-dia":
    "Tu guía de prompts y 3 asistentes listos: uno para mensajes, uno para redes y uno para cuentas.",
  automatiza:
    "Un proceso real de tu negocio funcionando solo; por ejemplo, la atención por WhatsApp.",
  redes: "Tu sistema de contenido del mes: ideas, textos y calendario.",
  web: "Tu web publicada, el mismo día.",
};

export function HomePage() {
  return (
    <>
      <Section variant="hero" surface="noche" stars labelledBy="hero-titulo">
        <Container>
          <HeroGrid>
            <div>
              <img className={styles.heroLogo} src={logoDark} alt="" width="220" height="63" />
              <h1 id="hero-titulo">
                Lo que la IA puede hacer por tu negocio, <Accent>probado</Accent> primero en el mío.
              </h1>
              <Lead>
                Soy Ori, ingeniera de software. Construyo mi negocio con IA en público y te muestro
                cómo hacer lo mismo con el tuyo.
              </Lead>
              <Actions>
                <Button href={PATHS.course}>Quiero el curso</Button>
                <Button href={PATHS.guide} variant="secondary">
                  Descargar la guía gratis
                </Button>
              </Actions>
            </div>
            <PhotoArch
              alt="Ori sonriendo mientras trabaja en su computadora"
              caption="Video nuevo cada viernes"
              priority
            />
          </HeroGrid>
        </Container>
      </Section>

      <Section labelledBy="casos-titulo">
        <Container>
          <Split inverse className={styles.spacedSplit}>
            <div>
              <Pill>En palabras del dueño</Pill>
              <h2 id="casos-titulo">
                Lo que la IA puede hacer por tu <Accent>negocio</Accent>
              </h2>
              <Lead>
                No se trata de la herramienta del momento: se trata de sacarte de encima el trabajo
                que se repite todos los días.
              </Lead>
            </div>
            <ChatDemo />
          </Split>
          <Grid cols={4}>
            {USE_CASES.map((item) => (
              <Card key={item.kind}>
                <Icon name={item.icon} />
                <Kicker>{item.kind}</Kicker>
                <p className={styles.quote}>{item.quote}</p>
                <p className={styles.detail}>{item.detail}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section surface="celeste" labelledBy="como-titulo">
        <Container>
          <SectionHeader>
            <Pill>Cómo trabajo</Pill>
            <h2 id="como-titulo">Primero en mi negocio, después en el tuyo</h2>
          </SectionHeader>
          <Steps steps={METHOD} />
          <Signature>Yo lo pruebo, vos lo aplicás.</Signature>
        </Container>
      </Section>

      <Section surface="noche" stars labelledBy="prueba-titulo">
        <Container>
          <SectionHeader>
            <Pill>La prueba está en mi negocio</Pill>
            <h2 id="prueba-titulo">
              No te cuento lo que leí: te muestro lo que ya <Accent>funciona</Accent>
            </h2>
          </SectionHeader>
          <Split inverse className={styles.spacedSplit}>
            <Lead className={styles.flush}>
              Mis marcas funcionan con un sistema de agentes de IA que arma contenido, ordena ventas
              y contesta emails. Es el mismo tipo de sistema que te enseño a armar.
            </Lead>
            <AgentsPanel />
          </Split>
          <Stats stats={homeStats} />
          <p className={styles.spaced}>
            <ArrowLink href={PATHS.publicNumbers}>
              Ver los números de esta marca, en público
            </ArrowLink>
          </p>
        </Container>
      </Section>

      <Section labelledBy="curso-titulo">
        <Container>
          <Highlight>
            <div>
              <Pill>Curso · primera cohorte</Pill>
              <h2 id="curso-titulo">{COURSE.name}</h2>
              <Lead>
                Armá tu marca siguiendo el lanzamiento real de Ori Ledesma IA, etapa por etapa:
                identidad, logo, web, contenido y sistema.
              </Lead>
              <CheckList
                items={[
                  `${COURSE.lessons} clases grabadas de hasta 30 minutos`,
                  "Un vivo de demostración con el negocio de un alumno en cada etapa",
                  "Las plantillas y los prompts que uso yo",
                ]}
              />
            </div>
            <div>
              <Price
                amount={`US$${COURSE.priceUsd}`}
                note={
                  <>
                    pago único · empieza el <Pending>[fecha de inicio]</Pending>
                  </>
                }
              />
              <CourseSeatsMeter />
              <Actions>
                <Button href={PATHS.course}>Ver el curso</Button>
              </Actions>
            </div>
          </Highlight>
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="vivo-titulo">
        <Container>
          <Highlight tone="noche">
            <div>
              <Icon name="broadcast" />
              <Pill>Consultoría en vivo del mes · gratis</Pill>
              <h2 id="vivo-titulo">
                Cada mes elijo un negocio del público y le armo un sistema con IA{" "}
                <Accent>en vivo</Accent>.
              </h2>
              <Lead>
                En {LIVE_PLATFORMS}, de principio a fin, con las herramientas reales y el tiempo
                real.
              </Lead>
            </div>
            <div>
              <FactSheet
                facts={[
                  { label: "Próximo", value: <Pending>[fecha del próximo vivo]</Pending> },
                  { label: "Dónde", value: LIVE_PLATFORMS },
                ]}
              />
              <Actions>
                <Button href={`${PATHS.lives}#postular`}>Postulá tu negocio</Button>
              </Actions>
            </div>
          </Highlight>
        </Container>
      </Section>

      <Section labelledBy="video-titulo">
        <Container className={styles.video}>
          <VideoThumb
            word="PROBADO"
            note="Placeholder de la miniatura del último video · 1280 × 720"
            href={SOCIAL.youtube}
            label="Ver el último video en YouTube"
          />
          <div>
            <Pill>Último video</Pill>
            <h2 id="video-titulo">
              <Pending>[Título del último video]</Pending>
            </h2>
            <Lead>Video nuevo cada viernes en YouTube.</Lead>
            <Actions>
              <Button href={SOCIAL.youtube} variant="secondary">
                Ir al canal
              </Button>
            </Actions>
          </div>
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="redes-titulo">
        <Container>
          <Split inverse alignStart>
            <div>
              <Pill>En las redes · @OriledesmaIA</Pill>
              <h2 id="redes-titulo">
                Lo que voy construyendo, <Accent>post</Accent> a post
              </h2>
              <Lead>
                IA desde cero, el sistema por dentro y casos reales con números. En Instagram,
                TikTok, YouTube, Facebook y LinkedIn.
              </Lead>
              <Actions>
                <Button href={SOCIAL.instagram} variant="secondary">
                  Seguime en Instagram
                </Button>
              </Actions>
            </div>
            <SocialFeed posts={SOCIAL_POSTS} />
          </Split>
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="talleres-titulo">
        <Container>
          <SectionHeader>
            <Pill>Talleres en vivo</Pill>
            <h2 id="talleres-titulo">Talleres para dueños de negocios</h2>
            <Lead>
              Grupales, online y en vivo. Cada dueño sale con algo <Accent>funcionando</Accent> en
              su negocio.
            </Lead>
          </SectionHeader>
          <Grid cols={4}>
            {WORKSHOPS.map((workshop) => (
              <Card key={workshop.id}>
                <Icon name={workshop.icon} />
                <Pill>{workshop.level}</Pill>
                <h3>{workshop.title}</h3>
                <p className={styles.detail}>{WORKSHOP_TEASERS[workshop.id]}</p>
                <CardFooter>
                  <ArrowLink
                    href={`${PATHS.workshops}#${workshop.id}`}
                    aria-label={`Ver taller: ${workshop.title}`}
                  >
                    Ver taller
                  </ArrowLink>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section surface="celeste" id="guia" labelledBy="guia-titulo">
        <Container>
          <Highlight>
            <div>
              <Icon name="book" />
              <Pill>Guía gratis</Pill>
              <h2 id="guia-titulo">
                Tus primeros <Accent>7 días</Accent> con IA
              </h2>
              <Lead>
                Un paso por día para empezar a usar la IA en tu negocio, sin saber de tecnología.
              </Lead>
              <ArrowLink href={PATHS.guide}>Ver qué trae cada día</ArrowLink>
            </div>
            <div>
              <GuideForm source="home" />
              <LegalNote className={styles.legalSpaced}>
                Te llega la guía y, después, un email por semana con lo que voy probando. Podés
                darte de baja cuando quieras.
              </LegalNote>
            </div>
          </Highlight>
        </Container>
      </Section>

      <Section surface="blanca" labelledBy="ori-titulo">
        <Container>
          <Split>
            <ProfilePhoto
              alt="Ori sonriendo, de frente"
              sizes="(min-width: 900px) 380px, 90vw"
              className={styles.aboutPhoto}
            />
            <div>
              <Pill>Sobre Ori</Pill>
              <h2 id="ori-titulo">Hola, soy Ori</h2>
              <p>Soy ingeniera de software senior, argentina, y vivo en Kaunas, Lituania.</p>
              <p>
                Hace 7 años que construyo productos digitales; hoy uso esa experiencia para
                construir mi propio negocio con IA, en público.
              </p>
              <p>
                Te muestro cada paso, el tiempo real y los números, para que lo apliques en el tuyo.
              </p>
              <ArrowLink href={PATHS.about}>Conocé mi historia</ArrowLink>
            </div>
          </Split>
        </Container>
      </Section>

      <Section labelledBy="faq-titulo">
        <Container>
          <SectionHeader>
            <Pill>Preguntas frecuentes</Pill>
            <h2 id="faq-titulo">Lo que más me preguntan</h2>
          </SectionHeader>
          <Faq items={HOME_FAQ} />
        </Container>
      </Section>
    </>
  );
}
