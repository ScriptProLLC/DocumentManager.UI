import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentManager from "./DocumentManager";
import mockAxios from "./../../../__mocks__/axios";
import { act } from "react-dom/test-utils";
import { tick } from "./../../util/dataHelper";

const mockData = require("./../../../tools/mockData");

jest.mock("axios");

describe("DocumentManager component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders the correct amount of items", async () => {
    mockAxios.setCollection(mockData.documents);
    const { getByTestId } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"} />
    );

    const documentList = await waitForElement(() =>
      getByTestId("document_list_items")
    );

    expect(documentList.childElementCount).toBe(2);
  });

  it("renders the document list", async () => {
    const { getByTestId } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"} />
    );

    const documentList = await waitForElement(() =>
      getByTestId("document_list_items")
    );

    expect(documentList).toBeTruthy();
  });

  it("renders the document viewer", () => {});

  it("renders the document list header text", async () => {
    const { getByTestId } = render(<DocumentManager />);

    await tick();

    expect(getByTestId("document_list_header")).toBeTruthy();
  });

  it("renders the document viewer header text", async () => {
    const { getByTestId } = render(<DocumentManager />);

    await tick();

    expect(getByTestId("document_viewer_header")).toBeTruthy();
  });

  it("displays No Documents Present in the list for a collection with no documents", async () => {
    mockAxios.setCollection([]);
    const { getByTestId } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006418"} />
    );

    const documentListNoDocuments = await waitForElement(() =>
      getByTestId("document_list_no_documents")
    );

    expect(documentListNoDocuments).toBeTruthy();
  });

  it("displays No Documents Present in the list when no collection is passed", async () => {
    mockAxios.setCollection(null);
    const { getByTestId } = render(<DocumentManager />);

    const documentListNoDocuments = await waitForElement(() =>
      getByTestId("document_list_no_documents")
    );

    expect(documentListNoDocuments).toBeTruthy();
  });

  it("displays No Documents Present in the viewer for a collection with no documents", async () => {
    mockAxios.setCollection([]);
    const { getByTestId } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006418"} />
    );

    const documentViewerNoDocuments = await waitForElement(() =>
      getByTestId("document_viewer_no_documents")
    );

    expect(documentViewerNoDocuments).toBeTruthy();
  });

  it("displays No Documents Present in the viewer when no collection is passed", async () => {
    mockAxios.setCollection(null);
    const { getByTestId } = render(<DocumentManager />);

    const documentViewerNoDocuments = await waitForElement(() =>
      getByTestId("document_viewer_no_documents")
    );

    expect(documentViewerNoDocuments).toBeTruthy();
  });
});
