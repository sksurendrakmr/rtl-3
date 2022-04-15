import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pets } from "../Pets";
import catMocks from "../../../mocks/cats.json";
//step-1
import { rest } from "msw";
import { setupServer } from "msw/node";
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
 *
 * mock the data that we would get from HTTP
 */

//steps-2 -> setup mock server
const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catMocks));
  })
);

//step-3 start listening to mock server before all  test
beforeEach(() => render(<Pets />));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("pets", () => {
  test("should render mocked petCard", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });

  test("should filter male cards", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
    const maleCards = screen.getAllByRole("article");
    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter female cards", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[0],
      cards[2],
      cards[4],
    ]);
  });
  test("should filter for favoured cats", async () => {
    const cards = await screen.findAllByRole("article");
    const buttonForFirstCard = within(cards[0]).getByRole("button");
    const buttonForFourthCard = within(cards[3]).getByRole("button");
    userEvent.click(buttonForFirstCard);
    userEvent.click(buttonForFourthCard);
    userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favoured");
    expect(screen.getAllByRole("article")).toStrictEqual([cards[0], cards[3]]);
  });

  test("should filter for non favoured cats", async () => {
    const cards = await screen.findAllByRole("article");
    const buttonForFirstCard = within(cards[0]).getByRole("button");
    const buttonForFourthCard = within(cards[3]).getByRole("button");
    userEvent.click(buttonForFirstCard);
    userEvent.click(buttonForFourthCard);
    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      "not favoured"
    );
    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[1],
      cards[2],
      cards[4],
    ]);
  });
});

test("should filter for favoured male cats", async () => {
  const cards = await screen.findAllByRole("article");
  userEvent.click(within(cards[0]).getByRole("button"));
  userEvent.click(within(cards[3]).getByRole("button"));

  userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favoured");
  userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");

  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(screen.getAllByRole("article")).toStrictEqual([cards[3]]);
});
