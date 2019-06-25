import * as docApi from "../../../api/DocManagerApi";
import * as scanApi from "../../../api/ScanningApi";
import AppStates from "../Model/AppStates";
import { ActionTypes } from "./ActionTypes";
import { byDateDescending } from "../../../util/dateUtilities";
import { formatErrorMessage } from "./ErrorMessage";

function useDocumentManagerActions(collectionId, initials, state, updateState) {
  async function loadCollection() {
    if (!collectionId) {
      updateState({
        appState: AppStates.NO_DOCUMENTS,
        documents: null,
        activeDocument: null
      });
      return;
    }

    updateState({ appState: AppStates.LIST_LOADING });

    let documents = await docApi
      .getCollectionDocuments(collectionId)
      .then(res => res.sort(byDateDescending));

    if (documents.length === 0) {
      updateState({
        appState: AppStates.NO_DOCUMENTS,
        documents: [],
        activeDocument: null
      });
      return;
    }

    updateState({
      appState: AppStates.DOCUMENT_LOADING,
      documents: documents,
      activeDocument: null
    });

    try {
      const documentWithFile = await docApi.getDocument(documents[0].id);

      updateState({
        appState: AppStates.ACTIVE_DOCUMENT,
        documents: swapUpdatedDocument(documents, documentWithFile),
        activeDocument: documentWithFile
      });
    } catch (error) {
      updateState({
        appState: AppStates.NO_ACTIVE_DOCUMENT,
        errorMessage: formatErrorMessage(error)
      });
    }
  }

  async function saveDocument(document) {
    if (state.appState === AppStates.DOCUMENT_PREVIEW) {
      let savedDocument = await docApi.postDocument(document);
      savedDocument.documentFile = document.documentFile;

      updateState({
        documents: [savedDocument, ...state.documents],
        activeDocument: savedDocument,
        appState: AppStates.ACTIVE_DOCUMENT
      });
    } else {
      await docApi.patchDocument(document);

      updateState({
        appState: AppStates.ACTIVE_DOCUMENT,
        documents: swapUpdatedDocument(state.documents, document),
        activeDocument: document
      });
    }
  }

  async function setActiveDocument(document) {
    if (document.documentFile) {
      updateState({
        appState: AppStates.ACTIVE_DOCUMENT,
        activeDocument: document
      });
      return;
    }

    updateState({ appState: AppStates.DOCUMENT_LOADING });

    const documentWithFile = await docApi.getDocument(document.id);

    updateState({
      documents: swapUpdatedDocument(state.documents, documentWithFile),
      activeDocument: documentWithFile,
      appState: AppStates.ACTIVE_DOCUMENT
    });
  }

  async function deleteActiveDocument() {
    await docApi.deleteDocument(state.activeDocument.id);
    const nextAppState =
      state.documents.length === 1
        ? AppStates.NO_DOCUMENTS
        : AppStates.NO_ACTIVE_DOCUMENT;

    updateState({
      documents: state.documents.filter(d => d.id !== state.activeDocument.id),
      activeDocument: null,
      appState: nextAppState
    });
  }

  async function exitEditMode() {
    if (state.appState === AppStates.DOCUMENT_PREVIEW) {
      updateState({
        activeDocument: null,
        appState: AppStates.NO_ACTIVE_DOCUMENT
      });
    } else {
      updateState({
        appState: AppStates.ACTIVE_DOCUMENT
      });
    }
  }

  async function enterEditMode() {
    updateState({ appState: AppStates.EDIT_ACTIVE_DOCUMENT });
  }

  async function scanDocument() {
    updateState({ appState: AppStates.SCANNING });

    let scannedDocument = await scanApi.scan();
    let pendingAttributes = {};
    pendingAttributes.Pages = scannedDocument.pages;
    pendingAttributes["File Size"] = scannedDocument.fileByteSize;

    pendingAttributes.Initials = initials;

    updateState({
      appState: AppStates.DOCUMENT_PREVIEW,
      activeDocument: {
        id: null,
        documentCollectionId: collectionId,
        name: "",
        documentFile: scannedDocument.scanFile,
        attributes: pendingAttributes
      }
    });
    return;
  }

  function clearError() {
    updateState({
      errorMessage: null
    });
  }

  function swapUpdatedDocument(documents, updatedDocument) {
    return documents.map(d =>
      d.id === updatedDocument.id ? updatedDocument : d
    );
  }

  async function dispatchDocumentAction(documentAction) {
    try {
      switch (documentAction.type) {
        case ActionTypes.DELETE_ACTIVE_DOCUMENT:
          await deleteActiveDocument();
          break;
        case ActionTypes.SAVE_DOCUMENT:
          await saveDocument(documentAction.document);
          break;
        case ActionTypes.SELECT_DOCUMENT:
          await setActiveDocument(documentAction.document);
          break;
        case ActionTypes.SCAN:
          await scanDocument();
          break;
        case ActionTypes.CANCEL_EDIT_DOCUMENT:
          await exitEditMode();
          break;
        case ActionTypes.EDIT_DOCUMENT:
          await enterEditMode();
          break;
        case ActionTypes.LOAD_COLLECTION:
          await loadCollection();
          break;
        case ActionTypes.CLEAR_ERROR:
          clearError();
          break;
        default:
          throw new Error(`Action: ${documentAction.type.name} does not exist`);
      }
    } catch (error) {
      // Revert to state when the action was initiated
      updateState({
        ...state,
        errorMessage: formatErrorMessage(error)
      });
    }
  }
  return {
    dispatchDocumentAction
  };
}

export { useDocumentManagerActions };
