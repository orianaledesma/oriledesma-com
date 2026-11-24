import type { ReactNode } from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Container.module.css";

type Props = {
  size?: "default" | "narrow" | "text";
  className?: string | undefined;
  children: ReactNode;
};

export function Container({ size = "default", className, children }: Props) {
  return <div className={cx(styles.container, styles[size], className)}>{children}</div>;
}
