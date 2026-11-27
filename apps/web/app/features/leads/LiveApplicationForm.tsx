import { BUSINESS_CATEGORIES, type BusinessCategory, liveApplication } from "@oriledesma/schemas";
import { track } from "~/features/analytics/analytics";
import { Field, Select, TextArea, TextInput } from "~/shared/forms/Field";
import { FormStatus } from "~/shared/forms/FormStatus";
import { cx } from "~/shared/lib/cx";
import styles from "./LeadForm.module.css";
import { SubmitButton } from "./SubmitButton";
import { useLeadForm } from "./useLeadForm";

const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  "tienda-online": "Tienda online",
  servicio: "Servicio",
  creador: "Creador de contenido",
  gastronomia: "Gastronomía",
  "comercio-fisico": "Comercio físico",
  otro: "Otro",
};

export function LiveApplicationForm() {
  const form = useLeadForm({
    schema: liveApplication,
    kind: "lives",
    onSuccess: ({ rubro }) => {
      track({ name: "live_application_submit", params: { rubro } });
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
      aria-label="Postulá tu negocio"
    >
      <fieldset className={styles.fields} disabled={form.isSuccess || form.isPending}>
        <Field label="Tu nombre" error={form.error("nombre")}>
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
        <Field label="Tu email" error={form.error("email")}>
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
        <Field label="Nombre del negocio" error={form.error("negocio")}>
          {(c) => (
            <TextInput
              {...c}
              name="negocio"
              autoComplete="organization"
              required
              onInput={clear("negocio")}
            />
          )}
        </Field>
        <Field label="Rubro" error={form.error("rubro")}>
          {(c) => (
            <Select
              {...c}
              name="rubro"
              required
              placeholder="Elegí una opción"
              options={BUSINESS_CATEGORIES.map((value) => ({
                value,
                label: CATEGORY_LABELS[value],
              }))}
              onChange={clear("rubro")}
            />
          )}
        </Field>
        <Field label="Web o Instagram" error={form.error("web")}>
          {(c) => (
            <TextInput
              {...c}
              name="web"
              placeholder="@tunegocio o tunegocio.com"
              required
              onInput={clear("web")}
            />
          )}
        </Field>
        <Field label="País" error={form.error("pais")}>
          {(c) => (
            <TextInput
              {...c}
              name="pais"
              autoComplete="country-name"
              required
              onInput={clear("pais")}
            />
          )}
        </Field>
        <Field
          label="¿Qué proceso te quita más tiempo?"
          hint='Por ejemplo: "contestar los pedidos de WhatsApp" o "armar las descripciones del catálogo".'
          error={form.error("proceso")}
          fullWidth
        >
          {(c) => <TextArea {...c} name="proceso" required onInput={clear("proceso")} />}
        </Field>
        <div className={styles.full}>
          <SubmitButton pending={form.isPending}>Enviar postulación</SubmitButton>
        </div>
      </fieldset>
      {form.isSuccess ? (
        <FormStatus
          status="success"
          message="¡Gracias! Recibí tu postulación. Si tu negocio queda elegido, te escribo."
        />
      ) : form.failureMessage ? (
        <FormStatus status="error" message={form.failureMessage} />
      ) : null}
    </form>
  );
}
