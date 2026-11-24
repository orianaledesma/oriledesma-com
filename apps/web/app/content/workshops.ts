import type { Workshop } from "./schema";

export const WORKSHOPS = [
  {
    id: "dia-a-dia",
    icon: "chat",
    title: "IA en el día a día de tu negocio",
    level: "Nivel 0-1",
    audience:
      "Dueños que nunca usaron IA, o la usan poco, y quieren sacarle horas a los mensajes, las redes y las cuentas.",
    format: "4 h · una sesión · grupal, online y en vivo",
    outcome:
      "Tu guía de prompts y 3 asistentes listos: uno para mensajes, uno para redes y uno para cuentas.",
    featured: false,
  },
  {
    id: "automatiza",
    icon: "gear",
    title: "Automatizá un proceso de tu negocio",
    level: "Nivel 2",
    audience: "Negocios con una tarea que se repite todos los días y les come el tiempo.",
    format: "Diagnóstico + 2 sesiones · grupal, online y en vivo",
    outcome:
      "Un proceso real de tu negocio funcionando solo; por ejemplo, la atención por WhatsApp.",
    featured: true,
  },
  {
    id: "redes",
    icon: "social",
    title: "Las redes de tu negocio con IA",
    level: "Nivel 2",
    audience: "Dueños que saben que tienen que publicar, pero no llegan con el tiempo.",
    format: "2 sesiones · grupal, online y en vivo",
    outcome: "Tu sistema de contenido del mes: ideas, textos y calendario.",
    featured: false,
  },
  {
    id: "web",
    icon: "browser",
    title: "Armá tu web con IA en una tarde",
    level: "Abierto a todos",
    audience: "Cualquiera que necesite una web simple para su negocio, sin saber programar.",
    format: "3-4 h · una sesión · grupal, online y en vivo",
    outcome: "Tu web publicada, el mismo día.",
    featured: false,
  },
] as const satisfies readonly Workshop[];
