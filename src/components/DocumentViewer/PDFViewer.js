import React, { useEffect, useRef, useState } from "react";
import { decodeBase64 } from "../../util/base64Utilities";
import PropTypes from "prop-types";

export default function PDFViewer({ file }) {
  let iFrameRef = useRef();
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  useEffect(() => {
    if (!isFrameLoaded) {
      return;
    }

    var pdf = decodeBase64(file);

    iFrameRef.current.contentWindow.PDFViewerApplication.open(pdf);
  }, [isFrameLoaded, file]);

  return (
    <iframe
      title="Document Viewer"
      className="d-block"
      src="./pdfjs-2.0.943-dist/web/viewer.html?file="
      aria-label="Document viewer frame"
      frameBorder="0"
      width="100%"
      height="100%"
      ref={iFrameRef}
      onLoad={() => setIsFrameLoaded(true)}
    />
  );
}

PDFViewer.propTypes = {
  /** Base64 encoded string */
  file: PropTypes.string.isRequired
};
