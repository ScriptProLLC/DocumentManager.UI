/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../../tools/mockData");

describe("Document Edit Panel", function() {
  const modifiedDocName = "Modified doc name";

  beforeEach(function() {
    cy.addCollection().as("collectionId");
  });

  // https://on.cypress.io/interacting-with-elements

  it("Save click should update document user-friendly name", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the edit button
    cy.getByLabelText("Edit button").click();

    // Clear the input
    cy.getByLabelText("Document name input").clear();

    // Type new name into input
    cy.getByLabelText("Document name input").type(modifiedDocName);

    // Click the save button
    cy.getByLabelText("Save button").click();

    // Verify that the selected document name is changed in the panel
    cy.getByLabelText("Document actions panel").within(() => {
      cy.contains(modifiedDocName);
    });

    // Verify that the selected document is changed in the document list
    cy.getByLabelText("Selected document in list").within(() => {
      cy.contains(modifiedDocName);
    });

    // Verify that the actual data is changed
    cy.getCollectionDocuments(this.collectionId)
      .should("have.length", 1)
      .then(documents => documents[0].name)
      .should("equal", modifiedDocName);
  });

  it("Cancel click should retain old information", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click the edit button
    cy.getByLabelText("Edit button").click();

    // Clear the input
    cy.getByLabelText("Document name input").clear();

    // Type new name into input
    cy.getByLabelText("Document name input").type(modifiedDocName);

    // Click the cancel button
    cy.getByLabelText("Cancel button").click();

    // Verify that the selected document name is not changed in the panel
    cy.getByLabelText("Document actions panel").within(() => {
      cy.contains(mockData.documents[0].name);
    });

    // Verify that the selected document is not changed in the document list
    cy.getByLabelText("Selected document in list").within(() => {
      cy.contains(mockData.documents[0].name);
    });

    // Verify that the actual data is back to old value
    cy.getCollectionDocuments(this.collectionId)
      .should("have.length", 1)
      .then(documents => documents[0].name)
      .should("equal", mockData.documents[0].name);
  });
});
