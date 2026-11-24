import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../../../../test/axe";
import { Faq } from "../Faq";

const items = [
  { question: "¿Necesito saber de tecnología?", answer: <p>No.</p> },
  { question: "¿En qué idioma trabajás?", answer: <p>En español.</p> },
];

describe("Faq", () => {
  it("starts collapsed and opens an answer when its question is clicked", async () => {
    const user = userEvent.setup();
    render(<Faq items={items} />);

    const question = screen.getByText("¿Necesito saber de tecnología?");
    const details = question.closest("details");
    expect(details).not.toHaveAttribute("open");

    await user.click(question);
    expect(details).toHaveAttribute("open");
  });

  it("has no detectable a11y violations", async () => {
    const { container } = render(<Faq items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
