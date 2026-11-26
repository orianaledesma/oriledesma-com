import { GUIDE } from "~/config/site";

/** Textos de la guía según exista o esté en lista de espera: el sitio nunca promete lo que no hay. */
export const GUIDE_COPY = {
  ready: {
    pill: "Guía gratis",
    lead: "Un video corto por día para empezar a usar la IA en tu negocio, sin saber de tecnología. Te llega por email.",
    success: "¡Listo! Te mandé el primer video a tu email.",
    legal:
      "Te llega un video por día durante 7 días y, después, un email por semana con lo que voy probando. Podés darte de baja cuando quieras.",
  },
  waitlist: {
    pill: "Guía gratis · próximamente",
    lead: "Un video corto por día para empezar a usar la IA en tu negocio, sin saber de tecnología. Anotate y te aviso apenas esté lista.",
    success: "¡Listo! Te aviso por email apenas esté la guía.",
    legal:
      "Te escribo cuando la guía esté lista y, después, un email por semana con lo que voy probando. Podés darte de baja cuando quieras.",
  },
} as const;

export const guideCopy = (available: boolean = GUIDE.available) =>
  available ? GUIDE_COPY.ready : GUIDE_COPY.waitlist;
