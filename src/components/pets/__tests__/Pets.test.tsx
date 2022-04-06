import { render, screen } from "@testing-library/react";
import { Pets } from "../Pets";

describe("pets", () => {
  test("should render mocked petCard", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });
});
