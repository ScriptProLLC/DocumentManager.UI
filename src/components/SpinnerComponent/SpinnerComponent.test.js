import React from "react";
import { render, cleanup } from "react-testing-library";
import SpinnerComponent from "./SpinnerComponent";

describe("Spinner component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    const { getByLabelText } = render(<SpinnerComponent open={true} />);

    expect(getByLabelText("Spinner icon")).toBeTruthy();
  });

  it("display a message", () => {
    const { getByLabelText } = render(
      <SpinnerComponent message="This is a custom message" open={true} />
    );

    expect(getByLabelText("Spinner message").textContent).toBe(
      "This is a custom message"
    );
  });

  it("no message", () => {
    const { queryByLabelText } = render(<SpinnerComponent open={true} />);

    expect(queryByLabelText("Spinner message")).toBeNull();
  });
});
