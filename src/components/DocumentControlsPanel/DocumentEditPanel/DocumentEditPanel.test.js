import React from "react";
import { render, cleanup } from "react-testing-library";
import DocumentEditPanel from "./DocumentEditPanel";
import { createTestDocument } from "../../../util/dataHelper";
import "jest-dom/extend-expect";

describe("DocumentEditPanel component", () => {
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
    const { getByLabelText } = render(
      <DocumentEditPanel document={basicNamedDoc} />
    );

    expect(getByLabelText("Document name in document edit panel")).toBeTruthy();
  });

  it("has the correct document name text if specified ", () => {
    const { getByLabelText } = render(
      <DocumentEditPanel document={basicNamedDoc} />
    );

    expect(getByLabelText("Document name in document edit panel").value).toBe(
      basicNamedDocName
    );
  });

  it("text value is null if name not specified ", () => {
    const { getByLabelText } = render(
      <DocumentEditPanel document={basicUnnamedDoc} />
    );

    expect(getByLabelText("Document name in document edit panel").value).toBe(
      ""
    );
  });

  it("has the correct placeholder text if name not specified", () => {
    const { getByLabelText } = render(
      <DocumentEditPanel document={basicUnnamedDoc} />
    );

    expect(
      getByLabelText("Document name in document edit panel").placeholder
    ).toBe(unnamedDocPlaceholder);
  });
});
