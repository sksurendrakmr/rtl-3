import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useState,
} from "react";
import validator from "validator";
import "./App.css";

function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    const { email, password, confirmPassword } = signupInput;
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setError("The email you input is invalid.");
    } else if (password.length < 5) {
      setError("The password you entered should contain 5 or more character");
    } else if (
      validator.isEmpty(confirmPassword) ||
      confirmPassword !== password
    ) {
      setError("The password don't match. Try again.");
    } else {
      setError("");
    }
  };

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signupInput.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={handleChange}
          />
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
