/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");

describe("DocumentList", function() {
  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("document list header should have correct text", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Check the text on the Document List Header
    cy.get("[data-testid=document_list_header]").should(
      "have.text",
      "Documents"
    );
  });

  it("document list scroll bar is functional", function() {
    // Add enough documents to render a scroll bar
    cy.addDocumentsToCollection(mockData.documents[1], this.collectionId, 30);

    // Open app to correct collection
    cy.visit(`?collection=${this.collectionId}`);

    // Condition to check if scroll bar is on screen
    const hasScrollBar = function(elem) {
      return elem[0].scrollHeight > elem[0].clientHeight;
    };

    // Check the scroll bar shows up
    cy.get("[data-testid=document_list_container]").should(
      "satisfy",
      hasScrollBar
    );
  });
});
