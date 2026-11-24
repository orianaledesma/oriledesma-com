/** Rutas públicas con nombre: los links nunca se escriben a mano en las páginas. */
export const PATHS = {
  home: "/",
  course: "/curso",
  lives: "/vivos",
  workshops: "/talleres",
  implementation: "/implementacion",
  implementationEn: "/en/implementation",
  learn: "/aprende",
  about: "/sobre-mi",
  guide: "/guia",
  publicNumbers: "/en-publico",
  links: "/links",
  privacy: "/privacidad",
  terms: "/terminos",
} as const;

export type PathName = keyof typeof PATHS;
