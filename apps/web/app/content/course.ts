import type { Step } from "~/shared/ui/Steps";

/** Las 7 etapas del curso. También son las filas de la tabla de horas de "En público". */
export const COURSE_STAGES = [
  {
    title: "Identidad y promesa",
    text: "Qué hace tu marca, a quién le habla y qué promete, en una frase.",
  },
  {
    title: "Nombre, usuario y bios",
    text: "Elegir un nombre que se pueda buscar y escribir las bios de cada red.",
  },
  {
    title: "Paleta y logo",
    text: "Cómo elegí mis colores y mi logo con IA, y por qué descarté el resto.",
  },
  {
    title: "Fotos y banners",
    text: "Foto de perfil, portadas y el recurso visual que hace reconocible tu marca.",
  },
  { title: "Web y página de links", text: "Tu web y tu página de links, construidas con IA." },
  {
    title: "Contenido y plantillas",
    text: "Miniaturas, clips y posts con plantillas para no empezar de cero cada semana.",
  },
  {
    title: "Sistema y automatización",
    text: "Cómo se conecta todo para que la marca funcione sin que estés encima.",
  },
] as const satisfies readonly Step[];
