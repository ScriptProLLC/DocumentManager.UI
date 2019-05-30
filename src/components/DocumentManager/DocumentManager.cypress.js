/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");

describe("DocumentManager", function() {
  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("clicking on a document in the list selects the document", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Verify the selected document in Document 1
    cy.get(".document-list-item-container.selected")
      .children()
      .first()
      .should("contain.text", "Document 1");

    // Click the bottom item in the document list
    cy.get("[data-testid=document_name]")
      .last()
      .click();

    // Verify the selected document is Document 2
    cy.get(
      ".document-list-item-container.selected .document-list-item-name span"
    ).should("contain.text", "Document 2");
  });
});
