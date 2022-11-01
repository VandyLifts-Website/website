import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";
import MyOrgs from "../MyOrgs";

test("Renders MyOrgs component correctly", () => {
  render(<MyOrgs />);

  expect(screen.getByText(/Mentor Matches/i)).toBeInTheDocument();
  expect(screen.getByText(/Buddy Matches/i)).toBeInTheDocument();
  expect(screen.getByText(/Day in the Life of a Lifter/i)).toBeInTheDocument();
});
