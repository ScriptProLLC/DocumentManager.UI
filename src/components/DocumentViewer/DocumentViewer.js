import React, { useEffect, useState, useRef } from "react";
import pdfjsLib from "pdfjs-dist";

import DocumentViewerViewer from "./DocumentViewerViewer";
import { DocumentViewerContext } from "./DocumentViewerContext";
import "bootstrap/dist/css/bootstrap.css";
import "./DocumentViewer.css";

function DocumentViewer(props) {
  let currentPageIndex = 0;
  let pageMode = 1;
  let cursorIndex = Math.floor(currentPageIndex / pageMode);
  let pdfInstance = null;
  let totalPagesCount = 0;
  let viewport = null;

  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.js`;
  const [pages, setPages] = useState(null);
  const viewPort = useRef(null);

  var doc = props.document
    ? { data: atob(props.document.documentFile) }
    : "ScriptProDefault.pdf";

  useEffect(() => {
    window.initPDFViewer(doc);
    //window.initPDFViewer(PDF_URL);
  }, [pdfInstance]);

  window.initPDFViewer = function(pdfURL) {
    pdfjsLib.getDocument(pdfURL).then(pdf => {
      pdfInstance = pdf;
      totalPagesCount = pdf.numPages;
      render();
    });
  };

  function render() {
    cursorIndex = Math.floor(currentPageIndex);
    const startPageIndex = cursorIndex;
    const endPageIndex = totalPagesCount - 1;

    const renderPagesPromises = [];
    for (let i = startPageIndex; i <= endPageIndex; i++) {
      renderPagesPromises.push(pdfInstance.getPage(i + 1));
    }

    Promise.all(renderPagesPromises).then(pages => {
      setPages(pages);
      console.log("ViewPort ", viewport);
      pages.forEach(renderPage);
    });
  }

  function renderPage(page) {
    let pdfViewport = page.getViewport(1);
    //console.log("in the renderpage");

    const container = viewPort.current.children[page.pageIndex - cursorIndex];
    //console.log("Container ", container);

    pdfViewport = page.getViewport(container.offsetWidth / pdfViewport.width);
    //console.log("pfdViewport ", pdfViewport);
    const canvas = container.children[0];
    //console.log("Canvas", canvas);
    const context = canvas.getContext("2d");
    canvas.height = pdfViewport.height;
    canvas.width = pdfViewport.width;

    page.render({
      canvasContext: context,
      viewport: pdfViewport
    });
  }

  return (
    <DocumentViewerContext.Provider value={[pages, viewPort]}>
      <DocumentViewerViewer />
    </DocumentViewerContext.Provider>
  );
}

export default DocumentViewer;
