/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../../tools/mockData");

describe("DocumentActions", function() {
  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("DocumentActions Delete click + confirm should remove one document, leave remaining", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the default selected document
    cy.get("[aria-label='Delete button']").click();

    // Continue through Are you sure prompt
    cy.get("[aria-label='Modal confirm button']").click();

    // Verify the list now contains only one item
    cy.get("[aria-label='Document list with documents']")
      .children()
      .should("have.length", 1);

    // Verify the document is the one that was not deleted
    cy.get("[aria-label='Document name for the document in the list']").should(
      "have.text",
      mockData.documents[1].name
    );

    // Verify the Selected document is no longer present in the API
    cy.getCollectionDocuments(this.collectionId)
      .should("have.length", 1)
      .then(documents => documents[0].name)
      .should("equal", mockData.documents[1].name);
  });

  it("No documents present after deleting the last document", function() {
    // Add new document to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the only document
    cy.get("[aria-label='Delete button']").click();

    // Continue through Are you sure prompt
    cy.get("[aria-label='Modal confirm button']").click();

    // Verify the No documents present message displays
    cy.get("[aria-label='Document list with no documents']").should(
      "have.text",
      "No documents present"
    );
  });

  it("DocumentActions Delete click + cancel should make no changes", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Verify that the correct document is selected in the list
    cy.get("[aria-label='Document name in document actions panel']").should(
      "have.text",
      mockData.documents[0].name
    );

    // Click delete to delete the selected document
    cy.get("[aria-label='Delete button']").click();

    // Click No on the Are you sure prompt
    cy.get("[aria-label='Modal cancel button']").click();

    // Verify no documents were removed from the list
    cy.get("[aria-label='Document list with documents']")
      .children()
      .should("have.length", 2);

    // Verify the selected document has not changed
    cy.get("[aria-label='Document name in document actions panel']").should(
      "have.text",
      mockData.documents[0].name
    );
  });

  it("DocumentActions Delete click + close should make no changes", function() {
    // Add new document to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the only document
    cy.get("[aria-label='Delete button']").click();

    // Click the X to close the Are you sure prompt
    cy.get("[aria-label='Modal header']")
      .children()
      .last()
      .click();

    // Verify the documetn was not deleted
    cy.get("[aria-label='Document list with documents']")
      .children()
      .should("have.length", 1);
  });
});
