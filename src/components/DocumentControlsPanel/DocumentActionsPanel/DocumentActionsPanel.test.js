import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentActionsPanel from "./DocumentActionsPanel";
import { createTestDocument } from "../../../util/dataHelper";

describe("DocumentActionsPanel component", () => {
  afterEach(cleanup);

  it("has the correct document name text if specified ", () => {
    const docName = "Test Document 001";
    const doc = createTestDocument({ name: docName });

    const { getByTestId } = render(<DocumentActionsPanel document={doc} />);

    expect(getByTestId("document_action_document_name").textContent).toBe(
      docName
    );
  });

  it("has empty document management text if no document name is specified", () => {
    const doc = createTestDocument({ name: null });
    const { getByTestId } = render(<DocumentActionsPanel document={doc} />);

    expect(getByTestId("document_action_document_name").textContent).toBe(
      "Unnamed Document"
    );
  });
});
