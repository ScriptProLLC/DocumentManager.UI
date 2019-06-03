import React from "react";
import { render, cleanup } from "react-testing-library";
import SpinnerComponent from "./SpinnerComponent";

describe("Spinner component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    const { getByTestId } = render(<SpinnerComponent open={true} />);

    expect(getByTestId("spinner")).toBeTruthy();
  });

  it("display a message", () => {
    const { getByTestId } = render(
      <SpinnerComponent message="This is a custom message" open={true} />
    );

    expect(getByTestId("spinner_message").textContent).toBe(
      "This is a custom message"
    );
  });

  it("no message", () => {
    const { queryByTestId } = render(<SpinnerComponent open={true} />);

    expect(queryByTestId("spinner_message")).toBeNull();
  });
});
