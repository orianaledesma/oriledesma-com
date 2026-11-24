import { PATHS } from "~/config/routes";
import { ImplementationPage } from "~/features/implementation/ImplementationPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "AI implementation for your business",
    description:
      "A custom AI system for your business, with fixed scope and fixed price. One client at a time.",
    path: PATHS.implementationEn,
    locale: "en",
    alternates: { es: PATHS.implementation, en: PATHS.implementationEn },
  });
}

export default ImplementationPage;
