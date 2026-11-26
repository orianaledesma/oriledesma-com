import { GUIDE_COPY, guideCopy } from "./copy";

describe("guideCopy", () => {
  it("never promises delivery while the guide is on a waitlist", () => {
    const copy = guideCopy(false);
    expect(copy).toBe(GUIDE_COPY.waitlist);
    expect(copy.success).not.toMatch(/te mandé/i);
    expect(copy.pill).toMatch(/próximamente/);
  });

  it("announces the first video once the guide is available", () => {
    expect(guideCopy(true).success).toMatch(/primer video/);
  });
});
