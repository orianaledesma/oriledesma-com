import { PATHS } from "~/config/routes";
import { PublicNumbersPage } from "~/features/public-numbers/PublicNumbersPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "En público: los números de la marca",
    description:
      "Los números de Ori Ledesma IA contados por hitos: cuánto se tardó en llegar a cada uno, horas estimadas vs. reales y lo que no funcionó.",
    path: PATHS.publicNumbers,
  });
}

export default PublicNumbersPage;
