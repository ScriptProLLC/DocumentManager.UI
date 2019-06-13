import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentListToolbar from "./DocumentListToolbar";
import { ActionTypes } from "../DocumentManager/Model/ActionTypes";

var mockFn = jest.fn(r => r);

describe("DocumentListToolbar component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe("Scan button", () => {
    it("renders", () => {
      const { getByTestId } = render(
        <DocumentListToolbar dispatchDocumentAction={mockFn} />
      );

      expect(getByTestId("scan_icon_button")).toBeTruthy();
    });

    it("has the correct icon class", () => {
      const { getByTestId } = render(
        <DocumentListToolbar dispatchDocumentAction={mockFn} />
      );

      expect(getByTestId("scan_icon_button").classList).toContain("fa-upload");
    });

    it("dispatches the scan action on click", () => {
      const { getByTestId } = render(
        <DocumentListToolbar dispatchDocumentAction={mockFn} />
      );

      fireEvent.click(getByTestId("scan_icon_button"));

      expect(mockFn).toHaveBeenCalledWith({ type: ActionTypes.SCAN });
    });
  });
});
