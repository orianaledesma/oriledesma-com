import { describe, expect, it } from "vitest";
import { courseSeats, seatsRemaining } from "../index";

describe("courseSeats", () => {
  it("rejects more sold seats than the total", () => {
    expect(courseSeats.safeParse({ total: 20, sold: 21, simulated: true }).success).toBe(false);
  });

  it("computes remaining seats without going negative", () => {
    expect(seatsRemaining({ total: 20, sold: 5 })).toBe(15);
    expect(seatsRemaining({ total: 20, sold: 25 })).toBe(0);
  });
});
