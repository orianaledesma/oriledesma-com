import { PATHS } from "~/config/routes";
import { AboutPage } from "~/features/about/AboutPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Sobre mí: Oriana Ledesma",
    description:
      "Soy Ori, ingeniera de software senior con 7 años de experiencia. Vivo en Europa, le hablo a Latinoamérica y construyo mi negocio con IA en público.",
    path: PATHS.about,
  });
}

export default AboutPage;
