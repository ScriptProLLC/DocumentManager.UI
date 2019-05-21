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

  describe("Sorting", () => {
    it("sorts by date by default", () => {
      var docs = createTestDocumentList(3);
      docs[0].dateCreated = "1997-01-01T06:30:16.25";
      docs[1].dateCreated = "1999-12-31T06:49:12.45";
      docs[2].dateCreated = "2018-07-08T06:14:16.59";

      const { getAllByTestId } = render(<DocumentList documents={docs} />);

      var items = getAllByTestId("Date Created");
      expect(items[0].textContent).toBe("Date Created: 07/08/2018 06:14 am");
      expect(items[1].textContent).toBe("Date Created: 12/31/1999 06:49 am");
      expect(items[2].textContent).toBe("Date Created: 01/01/1997 06:30 am");
    });
  });

  it("has the correct count after adding items", () => {
    var docs = createTestDocumentList(2);

    const { getByTestId } = render(<DocumentList documents={docs} />);

    expect(getByTestId("document_list_items").childElementCount).toBe(2);
  });
});
