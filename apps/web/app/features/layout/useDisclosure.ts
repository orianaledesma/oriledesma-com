import { type RefObject, useCallback, useEffect, useState } from "react";

const DESKTOP_QUERY = "(min-width: 1080px)";

/**
 * Estado abierto/cerrado del menú mobile: se cierra con Escape (devolviendo el foco
 * al botón), al pasar a desktop y cuando cambia la ruta (`resetKey`).
 */
export function useDisclosure(resetKey: string, triggerRef: RefObject<HTMLElement | null>) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => {
    setOpen(false);
  }, []);
  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  // Navegar cierra el menú. Ajustar estado durante el render evita un efecto extra.
  const [lastKey, setLastKey] = useState(resetKey);
  if (lastKey !== resetKey) {
    setLastKey(resetKey);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (media.matches) close();
    };
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [open, close]);

  return { open, toggle, close };
}
