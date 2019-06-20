import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange,
  waitForElement
} from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentManager from "./DocumentManager";
import mockAxios from "./../../../__mocks__/axios";
import { renderCompletion } from "./../../util/testUtilities";

const mockData = require("./../../../tools/mockData");
const mockScanData = require("./../../../tools/mockScanData");

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

    await renderCompletion();

    const documentList = await waitForElement(() =>
      getByTestId("document_list_items")
    );

    expect(documentList.childElementCount).toBe(2);
  });

  it("renders the document list", async () => {
    const { getByTestId } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"} />
    );

    await renderCompletion();

    const documentList = await waitForElement(() =>
      getByTestId("document_list_items")
    );

    expect(documentList).toBeTruthy();
  });

  it("renders the document viewer", () => {});

  it("renders the document list header text", async () => {
    const { getByTestId } = render(<DocumentManager />);

    await renderCompletion();

    expect(getByTestId("document_list_header")).toBeTruthy();
  });

  it("renders the document viewer header text", async () => {
    const { getByTestId } = render(<DocumentManager />);

    await renderCompletion();

    expect(getByTestId("document_viewer_header").textContent).toBe(
      "Document Viewer"
    );
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

  describe("on scan", () => {
    it("changes the header text to Scan Preview", async () => {
      mockAxios.setScannedDocument(mockScanData.scan);
      mockAxios.setCollection(mockData.documents);

      const { container, getByTestId } = render(
        <DocumentManager
          collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"}
        />
      );

      await renderCompletion();

      fireEvent.click(getByTestId("scan_icon_button"));

      await waitForDomChange(container);

      expect(getByTestId("document_viewer_header").textContent).toBe(
        "Scan Preview"
      );
    });

    it("switches to edit mode", async () => {
      mockAxios.setScannedDocument(mockScanData.scan);
      mockAxios.setCollection(mockData.documents);

      const { container, getByTestId } = render(
        <DocumentManager
          collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"}
        />
      );

      await renderCompletion();

      fireEvent.click(getByTestId("scan_icon_button"));

      await waitForDomChange(container);

      expect(getByTestId("document_edit_document_name")).toBeTruthy();
    });

    it("no documents are selected in the list", async () => {
      mockAxios.setScannedDocument(mockScanData.scan);
      mockAxios.setCollection([mockData.documents[0]]);

      const { container, getByTestId } = render(
        <DocumentManager
          collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"}
        />
      );

      await renderCompletion();

      fireEvent.click(getByTestId("scan_icon_button"));

      await waitForDomChange(container);

      expect(
        getByTestId("document_list_items").children[0].children[0].classList
      ).toContain("document-list-item-container");
      expect(
        getByTestId("document_list_items").children[0].children[0].classList
      ).not.toContain("selected");
    });
  });
});
