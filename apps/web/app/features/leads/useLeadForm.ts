import { type ErrorCode, toFieldErrors } from "@oriledesma/schemas";
import { useMutation } from "@tanstack/react-query";
import { type SubmitEvent, useCallback, useState } from "react";
import type { z } from "zod";
import { useT } from "~/i18n";
import { ApiRequestError, postJson } from "~/shared/api/client";

type Options<S extends z.ZodType> = {
  schema: S;
  endpoint: string;
  /** Campos que no vienen del formulario (origen, idioma). */
  extra?: Record<string, string>;
  onSuccess?: () => void;
};

const formValues = (form: HTMLFormElement): Record<string, string> => {
  const values: Record<string, string> = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value === "string") values[key] = value;
  });
  return values;
};

/**
 * Lógica compartida de los formularios de leads:
 * valida en el cliente con el MISMO esquema Zod que la API, envía con una mutación
 * de TanStack Query y traduce los errores (de campo, de red, de límite) al idioma activo.
 */
export function useLeadForm<S extends z.ZodType>({
  schema,
  endpoint,
  extra,
  onSuccess,
}: Options<S>) {
  const t = useT();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (payload: z.output<S>) => postJson<{ ok: true }>(endpoint, payload),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      if (error instanceof ApiRequestError && error.failure.kind === "validation") {
        setFieldErrors(error.failure.fields);
      }
    },
  });

  const translate = useCallback(
    (code: string | undefined) => {
      if (!code) return undefined;
      // Un código desconocido (API más nueva que la web) cae en el mensaje genérico.
      return code in t.forms.errors ? t.forms.errors[code as ErrorCode] : t.forms.summary;
    },
    [t],
  );

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = schema.safeParse({ ...formValues(form), ...extra });
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      setFieldErrors(errors);
      // El foco va al primer campo con error, en orden visual.
      const first = Object.keys(errors)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setFieldErrors({});
    mutation.mutate(result.data);
  };

  /** Al escribir en un campo con error, el error se limpia. */
  const clearError = (name: string) => {
    if (fieldErrors[name]) {
      setFieldErrors(({ [name]: _removed, ...rest }) => rest);
    }
  };

  const failureMessage = (() => {
    if (Object.keys(fieldErrors).length > 0) return t.forms.summary;
    if (!mutation.isError) return undefined;
    const failure = mutation.error instanceof ApiRequestError ? mutation.error.failure : undefined;
    if (failure?.kind === "network") return t.forms.network;
    if (failure?.kind === "rate_limited") return t.forms.rateLimited;
    if (failure?.kind === "validation") return t.forms.summary;
    return t.forms.unknown;
  })();

  return {
    onSubmit,
    clearError,
    error: (name: string) => translate(fieldErrors[name]),
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    failureMessage,
  };
}

export type LeadForm = ReturnType<typeof useLeadForm>;
