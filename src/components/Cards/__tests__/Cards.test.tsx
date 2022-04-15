import React from "react";
import { Cards, CardsProps } from "../Cards";
import { render, screen } from "@testing-library/react";
import cats from "../../../mocks/cats.json";

const defaultProps: CardsProps = {
  cats: cats,
  setCats: () => {},
};
describe("Cards", () => {
  test("should render five cards components", () => {
    render(<Cards {...defaultProps} />);
    const cards = screen.getAllByRole("article");
    expect(cards.length).toBe(5);
  });
});
