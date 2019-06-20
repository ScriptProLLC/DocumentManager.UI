/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");

describe("DocumentViewer", function() {
  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("selecting a document in the list renders the pdf", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    cy.get("[aria-label='Document name for the document in the list']")
      .last()
      .click();

    cy.get("[aria-label='Document viewer frame']").should("exist");
  });
});
