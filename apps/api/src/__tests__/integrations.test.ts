import { describe, expect, it, vi } from "vitest";
import { loadEnv } from "../config/env";
import { IntegrationError } from "../integrations/errors";
import { MailerLiteEmailList } from "../integrations/mailerlite";
import { ResendNotifier } from "../integrations/notifier";

const okFetch = () => vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));

const firstCall = (mock: ReturnType<typeof okFetch>) => {
  const call = mock.mock.calls[0];
  if (!call) throw new Error("fetch was not called");
  return call;
};

describe("MailerLiteEmailList", () => {
  it("upserts the subscriber into the list's group", async () => {
    const fetchMock = okFetch();
    const list = new MailerLiteEmailList({
      apiKey: "key",
      groups: { guide: "123" },
      fetch: fetchMock,
    });
    await list.subscribe({ email: "a@b.co", name: "Ana", list: "guide", source: "home" });

    const [url, init] = firstCall(fetchMock);
    expect(url).toBe("https://connect.mailerlite.com/api/subscribers");
    expect(new Headers(init?.headers).get("authorization")).toBe("Bearer key");
    expect(JSON.parse(init?.body as string)).toEqual({
      email: "a@b.co",
      fields: { name: "Ana", source: "home" },
      groups: ["123"],
    });
  });

  it("raises an IntegrationError on a failed response", async () => {
    const list = new MailerLiteEmailList({
      apiKey: "key",
      groups: {},
      fetch: vi.fn<typeof fetch>().mockResolvedValue(new Response("", { status: 422 })),
    });
    await expect(
      list.subscribe({ email: "a@b.co", list: "newsletter", source: "footer" }),
    ).rejects.toBeInstanceOf(IntegrationError);
  });
});

describe("ResendNotifier", () => {
  it("escapes user input before building the email", async () => {
    const fetchMock = okFetch();
    const notifier = new ResendNotifier({
      apiKey: "k",
      from: "f@x.co",
      to: "o@x.co",
      fetch: fetchMock,
    });
    await notifier.notify({
      subject: "Hola",
      replyTo: "a@b.co",
      fields: { Proceso: "<script>alert(1)</script>" },
    });
    const body = JSON.parse(firstCall(fetchMock)[1]?.body as string) as { html: string };
    expect(body.html).not.toContain("<script>");
    expect(body.html).toContain("&#60;script&#62;");
  });
});

describe("loadEnv", () => {
  it("applies defaults for local development", () => {
    expect(loadEnv({})).toMatchObject({ PORT: 3001, CORS_ORIGINS: [], COURSE_SEATS_TOTAL: 20 });
  });

  it("splits CORS origins", () => {
    expect(loadEnv({ CORS_ORIGINS: "https://a.com, https://b.com" }).CORS_ORIGINS).toEqual([
      "https://a.com",
      "https://b.com",
    ]);
  });

  it("refuses to start in production without CORS origins", () => {
    expect(() => loadEnv({ NODE_ENV: "production" })).toThrow(/CORS_ORIGINS/);
  });
});
