import symbol from "~/assets/logo/simbolo-fondo-claro.svg";
import { aboutStats } from "~/content/proof";
import { PATHS } from "~/config/routes";
import { SISTER_BRANDS, SITE } from "~/config/site";
import { mailto } from "~/shared/lib/links";
import { PhotoArch } from "~/shared/media/PhotoArch";
import { Actions, Button } from "~/shared/ui/Button";
import { Container } from "~/shared/ui/Container";
import { HeroGrid, SectionHeader } from "~/shared/ui/Layout";
import { Section } from "~/shared/ui/Section";
import { Stats } from "~/shared/ui/Stats";
import { Accent, Lead, Muted, Pill, Signature } from "~/shared/ui/Text";
import styles from "./AboutPage.module.css";

const External = ({ href, children }: { href: string; children: string }) => (
  <a href={href} target="_blank" rel="noopener">
    {children}
  </a>
);

export function AboutPage() {
  return (
    <>
      <Section variant="hero" surface="noche" stars labelledBy="sobre-h1">
        <Container>
          <HeroGrid>
            <div>
              <Pill>Sobre mí</Pill>
              <h1 id="sobre-h1">Hola, soy Ori</h1>
              <Lead>
                Ingeniera de software senior, argentina, viviendo en Kaunas, Lituania. Vivo en
                Europa y le hablo a Latinoamérica.
              </Lead>
            </div>
            <PhotoArch alt="Ori sonriendo mientras trabaja en su computadora" size="sm" priority />
          </HeroGrid>
        </Container>
      </Section>

      <Section labelledBy="historia-titulo">
        <Container size="text">
          <Pill>Mi historia</Pill>
          <h2 id="historia-titulo">
            De construir productos digitales a construir mi propio negocio con IA
          </h2>
          <p>
            Hace 7 años que trabajo como ingeniera de software. Construí productos digitales para
            otros y aprendí que la tecnología sirve cuando le saca trabajo a alguien, no cuando suma
            una herramienta más.
          </p>
          <p>
            Hoy uso esa experiencia para algo distinto: construir mi propio negocio con IA y
            mostrarlo mientras lo hago. Nombre, logo, web, contenido y automatizaciones, con el
            tiempo real que me lleva cada parte.
          </p>
          <h3 className={styles.subtitle}>Por qué construyo en público</h3>
          <p>
            Porque la mayoría muestra el resultado y esconde el proceso. Yo muestro las dos cosas:
            lo que funciona, lo que no y cuánto tardé. Así podés decidir con números si algo le
            sirve a tu negocio, antes de invertir tu tiempo.
          </p>
          <Muted>
            También creé <External href={SISTER_BRANDS.exploriando}>Exploriando</External> (viajes
            en español) y{" "}
            <External href={SISTER_BRANDS.latinaConnection}>Latina Connection</External> (español y
            cultura latina, en inglés).
          </Muted>
        </Container>
      </Section>

      <Section surface="noche" stars labelledBy="datos-sobre">
        <Container>
          <SectionHeader>
            <Pill>Lo que ya funciona</Pill>
            <h2 id="datos-sobre">
              Mi negocio es la <Accent>prueba</Accent>
            </h2>
          </SectionHeader>
          <Stats stats={aboutStats} />
        </Container>
      </Section>

      <Section surface="blanca" centered labelledBy="firma-sobre">
        <Container>
          <h2 id="firma-sobre" className="sr-only">
            Firma
          </h2>
          <img
            className={styles.symbol}
            src={symbol}
            alt=""
            width="120"
            height="103"
            loading="lazy"
          />
          <Signature spaced={false} className={styles.signature}>
            Yo lo pruebo, vos lo aplicás.
          </Signature>
          <Muted>Ori</Muted>
          <Actions className={styles.actions}>
            <Button href={PATHS.course}>Ver el curso</Button>
            <Button href={mailto(SITE.email)} variant="secondary">
              Escribime
            </Button>
          </Actions>
        </Container>
      </Section>
    </>
  );
}
