import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import IconButton from "./IconButton";
import "jest-dom/extend-expect";

var mockFn = jest.fn(r => r);

describe("Icon Button", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { getByLabelText } = render(
      <IconButton onClick={mockFn} aria-label="Test icon button" icon="save" />
    );

    expect(getByLabelText("Test icon button"));
  });

  it("renders color property", () => {
    const { getByLabelText } = render(
      <IconButton
        onClick={mockFn}
        aria-label="Test icon button"
        icon="save"
        color="primary"
      />
    );

    expect(getByLabelText("Test icon button").classList).toContain(
      "text-primary"
    );
  });

  it("appropriately adds passed in class name", () => {
    const { getByLabelText } = render(
      <IconButton
        onClick={mockFn}
        aria-label="Test icon button"
        icon="save"
        className="test-class-name"
      />
    );

    expect(getByLabelText("Test icon button").classList).toContain(
      "test-class-name"
    );
  });

  it("renders the passed in fa icon", () => {
    const { getByLabelText } = render(
      <IconButton onClick={mockFn} aria-label="Test icon button" icon="save" />
    );

    expect(getByLabelText("Test icon button").classList).toContain("fa-save");
  });

  it("renders the passed in size", () => {
    const { getByLabelText } = render(
      <IconButton
        onClick={mockFn}
        aria-label="Test icon button"
        icon="save"
        size="lg"
      />
    );

    expect(getByLabelText("Test icon button").classList).toContain("fa-lg");
  });

  it("calls the onClick callback", () => {
    const { getByLabelText } = render(
      <IconButton
        onClick={mockFn}
        aria-label="Test icon button"
        icon="save"
        size="lg"
      />
    );

    fireEvent.click(getByLabelText("Test icon button"));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
