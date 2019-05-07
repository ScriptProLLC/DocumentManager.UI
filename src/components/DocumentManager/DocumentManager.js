import React, { useState, useEffect } from "react";
import "./DocumentManager.css";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { getDocuments } from "./../../api/docManagerApi";

function DocumentManager(props) {
  let [documents, setDocuments] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!documents && props.collectionId) {
        const result = await getDocuments(props.collectionId);
        setDocuments(result);
        setSelectedDocument(result[0] || null);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="document-manager-container">
      <div className="document-list-pane">
        <div className="header" data-testid="document_list_header">
          Documents
        </div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <DocumentList
            documents={documents}
            onSelected={setSelectedDocument}
            selectedDoc={selectedDocument}
          />
        )}
      </div>
      <div className="document-viewer-pane">
        <div className="header" data-testid="document_viewer_header">
          Document Viewer
        </div>
        <DocumentViewer document={selectedDocument} />
      </div>
    </div>
  );
}

export default DocumentManager;
