import type { Level, LibraryPiece, Pillar } from "~/content/schema";

export type LibraryFilters = {
  pillar: Pillar | "all";
  level: Level | "all";
  onlyWithNumbers: boolean;
};

export const DEFAULT_FILTERS: LibraryFilters = {
  pillar: "all",
  level: "all",
  onlyWithNumbers: false,
};

const PILLARS: readonly Pillar[] = ["desde-cero", "sistema"];
const LEVELS: readonly Level[] = ["0", "1", "2", "3"];

/** Lee los filtros de la URL. Valores desconocidos se ignoran (un link viejo no rompe la página). */
export function parseFilters(params: URLSearchParams): LibraryFilters {
  const pillar = params.get("pilar");
  const level = params.get("nivel");
  return {
    pillar: PILLARS.find((p) => p === pillar) ?? "all",
    level: LEVELS.find((l) => l === level) ?? "all",
    onlyWithNumbers: params.get("numeros") === "si",
  };
}

/** Escribe solo lo que difiere del default: URLs cortas y canónicas. */
export function toSearchParams(filters: LibraryFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.pillar !== "all") params.set("pilar", filters.pillar);
  if (filters.level !== "all") params.set("nivel", filters.level);
  if (filters.onlyWithNumbers) params.set("numeros", "si");
  return params;
}

export const filterPieces = (pieces: readonly LibraryPiece[], f: LibraryFilters) =>
  pieces.filter(
    (piece) =>
      (f.pillar === "all" || piece.pillar === f.pillar) &&
      (f.level === "all" || piece.level === f.level) &&
      (!f.onlyWithNumbers || piece.withNumbers),
  );
