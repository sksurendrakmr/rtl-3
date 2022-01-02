import React from "react";
import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import { Card, CatProps } from "../Card";

const props: CatProps = {
  name: "Sydney",
  phone: "111-111-11111",
  email: "sk@gmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
    alt: "cute cat",
  },
  favoured: false,
};

describe("Card", () => {
  test("should show name of cat", () => {
    render(<Card {...props} />);
    expect(
      screen.getByRole("heading", { name: /sydney/i })
    ).toBeInTheDocument();
  });

  test("should show phone number", () => {
    render(<Card {...props} />);
    expect(screen.getByText(/111-111-11111/i)).toBeInTheDocument();
  });

  test("should show email", () => {
    render(<Card {...props} />);
    expect(screen.getByText(/sk@gmail.com/i)).toBeInTheDocument();
  });

  test("should show image of cat", () => {
    render(<Card {...props} />);
    const catImage: HTMLImageElement = screen.getByAltText(/cute cat/i);
    expect(catImage.src).toBe(props.image.url);
  });

  test("should show outlined heart", () => {
    render(<Card {...props} />);
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card {...props} favoured={true} />);
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    render(<Card {...props} />);
    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    userEvents.click(screen.getByRole("button"));
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });
});
