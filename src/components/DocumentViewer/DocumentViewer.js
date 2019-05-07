import React, { useEffect } from "react";
import PDFViewer from "./PDFViewer";
import { DocumentViewerContext } from "./DocumentViewerContext";
import DocumentActions from "../DocumentActions/DocumentActions";
import "./DocumentViewer.css";

function DocumentViewer(props) {
  let pdfDocument = props.document;
  let documentFile = pdfDocument ? pdfDocument.documentFile : null;

  useEffect(() => {}, [documentFile]);

  function render() {
    if (!pdfDocument) {
      return <div className="document-viewer-container"> Loading... </div>;
    } else {
      return (
        <DocumentViewerContext.Provider
          value={{
            documentFile
          }}
        >
          <div className="document-viewer-container">
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
