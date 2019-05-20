import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentViewer from "./DocumentViewer";

describe("DocumentList component", () => {
  afterEach(cleanup);

  describe("No documents present", () => {
    it("shows the no documents text when not passed a document", () => {
      var doc = null;

      const { getByTestId } = render(<DocumentViewer document={doc} />);

      expect(getByTestId("document_viewer_no_documents")).toBeTruthy();
    });
  });
});
