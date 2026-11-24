import type { LiveEvent } from "./schema";

export const UPCOMING_LIVES: readonly LiveEvent[] = [
  {
    date: "pending",
    title: "Consultoría en vivo del mes",
    detail: "[negocio elegido entre los postulados]",
    detailPending: true,
    kind: "consultoria",
  },
  {
    date: "pending",
    title: "Etapa 1 del curso: identidad y promesa",
    detail: "Demostración con el negocio de un alumno",
    detailPending: false,
    kind: "curso",
  },
  {
    date: "pending",
    title: "Etapa 2 del curso: nombre, usuario y bios",
    detail: "Demostración con el negocio de un alumno",
    detailPending: false,
    kind: "curso",
  },
];

/** Grabaciones anteriores (placeholder hasta integrar YouTube, Twitch y Kick). */
export const PAST_LIVES_PLACEHOLDERS = 6;
