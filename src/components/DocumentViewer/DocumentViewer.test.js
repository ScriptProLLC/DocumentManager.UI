import React from "react";
import { render, cleanup } from "react-testing-library";
import DocumentViewer from "./DocumentViewer";
import "jest-dom/extend-expect";

describe("Document Viewer", () => {
  afterEach(cleanup);

  describe("No documents present", () => {
    it("shows the no documents text when not passed a document", () => {
      const doc = null;
      const { getByLabelText } = render(<DocumentViewer document={doc} />);

      expect(getByLabelText("Document viewer with no document"));
    });
  });
});
