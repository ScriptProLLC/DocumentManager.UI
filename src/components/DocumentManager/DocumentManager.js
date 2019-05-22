import React from "react";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { useDocumentManagerState } from "./hooks/DocumentManagerState";
import DocumentActions from "../DocumentActions/DocumentActions";
import "./DocumentManager.scss";

function DocumentManager(props) {
  const {
    documents,
    selectedDocument,
    updateSelectedDocument,
    deleteSelectedDocument
  } = useDocumentManagerState(props.collectionId);

  async function dispatchDocumentAction(documentAction) {
    switch (documentAction.type) {
      case "deleteAction":
        await deleteSelectedDocument();
        break;
      case "selectAction":
        await updateSelectedDocument(documentAction.document);
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
        {props.collectionId && !documents ? (
          <div>Loading ...</div>
        ) : (
          <DocumentList
            documents={documents}
            onSelected={updateSelectedDocument}
            selectedDoc={selectedDocument}
          />
        )}
      </div>
      <div className="document-viewer-pane">
        <div className="header" data-testid="document_viewer_header">
          Document Viewer
        </div>
        {props.collectionId && !documents ? (
          <div>Loading ...</div>
        ) : (
          <DocumentViewer document={selectedDocument} />
        )}
        {!documents || !selectedDocument ? (
          <></>
        ) : (
          <DocumentActions
            document={selectedDocument}
            dispatchDocumentAction={dispatchDocumentAction}
          />
        )}
      </div>
    </div>
  );
}

export default DocumentManager;
