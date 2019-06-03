import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import IconButton from "./IconButton";

var mockFn = jest.fn(r => r);

describe("IconButton component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { getByTestId } = render(
      <IconButton onClick={mockFn} data-testid="test_icon_button" icon="home" />
    );

    expect(getByTestId("test_icon_button")).toBeTruthy();
  });

  it("renders color property", () => {
    const { getByTestId } = render(
      <IconButton
        onClick={mockFn}
        data-testid="test_icon_button"
        icon="home"
        color="primary"
      />
    );

    expect(getByTestId("test_icon_button").classList).toContain("text-primary");
  });

  it("appropriately adds passed in class name", () => {
    const { getByTestId } = render(
      <IconButton
        onClick={mockFn}
        data-testid="test_icon_button"
        icon="home"
        className="test-class-name"
      />
    );

    expect(getByTestId("test_icon_button").classList).toContain(
      "test-class-name"
    );
  });

  it("renders the passed in fa icon", () => {
    const { getByTestId } = render(
      <IconButton
        onClick={mockFn}
        data-testid="test_icon_button"
        icon="save-o"
      />
    );

    expect(getByTestId("test_icon_button").classList).toContain("fa-save-o");
  });

  it("renders the passed in size", () => {
    const { getByTestId } = render(
      <IconButton
        onClick={mockFn}
        data-testid="test_icon_button"
        icon="save-o"
        size="lg"
      />
    );

    expect(getByTestId("test_icon_button").classList).toContain("fa-lg");
  });

  it("calls the onClick callback", () => {
    const { getByTestId } = render(
      <IconButton
        onClick={mockFn}
        data-testid="test_icon_button"
        icon="save-o"
        size="small"
      />
    );

    fireEvent.click(getByTestId("test_icon_button"));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
