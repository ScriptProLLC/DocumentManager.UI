import * as docApi from "../../../api/DocManagerApi";
import * as scanApi from "../../../api/ScanningApi";
import AppStates from "../Model/AppStates";
import { ActionTypes } from "./ActionTypes";
import { byDateDescending } from "../../../util/dateUtilities";

function useDocumentManagerActions(collectionId, state, updateState) {
  async function loadCollection() {
    if (!collectionId) {
      updateState({ appState: AppStates.NO_DOCUMENTS });
      return;
    }

    const documents = await docApi
      .getCollectionDocuments(collectionId)
      .then(res => res.sort(byDateDescending));

    let activeDocument;

    if (documents.length > 0) {
      const documentWithFile = await docApi.getDocument(documents[0].id);

      for (let i = 0; i < documents.length; i++) {
        if (documents[i].id === documentWithFile.id) {
          documents[i] = documentWithFile;
        }
      }

      activeDocument = documentWithFile;
    }

    let appState =
      documents.length > 0 ? AppStates.ACTIVE_DOCUMENT : AppStates.NO_DOCUMENTS;

    updateState({ appState, documents, activeDocument });
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
        documents: state.documents.map(d =>
          d.id === document.id ? document : d
        ),
        activeDocument: document,
        appState: AppStates.ACTIVE_DOCUMENT
      });
    }
  }

  async function setActiveDocument(document) {
    if (document.documentFile) {
      updateState({
        activeDocument: document
      });
      return;
    }
    updateState({ appState: AppStates.DOCUMENT_LOADING });
    const documentWithFile = await docApi.getDocument(document.id);

    updateState({
      documents: state.documents.map(d =>
        d.id === documentWithFile.id ? documentWithFile : d
      ),
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
    pendingAttributes["File Size"] = scannedDocument.fileByteSize;
    pendingAttributes.Initials = scannedDocument.initials;

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

  async function dispatchDocumentAction(documentAction) {
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
      default:
        throw new Error(`Action: ${documentAction.type.name} does not exist`);
    }
  }
  return {
    dispatchDocumentAction
  };
}

export { useDocumentManagerActions };
