import type { Level, LibraryPiece, Pillar } from "./schema";

export const PILLARS: Record<Pillar, { label: string; filterLabel: string }> = {
  "desde-cero": { label: "IA desde cero", filterLabel: "IA desde cero · niveles 0-1" },
  sistema: {
    label: "Construyendo el sistema, en público",
    filterLabel: "Construyendo el sistema, en público · niveles 2-3",
  },
};

export const LEVELS: Record<Level, string> = {
  "0": "0 · Nunca usé IA",
  "1": "1 · La uso un poco",
  "2": "2 · Quiero automatizar",
  "3": "3 · Quiero construir sistemas",
};

/** Piezas de ejemplo de la biblioteca (se reemplazan por el feed real de YouTube y redes). */
export const LIBRARY: readonly LibraryPiece[] = [
  {
    id: "que-es-la-ia",
    title: "Qué es la IA y qué no, sin tecnicismos",
    summary:
      "Para arrancar: qué puede hacer la IA por tu negocio y qué no, con ejemplos de todos los días.",
    pillar: "desde-cero",
    level: "0",
    withNumbers: false,
    format: "Video · YouTube",
    tag: "IA desde cero",
    tone: "blanco",
    url: "pending",
  },
  {
    id: "escribirle-a-la-ia",
    title: "Cómo escribirle a la IA para que te entienda",
    summary: "La diferencia entre un pedido vago y uno que te devuelve algo útil a la primera.",
    pillar: "desde-cero",
    level: "1",
    withNumbers: false,
    format: "Video · YouTube",
    tag: "IA desde cero",
    tone: "celeste",
    url: "pending",
  },
  {
    id: "responder-mensajes",
    title: "Usar IA para responder mensajes de clientes",
    summary: "Un asistente que te ayuda a contestar consultas con el tono de tu negocio.",
    pillar: "desde-cero",
    level: "1",
    withNumbers: false,
    format: "Clip · Reels y TikTok",
    tag: "IA desde cero",
    tone: "celeste",
    url: "pending",
  },
  {
    id: "web-en-una-tarde",
    title: "Armé mi web con IA en una tarde",
    summary: "El paso a paso de la web de esta marca, de la idea a la página publicada.",
    pillar: "sistema",
    level: "2",
    withNumbers: false,
    format: "Video · YouTube",
    tag: "Construyo en público",
    tone: "marino",
    url: "pending",
  },
  {
    id: "pagina-de-links",
    title: "Construyo mi página de links en vivo",
    summary: "La página de links de mis redes, construida en vivo con IA.",
    pillar: "sistema",
    level: "2",
    withNumbers: false,
    format: "Vivo · YouTube",
    tag: "Construyo en público",
    tone: "marino",
    url: "pending",
  },
  {
    id: "sistema-13-agentes",
    title: "Así funciona mi sistema de 13 agentes por dentro",
    summary: "Qué hace cada agente, cómo se coordinan y cuánto trabajo me sacan.",
    pillar: "sistema",
    level: "3",
    withNumbers: false,
    format: "Video · YouTube",
    tag: "Construyo en público",
    tone: "marino",
    url: "pending",
  },
  {
    id: "horas-estimadas-vs-reales",
    title: "Lanzar una marca con IA: horas estimadas vs. reales",
    summary:
      "Cuánto pensé que me iba a llevar cada etapa del lanzamiento y cuánto me llevó de verdad.",
    pillar: "sistema",
    level: "2",
    withNumbers: true,
    format: "Post · LinkedIn",
    tag: "Caso real",
    tone: "marino",
    url: "pending",
  },
];
