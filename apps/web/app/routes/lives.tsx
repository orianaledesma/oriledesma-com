import { PATHS } from "~/config/routes";
import { LivesPage } from "~/features/lives/LivesPage";
import { pageMeta } from "~/shared/seo/meta";

export function meta() {
  return pageMeta({
    title: "Vivos: consultoría en vivo del mes",
    description:
      "Cada mes elijo un negocio del público y le armo un sistema con IA en vivo, en YouTube, Twitch y Kick. Postulá tu negocio y mirá los próximos vivos.",
    path: PATHS.lives,
  });
}

export default LivesPage;
