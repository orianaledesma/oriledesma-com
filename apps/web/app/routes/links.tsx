import { PATHS } from "~/config/routes";
import { LinksPage } from "~/features/links/LinksPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Links",
    description: "Lo que la IA puede hacer por tu negocio, probado primero en el mío.",
    path: PATHS.links,
  });
}

export default LinksPage;
