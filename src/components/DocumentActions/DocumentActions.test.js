import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentActions from "./DocumentActions";
import { createTestDocument } from "./../../util/dataHelper";

describe("DocumentActions component", () => {
  afterEach(cleanup);

  it("has the correct document name text if specified ", () => {
    const docName = "Test Document 001";
    const doc = createTestDocument({ name: docName });

    const { getByTestId } = render(<DocumentActions document={doc} />);

    expect(getByTestId("documentActionDocumentName").textContent).toBe(docName);
  });

  it("has empty document management text if no document specified", () => {
    const { getByTestId } = render(<DocumentActions document={null} />);

    expect(getByTestId("documentActionDocumentName").textContent).toBe("");
  });
});
