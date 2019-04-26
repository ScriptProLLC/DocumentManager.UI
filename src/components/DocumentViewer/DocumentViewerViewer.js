import React, { useContext } from "react";
import { DocumentViewerContext } from "./DocumentViewerContext";

export default function DocumentViewerViewer(props) {
  const [pages, viewPort] = useContext(DocumentViewerContext);

  let canvasTag = null;

  console.log("PDFPages ", pages);

  function render() {
    if (pages) {
      canvasTag = pages.map((page, index) => (
        <div style={{ width: "100%" }} key={index}>
          <canvas />
        </div>
      ));
    }

    return (
      <div id="app">
        <div id="viewport-container">
          <div role="main" id="viewport" ref={viewPort}>
            {canvasTag}
          </div>
        </div>
      </div>
    );
  }

  return render();
}
