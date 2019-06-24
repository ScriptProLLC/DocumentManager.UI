import React from "react";
import PDFViewer from "./PDFViewer";
import { documentPropType } from "../../propTypes";
import "./DocumentViewer.scss";

export default function DocumentViewer({ document }) {
  const base64String = document ? document.documentFile : null;

  return (
    <section
      aria-label="Document viewer container"
      className="document-viewer-container"
    >
      {!document || !document.documentFile ? (
        <span
          aria-label="Document viewer with no document"
          className="document-viewer-empty"
        >
          No document selected
        </span>
      ) : (
        <PDFViewer base64String={base64String} />
      )}
    </section>
  );
}

// Define PropTypes For Document Viewer
DocumentViewer.propTypes = {
  document: documentPropType
};
