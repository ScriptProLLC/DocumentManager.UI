import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentList from "./DocumentList";
import { createTestDocumentList } from "../../util/dataHelper";

describe("DocumentList component", () => {
  afterEach(cleanup);

  describe("No documents present", () => {
    it("shows the no documents text after adding empty list", () => {
      var docs = [];

      const { getByTestId } = render(<DocumentList documents={docs} />);

      expect(getByTestId("document_list_no_documents")).toBeTruthy();
    });

    it("shows the no documents text if there is no list", () => {
      var docs = null;

      const { getByTestId } = render(<DocumentList documents={docs} />);

      expect(getByTestId("document_list_no_documents")).toBeTruthy();
    });
  });

  it("has the correct count after adding items", () => {
    var docs = createTestDocumentList(2);

    const { getByTestId } = render(<DocumentList documents={docs} />);

    expect(getByTestId("documentListItems").childElementCount).toBe(2);
  });
});
