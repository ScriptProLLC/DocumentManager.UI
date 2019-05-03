import React, { useEffect } from "react";
import PDFViewer from "./PDFViewer";
import { DocumentViewerContext } from "./DocumentViewerContext";
import "./DocumentViewer.css";

function DocumentViewer(props) {
  let pdfDocument = props.document;
  let documentFile = pdfDocument ? pdfDocument.documentFile : null;

  useEffect(() => {}, [documentFile]);

  function render() {
    if (!pdfDocument) {
      return <div> Loading... </div>;
    } else {
      return (
        <DocumentViewerContext.Provider
          value={{
            documentFile
          }}
        >
          <div>
            <PDFViewer />
          </div>
        </DocumentViewerContext.Provider>
      );
    }
  }

  return render();
}

export default DocumentViewer;
