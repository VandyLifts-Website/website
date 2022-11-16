import {
  render,
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

afterEach(() => {
  cleanup();
});

test("Renders sign in button when not logged in", () => {
  render(
    <Router>
      <NavBar isLoggedIn={false} />
    </Router>
  );
  // Check if the banner is rendered
  expect(screen.getByText(/VandyLifts/i)).toBeInTheDocument();
  const signinBtn = screen.getByRole("link", { name: "Sign In" });
  expect(signinBtn).toBeInTheDocument();
});

test("Logged out state matches snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <NavBar isLoggedIn={false} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// test("Directs user to sign in when not logged in", async () => {
//   render(
//     <Router>
//       <NavBar isLoggedIn={false} />
//     </Router>
//   );

//   const signinBtn = screen.getByRole("link", { name: "Sign In" });
//   await waitForElementToBeRemoved
// })

test("Renders navigation links when logged in", () => {
  render(
    <Router>
      <NavBar isLoggedIn={true} />
    </Router>
  );
  // Check if the banner is rendered
  expect(screen.getByText(/VandyLifts/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Fill a Survey" })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Club Information" })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Sign Out" })).toBeInTheDocument();
});
