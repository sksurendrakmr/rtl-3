import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "../Filter";

describe("Filter", () => {
  test("should able to change value of favourite select", () => {
    render(<Filter />);
    const favouriteSelectElement: HTMLSelectElement =
      screen.getByLabelText(/favourite/i);
    expect(favouriteSelectElement.value).toBe("any");

    userEvent.selectOptions(favouriteSelectElement, "favoured");
    expect(favouriteSelectElement.value).toBe("favoured");
    userEvent.selectOptions(favouriteSelectElement, "not favoured");
    expect(favouriteSelectElement.value).toBe("not favoured");
  });

  test("should able to change value of gender select", () => {
    render(<Filter />);
    const favouriteSelectElement: HTMLSelectElement =
      screen.getByLabelText(/gender/i);
    expect(favouriteSelectElement.value).toBe("any");

    userEvent.selectOptions(favouriteSelectElement, "male");
    expect(favouriteSelectElement.value).toBe("male");
    userEvent.selectOptions(favouriteSelectElement, "female");
    expect(favouriteSelectElement.value).toBe("female");
  });
});
