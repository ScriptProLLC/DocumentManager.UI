/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");

describe("Document Viewer", function() {
  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("selecting a document in the list renders the pdf", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Select the last document in the list
    cy.getByLabelText("Document name in list")
      .last()
      .click();

    // Check to make sure the document viewer is loaded
    cy.getByLabelText("Document viewer frame");
  });
});
