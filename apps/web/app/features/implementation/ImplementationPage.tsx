import { Link } from "react-router";
import { PATHS } from "~/config/routes";
import { SITE } from "~/config/site";
import { ImplementationForm } from "~/features/leads/ImplementationForm";
import { useLocale } from "~/i18n";
import { mailto } from "~/shared/lib/links";
import { Actions, Button } from "~/shared/ui/Button";
import { Container } from "~/shared/ui/Container";
import { SectionHeader, Split } from "~/shared/ui/Layout";
import { Notice } from "~/shared/ui/Notice";
import { Section } from "~/shared/ui/Section";
import { Stats } from "~/shared/ui/Stats";
import { Steps } from "~/shared/ui/Steps";
import { Lead, Pill, Signature } from "~/shared/ui/Text";
import { IMPLEMENTATION_CONTENT } from "./content";
import styles from "./ImplementationPage.module.css";

/** Una sola página para los dos idiomas: el contenido sale del locale de la ruta. */
export function ImplementationPage() {
  const locale = useLocale();
  const c = IMPLEMENTATION_CONTENT[locale];
  const other = locale === "es" ? "en" : "es";
  const otherPath = locale === "es" ? PATHS.implementationEn : PATHS.implementation;

  return (
    <>
      <Section variant="hero" surface="noche" stars labelledBy="impl-h1">
        <Container>
          <Pill>{c.pill}</Pill>
          <h1 id="impl-h1" className={styles.title}>
            {c.title}
          </h1>
          <Lead>{c.lead}</Lead>
          <Actions>
            <Button href="#formulario">{c.cta}</Button>
          </Actions>
          <Notice>
            {c.languageSwitch.prefix && <>{c.languageSwitch.prefix} </>}
            <Link to={otherPath} hrefLang={other} lang={other}>
              {c.languageSwitch.label}
            </Link>
          </Notice>
        </Container>
      </Section>

      <Section labelledBy="como-impl">
        <Container>
          <SectionHeader>
            <Pill>{c.howPill}</Pill>
            <h2 id="como-impl">{c.howTitle}</h2>
          </SectionHeader>
          <Steps steps={c.steps} columns={4} />
        </Container>
      </Section>

      <Section surface="noche" stars labelledBy="cupo-impl">
        <Container>
          <Split inverse>
            <div>
              <Pill>{c.availabilityPill}</Pill>
              <h2 id="cupo-impl">{c.availabilityTitle}</h2>
              <Lead>{c.availabilityLead}</Lead>
            </div>
            <Stats single stats={[{ value: "1", label: c.availabilityStat }]} />
          </Split>
        </Container>
      </Section>

      <Section surface="blanca" id="formulario" labelledBy="form-impl">
        <Container size="narrow">
          <SectionHeader>
            <Pill>{c.formPill}</Pill>
            <h2 id="form-impl">{c.formTitle}</h2>
            <Lead>{c.formLead}</Lead>
          </SectionHeader>
          <ImplementationForm />
          <p className={styles.email}>
            {c.emailPrompt} <a href={mailto(SITE.email)}>{SITE.email}</a>
          </p>
          <Signature>{c.signature}</Signature>
        </Container>
      </Section>
    </>
  );
}
