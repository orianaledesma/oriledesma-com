import {
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  useId,
} from "react";
import { cx } from "~/shared/lib/cx";
import styles from "./Field.module.css";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string | undefined;
  /** Etiqueta solo para lectores de pantalla (formularios de una línea). */
  hideLabel?: boolean;
  fullWidth?: boolean;
  /** Recibe los atributos que conectan el control con su etiqueta, ayuda y error. */
  children: (control: ControlProps) => ReactNode;
};

export type ControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  className: string;
};

/**
 * Campo accesible: une label, ayuda y error al control con ids estables (useId),
 * así sirve igual en SSR que en cliente.
 */
export function Field({
  label,
  hint,
  error,
  hideLabel = false,
  fullWidth = false,
  children,
}: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx(styles.field, fullWidth && styles.full)}>
      <label htmlFor={id} className={cx(styles.label, hideLabel && "sr-only")}>
        {label}
      </label>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {children({
        id,
        className: styles.control ?? "",
        ...(describedBy && { "aria-describedby": describedBy }),
        ...(error && { "aria-invalid": true as const }),
      })}
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;

export const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} />
);

export function Select({
  options,
  placeholder,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <select {...props}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
