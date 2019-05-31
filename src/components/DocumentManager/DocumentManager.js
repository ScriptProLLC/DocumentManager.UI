import React from "react";
import { string } from "prop-types";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { useDocumentManagerState } from "./hooks/DocumentManagerState";
import DocumentControlsPanel from "../DocumentControlsPanel/DocumentControlsPanel";
import IconButton from "../IconButton/IconButton";
import DocumentListToolbar from "../DocumentListToolbar/DocumentListToolbar";
import "./DocumentManager.scss";

function DocumentManager(props) {
  const {
    documents,
    setSelectedDocument,
    deleteSelectedDocument,
    scanDocument,
    activeDocument,
    editDocument
  } = useDocumentManagerState(props.collectionId);

  async function dispatchDocumentAction(documentAction) {
    switch (documentAction.type) {
      case "deleteAction":
        await deleteSelectedDocument();
        break;
      case "editAction":
        await editDocument(documentAction.document);
        break;
      case "selectAction":
        await setSelectedDocument(documentAction.document);
        break;
      case "scanAction":
        scanDocument();
        break;
      default:
        console.log("no action");
    }
  }

  return (
    <div className="document-manager-container">
      <div className="document-list-pane">
        <div className="header" data-testid="document_list_header">
          Documents
        </div>
        <DocumentListToolbar dispatchDocumentAction={dispatchDocumentAction} />
        {props.collectionId && !documents ? (
          <div>Loading ...</div>
        ) : (
          <DocumentList
            documents={documents}
            onSelected={setSelectedDocument}
            selectedDoc={activeDocument}
          />
        )}
      </div>
      <div className="document-viewer-pane">
        <div className="header" data-testid="document_viewer_header">
          Document Viewer
        </div>
        {props.collectionId && !documents && !activeDocument ? (
          <div>Loading ...</div>
        ) : (
          <DocumentViewer document={activeDocument} />
        )}
        {!documents || !activeDocument ? (
          <></>
        ) : (
          <DocumentControlsPanel
            dispatchDocumentAction={dispatchDocumentAction}
            document={activeDocument}
          />
        )}
      </div>
    </div>
  );
}

export default DocumentManager;

DocumentManager.propTypes = {
  collectionId: string
};
