import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Landing from "../Landing";

test("Renders landing page", () => {
  render(
    <Router>
      <Landing />
    </Router>
  );

  //   expect(screen.getByRole("Link")).toHaveDisplayValue("Sign In");
  //   const array = screen.getAllByRole("img");
  screen
    .getAllByRole("img")
    .foreach((element) => expect(element.toBeInTheDocument()));
});
