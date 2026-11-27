import { guideRequest, type LeadSource } from "@oriledesma/schemas";
import { track } from "~/features/analytics/analytics";
import { guideCopy } from "~/features/guide/copy";
import { Field, TextInput } from "~/shared/forms/Field";
import { FormStatus } from "~/shared/forms/FormStatus";
import { cx } from "~/shared/lib/cx";
import styles from "./LeadForm.module.css";
import { SubmitButton } from "./SubmitButton";
import { useLeadForm } from "./useLeadForm";

/** Alta a la guía "Tus primeros 7 días con IA" (solo en español, como la guía). */
export function GuideForm({ source }: { source: LeadSource }) {
  const form = useLeadForm({
    schema: guideRequest,
    kind: "guide",
    extra: { source },
    onSuccess: () => {
      track({ name: "email_capture_submit", params: { source } });
    },
  });

  return (
    <form
      className={cx(styles.form, styles.row)}
      onSubmit={form.onSubmit}
      noValidate
      aria-label="Pedir la guía gratis"
    >
      <fieldset className={styles.fields} disabled={form.isSuccess || form.isPending}>
        <Field label="Tu nombre" error={form.error("nombre")}>
          {(control) => (
            <TextInput
              {...control}
              name="nombre"
              autoComplete="given-name"
              required
              onInput={() => {
                form.clearError("nombre");
              }}
            />
          )}
        </Field>
        <Field label="Tu email" error={form.error("email")}>
          {(control) => (
            <TextInput
              {...control}
              name="email"
              type="email"
              autoComplete="email"
              required
              onInput={() => {
                form.clearError("email");
              }}
            />
          )}
        </Field>
        <SubmitButton pending={form.isPending}>Quiero la guía</SubmitButton>
      </fieldset>
      {form.isSuccess ? (
        <FormStatus status="success" message={guideCopy().success} />
      ) : form.failureMessage ? (
        <FormStatus status="error" message={form.failureMessage} />
      ) : null}
    </form>
  );
}
