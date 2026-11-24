import { PATHS } from "~/config/routes";
import { CoursePage } from "~/features/course/CoursePage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Curso: Cómo crear una marca entera con IA",
    description:
      "Armá una marca entera con IA siguiendo el lanzamiento real de Ori Ledesma IA: 7 etapas, clases grabadas y vivos de demostración. US$149, primera cohorte de 20 lugares.",
    path: PATHS.course,
  });
}

export default CoursePage;
