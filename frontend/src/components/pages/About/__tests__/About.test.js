import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import About from "../About";

test("Renders about page", () => {
  render(
    <Router>
      <About />
    </Router>
  );
  // Check if the banner is rendered
  expect(screen.getByText(/Our Mission Statement/i)).toBeInTheDocument();
  expect(screen.getByText(/Board Members/i)).toBeInTheDocument();
});
