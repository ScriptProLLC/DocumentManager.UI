/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");

describe("ModalDialog", function() {
  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  it("does not close when clicking behind", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the default selected document
    cy.get("[aria-label='Delete button']").click();

    // Verify the Modal dialog is on screen
    cy.get("[aria-label='Modal header text']").should("have.text", "Alert");

    // Attempt to click behind the modal dialog
    cy.get("[aria-label='Document list header']").click({
      force: true
    });

    // Verify the Modal dialog is still on screen
    cy.get("[aria-label='Modal header text']").should("have.text", "Alert");
  });

  it("focuses the cancel button", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to open the modal dialog
    cy.get("[aria-label='Delete button']").click();

    // Verify the cancel button has focus
    cy.focused().should("have.attr", "aria-label", "Modal cancel button");
  });
});
