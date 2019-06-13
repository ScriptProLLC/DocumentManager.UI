/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../../tools/mockData");

describe("DocumentEdit", function() {
  const modifiedDocName = "Modified doc name";

  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("DocumentEdit Save click should update document user-friendly name", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // // Click delete to delete the default selected document
    cy.get("[data-testid=edit_button]")
      .should("exist")
      .click();

    cy.get("[data-testid=document_edit_document_name").clear();

    cy.get("[data-testid=document_edit_document_name").type(modifiedDocName);

    cy.get("[data-testid=save_button]").click();

    // verify that the DOM elements are changed
    cy.get("[data-testid=document_action_document_name]").should(
      "have.text",
      modifiedDocName
    );

    cy.get(".document-list-item-container.selected")
      .children()
      .first()
      .should("contain.text", modifiedDocName);

    // verify that the actual data is changed
    cy.getCollectionDocuments(this.collectionId)
      .should("have.length", 1)
      .then(documents => documents[0].name)
      .should("equal", modifiedDocName);
  });

  it("DocumentEdit Cancel click should retain old information", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // // Click delete to delete the default selected document
    cy.get("[data-testid=edit_button]")
      .should("exist")
      .click();

    cy.get("[data-testid=document_edit_document_name").clear();

    cy.get("[data-testid=document_edit_document_name").type(modifiedDocName);

    cy.get("[data-testid=cancel_button]").click();

    // verify that the DOM elements are not changed
    cy.get("[data-testid=document_action_document_name]").should(
      "have.text",
      mockData.documents[0].name
    );

    cy.get(".document-list-item-container.selected")
      .children()
      .first()
      .should("contain.text", mockData.documents[0].name);

    // verify that the actual data is back to old value
    cy.getCollectionDocuments(this.collectionId)
      .should("have.length", 1)
      .then(documents => documents[0].name)
      .should("equal", mockData.documents[0].name);
  });
});
