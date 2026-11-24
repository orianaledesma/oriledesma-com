import type { SocialPost } from "./schema";

/** Grilla planificada de Instagram (placeholder hasta conectar la API de Instagram). */
export const SOCIAL_POSTS = [
  { tag: "IA desde cero", title: "“La IA no es para mí”", tone: "blanco" },
  { tag: "Construyo en público", title: "Así elegí mi paleta con IA", tone: "marino" },
  { tag: "Construyo en público", title: "60 logos en 4 rondas", tone: "celeste" },
  { tag: "Detrás de la marca", title: "Mi logo, explicado", tone: "marino" },
  { tag: "Firma", title: "Yo lo pruebo, vos lo aplicás.", tone: "blanco" },
  { tag: "Caso real", title: "13 agentes de IA operan mis marcas", tone: "marino" },
] as const satisfies readonly SocialPost[];
