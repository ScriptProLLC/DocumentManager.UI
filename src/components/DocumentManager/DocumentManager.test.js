import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentManager from "./DocumentManager";
import mockAxios from "./../../../__mocks__/axios";
import { renderCompletion } from "./../../util/testUtilities";

const mockData = require("./../../../tools/mockData");

jest.mock("axios");

describe("DocumentManager component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders the correct amount of items", async () => {
    mockAxios.setCollection(mockData.documents);

    const { getByLabelText } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"} />
    );

    await renderCompletion();

    const documentList = await waitForElement(() =>
      getByLabelText("Document list with documents")
    );

    expect(documentList.childElementCount).toBe(2);
  });

  it("renders the document list", async () => {
    const { getByLabelText } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"} />
    );

    await renderCompletion();

    const documentList = await waitForElement(() =>
      getByLabelText("Document list with documents")
    );

    expect(documentList).toBeTruthy();
  });

  it("renders the document viewer", () => {});

  it("renders the document list header text", async () => {
    const { getByLabelText } = render(<DocumentManager />);

    await renderCompletion();

    expect(getByLabelText("Document list header")).toBeTruthy();
  });

  it("renders the document viewer header text", async () => {
    const { getByLabelText } = render(<DocumentManager />);

    await renderCompletion();

    expect(getByLabelText("Document viewer header")).toBeTruthy();
  });

  it("displays No Documents Present in the list for a collection with no documents", async () => {
    mockAxios.setCollection([]);
    const { getByLabelText } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006418"} />
    );

    const documentListNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentListNoDocuments).toBeTruthy();
  });

  it("displays No Documents Present in the list when no collection is passed", async () => {
    mockAxios.setCollection(null);
    const { getByLabelText } = render(<DocumentManager />);

    const documentListNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentListNoDocuments).toBeTruthy();
  });

  it("displays No Documents Present in the viewer for a collection with no documents", async () => {
    mockAxios.setCollection([]);
    const { getByLabelText } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006418"} />
    );

    const documentViewerNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentViewerNoDocuments).toBeTruthy();
  });

  it("displays No Documents Present in the viewer when no collection is passed", async () => {
    mockAxios.setCollection(null);
    const { getByLabelText } = render(<DocumentManager />);

    const documentViewerNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentViewerNoDocuments).toBeTruthy();
  });
});
