/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");

describe("Document List", function() {
  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("header should have correct text", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Check the text on the Document List Header
    cy.getByLabelText("Document list header").within(() => {
      cy.contains("Documents");
    });
  });

  it("scroll bar is functional", function() {
    // Condition to check if scroll bar is on screen
    const hasScrollBar = function(elem) {
      return elem[0].scrollHeight > elem[0].clientHeight;
    };

    // Add enough documents to render a scroll bar
    cy.addDocumentsToCollection(mockData.documents[1], this.collectionId, 30);

    // Open app to correct collection
    cy.visit(`?collection=${this.collectionId}`);

    // Check the scroll bar shows up
    cy.getByLabelText("Document list container").should(
      "satisfy",
      hasScrollBar
    );
  });
});
