import type { LaunchStage } from "~/content/schema";

type Hours = number | "pending";

export type HoursRow = { stage: string; estimated: Hours; actual: Hours; diff: Hours };

const diff = (estimated: Hours, actual: Hours): Hours =>
  estimated === "pending" || actual === "pending" ? "pending" : actual - estimated;

const sum = (values: Hours[]): Hours =>
  values.includes("pending")
    ? "pending"
    : values.reduce<number>((total, v) => total + (v as number), 0);

/** Filas con diferencia calculada y total. Un dato pendiente deja pendiente su total. */
export function buildHoursTable(stages: readonly LaunchStage[]) {
  const rows: HoursRow[] = stages.map((s) => ({
    stage: s.stage,
    estimated: s.estimatedHours,
    actual: s.actualHours,
    diff: diff(s.estimatedHours, s.actualHours),
  }));
  const estimated = sum(rows.map((r) => r.estimated));
  const actual = sum(rows.map((r) => r.actual));
  return { rows, total: { estimated, actual, diff: diff(estimated, actual) } };
}

/** "+3 h" / "−2 h": el signo importa más que el número. */
export const formatDiff = (value: number) =>
  `${value > 0 ? "+" : value < 0 ? "−" : "±"}${Math.abs(value)} h`;
