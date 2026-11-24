import { WORKSHOPS } from "~/content/workshops";
import { SITE } from "~/config/site";
import { mailto } from "~/shared/lib/links";
import { Button } from "~/shared/ui/Button";
import { Badge, Card, CardFooter } from "~/shared/ui/Card";
import { Container } from "~/shared/ui/Container";
import { FactSheet } from "~/shared/ui/FactSheet";
import { Icon } from "~/shared/ui/Icon";
import { Grid, SectionHeader } from "~/shared/ui/Layout";
import { Notice } from "~/shared/ui/Notice";
import { Section } from "~/shared/ui/Section";
import { Steps } from "~/shared/ui/Steps";
import { Accent, Lead, Pending, Pill, Signature } from "~/shared/ui/Text";

const HOW_IT_WORKS = [
  {
    title: "Me escribís",
    text: "Me contás tu negocio y qué taller te interesa. Te respondo con fechas y precio.",
  },
  {
    title: "Taller en vivo",
    text: "En grupo y online. Trabajamos sobre tu negocio, no sobre ejemplos inventados.",
  },
  {
    title: "Te llevás lo armado",
    text: "Los prompts, asistentes o sistemas quedan funcionando en tu negocio.",
  },
];

export function WorkshopsPage() {
  return (
    <>
      <Section variant="hero" surface="celeste" labelledBy="talleres-h1">
        <Container>
          <Pill>Talleres · grupales, online y en vivo</Pill>
          <h1 id="talleres-h1">
            Salís del taller con algo <Accent>funcionando</Accent> en tu negocio
          </h1>
          <Lead>
            Cuatro talleres para dueños de negocios. Nada de teoría: cada uno termina con algo
            concreto armado para tu negocio.
          </Lead>
        </Container>
      </Section>

      <Section labelledBy="cuatro-talleres">
        <Container>
          {/* La maqueta saltaba de h1 a h3: este h2 mantiene el orden de títulos. */}
          <h2 id="cuatro-talleres" className="sr-only">
            Los cuatro talleres
          </h2>
          <Grid cols={2}>
            {WORKSHOPS.map((workshop) => {
              const titleId = `${workshop.id}-t`;
              return (
                <Card
                  key={workshop.id}
                  id={workshop.id}
                  labelledBy={titleId}
                  highlighted={workshop.featured}
                >
                  {workshop.featured && <Badge>Destacado</Badge>}
                  <Icon name={workshop.icon} />
                  <h3 id={titleId}>{workshop.title}</h3>
                  <FactSheet
                    facts={[
                      { label: "Para quién", value: workshop.audience },
                      { label: "Nivel", value: workshop.level },
                      { label: "Formato", value: workshop.format },
                      { label: "Te llevás", value: workshop.outcome },
                      { label: "Precio", value: <Pending>[precio del taller]</Pending> },
                    ]}
                  />
                  <CardFooter>
                    <Button
                      href={mailto(SITE.email, `Taller: ${workshop.title}`)}
                      variant={workshop.featured ? "primary" : "secondary"}
                      aria-label={`Consultar por el taller ${workshop.title}`}
                    >
                      Consultar
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </Grid>
          <Notice icon="handshake">
            También para equipos de negocios con empleados.{" "}
            <a href={mailto(SITE.email, "Taller para equipos")}>Escribime y lo armamos</a>
          </Notice>
        </Container>
      </Section>

      <Section surface="celeste" labelledBy="como-talleres">
        <Container>
          <SectionHeader>
            <Pill>Cómo funcionan</Pill>
            <h2 id="como-talleres">Antes, durante y después</h2>
          </SectionHeader>
          <Steps steps={HOW_IT_WORKS} />
          <Signature>Yo lo pruebo, vos lo aplicás.</Signature>
        </Container>
      </Section>
    </>
  );
}
