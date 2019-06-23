import React from "react";
import { render, cleanup } from "@testing-library/react";
import DocumentList from "./DocumentList";
import { createTestDocumentList } from "../../util/dataHelper";
import AppStates from "../DocumentManager/Model/AppStates";
import "jest-dom/extend-expect";

describe("DocumentList component", () => {
  afterEach(cleanup);

  describe("No documents present", () => {
    it("shows the no documents text if in the no documents app state", () => {
      const { getByLabelText } = render(
        <DocumentList appState={AppStates.NO_DOCUMENTS} />
      );

      expect(getByLabelText("Document list with no documents")).toBeTruthy();
    });
  });

  it("has the correct count after adding items", () => {
    var docs = createTestDocumentList(2);

    const { getByLabelText } = render(<DocumentList documents={docs} />);

    expect(
      getByLabelText("Document list with documents").childElementCount
    ).toBe(2);
  });
});
