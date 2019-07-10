import React from "react";
import PDFViewer from "./PDFViewer";
import { DocumentViewerContext } from "./DocumentViewerContext";
import { documentPropType } from "../../propTypes";
import "./DocumentViewer.scss";

export default function DocumentViewer(props) {
  let pdfDocument = props.document;
  let documentFile = pdfDocument ? pdfDocument.documentFile : null;

  return (
    <section
      aria-label="Document viewer container"
      className="document-viewer-container"
    >
      {!pdfDocument || !pdfDocument.documentFile ? (
        <span
          aria-label="Document viewer with no document"
          className="document-viewer-empty"
        >
          No document selected
        </span>
      ) : (
        <DocumentViewerContext.Provider
          value={{
            documentFile
          }}
        >
          <PDFViewer />
        </DocumentViewerContext.Provider>
      )}
    </section>
  );
}

// Define PropTypes For Document Viewer
DocumentViewer.propTypes = {
  document: documentPropType
};
