import React from "react";
import { render, cleanup } from "react-testing-library";
import ApplicationVersion from "./ApplicationVersion";
import "jest-dom/extend-expect";

describe("Application Version", () => {
  afterEach(cleanup);

  it("formats the version number correctly", () => {
    const { getByLabelText } = render(<ApplicationVersion />);

    expect(
      /Version\s-\s\d+\.\d+\.\d+/.test(
        getByLabelText("Application version number").textContent
      )
    ).toBe(true);
  });

  it("uses the version number from package.json", () => {
    const { getByLabelText } = render(<ApplicationVersion />);

    expect(getByLabelText("Application version number").textContent).toBe(
      `Version - ${process.env.REACT_APP_VERSION}`
    );
  });
});
