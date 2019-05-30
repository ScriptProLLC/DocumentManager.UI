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
    cy.get("[data-testid=document_list_header]").should(
      "have.text",
      "Documents"
    );
  });

  it("document list scroll bar is functional", function() {
    cy.addDocumentsToCollection(mockData.documents[1], this.collectionId, 30);

    cy.visit(`?collection=${this.collectionId}`);

    const hasScrollBar = function(elem) {
      return elem[0].scrollHeight > elem[0].clientHeight;
    };

    cy.get("[data-testid=document_list_container]")
      .then(hasScrollBar)
      .should("be.true");
  });
});
