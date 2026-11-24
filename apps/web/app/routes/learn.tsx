import { PATHS } from "~/config/routes";
import { LearnPage } from "~/features/learn/LearnPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Aprendé: biblioteca de IA para negocios",
    description:
      "Videos, clips y posts para usar IA en tu negocio, ordenados por pilar y nivel: desde cero hasta construir tus propios sistemas.",
    path: PATHS.learn,
  });
}

export default LearnPage;
