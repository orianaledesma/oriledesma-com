import type { ReactNode } from "react";
import { Link } from "react-router";
import logo from "~/assets/logo/logo-horizontal-fondo-oscuro.svg";
import { PATHS } from "~/config/routes";
import { SISTER_BRANDS, SITE, SOCIAL } from "~/config/site";
import { useT } from "~/i18n";
import { mailto } from "~/shared/lib/links";
import { Accent } from "~/shared/ui/Text";
import styles from "./Footer.module.css";
import { FOOTER_NAV } from "./navigation";

const SOCIAL_LINKS = [
  { href: SOCIAL.youtube, label: `YouTube · ${SITE.handle}` },
  { href: SOCIAL.instagram, label: `Instagram · ${SITE.handle}` },
  { href: SOCIAL.tiktok, label: `TikTok · ${SITE.handle}` },
  { href: SOCIAL.facebook, label: `Facebook · ${SITE.handle}` },
  { href: SOCIAL.linkedin, label: "LinkedIn (Oriana)" },
];

const External = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener">
    {children}
  </a>
);

/** `newsletter` es el formulario de alta (lo inyecta el layout: el footer no sabe de la API). */
export function Footer({ newsletter }: { newsletter?: ReactNode }) {
  const t = useT();
  const { footer } = t;

  return (
    <footer className={styles.footer} data-surface="noche" data-stars>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <img className={styles.logo} src={logo} alt={t.logoAlt} width="200" height="58" />
            <p className={styles.promise}>{footer.promise}</p>
            <p className={styles.signature}>
              <Accent>{footer.signature}</Accent>
            </p>
          </div>

          <nav aria-label={footer.label}>
            <h2 className={styles.heading}>{footer.site}</h2>
            <ul className={styles.list}>
              {FOOTER_NAV.map((item) => (
                <li key={item.key}>
                  <Link to={item.to}>{t.nav[item.key]}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading}>{footer.social}</h2>
            <ul className={styles.list}>
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <External href={link.href}>{link.label}</External>
                </li>
              ))}
            </ul>
            <h2 className={styles.heading} data-spaced>
              {footer.contact}
            </h2>
            <p>
              <a href={mailto(SITE.email)}>{SITE.email}</a>
            </p>
          </div>

          <div>
            <h2 className={styles.heading}>{footer.newsletter}</h2>
            <p className={styles.muted}>{footer.newsletterPitch}</p>
            {newsletter}
          </div>
        </div>

        <p className={styles.sister}>
          {footer.sisterBrands.prefix}{" "}
          <External href={SISTER_BRANDS.exploriando}>Exploriando</External>{" "}
          {footer.sisterBrands.exploriando} {footer.sisterBrands.and}{" "}
          <External href={SISTER_BRANDS.latinaConnection}>Latina Connection</External>{" "}
          {footer.sisterBrands.latina}
        </p>

        <div className={styles.legal}>
          <p>{footer.copyright(new Date().getFullYear())}</p>
          <ul>
            <li>
              <Link to={PATHS.privacy}>{footer.privacy}</Link>
            </li>
            <li>
              <Link to={PATHS.terms}>{footer.terms}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
