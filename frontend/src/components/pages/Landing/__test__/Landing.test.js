import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Landing from "../Landing";

test("Renders landing page", () => {
  render(
    <Router>
      <Landing />
    </Router>
  );
  // Check if the banner is rendered
  expect(screen.getByText(/Look Fit. Feel Fit./i)).toBeInTheDocument();

  const images = screen.getAllByRole("img");
  console.log(images);

  images.foreach((element) => expect(element.toBeInTheDocument()));
});
