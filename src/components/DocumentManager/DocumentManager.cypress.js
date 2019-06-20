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
    cy.get("[aria-label='Document name for the document in the list']")
      .last()
      .click();

    // Verify the selected document is Document 2
    cy.get(
      ".document-list-item-container.selected .document-list-item-name span"
    ).should("contain.text", "Document 2");
  });

  it("should show Loading spinner when a collection is loading", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // should have a visible spinner
    cy.get("[aria-label='Spinner icon']").should("be.visible");
  });

  it("should hide Loading spinner when an empty collection is loaded", function() {
    cy.visit(`?collection=${this.collectionId}`);

    // spinner should immediate disappear on empty collection
    cy.get("[aria-label='Spinner icon']").should("not.exist");
  });

  it("should show Loading spinner when auto-selected document is loading", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // we should have items in the list but nothing selected
    cy.get("[aria-label='Document list with documents']").should("exist");

    // should appear when document selected
    cy.get("[aria-label='Spinner icon']").should("be.visible");
  });

  it("should hide Loading spinner after auto-selected document is loaded", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // viewer state when DOM loaded but no loaded document
    cy.get("[aria-label='Document viewer with no document']").should("exist");

    // should appear when document loading
    cy.get("[aria-label='Spinner icon']").should("be.visible");

    // viewer state when document loaded
    cy.get("[aria-label='Document viewer frame']").should("exist");

    // should ago away after loading
    cy.get("[aria-label='Spinner icon']").should("not.exist");
  });

  it("should show Loading spinner when manually selected document is loading", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // wait until spinner goes away
    cy.get("[aria-label='Spinner icon']").should("not.exist");

    // Click the bottom item in the document list
    cy.get("[aria-label='Document name for the document in the list']")
      .last()
      .click();

    // spinner should be present after clicking
    cy.get("[aria-label='Spinner icon']").should("be.visible");
  });

  it("should hide Loading spinner after a manually selected document is loaded", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // wait until spinner goes away
    cy.get("[aria-label='Spinner icon']").should("not.exist");

    // Click the bottom item in the document list
    cy.get("[aria-label='Document name for the document in the list']")
      .last()
      .click();

    // viewer state when document loaded
    cy.get("[aria-label='Document viewer frame']").should("exist");

    // should ago away after loading
    cy.get("[aria-label='Spinner icon']").should("not.exist");
  });

  it("basic scanning", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.get("[aria-label='Scan button']").click();

    // Check header says scan preview
    cy.get("[aria-label='Document viewer header']").should(
      "have.text",
      "Scan Preview"
    );

    // Check edit component is active
    cy.get("[aria-label='Document name in document edit panel']").should(
      "exist"
    );

    // Check no documents are selected
    cy.get(".document-list-item-container.selected").should("not.exist");

    // Change the document name
    cy.get("[aria-label='Document name in document edit panel']").type(
      "New Test Document"
    );

    // Save
    cy.get("[aria-label='Save button']").click();

    // Check the document is in the list
    cy.get("[aria-label='Document list container']")
      .children()
      .children()
      .should("have.length", 1);

    // Check the new document is active/selected and has the correct name
    cy.get(".document-list-item-container.selected")
      .children()
      .first()
      .should("contain.text", "New Test Document");

    // Make sure the header changes back to Document Viewer
    cy.get("[aria-label='Document viewer header']").should(
      "have.text",
      "Document Viewer"
    );
  });

  it("cancelling a scan", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.get("[aria-label='Scan button']").click();

    // Cancel
    cy.get("[aria-label='Cancel button']").click();

    // List did not have new document added
    cy.get("[aria-label='Document list container']")
      .children()
      .children()
      .should("have.length", 0);

    // No selected documents
    cy.get(".document-list-item-container.selected").should("not.exist");
  });
});
