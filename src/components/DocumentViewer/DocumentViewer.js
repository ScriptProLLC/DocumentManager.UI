import React from "react";
import PDFViewer from "./PDFViewer";
import { DocumentViewerContext } from "./DocumentViewerContext";
import "./DocumentViewer.scss";

function DocumentViewer(props) {
  let pdfDocument = props.document;
  let documentFile = pdfDocument ? pdfDocument.documentFile : null;

  function render() {
    if (!pdfDocument || !pdfDocument.documentFile) {
      return (
        <div
          data-testid="document_viewer_container_nodocs"
          className="document-viewer-container"
        >
          <div
            data-testid="document_viewer_no_documents"
            className="document-viewer-empty"
          >
            No document selected
          </div>
        </div>
      );
    } else {
      return (
        <DocumentViewerContext.Provider
          value={{
            documentFile
          }}
        >
          <div
            data-testid="document_viewer_container_withdocs"
            className="document-viewer-container"
          >
            <PDFViewer />
          </div>
        </DocumentViewerContext.Provider>
      );
    }
  }

  return render();
}

export default DocumentViewer;
