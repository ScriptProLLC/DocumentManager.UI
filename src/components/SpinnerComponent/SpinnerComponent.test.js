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
});
