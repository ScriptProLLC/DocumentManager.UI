/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");
const {
  postDocumentToCollection,
  getCollectionDocuments,
  postNewCollection,
  waitForRender
} = require("./../../../cypress/support/utilities");

describe("DocumentActions", function() {
  beforeEach(function() {
    postNewCollection();
  });

  // https://on.cypress.io/interacting-with-elements

  it("DocumentActions Delete click + confirm should remove one document, leave remaining", function() {
    // Add new documents to collection
    postDocumentToCollection(mockData.documents[1], this.collectionId);
    postDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the default selected document
    cy.get("[data-testid=document_actions_delete_button]").click();

    // Continue through Are you sure prompt
    cy.get("[data-testid=modal_confirm_prompt]").click();

    waitForRender();

    // Verify the list now contains only one item
    cy.get("[data-testid=document_list_items]").then(elem =>
      expect(elem[0].children.length).to.equal(1)
    );

    // Verify the document is the one that was not deleted
    cy.get("[data-testid=document_name]").then(elem =>
      expect(elem[0].textContent).to.equal(mockData.documents[1].name)
    );

    // Verify the Selected document is no longer present in the API
    getCollectionDocuments(this.collectionId).then(res => {
      var documents = res.body;
      expect(documents.length).to.equal(1);
      expect(documents[0].name).to.equal(mockData.documents[1].name);
    });
  });

  it("No documents present after deleting the last document", function() {
    // Add new document to collection
    postDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the only document
    cy.get("[data-testid=document_actions_delete_button]").click();

    // Continue through Are you sure prompt
    cy.get("[data-testid=modal_confirm_prompt]").click();

    // Verify the No documents present message displays
    cy.get("[data-testid=document_list_no_documents]").then(elem =>
      expect(elem[0]).to.have.text("No documents present")
    );
  });

  it("DocumentActions Delete click + cancel should make no changes", function() {
    // Add new documents to collection
    postDocumentToCollection(mockData.documents[1], this.collectionId);
    postDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Verify that the correct document is selected in the list
    cy.get("[data-testid=document_action_document_name]").then(elem =>
      expect(elem[0].textContent).to.equal(mockData.documents[0].name)
    );

    // Click delete to delete the selected document
    cy.get("[data-testid=document_actions_delete_button]").click();

    // Click No on the Are you sure prompt
    cy.get("[data-testid=modal_cancel_prompt]").click();

    // Verify no documents were removed from the list
    cy.get("[data-testid=document_list_items]").then(elem => {
      expect(elem[0].children.length).to.equal(2);
    });

    // Verify the selected document has not changed
    cy.get("[data-testid=document_action_document_name]").then(elem =>
      expect(elem[0].textContent).to.equal(mockData.documents[0].name)
    );
  });

  it("DocumentActions Delete click + close should make no changes", function() {
    // Add new document to collection
    postDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the only document
    cy.get("[data-testid=document_actions_delete_button]").click();

    // Click the X to close the Are you sure prompt
    cy.get("[data-testid=modal_header]").then(elem =>
      elem[0].children[1].click()
    );

    // Verify the documetn was not deleted
    cy.get("[data-testid=document_list_items]").then(elem =>
      expect(elem[0].children.length).to.equal(1)
    );
  });
});
