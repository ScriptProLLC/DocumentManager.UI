/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />
const mockData = require("../../../tools/mockData");

describe("Document Manager", function() {
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
    cy.getByLabelText("Selected document in list").within(() => {
      cy.contains("Document 1");
    });

    // Click the bottom item in the document list
    cy.getByLabelText("Document name in list")
      .last()
      .click();

    // Verify the selected document is Document 2
    // Note: Using 'Should' here to retry until the selected document displays correctly, otherwise it will check the name too fast.
    cy.getByLabelText("Selected document in list").should(prompt => {
      expect(prompt).to.contain("Document 2");
    });
  });

  it("should show Loading spinner when a collection is loading", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // should have a visible spinner
    cy.getByLabelText("Spinner icon");
  });

  it("should hide Loading spinner when an empty collection is loaded", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // spinner should immediate disappear on empty collection
    cy.getByLabelText("Spinner icon").should("not.exist");
  });

  it("should show Loading spinner when auto-selected document is loading", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // we should have items in the list but nothing selected
    cy.getByLabelText("Document list with documents");

    // should appear when document selected
    cy.getByLabelText("Spinner icon");
  });

  it("should hide Loading spinner after auto-selected document is loaded", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // viewer state when DOM loaded but no loaded document
    cy.getByLabelText("Document viewer with no document");

    // should appear when document loading
    cy.getByLabelText("Spinner icon");

    // viewer state when document loaded
    cy.getByLabelText("Document viewer frame");

    // should go away after loading
    cy.getByLabelText("Spinner icon").should("not.exist");
  });

  it("should show Loading spinner when manually selected document is loading", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // should go away after loading
    cy.getByLabelText("Spinner icon").should("not.exist");

    // Click the bottom item in the document list
    cy.getByLabelText("Document name in list")
      .last()
      .click();

    // spinner should be present after clicking
    cy.getByLabelText("Spinner icon");
  });

  it("should hide Loading spinner after a manually selected document is loaded", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // should go away after loading
    cy.getByLabelText("Spinner icon").should("not.exist");

    // Click the bottom item in the document list
    cy.getByLabelText("Document name in list")
      .last()
      .click();

    // viewer state when document loaded
    cy.getByLabelText("Document viewer frame");

    // should go away after loading
    cy.getByLabelText("Spinner icon").should("not.exist");
  });

  it("should show Loading spinner when scanning a document", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.getByLabelText("Scan button").click();

    // spinner should be present after clicking
    cy.getByLabelText("Spinner icon");
  });

  it("should hide Loading spinner after scan has completed", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.getByLabelText("Scan button").click();

    // viewer state when document loaded
    cy.getByLabelText("Document viewer frame");

    // should go away after loading
    cy.getByLabelText("Spinner icon").should("not.exist");
  });

  it("basic scanning", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}&initials=TBD`);

    // Click the scan button
    cy.getByLabelText("Scan button").click();

    // Check header says scan preview
    cy.getByLabelText("Document viewer header").within(() => {
      cy.contains("Scan Preview");
    });

    // Check edit component is active
    cy.getByLabelText("Document edit panel");

    // Check no documents are selected
    cy.getByLabelText("Selected document in list").should("not.exist");

    // Change the document name
    cy.getByLabelText("Document name input").type("New Test Document");

    // Save
    cy.getByLabelText("Save button").click();

    // Check the new document is active/selected and has the correct name
    cy.getByLabelText("Selected document in list").within(() => {
      cy.contains("New Test Document");
    });

    // Check that the document has the correct default attributes
    cy.getByLabelText("Selected document in list").within(() => {
      cy.contains(/\d{2}\/\d{2}\/\d{4}\s\d{1,2}:\d{1,2}\s\w{2}/g);
      cy.contains("781 KB");
      cy.contains("TBD");
    });

    // Make sure the header changes back to Document Viewer
    cy.getByLabelText("Document viewer header").contains("Document Viewer");
  });

  it("cancelling a scan", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.getByLabelText("Scan button").click();

    // Cancel
    cy.getByLabelText("Cancel button").click();

    // List should not have any documents
    cy.getByLabelText("Document name in list").should("not.exist");
  });
});
