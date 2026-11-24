import { PATHS } from "~/config/routes";
import { ImplementationPage } from "~/features/implementation/ImplementationPage";
import { pageMeta } from "~/shared/seo/meta";

const alternates = { es: PATHS.implementation, en: PATHS.implementationEn };

export function meta() {
  return pageMeta({
    title: "Implementación de IA para tu negocio",
    description:
      "Un sistema con IA a medida para tu negocio, con alcance y precio cerrados. Un cliente a la vez. También en inglés.",
    path: PATHS.implementation,
    alternates,
  });
}

export default ImplementationPage;
