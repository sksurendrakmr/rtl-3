import { render, screen } from "@testing-library/react";
import { Pets } from "../Pets";
/**
 * This test really making an HTTP request to our server to get the data
 * even though our element is in virtual dom.
 *
 * Thus, This test will dependent on our server working correctly and returing
 * the same data.
 * E.g if server error occurs, our test will also going to fail.
 *
 * If server return different data then also our test is going to fail.
 *
 * Calling our server cost money.
 *
 * Calling server is slow (might take times to get the response).
 */
describe("pets", () => {
  test("should render mocked petCard", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });
});
