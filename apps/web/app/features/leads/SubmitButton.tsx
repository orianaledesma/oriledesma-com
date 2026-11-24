import { useT } from "~/i18n";
import { Button } from "~/shared/ui/Button";

/** Botón de envío que avisa mientras manda (aria-busy + texto "Enviando…"). */
export function SubmitButton({ pending, children }: { pending: boolean; children: string }) {
  const t = useT();
  return (
    <Button type="submit" aria-busy={pending || undefined}>
      {pending ? t.forms.sending : children}
    </Button>
  );
}
