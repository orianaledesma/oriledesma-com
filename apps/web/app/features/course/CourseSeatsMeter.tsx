import { SeatsMeter } from "~/shared/ui/SeatsMeter";
import { Accent } from "~/shared/ui/Text";
import { useCourseSeats } from "./useCourseSeats";

/** Contenedor: trae los cupos de la API y se los pasa a la barra presentacional. */
export function CourseSeatsMeter() {
  const { total, remaining, simulated, isLoading } = useCourseSeats();
  const label = `Quedan ${remaining} de ${total} lugares${simulated ? " (contador simulado)" : ""}`;

  return (
    <SeatsMeter
      total={total}
      remaining={remaining}
      label={label}
      ariaLabel="Lugares disponibles"
      busy={isLoading}
    >
      <p>
        <strong>
          <Accent>{total} lugares</Accent>
        </strong>{" "}
        en la primera cohorte
      </p>
    </SeatsMeter>
  );
}
