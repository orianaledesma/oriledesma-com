import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * `false` en el prerender y durante la hidratación, `true` después.
 * Permite leer estado del navegador (como la query string) sin romper la hidratación
 * del HTML estático, que se generó sin parámetros.
 */
export const useHydrated = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
