import React from "react";
import { render, cleanup } from "react-testing-library";
import SpinnerComponent from "./SpinnerComponent";

describe("Spinner component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    const { getByLabelText } = render(<SpinnerComponent open={true} />);

    expect(getByLabelText("Spinner icon"));
  });

  it("displays a message", () => {
    const { getByText } = render(
      <SpinnerComponent message="This is a custom message" open={true} />
    );

    expect(getByText("This is a custom message"));
  });

  it("no message", () => {
    const { queryByLabelText } = render(<SpinnerComponent open={true} />);

    expect(queryByLabelText("Spinner message")).toBeNull();
  });
});
