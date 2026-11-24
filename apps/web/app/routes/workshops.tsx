import { PATHS } from "~/config/routes";
import { WorkshopsPage } from "~/features/workshops/WorkshopsPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Talleres de IA para dueños de negocios",
    description:
      "Cuatro talleres grupales, online y en vivo para dueños de negocios: IA en el día a día, automatizar un proceso, redes con IA y tu web en una tarde.",
    path: PATHS.workshops,
  });
}

export default WorkshopsPage;
