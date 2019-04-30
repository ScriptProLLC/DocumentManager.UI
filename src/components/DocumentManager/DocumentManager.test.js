import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import {
  createTestDocument,
  createTestDocumentList
} from "../../util/dataHelper";
import DocumentManager from "./DocumentManager";

describe("DocumentManager component", () => {
  afterEach(cleanup);

  it("renders the correct amount of items", () => {
    const documents = createTestDocumentList(8);

    const { getByTestId } = render(<DocumentManager documents={documents} />);

    expect(getByTestId("documentListItems").childElementCount).toBe(8);
  });

  it("renders the document list", () => {
    const document = createTestDocument();

    const { getByTestId } = render(<DocumentManager documents={[document]} />);

    expect(getByTestId("documentListItems")).toBeTruthy();
  });

  it("renders the document viewer", () => {});

  it("renders the document list header text", () => {
    var document = createTestDocument();

    const { getByTestId } = render(<DocumentManager documents={[document]} />);

    expect(getByTestId("document_list_header")).toBeTruthy();
  });

  it("renders the document viewer header text", () => {
    var document = createTestDocument();

    const { getByTestId } = render(<DocumentManager documents={[document]} />);

    expect(getByTestId("document_viewer_header")).toBeTruthy();
  });
});
