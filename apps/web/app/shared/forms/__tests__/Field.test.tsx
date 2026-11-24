import { render, screen } from "@testing-library/react";
import { axe } from "../../../../test/axe";
import { Field, TextInput } from "../Field";

describe("Field", () => {
  it("connects the label, hint and error to the control", () => {
    render(
      <Field label="Tu email" hint="Te escribo solo ahí" error="Revisá el email">
        {(control) => <TextInput type="email" {...control} />}
      </Field>,
    );
    const input = screen.getByLabelText("Tu email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Te escribo solo ahí Revisá el email");
  });

  it("is not marked invalid without an error", () => {
    render(<Field label="Tu nombre">{(control) => <TextInput {...control} />}</Field>);
    const input = screen.getByLabelText("Tu nombre");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("has no detectable a11y violations", async () => {
    const { container } = render(
      <Field label="Tu email" error="Revisá el email">
        {(control) => <TextInput type="email" {...control} />}
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
