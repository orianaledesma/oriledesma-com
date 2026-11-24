import { COURSE_STAGES } from "./course";
import type { Discarded, LaunchStage, Milestone } from "./schema";

export const MILESTONES: readonly Milestone[] = [
  {
    title: "Primera venta",
    description: "El primer cliente que paga por algo de la marca.",
    reachedOn: "pending",
  },
  {
    title: "€1.000 acumulados",
    description: "La suma de todas las ventas desde el lanzamiento.",
    reachedOn: "pending",
  },
  {
    title: "€1.000 por mes",
    description: "Un mes completo con €1.000 de facturación.",
    reachedOn: "pending",
  },
  {
    title: "€5.000 por mes",
    description: "El objetivo: €5.000 de facturación mensual.",
    reachedOn: "pending",
  },
];

/** Fecha de lanzamiento de la marca: con ella se calculan los "días desde el lanzamiento". */
export const LAUNCH_DATE: string = "pending"; // ISO (AAAA-MM-DD) o "pending"

export const LAUNCH_HOURS: readonly LaunchStage[] = COURSE_STAGES.map(({ title }) => ({
  stage: title,
  estimatedHours: "pending",
  actualHours: "pending",
}));

export const DISCARDED: readonly Discarded[] = [
  {
    area: "Paleta",
    title: "La paleta “naturaleza”",
    problem:
      "La primera paleta de referencia era fría, no decía “IA”, quedaba muy cerca de Exploriando y tenía mal contraste.",
    change:
      "La descarté y me quedé solo con el celeste de otra paleta, que pasó a ser el color fijo de la marca.",
  },
  {
    area: "Paleta",
    title: "Rojo, amarillo y negro",
    problem:
      "Con el celeste, el rojo y el negro de la paleta “pop” se leían como alerta o como comida rápida.",
    change: "El rojo quedó solo como color funcional para marcar errores, como en esta sección.",
  },
  {
    area: "Paleta",
    title: "Las primeras cinco demos",
    problem:
      "Probé cinco combinaciones con el celeste fijo y ninguna transmitía a la vez experta, sencilla y cálida.",
    change:
      "Una segunda ronda pensada en profesionalismo, conexión y calidez terminó en Marino + Miel.",
  },
  {
    area: "Banners",
    title: "Burbujas de chat en el banner",
    problem: "La portada con una pregunta y una respuesta en burbujas recargaba la pieza.",
    change: "Las saqué: el banner final lleva solo logo, promesa y “Video nuevo cada viernes”.",
  },
];
