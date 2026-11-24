import { LIBRARY } from "~/content/library";
import { DEFAULT_FILTERS, filterPieces, parseFilters, toSearchParams } from "./filters";

describe("library filters", () => {
  it("round-trips through the query string", () => {
    const filters = { pillar: "sistema", level: "2", onlyWithNumbers: true } as const;
    expect(parseFilters(toSearchParams(filters))).toEqual(filters);
  });

  it("keeps default filters out of the URL", () => {
    expect(toSearchParams(DEFAULT_FILTERS).toString()).toBe("");
  });

  it("ignores unknown values from old or hand-written links", () => {
    expect(parseFilters(new URLSearchParams("pilar=x&nivel=9&numeros=quizas"))).toEqual(
      DEFAULT_FILTERS,
    );
  });

  it("combines filters with AND", () => {
    expect(filterPieces(LIBRARY, DEFAULT_FILTERS)).toHaveLength(LIBRARY.length);
    expect(filterPieces(LIBRARY, { ...DEFAULT_FILTERS, pillar: "desde-cero" })).toHaveLength(3);
    expect(
      filterPieces(LIBRARY, { pillar: "sistema", level: "2", onlyWithNumbers: true }).map(
        (p) => p.id,
      ),
    ).toEqual(["horas-estimadas-vs-reales"]);
    expect(
      filterPieces(LIBRARY, { pillar: "desde-cero", level: "3", onlyWithNumbers: false }),
    ).toEqual([]);
  });
});
