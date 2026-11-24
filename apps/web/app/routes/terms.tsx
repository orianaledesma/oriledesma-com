import { PATHS } from "~/config/routes";
import { LegalPage } from "~/features/legal/LegalPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Términos",
    description: "Términos de OriLedesma.com",
    path: PATHS.terms,
    noindex: true,
  });
}

export default function TermsRoute() {
  return <LegalPage title="Términos" placeholder="[texto de términos a definir]" />;
}
