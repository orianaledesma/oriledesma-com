import { pageMeta } from "./meta";

describe("pageMeta", () => {
  it("uses the site name alone on the home page", () => {
    const meta = pageMeta({ description: "Home", path: "/" });
    expect(meta).toContainEqual({ title: "Ori Ledesma | IA para negocios" });
    expect(meta).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://oriledesma.com/",
    });
  });

  it("appends the site name to page titles", () => {
    const meta = pageMeta({ title: "Curso", description: "d", path: "/curso" });
    expect(meta).toContainEqual({ title: "Curso · Ori Ledesma | IA para negocios" });
  });

  it("declares language alternates and the og locale", () => {
    const meta = pageMeta({
      title: "AI implementation",
      description: "d",
      path: "/en/implementation",
      locale: "en",
      alternates: { es: "/implementacion", en: "/en/implementation" },
    });
    expect(meta).toContainEqual({
      tagName: "link",
      rel: "alternate",
      hrefLang: "es",
      href: "https://oriledesma.com/implementacion",
    });
    expect(meta).toContainEqual({ property: "og:locale", content: "en_US" });
  });

  it("can hide a page from search engines", () => {
    expect(pageMeta({ description: "d", path: "/x", noindex: true })).toContainEqual({
      name: "robots",
      content: "noindex",
    });
  });
});
