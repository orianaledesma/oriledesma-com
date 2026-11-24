import { render, screen } from "@testing-library/react";
import { FormStatus } from "../FormStatus";

describe("FormStatus", () => {
  it("renders nothing while idle", () => {
    const { container } = render(<FormStatus status="idle" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("moves focus to the success message so it gets announced", () => {
    render(<FormStatus status="success" message="¡Listo!" />);
    expect(screen.getByRole("status")).toHaveFocus();
  });

  it("announces errors as alerts", () => {
    render(<FormStatus status="error" message="No se pudo enviar" />);
    expect(screen.getByRole("alert")).toHaveTextContent("No se pudo enviar");
  });
});
