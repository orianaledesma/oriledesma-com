import { Link } from "react-router";
import { PATHS } from "~/config/routes";
import { Container } from "~/shared/ui/Container";
import { Section } from "~/shared/ui/Section";
import { Lead } from "~/shared/ui/Text";

export function meta() {
  return [
    { title: "No encontramos esta página · Ori Ledesma" },
    { name: "robots", content: "noindex" },
  ];
}

/** Rutas desconocidas: se prerenderiza como /404 para que el hosting la sirva con status 404. */
export default function NotFoundRoute() {
  return (
    <Section variant="hero" surface="noche" stars labelledBy="nf-h1">
      <Container size="text">
        <h1 id="nf-h1">No encontramos esta página</h1>
        <Lead>Puede que el link esté mal escrito o que la página se haya movido.</Lead>
        <p>
          <Link to={PATHS.home}>Volver al inicio</Link>
        </p>
      </Container>
    </Section>
  );
}
