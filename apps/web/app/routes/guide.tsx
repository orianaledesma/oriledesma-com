import { PATHS } from "~/config/routes";
import { GuidePage } from "~/features/guide/GuidePage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Guía gratis: Tus primeros 7 días con IA",
    description:
      "Descargá gratis la guía “Tus primeros 7 días con IA”: un paso por día para empezar a usar la IA en tu negocio, sin saber de tecnología.",
    path: PATHS.guide,
  });
}

export default GuidePage;
