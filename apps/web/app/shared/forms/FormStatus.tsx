import { useEffect, useRef } from "react";
import styles from "./FormStatus.module.css";

type Props =
  | { status: "success"; message: string }
  | { status: "error"; message: string }
  | { status: "idle"; message?: undefined };

/**
 * Mensaje de resultado del formulario. El éxito recibe el foco (anuncia el cambio
 * y saca al usuario del formulario ya deshabilitado); el error usa role="alert".
 */
export function FormStatus(props: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (props.status === "success") ref.current?.focus();
  }, [props.status]);

  if (props.status === "idle") return null;
  if (props.status === "error") {
    return (
      <p role="alert" className={styles.error}>
        {props.message}
      </p>
    );
  }
  return (
    <p ref={ref} role="status" tabIndex={-1} className={styles.success}>
      {props.message}
    </p>
  );
}
