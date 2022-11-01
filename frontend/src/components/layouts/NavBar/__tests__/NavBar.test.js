import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

test("Renders Navbar correctly", () => {
  render(
    <Router>
      <NavBar isLogin={true} isRegister={true} />
    </Router>
  );

  // Check if the banner is rendered
  expect(screen.getByText(/VandyLifts/i)).toBeInTheDocument();

  const signinBtn = screen.getByRole("link", { name: "Sign In" });
  expect(signinBtn).toBeInTheDocument();
  userEvent.click(signinBtn);
  expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
});
