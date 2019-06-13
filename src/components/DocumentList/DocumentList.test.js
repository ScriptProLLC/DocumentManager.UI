import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentList from "./DocumentList";
import { createTestDocumentList } from "../../util/dataHelper";
import AppStates from "../DocumentManager/Model/AppStates";

describe("DocumentList component", () => {
  afterEach(cleanup);

  describe("No documents present", () => {
    it("shows the no documents text if in the no documents app state", () => {
      const { getByTestId } = render(
        <DocumentList appState={AppStates.NO_DOCUMENTS} />
      );

      expect(getByTestId("document_list_no_documents")).toBeTruthy();
    });
  });

  it("has the correct count after adding items", () => {
    var docs = createTestDocumentList(2);

    const { getByTestId } = render(<DocumentList documents={docs} />);

    expect(getByTestId("document_list_items").childElementCount).toBe(2);
  });
});
