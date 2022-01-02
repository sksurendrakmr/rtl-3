import React from "react";
import { Cards } from "../Cards";
import { render, screen } from "@testing-library/react";
import cats from "../../../mocks/cats.json";
describe("Cards", () => {
  test("should render five cards components", () => {
    render(<Cards cats={cats} />);
    const cards = screen.getAllByRole("article");
    expect(cards.length).toBe(5);
  });
});
