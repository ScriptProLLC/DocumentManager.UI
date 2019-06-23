import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
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
      const { getByLabelText } = render(
        <DocumentListToolbar dispatchDocumentAction={mockFn} />
      );

      expect(getByLabelText("Scan button")).toBeTruthy();
    });

    it("has the correct icon class", () => {
      const { getByLabelText } = render(
        <DocumentListToolbar dispatchDocumentAction={mockFn} />
      );

      expect(getByLabelText("Scan button").classList).toContain("fa-upload");
    });

    it("dispatches the scan action on click", () => {
      const { getByLabelText } = render(
        <DocumentListToolbar dispatchDocumentAction={mockFn} />
      );

      fireEvent.click(getByLabelText("Scan button"));

      expect(mockFn).toHaveBeenCalledWith({ type: ActionTypes.SCAN });
    });
  });
});
