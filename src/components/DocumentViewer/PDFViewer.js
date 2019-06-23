import React, { useEffect, useRef, useState } from "react";
import { decodeBase64 } from "../../util/base64Utilities";
import PropTypes from "prop-types";

export default function PDFViewer({ base64String }) {
  let iFrameRef = useRef();
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  useEffect(() => {
    if (!isFrameLoaded) {
      return;
    }

    var pdf = decodeBase64(base64String);

    iFrameRef.current.contentWindow.PDFViewerApplication.open(pdf);
  }, [isFrameLoaded, base64String]);

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
  base64String: PropTypes.string.isRequired
};
