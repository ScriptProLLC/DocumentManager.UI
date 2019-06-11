import React from "react";
import { string } from "prop-types";
import ApplicationVersion from "../ApplicationVersion/ApplicationVersion";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { useDocumentManagerState } from "./hooks/DocumentManagerState";
import DocumentControlsPanel from "../DocumentControlsPanel/DocumentControlsPanel";
import DocumentListToolbar from "../DocumentListToolbar/DocumentListToolbar";
import SpinnerComponent from "./../SpinnerComponent/SpinnerComponent";
import "./DocumentManager.scss";

export default function DocumentManager(props) {
  const {
    documents,
    setSelectedDocument,
    deleteSelectedDocument,
    scanDocument,
    activeDocument,
    loading,
    inEditMode,
    updateEditMode,
    modeMessage,
    saveDocument
  } = useDocumentManagerState(props.collectionId);

  async function dispatchDocumentAction(documentAction) {
    switch (documentAction.type) {
      case "deleteAction":
        await deleteSelectedDocument();
        break;
      case "editAction":
        await updateEditMode(documentAction.mode);
        break;
      case "selectAction":
        await setSelectedDocument(documentAction.document);
        break;
      case "scanAction":
        await scanDocument();
        break;
      case "saveDocumentAction":
        await saveDocument(documentAction.document);
        break;
      default:
        console.log("no action");
    }
  }

  return (
    <div className="document-manager-container">
      <SpinnerComponent open={loading} />
      <div className="document-list-pane">
        <div className="header" data-testid="document_list_header">
          Documents
        </div>
        <DocumentListToolbar dispatchDocumentAction={dispatchDocumentAction} />

        <DocumentList
          documents={documents}
          onSelected={setSelectedDocument}
          selectedDoc={activeDocument}
        />
        <ApplicationVersion />
      </div>
      <div className="document-viewer-pane">
        <div className="header" data-testid="document_viewer_header">
          {modeMessage}
        </div>
        <DocumentViewer document={activeDocument} />
        {activeDocument && (
          <DocumentControlsPanel
            dispatchDocumentAction={dispatchDocumentAction}
            document={activeDocument}
            inEditMode={inEditMode}
          />
        )}
      </div>
    </div>
  );
}

DocumentManager.propTypes = {
  collectionId: string
};
