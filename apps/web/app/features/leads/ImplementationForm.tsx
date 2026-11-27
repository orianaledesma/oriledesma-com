import { IMPLEMENTATION_TIMEFRAMES, implementationInquiry } from "@oriledesma/schemas";
import { useLocale } from "~/i18n";
import { track } from "~/features/analytics/analytics";
import { Field, Select, TextArea, TextInput } from "~/shared/forms/Field";
import { FormStatus } from "~/shared/forms/FormStatus";
import { cx } from "~/shared/lib/cx";
import { IMPLEMENTATION_COPY } from "./implementation-copy";
import styles from "./LeadForm.module.css";
import { SubmitButton } from "./SubmitButton";
import { useLeadForm } from "./useLeadForm";

export function ImplementationForm() {
  const locale = useLocale();
  const copy = IMPLEMENTATION_COPY[locale];
  const form = useLeadForm({
    schema: implementationInquiry,
    kind: "implementation",
    extra: { locale },
    onSuccess: () => {
      track({ name: "contact_form_submit", params: { locale } });
    },
  });
  const clear = (name: string) => () => {
    form.clearError(name);
  };

  return (
    <form
      className={cx(styles.form, styles.twoCol)}
      onSubmit={form.onSubmit}
      noValidate
      aria-label={copy.formLabel}
    >
      <fieldset className={styles.fields} disabled={form.isSuccess || form.isPending}>
        <Field label={copy.name} error={form.error("nombre")}>
          {(c) => (
            <TextInput
              {...c}
              name="nombre"
              autoComplete="name"
              required
              onInput={clear("nombre")}
            />
          )}
        </Field>
        <Field label={copy.email} error={form.error("email")}>
          {(c) => (
            <TextInput
              {...c}
              name="email"
              type="email"
              autoComplete="email"
              required
              onInput={clear("email")}
            />
          )}
        </Field>
        <Field label={copy.process} hint={copy.processHint} error={form.error("proceso")} fullWidth>
          {(c) => <TextArea {...c} name="proceso" required onInput={clear("proceso")} />}
        </Field>
        <Field
          label={copy.tools}
          hint={copy.toolsHint}
          error={form.error("herramientas")}
          fullWidth
        >
          {(c) => <TextInput {...c} name="herramientas" required onInput={clear("herramientas")} />}
        </Field>
        <Field label={copy.when} error={form.error("cuando")} fullWidth>
          {(c) => (
            <Select
              {...c}
              name="cuando"
              required
              placeholder={copy.choose}
              options={IMPLEMENTATION_TIMEFRAMES.map((value) => ({
                value,
                label: copy.timeframes[value],
              }))}
              onChange={clear("cuando")}
            />
          )}
        </Field>
        <div className={styles.full}>
          <SubmitButton pending={form.isPending}>{copy.submit}</SubmitButton>
        </div>
      </fieldset>
      {form.isSuccess ? (
        <FormStatus status="success" message={copy.success} />
      ) : form.failureMessage ? (
        <FormStatus status="error" message={form.failureMessage} />
      ) : null}
    </form>
  );
}
