import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

type InputProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }: InputProps) => {
  const emailInputElement: HTMLInputElement =
    screen.getByLabelText(/email address/i);
  const passwordInputElement: HTMLInputElement =
    screen.getByLabelText(/^password/i);
  const confirmPasswordInputElement: HTMLInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

test("inputs should be initial empty", () => {
  const emailInputElement: HTMLInputElement =
    screen.getByLabelText(/email address/i);

  const passowordInputElement: HTMLInputElement =
    screen.getByLabelText(/^password/i);

  const confirmPasswordElement: HTMLInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passowordInputElement.value).toBe("");
  expect(confirmPasswordElement.value).toBe("");
});

test("should be able to type an email", () => {
  // const emailInputElement: HTMLInputElement =
  //   screen.getByLabelText(/email address/i);

  // userEvent.type(emailInputElement, "suri@gmail.com");
  const { emailInputElement } = typeIntoForm({ email: "suri@gmail.com" });
  expect(emailInputElement.value).toBe("suri@gmail.com");
});

test("should be able to type into password", () => {
  const passwordElement: HTMLInputElement = screen.getByLabelText(/^password/i);

  userEvent.type(passwordElement, "1234567");
  expect(passwordElement.value).toBe("1234567");
});

test("should able to type into confirm password", () => {
  const confirmPasswordElement: HTMLInputElement =
    screen.getByLabelText(/confirm password/i);

  userEvent.type(confirmPasswordElement, "1234567");
  expect(confirmPasswordElement.value).toBe("1234567");
});

test("should show email error message on invalid email", () => {
  const emailErrorText = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorText).not.toBeInTheDocument();

  const emailInputElement: HTMLInputElement =
    screen.getByLabelText(/email address/i);

  userEvent.type(emailInputElement, "suri.com");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);

  const emailErrorText1 = screen.queryByText(/the email you input is invalid/i);

  expect(emailErrorText1).toBeInTheDocument();
});

test("should show password error message on invalid password and valid email", () => {
  const emailInputElement = screen.getByLabelText(/email address/i);
  const passwordInputElement = screen.getByLabelText(/^password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.type(emailInputElement, "suri@gmail.com");
  userEvent.type(passwordInputElement, "343");

  userEvent.click(submitButton);
  const passwordErrorMessage = screen.getByText(
    /the password you entered should contain 5 or more character/i
  );
  expect(passwordErrorMessage).toBeInTheDocument();
});

test("should show email error message on invalid email and password", () => {
  const emailInputElement = screen.getByLabelText(/email address/i);
  const passwordInputElement = screen.getByLabelText(/^password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(emailInputElement, "suri.com");
  userEvent.type(passwordInputElement, "122");
  userEvent.click(submitButton);
  const errorMessage = screen.getByText(/the email you input is invalid/i);
  expect(errorMessage).toBeInTheDocument();
});

test("should show confirm password error message on invalid confirm password input and valid email and password input", () => {
  const emailInputElement = screen.getByLabelText(/email address/i);
  const passwordInputElement = screen.getByLabelText(/^password/i);
  const confirmPassword = screen.getByLabelText(/confirm password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(emailInputElement, "suri@gmail.com");
  userEvent.type(passwordInputElement, "1234567");
  userEvent.click(submitButton);

  const confirmErrorMessage = screen.getByText(
    /the password don't match. Try again./i
  );
  expect(confirmErrorMessage).toBeInTheDocument();

  userEvent.type(confirmPassword, "123456");
  userEvent.click(submitButton);

  const confirmErrorMessage1 = screen.getByText(
    /the password don't match. Try again./i
  );
  expect(confirmErrorMessage1).toBeInTheDocument();
});

test("should not show any error message if all inputs are valid", () => {
  const emailInputElement = screen.getByLabelText(/email address/i);
  const passwordInputElement = screen.getByLabelText(/^password/i);
  const confirmPassword = screen.getByLabelText(/confirm password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(emailInputElement, "suri@gmail.com");
  userEvent.type(passwordInputElement, "1234567");
  userEvent.type(confirmPassword, "1234567");
  userEvent.click(submitButton);

  const emailErrorMessage = screen.queryByText(
    /the email you input is invalid/i
  );
  const passwordErrorMessage = screen.queryByText(
    /the password you entered should contain 5 or more character/i
  );

  const confirmPasswordErrorMessage = screen.queryByText(
    /the password don't match. Try again./i
  );
  expect(emailErrorMessage).not.toBeInTheDocument();
  expect(passwordErrorMessage).not.toBeInTheDocument();
  expect(confirmPasswordErrorMessage).not.toBeInTheDocument();
});
