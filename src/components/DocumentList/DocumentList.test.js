import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange
} from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentList from "./DocumentList";
import { createTestDocumentList } from "../../util/dataHelper";

describe("DocumentList component", () => {
  afterEach(cleanup);

  it("shows the no documents text after adding empty list", () => {
    var docs = [];

    const { getByTestId } = render(<DocumentList documents={docs} />);

    expect(getByTestId("documentListNoDocuments").textContent).toBe(
      "No documents present"
    );
  });

  it("has the correct count after adding items", () => {
    var docs = createTestDocumentList(2);

    const { getByTestId } = render(<DocumentList documents={docs} />);

    expect(getByTestId("documentListItems").childElementCount).toBe(2);
  });
});
