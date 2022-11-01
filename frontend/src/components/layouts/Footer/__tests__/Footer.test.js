import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Footer from "../Footer";

test("Renders Navbar correctly", () => {
  render(<Footer />);

  expect(screen.getByText(/VANDYLIFTS/i)).toBeInTheDocument();

  const anchorLink = screen.getByRole("link", { name: "AnchorLink" });
  expect(anchorLink).toBeInTheDocument();
  userEvent.click(anchorLink);
  expect(screen.getByText(/VandyLifts/i)).toBeInTheDocument();

  const instagram = screen.getByRole("link", { name: "Instagram" });
  expect(instagram).toBeInTheDocument();
  userEvent.click(instagram);
  expect(screen.getByText(/vandylifts_/i)).toBeInTheDocument();

  const groupme = screen.getByRole("link", { name: "GroupMe" });
  expect(groupme).toBeInTheDocument();
  userEvent.click(groupme);
  expect(screen.getByText(/VandyLifts/i)).toBeInTheDocument();
});
