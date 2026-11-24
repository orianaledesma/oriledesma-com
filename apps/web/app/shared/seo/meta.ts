import type { MetaDescriptor } from "react-router";
import { SITE } from "~/config/site";
import { LANGUAGE_TAGS, type Locale } from "~/i18n";

type PageMeta = {
  /** Título propio de la página; se le suma el nombre del sitio. Vacío = home. */
  title?: string;
  description: string;
  path: string;
  locale?: Locale;
  /** Misma página en otros idiomas, para hreflang. */
  alternates?: Partial<Record<Locale, string>>;
  ogDescription?: string;
  noindex?: boolean;
  jsonLd?: readonly object[];
};

const absolute = (path: string) => new URL(path, SITE.url).toString();

/**
 * Metadatos completos de una página: título, descripción, canonical, hreflang,
 * Open Graph, Twitter y JSON-LD. Todas las rutas pasan por acá.
 */
export function pageMeta({
  title,
  description,
  path,
  locale = "es",
  alternates,
  ogDescription,
  noindex = false,
  jsonLd = [],
}: PageMeta): MetaDescriptor[] {
  const fullTitle = title ? `${title} · ${SITE.name}` : SITE.name;
  const url = absolute(path);

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...Object.entries(alternates ?? {}).map(([lang, href]) => ({
      tagName: "link",
      rel: "alternate",
      hrefLang: lang,
      href: absolute(href),
    })),
    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: ogDescription ?? description },
    { property: "og:url", content: url },
    { property: "og:image", content: absolute(SITE.ogImage) },
    { property: "og:locale", content: LANGUAGE_TAGS[locale].og },
    { name: "twitter:card", content: "summary_large_image" },
    ...jsonLd.map((data) => ({ "script:ld+json": data })),
  ];
}
