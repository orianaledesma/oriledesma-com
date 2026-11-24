import { buildHoursTable, formatDiff } from "./hours";

describe("buildHoursTable", () => {
  it("computes per-stage differences and totals", () => {
    const { rows, total } = buildHoursTable([
      { stage: "Logo", estimatedHours: 4, actualHours: 9 },
      { stage: "Web", estimatedHours: 6, actualHours: 3 },
    ]);
    expect(rows.map((r) => r.diff)).toEqual([5, -3]);
    expect(total).toEqual({ estimated: 10, actual: 12, diff: 2 });
  });

  it("keeps totals pending while any stage is pending", () => {
    const { total } = buildHoursTable([
      { stage: "Logo", estimatedHours: 4, actualHours: "pending" },
      { stage: "Web", estimatedHours: 6, actualHours: 3 },
    ]);
    expect(total).toEqual({ estimated: 10, actual: "pending", diff: "pending" });
  });
});

describe("formatDiff", () => {
  it.each([
    [3, "+3 h"],
    [-2, "−2 h"],
    [0, "±0 h"],
  ])("%d → %s", (value, text) => {
    expect(formatDiff(value)).toBe(text);
  });
});
