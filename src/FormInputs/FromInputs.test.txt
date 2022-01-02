import React from "react";
import { render, screen } from "@testing-library/react";
import FormInputs from "./FormInputs";
import userEvent from "@testing-library/user-event";

type InputProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

beforeEach(() => {
  render(<FormInputs />);
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

const clickOnSubmitButton = () => {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  return submitButton;
};

test("inputs should be initial empty", () => {
  const {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  } = typeIntoForm({});

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({ email: "suri@gmail.com" });
  expect(emailInputElement.value).toBe("suri@gmail.com");
});

test("should be able to type into password", () => {
  const { passwordInputElement } = typeIntoForm({ password: "1234567" });
  expect(passwordInputElement.value).toBe("1234567");
});

test("should able to type into confirm password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "1234567",
  });
  expect(confirmPasswordInputElement.value).toBe("1234567");
});

test("should show email error message on invalid email", () => {
  const emailErrorText = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorText).not.toBeInTheDocument();

  typeIntoForm({ email: "suri.com" });
  clickOnSubmitButton();

  const emailErrorText1 = screen.queryByText(/the email you input is invalid/i);

  expect(emailErrorText1).toBeInTheDocument();
});

test("should show password error message on invalid password and valid email", () => {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  typeIntoForm({ email: "suri@gmail.com", password: "343" });
  userEvent.click(submitButton);

  const passwordErrorMessage = screen.getByText(
    /the password you entered should contain 5 or more character/i
  );
  expect(passwordErrorMessage).toBeInTheDocument();
});

test("should show email error message on invalid email and password", () => {
  typeIntoForm({ email: "suri.com", password: "122" });
  clickOnSubmitButton();
  const errorMessage = screen.getByText(/the email you input is invalid/i);
  expect(errorMessage).toBeInTheDocument();
});

test("should show confirm password error message on invalid confirm password input and valid email and password input", () => {
  typeIntoForm({ email: "suri@gmail.com", password: "1234567" });
  clickOnSubmitButton();
  const confirmErrorMessage = screen.getByText(
    /the password don't match. Try again./i
  );
  expect(confirmErrorMessage).toBeInTheDocument();

  typeIntoForm({ confirmPassword: "123456" });
  clickOnSubmitButton();

  const confirmErrorMessage1 = screen.getByText(
    /the password don't match. Try again./i
  );
  expect(confirmErrorMessage1).toBeInTheDocument();
});

test("should not show any error message if all inputs are valid", () => {
  typeIntoForm({
    email: "suri@gmail.com",
    password: "1234567",
    confirmPassword: "1234567",
  });

  clickOnSubmitButton();
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
