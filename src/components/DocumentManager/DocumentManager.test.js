import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import "jest-dom/extend-expect";
import DocumentManager from "./DocumentManager";
import mockAxios from "./../../../__mocks__/axios";
import { act } from "react-dom/test-utils";

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
      getByTestId("documentListItems")
    );

    expect(documentList.childElementCount).toBe(2);
  });

  it("renders the document list", async () => {
    const { getByTestId } = render(
      <DocumentManager collectionId={"d7a2add9-14bf-480e-9b97-96685a006431"} />
    );

    const documentList = await waitForElement(() =>
      getByTestId("documentListItems")
    );

    expect(documentList).toBeTruthy();
  });

  it("renders the document viewer", () => {});

  it("renders the document list header text", () => {
    const { getByTestId } = render(<DocumentManager />);

    expect(getByTestId("document_list_header")).toBeTruthy();
  });

  it("renders the document viewer header text", () => {
    const { getByTestId } = render(<DocumentManager />);

    expect(getByTestId("document_viewer_header")).toBeTruthy();
  });
});
