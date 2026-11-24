import { COURSE, SITE, SOCIAL } from "~/config/site";
import { PATHS } from "~/config/routes";
import { HomePage } from "~/features/home/HomePage";
import { pageMeta } from "~/shared/seo/meta";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oriana Ledesma",
  alternateName: "Ori Ledesma",
  jobTitle: "Ingeniera de software senior",
  description: "Lo que la IA puede hacer por tu negocio, probado primero en el mío.",
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.location.city,
    addressCountry: SITE.location.country,
  },
  nationality: "AR",
  knowsAbout: ["Inteligencia artificial para negocios", "Automatización", "Ingeniería de software"],
  sameAs: Object.values(SOCIAL),
};

const course = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: COURSE.name,
  description:
    "Armá una marca entera con IA siguiendo el lanzamiento real de Ori Ledesma IA, paso a paso: clases grabadas y vivos de demostración con negocios de alumnos.",
  inLanguage: "es",
  provider: { "@type": "Person", name: "Oriana Ledesma", url: SITE.url },
  offers: {
    "@type": "Offer",
    price: String(COURSE.priceUsd),
    priceCurrency: "USD",
    category: "Paid",
    url: new URL(PATHS.course, SITE.url).toString(),
    availability: "https://schema.org/PreOrder",
  },
};

export function meta() {
  return pageMeta({
    description:
      "Soy Ori, ingeniera de software. Construyo mi negocio con IA en público y te muestro cómo hacer lo mismo con el tuyo: curso, talleres, vivos e implementación.",
    ogDescription: "Lo que la IA puede hacer por tu negocio, probado primero en el mío.",
    path: PATHS.home,
    jsonLd: [person, course],
  });
}

export default HomePage;
