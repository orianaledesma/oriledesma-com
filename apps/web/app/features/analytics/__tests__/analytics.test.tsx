import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, vi } from "vitest";
import { renderWithRouter } from "../../../../test/render";

const setup = async (measurementId: string | undefined) => {
  vi.resetModules();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", measurementId ?? "");
  const { AnalyticsProvider } = await import("../AnalyticsProvider");
  renderWithRouter(
    <AnalyticsProvider>
      <p>contenido</p>
    </AnalyticsProvider>,
  );
};

const gaScript = () => document.querySelector('script[src*="googletagmanager"]');

describe("analytics consent", () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = "";
    delete window.gtag;
    delete window.dataLayer;
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("asks before loading anything", async () => {
    await setup("G-TEST");
    expect(await screen.findByRole("region", { name: "Cookies" })).toBeInTheDocument();
    expect(gaScript()).toBeNull();
  });

  it("loads GA and sends a page view after accepting", async () => {
    const user = userEvent.setup();
    await setup("G-TEST");
    await user.click(await screen.findByRole("button", { name: "Aceptar" }));

    expect(gaScript()).not.toBeNull();
    expect(window.dataLayer).toContainEqual([
      "event",
      "page_view",
      expect.objectContaining({ page_path: "/" }),
    ]);
    expect(screen.queryByRole("region", { name: "Cookies" })).not.toBeInTheDocument();
    expect(localStorage.getItem("ol-consent-v1")).toBe("granted");
  });

  it("never loads GA after rejecting, and remembers it", async () => {
    const user = userEvent.setup();
    await setup("G-TEST");
    await user.click(await screen.findByRole("button", { name: "Rechazar" }));

    expect(gaScript()).toBeNull();
    expect(localStorage.getItem("ol-consent-v1")).toBe("denied");
  });

  it("stays off without a measurement id", async () => {
    await setup(undefined);
    expect(screen.getByText("contenido")).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Cookies" })).not.toBeInTheDocument();
  });
});
