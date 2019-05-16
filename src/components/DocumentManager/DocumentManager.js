import React from "react";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { useDocumentManagerState } from "./hooks/DocumentManagerState";
import "./DocumentManager.scss";

function DocumentManager(props) {
  const {
    documents,
    selectedDocument,
    updateSelectedDocument
  } = useDocumentManagerState(props.collectionId);

  return (
    <div className="document-manager-container">
      <div className="document-list-pane">
        <div className="header" data-testid="document_list_header">
          Documents
        </div>
        {!documents ? (
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
        {documents && documents.length > 0 && !selectedDocument ? (
          <div>Loading ...</div>
        ) : (
          <DocumentViewer document={selectedDocument} />
        )}
      </div>
    </div>
  );
}

export default DocumentManager;
