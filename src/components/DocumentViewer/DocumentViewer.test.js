import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import DocumentViewer from "./DocumentViewer";

describe("DocumentList component", () => {
  afterEach(cleanup);

  describe("No documents present", () => {
    it("shows the no documents text when not passed a document", () => {
      var doc = null;

      const { getByLabelText } = render(<DocumentViewer document={doc} />);

      expect(getByLabelText("Document viewer with no document")).toBeTruthy();
    });
  });
});
