/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

describe("DocumentViewer", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it("selecting a document in the list renders the pdf", () => {
    //// should be at least one in list and a document rendered already
    cy.get("[data-testid=documentListItems]").then($selectedElement => {
      expect($selectedElement).to.be.not.null;

      var elemToClick = $selectedElement[0].children[1].querySelector(
        "[data-testid=collapse]"
      );

      elemToClick.click();

      cy.get("[class=document-viewer-container]").then($selectedElement => {
        expect($selectedElement).to.be.not.null;

        expect($selectedElement[0].children[0].className.trim()).to.equal(
          "pdfjs"
        );
      });
    });
  });
});
