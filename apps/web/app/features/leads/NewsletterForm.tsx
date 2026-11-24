import { API_ROUTES, type LeadSource, newsletterSubscription } from "@oriledesma/schemas";
import { useT } from "~/i18n";
import { Field, TextInput } from "~/shared/forms/Field";
import { FormStatus } from "~/shared/forms/FormStatus";
import { cx } from "~/shared/lib/cx";
import { LegalNote } from "~/shared/ui/Text";
import styles from "./LeadForm.module.css";
import { SubmitButton } from "./SubmitButton";
import { useLeadForm } from "./useLeadForm";

export function NewsletterForm({ source }: { source: LeadSource }) {
  const t = useT();
  const form = useLeadForm({
    schema: newsletterSubscription,
    endpoint: API_ROUTES.newsletter,
    extra: { source },
  });

  return (
    <form
      className={cx(styles.form, styles.inline)}
      onSubmit={form.onSubmit}
      noValidate
      aria-label={t.footer.newsletter}
    >
      <fieldset className={styles.fields} disabled={form.isSuccess || form.isPending}>
        <div className={styles.inlineRow}>
          <Field label={t.newsletter.emailLabel} hideLabel error={form.error("email")}>
            {(control) => (
              <TextInput
                {...control}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t.newsletter.placeholder}
                required
                onInput={() => {
                  form.clearError("email");
                }}
              />
            )}
          </Field>
          <SubmitButton pending={form.isPending}>{t.newsletter.submit}</SubmitButton>
        </div>
      </fieldset>
      {form.isSuccess ? (
        <FormStatus status="success" message={t.newsletter.success} />
      ) : form.failureMessage ? (
        <FormStatus status="error" message={form.failureMessage} />
      ) : null}
      <LegalNote>{t.forms.unsubscribe}</LegalNote>
    </form>
  );
}
