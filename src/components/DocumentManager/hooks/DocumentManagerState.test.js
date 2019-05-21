import { renderHook, act } from "react-hooks-testing-library";
import { cleanup } from "react-testing-library";
import { useDocumentManagerState } from "./../hooks/DocumentManagerState";
import mockData from "./../../../../tools/mockData";
import { cloneWithoutFile, tick } from "./../../../util/dataHelper";
import * as mockApi from "./../../../api/DocManagerApi";

jest.mock("./../../../api/DocManagerApi");

const someCollectionId = "d7a2add9-14bf-480e-9b97-96685a006431";
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
  describe("on app startup", () => {
    it("should get the list of collection documents", async () => {
      configureApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() =>
        useDocumentManagerState(someCollectionId)
      );

      await renderCompletion();
      expect(result.current.documents.map(cloneWithoutFile)).toEqual(
        mockData.documents.map(cloneWithoutFile)
      );
    });

    it("should make a call to get the first document file", async () => {
      configureApi(mockData.documents.map(cloneWithoutFile), {});
      var getDocumentSpy = jest.spyOn(mockApi, "getDocument");

      renderHook(() => useDocumentManagerState(someCollectionId));

      await renderCompletion();
      expect(getDocumentSpy).toHaveBeenCalledTimes(1);
    });

    it("should select the first item in the list of collection documents by default", async () => {
      configureApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() =>
        useDocumentManagerState(someCollectionId)
      );
      await renderCompletion();

      expect(result.current.selectedDocument).toEqual(mockData.documents[0]);
    });
  });

  describe("on selecting new document", () => {
    it("should update the selected document", async () => {
      configureApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );
      const { result } = renderHook(() =>
        useDocumentManagerState(someCollectionId)
      );
      configureApi([], mockData.documents[1]);

      await renderCompletion();
      act(() => {
        result.current.updateSelectedDocument(
          cloneWithoutFile(mockData.documents[1])
        );
      });

      await renderCompletion();
      expect(result.current.selectedDocument).toEqual(mockData.documents[1]);
    });

    it("should make a call to get the document file if necessary", async () => {
      configureApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );
      const { result } = renderHook(() =>
        useDocumentManagerState(someCollectionId)
      );
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
    });

    it("should not make call to get the document file for documents that already have one", async () => {
      configureApi(
        [cloneWithoutFile(mockData.documents[0]), mockData.documents[1]],
        mockData.documents[0]
      );
      var getDocumentSpy = jest.spyOn(mockApi, "getDocument");

      const { result } = renderHook(() =>
        useDocumentManagerState(someCollectionId)
      );

      await renderCompletion();
      act(() => {
        result.current.updateSelectedDocument(mockData.documents[1]);
      });

      await renderCompletion();
      expect(getDocumentSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("no documents state", () => {
    it("should set the list of collection documents to null if the collection is null", async () => {
      configureApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() => useDocumentManagerState(null));

      await renderCompletion();
      expect(result.current.documents).toBeNull();
    });

    it("should set the selected document to null if the collection is null", async () => {
      configureApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() => useDocumentManagerState(null));

      await renderCompletion();
      expect(result.current.selectedDocument).toBeNull();
    });

    it("should not make a call to get the collection documents if the collection is null", async () => {
      configureApi(mockData.documents.map(cloneWithoutFile), {});
      var getDocumentCollectionsSpy = jest.spyOn(
        mockApi,
        "getCollectionDocuments"
      );

      renderHook(() => useDocumentManagerState(null));

      await renderCompletion();
      expect(getDocumentCollectionsSpy).not.toHaveBeenCalled();
    });

    it("should not make a call to get the first document file if the collection is null", async () => {
      configureApi(mockData.documents.map(cloneWithoutFile), {});
      var getDocumentSpy = jest.spyOn(mockApi, "getDocument");

      renderHook(() => useDocumentManagerState(null));

      await renderCompletion();
      expect(getDocumentSpy).not.toHaveBeenCalled();
    });

    it("should initialize with an empty list if collection contains no documents", async () => {
      configureApi([], {});

      const { result } = renderHook(() =>
        useDocumentManagerState(someCollectionId)
      );
      await renderCompletion();

      expect(result.current.documents).toEqual([]);
    });
  });
});