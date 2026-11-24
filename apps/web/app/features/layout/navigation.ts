import { PATHS } from "~/config/routes";
import type { Dictionary } from "~/i18n";

type NavKey = keyof Dictionary["nav"];
export type NavItem = { key: Exclude<NavKey, "label">; to: string };

/** Menú principal (el CTA "Guía gratis" va aparte). */
export const MAIN_NAV: readonly NavItem[] = [
  { key: "course", to: PATHS.course },
  { key: "lives", to: PATHS.lives },
  { key: "workshops", to: PATHS.workshops },
  { key: "implementation", to: PATHS.implementation },
  { key: "learn", to: PATHS.learn },
  { key: "about", to: PATHS.about },
];

export const FOOTER_NAV: readonly NavItem[] = [
  ...MAIN_NAV,
  { key: "guide", to: PATHS.guide },
  { key: "publicNumbers", to: PATHS.publicNumbers },
];
