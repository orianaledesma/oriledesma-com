import type { ReactNode } from "react";
import { Link } from "react-router";
import { isExternalHref } from "~/shared/lib/links";
import styles from "./ArrowLink.module.css";

type Props = { href: string; children: ReactNode; "aria-label"?: string };

/** Link de texto con flecha. La flecha es decorativa (no la lee el lector de pantalla). */
export function ArrowLink({ href, children, ...aria }: Props) {
  const content = (
    <>
      {children}
      <span aria-hidden="true"> →</span>
    </>
  );
  return isExternalHref(href) ? (
    <a href={href} className={styles.link} {...aria}>
      {content}
    </a>
  ) : (
    <Link to={href} className={styles.link} {...aria}>
      {content}
    </Link>
  );
}
