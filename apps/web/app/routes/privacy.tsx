import { PATHS } from "~/config/routes";
import { LegalPage } from "~/features/legal/LegalPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  // noindex hasta que exista el texto legal: no queremos un placeholder en Google.
  return pageMeta({
    title: "Privacidad",
    description: "Privacidad de OriLedesma.com",
    path: PATHS.privacy,
    noindex: true,
  });
}

export default function PrivacyRoute() {
  return <LegalPage title="Privacidad" placeholder="[texto de privacidad a definir]" />;
}
