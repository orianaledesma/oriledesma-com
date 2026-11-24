import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Icon.module.css";

/** Íconos de trazo de la maqueta (24×24, stroke 1.6). Siempre decorativos. */
const PATHS = {
  iceCream: (
    <>
      <path d="M8 10a4 4 0 0 1 8 0" />
      <path d="M7 10h10l-5 11z" />
      <path d="M9.5 6.5a2.5 2.5 0 0 1 5 0" />
    </>
  ),
  gem: (
    <>
      <path d="M6 4h12l3 5-9 11L3 9z" />
      <path d="M3 9h18" />
      <path d="M9 4l3 5 3-5" />
      <path d="M12 9v11" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  calendarCheck: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </>
  ),
  social: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.5 7.5h.01" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5M8 7h7" />
    </>
  ),
  handshake: (
    <>
      <path d="M7 11l3-3 3 2 4-4" />
      <path d="M3 12l4 4 3-1 3 3 2-1 3 2 3-3" />
      <path d="M14 8l4 4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18h.01" />
    </>
  ),
  play: <path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

type Props = {
  name: IconName;
  /** `badge`: ícono en cuadrado Celeste de las tarjetas. `inline`: solo el trazo. */
  variant?: "badge" | "inline";
  className?: string | undefined;
};

export function Icon({ name, variant = "badge", className }: Props) {
  return (
    <svg
      className={cx(styles[variant], className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
