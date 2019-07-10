import React from "react";
import { render, cleanup, getByText } from "react-testing-library";
import DocumentActionsPanel from "./DocumentActionsPanel";
import { createTestDocument } from "../../../util/dataHelper";
import "jest-dom/extend-expect";

describe("Document Actions Panel", () => {
  afterEach(cleanup);

  it("has the correct document name text if specified ", () => {
    const docName = "Test Document 001";
    const doc = createTestDocument({ name: docName });
    const { container } = render(<DocumentActionsPanel document={doc} />);

    expect(getByText(container, docName));
  });

  it("has empty document management text if no document name is specified", () => {
    const doc = createTestDocument({ name: null });
    const { container } = render(<DocumentActionsPanel document={doc} />);

    expect(getByText(container, "Unnamed Document"));
  });
});
