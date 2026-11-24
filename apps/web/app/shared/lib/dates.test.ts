import { daysBetween, formatDate } from "./dates";

describe("dates", () => {
  it("formats ISO dates in Spanish without timezone drift", () => {
    expect(formatDate("2027-01-01")).toBe("1 de enero de 2027");
  });

  it("counts whole days between two dates", () => {
    expect(daysBetween("2026-11-01", "2026-12-01")).toBe(30);
  });
});
