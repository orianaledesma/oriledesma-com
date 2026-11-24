import { ErrorCode } from "@oriledesma/schemas";
import { en } from "../en";
import { es } from "../es";
import { localeFromPath } from "../index";

describe("localeFromPath", () => {
  it.each([
    ["/", "es"],
    ["/curso", "es"],
    ["/en", "en"],
    ["/en/implementation", "en"],
    ["/enlaces", "es"],
  ])("%s → %s", (path, locale) => {
    expect(localeFromPath(path)).toBe(locale);
  });
});

describe("dictionaries", () => {
  it("translate every validation error code", () => {
    for (const code of Object.values(ErrorCode)) {
      expect(es.forms.errors[code]).toBeTruthy();
      expect(en.forms.errors[code]).toBeTruthy();
    }
  });
});
