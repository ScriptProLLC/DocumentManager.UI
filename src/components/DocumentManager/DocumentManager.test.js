import React from "react";
import {
  render,
  fireEvent,
  getByText,
  cleanup,
  waitForDomChange,
  waitForElement
} from "react-testing-library";
import DocumentManager from "./DocumentManager";
import mockAxios from "./../../../__mocks__/axios";
import { renderCompletion } from "./../../util/testUtilities";
import "jest-dom/extend-expect";

const mockData = require("./../../../tools/mockData");
const mockScanData = require("./../../../tools/mockScanData");

jest.mock("axios");

describe("Document Manager", () => {
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

    expect(documentList);
  });

  it("renders the document list header text", async () => {
    const { getByLabelText } = render(<DocumentManager />);

    await renderCompletion();

    expect(getByLabelText("Document list header"));
  });

  it("renders the document viewer header text", async () => {
    const { getByLabelText } = render(<DocumentManager />);
    const container = getByLabelText("Document viewer header");

    await renderCompletion();

    expect(getByText(container, "Document Viewer"));
  });

  it("displays No Documents Present in the list for a collection with no documents", async () => {
    mockAxios.setCollection([]);

    const { getByLabelText } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006418"} />
    );
    const documentListNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentListNoDocuments);
  });

  it("displays No Documents Present in the list when no collection is passed", async () => {
    mockAxios.setCollection(null);

    const { getByLabelText } = render(<DocumentManager />);
    const documentListNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentListNoDocuments);
  });

  it("displays No Documents Present in the viewer for a collection with no documents", async () => {
    mockAxios.setCollection([]);

    const { getByLabelText } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006418"} />
    );
    const documentViewerNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentViewerNoDocuments);
  });

  it("displays No Documents Present in the viewer when no collection is passed", async () => {
    mockAxios.setCollection(null);

    const { getByLabelText } = render(<DocumentManager />);
    const documentViewerNoDocuments = await waitForElement(() =>
      getByLabelText("Document list with no documents")
    );

    expect(documentViewerNoDocuments);
  });

  describe("on scan", () => {
    it("changes the header text to Scan Preview", async () => {
      mockAxios.setScannedDocument(mockScanData.scan);
      mockAxios.setCollection(mockData.documents);

      const { getByLabelText } = render(
        <DocumentManager
          collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"}
        />
      );
      const container = getByLabelText("Document viewer header");

      await renderCompletion();

      fireEvent.click(getByLabelText("Scan button"));

      await waitForDomChange(container);

      expect(getByText(container, "Scan Preview"));
    });

    it("switches to edit mode", async () => {
      mockAxios.setScannedDocument(mockScanData.scan);
      mockAxios.setCollection(mockData.documents);

      const { container, getByLabelText } = render(
        <DocumentManager
          collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"}
        />
      );

      await renderCompletion();

      fireEvent.click(getByLabelText("Scan button"));

      await waitForDomChange(container);

      expect(getByLabelText("Document edit panel"));
    });

    it("no documents are selected in the list", async () => {
      mockAxios.setScannedDocument(mockScanData.scan);
      mockAxios.setCollection([mockData.documents[0]]);

      const { container, getByLabelText, queryByLabelText } = render(
        <DocumentManager
          collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"}
        />
      );

      await renderCompletion();

      fireEvent.click(getByLabelText("Scan button"));

      await waitForDomChange(container);

      expect(queryByLabelText("Selected document in list")).toBeNull();
    });
  });
});
