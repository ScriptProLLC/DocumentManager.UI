import React, { useContext, useEffect, useRef, useState } from "react";
import { DocumentViewerContext } from "./DocumentViewerContext";
import { decodeBase64 } from "../../util/base64Utilities";

export default function PDFViewer() {
  let iFrameRef = useRef();
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  const { documentFile } = useContext(DocumentViewerContext);

  useEffect(() => {
    if (!isFrameLoaded) {
      return;
    }

    var pdf = decodeBase64(documentFile);

    iFrameRef.current.contentWindow.PDFViewerApplication.open(pdf);
  }, [isFrameLoaded, documentFile]);

  return (
    <iframe
      title="Document Viewer"
      className="d-block"
      src="./pdfjs-2.0.943-dist/web/viewer.html?file="
      data-testid="document_viewer_iframe"
      frameBorder="0"
      width="100%"
      height="100%"
      ref={iFrameRef}
      onLoad={() => setIsFrameLoaded(true)}
    />
  );
}
