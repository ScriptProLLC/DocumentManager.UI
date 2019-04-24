import React, { useEffect } from "react";
import pdfjsLib from "pdfjs-dist";

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

  useEffect(() => {
    var doc = props.document
      ? { data: atob(props.document.documentFile) }
      : "ScriptProDefault.pdf";

    viewport = document.querySelector("#viewport");
    window.initPDFViewer(doc);
  });

  window.initPDFViewer = function(pdfURL) {
    pdfjsLib.getDocument(pdfURL).then(pdf => {
      pdfInstance = pdf;
      totalPagesCount = pdf.numPages;
      initPager();
      render();
    });
  };

  function onPagerButtonsClick(event) {
    const action = event.target.getAttribute("data-pager");
    if (action === "prev") {
      if (currentPageIndex === 0) {
        return;
      }
      currentPageIndex -= 1;
      if (currentPageIndex < 0) {
        currentPageIndex = 0;
      }
      render();
    }
    if (action === "next") {
      if (currentPageIndex === totalPagesCount - 1) {
        return;
      }
      currentPageIndex += 1;
      if (currentPageIndex > totalPagesCount - 1) {
        currentPageIndex = totalPagesCount - 1;
      }
      render();
    }
  }
  function initPager() {
    const pager = document.querySelector("#pager");
    pager.addEventListener("click", onPagerButtonsClick);
    return () => {
      pager.removeEventListener("click", onPagerButtonsClick);
    };
  }

  function render() {
    cursorIndex = Math.floor(currentPageIndex);
    const startPageIndex = cursorIndex;
    const endPageIndex =
      startPageIndex + 1 < totalPagesCount
        ? startPageIndex + 1 - 1
        : totalPagesCount - 1;

    const renderPagesPromises = [];
    for (let i = startPageIndex; i <= endPageIndex; i++) {
      renderPagesPromises.push(pdfInstance.getPage(i + 1));
    }

    Promise.all(renderPagesPromises).then(pages => {
      const pagesHTML = `<div style="width: ${"100%"}"><canvas></canvas></div>`.repeat(
        pages.length
      );
      viewport.innerHTML = pagesHTML;
      pages.forEach(renderPage);
    });
  }

  function renderPage(page) {
    let pdfViewport = page.getViewport(1);

    const container = viewport.children[page.pageIndex - cursorIndex];
    pdfViewport = page.getViewport(container.offsetWidth / pdfViewport.width);
    const canvas = container.children[0];
    const context = canvas.getContext("2d");
    canvas.height = pdfViewport.height;
    canvas.width = pdfViewport.width;

    page.render({
      canvasContext: context,
      viewport: pdfViewport
    });
  }

  return (
    <div id="app">
      <div role="toolbar" id="toolbar">
        <div id="pager">
          <button data-pager="prev">prev</button>
          <button data-pager="next">next</button>
        </div>
      </div>
      <div id="viewport-container">
        <div role="main" id="viewport" />
      </div>
    </div>
  );
}

export default DocumentViewer;
