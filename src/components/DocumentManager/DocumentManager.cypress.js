/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />
const elements = require("./../../../cypress/support/elements.js");
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

  it("should show Loading spinner when a collection is loading", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // should have a visible spinner
    cy.get("[data-testid=spinner]").should("be.visible");
  });

  it("should hide Loading spinner when an empty collection is loaded", function() {
    cy.visit(`?collection=${this.collectionId}`);

    // spinner should immediate disappear on empty collection
    cy.get("[data-testid=spinner]").should("not.exist");
  });

  it("should show Loading spinner when auto-selected document is loading", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // we should have items in the list but nothing selected
    cy.get("[data-testid=document_list_items]").should("exist");

    // should appear when document selected
    cy.get("[data-testid=spinner]").should("be.visible");
  });

  it("should hide Loading spinner after auto-selected document is loaded", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // viewer state when DOM loaded but no loaded document
    cy.get("[data-testid=document_viewer_no_documents]").should("exist");

    // should appear when document loading
    cy.get("[data-testid=spinner]").should("be.visible");

    // viewer state when document loaded
    cy.get("[data-testid=document_viewer_container_withdocs]").should("exist");

    // should ago away after loading
    cy.get("[data-testid=spinner]").should("not.exist");
  });

  it("should show Loading spinner when manually selected document is loading", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // wait until spinner goes away
    cy.get("[data-testid=spinner]").should("not.exist");

    // Click the bottom item in the document list
    cy.get("[data-testid=document_name]")
      .last()
      .click();

    // spinner should be present after clicking
    cy.get("[data-testid=spinner]").should("be.visible");
  });

  it("should hide Loading spinner after a manually selected document is loaded", function() {
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    cy.visit(`?collection=${this.collectionId}`);

    // wait until spinner goes away
    cy.get("[data-testid=spinner]").should("not.exist");

    // Click the bottom item in the document list
    cy.get("[data-testid=document_name]")
      .last()
      .click();

    // viewer state when document loaded
    cy.get("[data-testid=document_viewer_container_withdocs]").should("exist");

    // should ago away after loading
    cy.get("[data-testid=spinner]").should("not.exist");
  });

  it("should show Loading spinner when scanning a document", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.get("[data-testid=scan_icon_button]").click();

    // spinner should be present after clicking
    cy.get("[data-testid=spinner]").should("be.visible");
  });

  it("should hide Loading spinner after scan has completed", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.get("[data-testid=scan_icon_button]").click();

    // viewer state when document loaded
    cy.get("[data-testid=document_viewer_container_withdocs]").should("exist");

    // should ago away after loading
    cy.get("[data-testid=spinner]").should("not.exist");
  });

  it("basic scanning", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}&initials=TBD`);

    // Click the scan button
    cy.get("[data-testid=scan_icon_button]").click();

    // Check header says scan preview
    cy.get("[data-testid=document_viewer_header]").should(
      "have.text",
      "Scan Preview"
    );

    // Check edit component is active
    cy.get("[data-testid=document_edit_document_name]").should("exist");

    // Check no documents are selected
    cy.get(".document-list-item-container.selected").should("not.exist");

    // Change the document name
    cy.get("[data-testid=document_edit_document_name]").type(
      "New Test Document"
    );

    // Save
    cy.get("[data-testid=save_button]").click();

    // Check the document is in the list
    cy.get("[data-testid=document_list_container]")
      .children()
      .children()
      .should("have.length", 1);

    // Check the new document is active/selected and has the correct name
    cy.get(".document-list-item-container.selected")
      .children()
      .first()
      .should("contain.text", "New Test Document");

    // Check that the document has the correct default attributes
    cy.get(elements.selectedItem.dateCreated).should($date => {
      const text = $date.text();

      expect(text).to.match(
        /Date Created: \d{2}\/\d{2}\/\d{4}\s\d{1,2}:\d{1,2}\s\w{2}/g
      );
    });
    cy.get(elements.selectedItem.fileSize).should(
      "have.text",
      "File Size: 781 KB"
    );
    cy.get(elements.selectedItem.initials).should("have.text", "Initials: TBD");

    // Make sure the header changes back to Document Viewer
    cy.get("[data-testid=document_viewer_header]").should(
      "have.text",
      "Document Viewer"
    );
  });

  it("cancelling a scan", function() {
    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the scan button
    cy.get("[data-testid=scan_icon_button]").click();

    // Cancel
    cy.get("[data-testid=cancel_button]").click();

    // List did not have new document added
    cy.get("[data-testid=document_list_container]")
      .children()
      .children()
      .should("have.length", 0);

    // No selected documents
    cy.get(".document-list-item-container.selected").should("not.exist");
  });
});
