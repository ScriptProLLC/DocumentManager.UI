import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentEdit from "./DocumentEdit";
import { createTestDocument } from "./../../util/dataHelper";

describe("DocumentEdit component", () => {
  var basicNamedDoc;
  var basicUnnamedDoc;
  var basicNamedDocName = "Test Document 001";
  var unnamedDocPlaceholder = "Unnamed Document";

  afterEach(cleanup);

  beforeEach(() => {
    basicNamedDoc = createTestDocument({ name: basicNamedDocName });
    basicUnnamedDoc = createTestDocument({ name: null });
  });

  it("renders", () => {
    const { getByTestId } = render(<DocumentEdit document={basicNamedDoc} />);

    expect(getByTestId("document_edit_document_name")).toBeTruthy();
  });

  it("has the correct document name text if specified ", () => {
    const { getByTestId } = render(<DocumentEdit document={basicNamedDoc} />);

    expect(getByTestId("document_edit_document_name").value).toBe(
      basicNamedDocName
    );
  });

  it("text value is null if name not specified ", () => {
    const { getByTestId } = render(<DocumentEdit document={basicUnnamedDoc} />);

    expect(getByTestId("document_edit_document_name").value).toBe("");
  });

  it("has the correct placeholder text if name not specified", () => {
    const { getByTestId } = render(<DocumentEdit document={basicUnnamedDoc} />);

    expect(getByTestId("document_edit_document_name").placeholder).toBe(
      unnamedDocPlaceholder
    );
  });
});
