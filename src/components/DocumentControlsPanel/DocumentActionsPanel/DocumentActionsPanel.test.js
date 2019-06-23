import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import DocumentActionsPanel from "./DocumentActionsPanel";
import { createTestDocument } from "../../../util/dataHelper";

describe("DocumentActionsPanel component", () => {
  afterEach(cleanup);

  it("has the correct document name text if specified ", () => {
    const docName = "Test Document 001";
    const doc = createTestDocument({ name: docName });

    const { getByLabelText } = render(<DocumentActionsPanel document={doc} />);

    expect(
      getByLabelText("Document name in document actions panel").textContent
    ).toBe(docName);
  });

  it("has empty document management text if no document name is specified", () => {
    const doc = createTestDocument({ name: null });
    const { getByLabelText } = render(<DocumentActionsPanel document={doc} />);

    expect(
      getByLabelText("Document name in document actions panel").textContent
    ).toBe("Unnamed Document");
  });
});
