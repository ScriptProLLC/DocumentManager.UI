import { renderHook, act } from "react-hooks-testing-library";
import { cleanup } from "react-testing-library";
import { useDocumentManagerState } from "./../hooks/DocumentManagerState";
import mockData from "./../../../../tools/mockData";
import { cloneWithoutFile, tick } from "./../../../util/dataHelper";
import * as mockApi from "./../../../api/DocManagerApi";

jest.mock("./../../../api/DocManagerApi");
let configureApi = () => {};
const renderCompletion = tick;

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

beforeEach(() => {
  configureApi = (collectionDocuments, document) => {
    mockApi.setup("getCollectionDocuments", async () => collectionDocuments);
    mockApi.setup("getDocument", async () => document);
  };
});

describe("useDocumentManagerState", () => {
  it("should initialize with the list of collection documents", async done => {
    configureApi(
      mockData.documents.map(cloneWithoutFile),
      mockData.documents[0]
    );

    const { result } = renderHook(() => useDocumentManagerState());

    await renderCompletion();
    expect(result.current.documents.map(cloneWithoutFile)).toEqual(
      mockData.documents.map(cloneWithoutFile)
    );
    done();
  });

  it("should initialize with an empty list if collection is empty", async done => {
    configureApi([], {});

    const { result } = renderHook(() => useDocumentManagerState());
    await renderCompletion();

    expect(result.current.documents).toEqual([]);
    done();
  });

  it("should select the first item in the list by default", async done => {
    configureApi(
      mockData.documents.map(cloneWithoutFile),
      mockData.documents[0]
    );

    const { result } = renderHook(() => useDocumentManagerState());
    await renderCompletion();

    expect(result.current.selectedDocument).toEqual(mockData.documents[0]);
    done();
  });

  it("should update the selected document", async done => {
    configureApi(
      mockData.documents.map(cloneWithoutFile),
      mockData.documents[0]
    );
    const { result } = renderHook(() => useDocumentManagerState());
    configureApi([], mockData.documents[1]);

    await renderCompletion();
    act(() => {
      result.current.updateSelectedDocument(
        cloneWithoutFile(mockData.documents[1])
      );
    });

    await renderCompletion();
    expect(result.current.selectedDocument).toEqual(mockData.documents[1]);
    done();
  });

  it("should make a call to get the document file on initialize", async done => {
    configureApi(mockData.documents.map(cloneWithoutFile), {});
    var getDocumentSpy = jest.spyOn(mockApi, "getDocument");

    renderHook(() => useDocumentManagerState());

    await renderCompletion();
    expect(getDocumentSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it("should make a call to get the document file when selecting a new document", async done => {
    configureApi(
      mockData.documents.map(cloneWithoutFile),
      mockData.documents[0]
    );
    const { result } = renderHook(() => useDocumentManagerState());
    configureApi([], mockData.documents[1]);

    await renderCompletion();
    act(() => {
      result.current.updateSelectedDocument(
        cloneWithoutFile(mockData.documents[1])
      );
    });

    await renderCompletion();
    expect(result.current.documents[1].documentFile).toEqual(
      mockData.documents[1].documentFile
    );
    done();
  });

  it("should not make call to update the documents list if the document already has a file", async done => {
    configureApi(
      [cloneWithoutFile(mockData.documents[0]), mockData.documents[1]],
      mockData.documents[0]
    );
    var getDocumentSpy = jest.spyOn(mockApi, "getDocument");

    const { result } = renderHook(() => useDocumentManagerState());

    await renderCompletion();
    act(() => {
      result.current.updateSelectedDocument(mockData.documents[1]);
    });

    await renderCompletion();
    expect(getDocumentSpy).toHaveBeenCalledTimes(1);
    done();
  });
});
