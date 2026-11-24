import type { LaunchStage } from "~/content/schema";
import { Pending } from "~/shared/ui/Text";
import { buildHoursTable, formatDiff } from "./hours";
import styles from "./HoursTable.module.css";

const Hours = ({ value, diff = false }: { value: number | "pending"; diff?: boolean }) => {
  if (value === "pending") return <Pending>{diff ? "[±h]" : "[h]"}</Pending>;
  return <>{diff ? formatDiff(value) : `${value} h`}</>;
};

export function HoursTable({ stages }: { stages: readonly LaunchStage[] }) {
  const { rows, total } = buildHoursTable(stages);
  const placeholder = rows.some((r) => r.actual === "pending");

  return (
    // tabIndex: el envoltorio scrollea en mobile y tiene que poder enfocarse con teclado.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={styles.wrapper} tabIndex={0} role="region" aria-labelledby="horas-caption">
      <table className={styles.table}>
        <caption id="horas-caption" className={styles.caption}>
          {placeholder ? "Tabla de ejemplo · placeholder" : "Horas por etapa del lanzamiento"}
        </caption>
        <thead>
          <tr>
            <th scope="col">Etapa</th>
            <th scope="col" className={styles.n}>
              Estimadas
            </th>
            <th scope="col" className={styles.n}>
              Reales
            </th>
            <th scope="col" className={styles.n}>
              Diferencia
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.stage}>
              <th scope="row">{row.stage}</th>
              <td className={styles.n}>
                <Hours value={row.estimated} />
              </td>
              <td className={styles.n}>
                <Hours value={row.actual} />
              </td>
              <td className={styles.n}>
                <Hours value={row.diff} diff />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td className={styles.n}>
              <Hours value={total.estimated} />
            </td>
            <td className={styles.n}>
              <Hours value={total.actual} />
            </td>
            <td className={styles.n}>
              <Hours value={total.diff} diff />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
