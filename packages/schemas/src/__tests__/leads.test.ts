import { describe, expect, it } from "vitest";
import {
  ErrorCode,
  guideRequest,
  implementationInquiry,
  liveApplication,
  newsletterSubscription,
  toFieldErrors,
} from "../index";

describe("newsletterSubscription", () => {
  it("normalizes the email", () => {
    const parsed = newsletterSubscription.parse({ email: "  Ori@Example.COM ", source: "footer" });
    expect(parsed.email).toBe("ori@example.com");
  });

  it.each([
    ["", ErrorCode.required],
    ["   ", ErrorCode.required],
    ["no-es-un-email", ErrorCode.invalidEmail],
  ])("rejects %j with %s", (value, code) => {
    const result = newsletterSubscription.safeParse({ email: value, source: "footer" });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error)).toEqual({ email: code });
  });

  it("rejects unknown sources", () => {
    expect(newsletterSubscription.safeParse({ email: "a@b.co", source: "spam" }).success).toBe(
      false,
    );
  });
});

describe("guideRequest", () => {
  it("requires a name", () => {
    const result = guideRequest.safeParse({ nombre: " ", email: "a@b.co", source: "home" });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).nombre).toBe(ErrorCode.required);
  });
});

describe("implementationInquiry", () => {
  const valid = {
    nombre: "Ana",
    email: "ana@heladeria.com",
    proceso: "Contestar los pedidos de WhatsApp",
    herramientas: "WhatsApp, planillas",
    cuando: "this-month",
    locale: "es",
  };

  it("accepts a complete inquiry", () => {
    expect(implementationInquiry.parse(valid)).toEqual(valid);
  });

  it("only accepts known timeframes", () => {
    const result = implementationInquiry.safeParse({ ...valid, cuando: "ayer" });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).cuando).toBe(ErrorCode.invalidOption);
  });

  it("limits free text length", () => {
    const result = implementationInquiry.safeParse({ ...valid, proceso: "x".repeat(2001) });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).proceso).toBe(ErrorCode.tooLong);
  });
});

describe("liveApplication", () => {
  it("reports every missing field at once", () => {
    const result = liveApplication.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(toFieldErrors(result.error)).sort()).toEqual(
        ["email", "negocio", "nombre", "pais", "proceso", "rubro", "web"].sort(),
      );
    }
  });
});
