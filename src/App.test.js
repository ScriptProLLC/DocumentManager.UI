import React from "react";
import { render } from "react-testing-library";
import App from "./App";

it("runs a basic test", () => {
  expect(2 + 2).toBe(4);
});

it("renders the app component", () => {
  const { container } = render(<App />);
  expect(container.querySelector("p").textContent).toBe(
    "Edit src/App.js and save to reload."
  );
});

it("renders the App component correctly", () => {
  const component = render(<App />);

  let tree = component.container;
  expect(tree).toMatchSnapshot();
});
