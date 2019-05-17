import React, { useEffect } from "react";
import PDFViewer from "./PDFViewer";
import { DocumentViewerContext } from "./DocumentViewerContext";
import DocumentActions from "../DocumentActions/DocumentActions";
import "./DocumentViewer.scss";

function DocumentViewer(props) {
  let pdfDocument = props.document;
  let documentFile = pdfDocument ? pdfDocument.documentFile : null;

  useEffect(() => {}, [documentFile]);

  function render() {
    if (!pdfDocument || !pdfDocument.documentFile) {
      return (
        <div
          data-testid="document_viewer_container_nodocs"
          className="document-viewer-container"
        >
          <div className="document-viewer-empty">No documents present</div>
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
            <DocumentActions document={pdfDocument} />
          </div>
        </DocumentViewerContext.Provider>
      );
    }
  }

  return render();
}

export default DocumentViewer;
