import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { cx } from "~/shared/lib/cx";
import { isExternalHref, opensNewTab } from "~/shared/lib/links";
import styles from "./Button.module.css";

type Common = {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  className?: string | undefined;
  children: ReactNode;
};

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & { href: string };
type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

export type ButtonProps = AsLink | AsButton;

/**
 * Botón de la marca. Con `href` se renderiza como link (interno con el router,
 * externo como <a>); sin `href`, como <button>. El color sale de la superficie.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cx(styles.button, styles[variant], styles[size], className);

  if (rest.href === undefined) {
    const { type = "button", ...buttonProps } = rest as Omit<AsButton, keyof Common>;
    return (
      <button type={type} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  const { href, ...anchorProps } = rest as Omit<AsLink, keyof Common>;
  if (isExternalHref(href)) {
    const newTab = opensNewTab(href) ? { target: "_blank", rel: "noopener" } : {};
    return (
      <a href={href} className={classes} {...newTab} {...anchorProps}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={classes} {...anchorProps}>
      {children}
    </Link>
  );
}

export function Actions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return <div className={cx(styles.actions, className)}>{children}</div>;
}
