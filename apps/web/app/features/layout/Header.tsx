import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "~/assets/logo/logo-horizontal-fondo-claro.svg";
import { PATHS } from "~/config/routes";
import { useT } from "~/i18n";
import { Button } from "~/shared/ui/Button";
import { cx } from "~/shared/lib/cx";
import styles from "./Header.module.css";
import { MAIN_NAV } from "./navigation";
import { useDisclosure } from "./useDisclosure";

const NAV_ID = "nav-principal";

export function Header() {
  const t = useT();
  const { pathname } = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { open, toggle } = useDisclosure(pathname, buttonRef);
  const navRef = useRef<HTMLElement>(null);

  // Al abrir, el foco pasa al primer link del menú.
  useEffect(() => {
    if (open) navRef.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.logo} to={PATHS.home} aria-label={t.logoHomeLabel}>
          <img src={logo} alt={t.logoAlt} width="170" height="49" />
        </Link>
        <button
          ref={buttonRef}
          className={styles.menuButton}
          type="button"
          aria-expanded={open}
          aria-controls={NAV_ID}
          onClick={toggle}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
          <span>{t.menu}</span>
        </button>
        <nav
          ref={navRef}
          id={NAV_ID}
          className={cx(styles.nav, open && styles.open)}
          aria-label={t.nav.label}
        >
          <ul className={styles.list}>
            {MAIN_NAV.map((item) => (
              <li key={item.key}>
                <NavLink className={cx(styles.link)} to={item.to}>
                  {t.nav[item.key]}
                </NavLink>
              </li>
            ))}
            <li className={styles.cta}>
              <Button href={PATHS.guide} size="sm">
                {t.nav.guide}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
