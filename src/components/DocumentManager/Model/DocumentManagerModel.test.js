import { useDocumentManagerModel } from "./DocumentManagerModel";
import { renderHook, act } from "react-hooks-testing-library";
import { cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { asyncAct, renderCompletion } from "./../../../util/testUtilities";
import {
  cloneWithoutFile,
  createTestDocumentList
} from "./../../../util/dataHelper";
import mockData from "./../../../../tools/mockData";
import * as mockDMApi from "./../../../api/DocManagerApi";
import * as mockScanningApi from "./../../../api/ScanningApi";
import { ActionTypes } from "./ActionTypes";

jest.mock("./../../../api/DocManagerApi");
jest.mock("./../../../api/ScanningApi");

const someCollectionId = "d7a2add9-14bf-480e-9b97-96685a006431";
let configureDMApi = () => {};
let configureScanningApi = () => {};

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

beforeEach(() => {
  configureDMApi = (collectionDocuments, document) => {
    mockDMApi.setup("getCollectionDocuments", async () => collectionDocuments);
    mockDMApi.setup("getDocument", async () => document);
    mockDMApi.setup("deleteDocument", async () => {});
  };

  configureScanningApi = base64String => {
    mockScanningApi.setup("scan", async () => {
      return {
        fileSize: (base64String.length * 3) / 4,
        scanFile: base64String
      };
    });
  };
});

describe("DocumentManagerModel", () => {
  afterEach(cleanup);

  describe("on app startup", () => {
    it("should get the list of collection documents", async () => {
      configureDMApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();

      expect(result.current.state.documents.map(cloneWithoutFile)).toEqual(
        mockData.documents.map(cloneWithoutFile)
      );
    });

    it("sorts the documents by dateCreated", async () => {
      var docs = createTestDocumentList(3);
      docs[0].dateCreated = "2000-12-31T06:49:12.45";
      docs[1].dateCreated = "2011-12-31T06:49:12.45";
      docs[2].dateCreated = "1997-01-01T06:30:16.25";

      configureDMApi(docs.map(cloneWithoutFile), docs[0]);

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();

      expect(result.current.state.documents[0].dateCreated).toEqual(
        "2011-12-31T06:49:12.45"
      );
      expect(result.current.state.documents[1].dateCreated).toEqual(
        "2000-12-31T06:49:12.45"
      );
      expect(result.current.state.documents[2].dateCreated).toEqual(
        "1997-01-01T06:30:16.25"
      );
    });

    it("should make a call to get the first document file", async () => {
      configureDMApi(mockData.documents.map(cloneWithoutFile), {});
      var getDocumentSpy = jest.spyOn(mockDMApi, "getDocument");

      renderHook(() => useDocumentManagerModel(someCollectionId));

      await renderCompletion();

      expect(getDocumentSpy).toHaveBeenCalledTimes(1);
    });

    it("should select the first item in the list of collection documents by default", async () => {
      configureDMApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );
      await renderCompletion();

      expect(result.current.state.activeDocument).toEqual(
        mockData.documents[0]
      );
    });
  });

  describe("on delete", () => {
    let currentState = {};
    let deleteDocumentSpy;

    beforeEach(async () => {
      configureDMApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      deleteDocumentSpy = jest.spyOn(mockDMApi, "deleteDocument");
      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      currentState = result.current;

      await renderCompletion();

      asyncAct(async () => {
        await result.current.dispatchDocumentAction({
          type: ActionTypes.DELETE_ACTIVE_DOCUMENT
        });
        currentState = result.current.state;
      });

      await renderCompletion();
    });

    it("should remove the document from the list", () => {
      expect(currentState.documents).not.toContain(mockData.documents[0]);
    });

    it("should leave no document selected", () => {
      expect(currentState.activeDocument).toBeNull();
    });

    it("should make a call to delete the correct document", () => {
      expect(deleteDocumentSpy).toHaveBeenCalledWith(mockData.documents[0].id);
    });
  });

  describe("on selecting a new document", () => {
    it("should update the active document", async () => {
      configureDMApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );
      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );
      configureDMApi([], mockData.documents[1]);

      await renderCompletion();

      act(() => {
        result.current.dispatchDocumentAction({
          type: ActionTypes.SELECT_DOCUMENT,
          document: mockData.documents[1]
        });
      });

      await renderCompletion();

      expect(result.current.state.activeDocument).toEqual(
        mockData.documents[1]
      );
    });

    it("should make a call to get the document file if necessary", async () => {
      configureDMApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      configureDMApi([], mockData.documents[1]);

      await renderCompletion();

      act(() => {
        result.current.dispatchDocumentAction({
          type: ActionTypes.SELECT_DOCUMENT,
          document: mockData.documents[1]
        });
      });

      await renderCompletion();

      expect(result.current.state.documents[1].documentFile).toEqual(
        mockData.documents[1].documentFile
      );
    });

    it("should not make call to get the document file for documents that already have one", async () => {
      configureDMApi(
        [cloneWithoutFile(mockData.documents[0]), mockData.documents[1]],
        mockData.documents[0]
      );
      var getDocumentSpy = jest.spyOn(mockDMApi, "getDocument");

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();
      act(() => {
        result.current.dispatchDocumentAction({
          type: ActionTypes.SELECT_DOCUMENT,
          document: mockData.documents[1]
        });
      });

      await renderCompletion();
      expect(getDocumentSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("on scan", () => {
    it("should call the scan method on the scan api", async () => {
      configureScanningApi("test");

      var scanSpy = jest.spyOn(mockScanningApi, "scan");

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();

      act(() => {
        result.current.dispatchDocumentAction({
          type: ActionTypes.SCAN
        });
      });

      await renderCompletion();

      expect(scanSpy).toHaveBeenCalledTimes(1);
    });

    it("should set the active document with the new file", async () => {
      configureScanningApi("Test document file");

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();

      act(() => {
        result.current.dispatchDocumentAction({
          type: ActionTypes.SCAN
        });
      });

      await renderCompletion();

      expect(result.current.state.activeDocument.documentFile).toBe(
        "Test document file"
      );
    });

    it("should default the document name to the empty string", async () => {
      configureScanningApi("Test document file");

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();

      act(() => {
        result.current.dispatchDocumentAction({
          type: ActionTypes.SCAN
        });
      });

      await renderCompletion();

      expect(result.current.state.activeDocument.name).toBe("");
    });

    it("should set the active document with the active collectionId", async () => {
      configureScanningApi("Test document file");

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();

      act(() => {
        result.current.dispatchDocumentAction({
          type: ActionTypes.SCAN
        });
      });

      await renderCompletion();

      expect(result.current.state.activeDocument.documentCollectionId).toBe(
        someCollectionId
      );
    });
  });

  describe("no documents state", () => {
    it("should set the list of collection documents to null if the collection is null", async () => {
      configureDMApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() => useDocumentManagerModel(null));

      await renderCompletion();
      expect(result.current.state.documents).toBeNull();
    });

    it("should set the active document to null if the collection is null", async () => {
      configureDMApi(
        mockData.documents.map(cloneWithoutFile),
        mockData.documents[0]
      );

      const { result } = renderHook(() => useDocumentManagerModel(null));

      await renderCompletion();

      expect(result.current.state.activeDocument).toBeNull();
    });

    it("should not make a call to get the collection documents if the collection is null", async () => {
      configureDMApi(mockData.documents.map(cloneWithoutFile), {});
      var getDocumentCollectionsSpy = jest.spyOn(
        mockDMApi,
        "getCollectionDocuments"
      );

      renderHook(() => useDocumentManagerModel(null));

      await renderCompletion();

      expect(getDocumentCollectionsSpy).not.toHaveBeenCalled();
    });

    it("should not make a call to get the first document file if the collection is null", async () => {
      configureDMApi(mockData.documents.map(cloneWithoutFile), {});
      var getDocumentSpy = jest.spyOn(mockDMApi, "getDocument");

      renderHook(() => useDocumentManagerModel(null));

      await renderCompletion();

      expect(getDocumentSpy).not.toHaveBeenCalled();
    });

    it("should initialize with an empty list if collection contains no documents", async () => {
      configureDMApi([], {});

      const { result } = renderHook(() =>
        useDocumentManagerModel(someCollectionId)
      );

      await renderCompletion();

      expect(result.current.state.documents).toEqual([]);
    });
  });
});
