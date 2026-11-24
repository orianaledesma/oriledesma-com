import type { Stat } from "~/shared/ui/Stats";

/** Los números que prueban el método. Se repiten en el inicio y en Sobre mí. */
export const PROOF = {
  agents: "13",
  views: "2,4M",
  years: "7",
} as const;

export const homeStats: Stat[] = [
  { value: PROOF.agents, label: "agentes de IA que operan mis marcas todos los días" },
  { value: PROOF.views, label: "de visualizaciones en un canal automatizado" },
  { value: PROOF.years, label: "años como ingeniera de software" },
];

export const aboutStats: Stat[] = [
  { value: PROOF.agents, label: "agentes de IA que operan mis marcas" },
  { value: PROOF.views, label: "de visualizaciones en un canal automatizado" },
  { value: PROOF.years, label: "años de ingeniería de software" },
];
