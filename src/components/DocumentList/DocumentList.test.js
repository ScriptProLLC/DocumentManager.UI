import React from "react";
import { render, cleanup, getByText } from "react-testing-library";
import DocumentList from "./DocumentList";
import { createTestDocumentList } from "../../util/dataHelper";
import AppStates from "../DocumentManager/Model/AppStates";
import "jest-dom/extend-expect";

describe("Document List", () => {
  afterEach(cleanup);

  describe("no documents present", () => {
    it("shows the no documents text if in the no documents app state", () => {
      const { container } = render(
        <DocumentList appState={AppStates.NO_DOCUMENTS} />
      );

      expect(getByText(container, "No documents present"));
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
