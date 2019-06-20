/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../../tools/mockData");

describe("DocumentEdit", function() {
  const modifiedDocName = "Modified doc name";

  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("Document Edit Panel Save click should update document user-friendly name", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // // Click delete to delete the default selected document
    cy.get("[aria-label='Edit button']")
      .should("exist")
      .click();

    cy.get("[aria-label='Document name in document edit panel'").clear();

    cy.get("[aria-label='Document name in document edit panel'").type(
      modifiedDocName
    );

    cy.get("[aria-label='Save button']").click();

    // verify that the DOM elements are changed
    cy.get("[aria-label='Document name in document actions panel']").should(
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

  it("Document Edit Panel Cancel click should retain old information", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // // Click delete to delete the default selected document
    cy.get("[aria-label='Edit button']")
      .should("exist")
      .click();

    cy.get("[aria-label='Document name in document edit panel'").clear();

    cy.get("[aria-label='Document name in document edit panel'").type(
      modifiedDocName
    );

    cy.get("[aria-label='Cancel button']").click();

    // verify that the DOM elements are not changed
    cy.get("[aria-label='Document name in document actions panel']").should(
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
