import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import ApplicationVersion from "./ApplicationVersion";

describe("DocumentActions component", () => {
  afterEach(cleanup);

  it("formats the version number correctly", () => {
    const { getByTestId } = render(<ApplicationVersion />);

    expect(
      /Version\s-\s\d+\.\d+\.\d+/.test(
        getByTestId("application_version").textContent
      )
    ).toBe(true);
  });

  it("uses the version number from package.json", () => {
    const { getByTestId } = render(<ApplicationVersion />);

    expect(getByTestId("application_version").textContent).toBe(
      `Version - ${process.env.REACT_APP_VERSION}`
    );
  });
});
