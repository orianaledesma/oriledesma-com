import { LEVELS, PILLARS } from "~/content/library";
import type { Level, Pillar } from "~/content/schema";
import type { LibraryFilters } from "./filters";
import styles from "./FilterBar.module.css";

type Props = { filters: LibraryFilters; onChange: (filters: LibraryFilters) => void };

type OptionProps = { pressed: boolean; onClick: () => void; children: string };

/** Botón de filtro tipo toggle: aria-pressed anuncia si está activo. */
const Option = ({ pressed, onClick, children }: OptionProps) => (
  <button type="button" className={styles.option} aria-pressed={pressed} onClick={onClick}>
    {children}
  </button>
);

/** Presentacional: recibe los filtros y avisa los cambios; no sabe que viven en la URL. */
export function FilterBar({ filters, onChange }: Props) {
  return (
    <div className={styles.bar}>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>Pilar</legend>
        <div className={styles.options}>
          <Option
            pressed={filters.pillar === "all"}
            onClick={() => {
              onChange({ ...filters, pillar: "all" });
            }}
          >
            Todos
          </Option>
          {(Object.keys(PILLARS) as Pillar[]).map((pillar) => (
            <Option
              key={pillar}
              pressed={filters.pillar === pillar}
              onClick={() => {
                onChange({ ...filters, pillar });
              }}
            >
              {PILLARS[pillar].filterLabel}
            </Option>
          ))}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>Nivel</legend>
        <div className={styles.options}>
          <Option
            pressed={filters.level === "all"}
            onClick={() => {
              onChange({ ...filters, level: "all" });
            }}
          >
            Todos
          </Option>
          {(Object.keys(LEVELS) as Level[]).map((level) => (
            <Option
              key={level}
              pressed={filters.level === level}
              onClick={() => {
                onChange({ ...filters, level });
              }}
            >
              {LEVELS[level]}
            </Option>
          ))}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>Etiqueta</legend>
        <div className={styles.options}>
          <Option
            pressed={filters.onlyWithNumbers}
            onClick={() => {
              onChange({ ...filters, onlyWithNumbers: !filters.onlyWithNumbers });
            }}
          >
            Solo casos con números
          </Option>
        </div>
      </fieldset>
    </div>
  );
}
