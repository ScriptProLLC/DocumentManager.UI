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
    cy.get("[data-testid=delete_button]").click();

    // Verify the Modal dialog is on screen
    cy.get("[data-testid=modal_header_text]").should("have.text", "Alert");

    // Attempt to click behind the modal dialog
    cy.get("[data-testid=document_list_header]").click({
      force: true
    });

    // Verify the Modal dialog is still on screen
    cy.get("[data-testid=modal_header_text]").should("have.text", "Alert");
  });

  it("focuses the cancel button", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to open the modal dialog
    cy.get("[data-testid=delete_button]").click();

    // Verify the cancel button has focus
    cy.focused().should("have.attr", "data-testid", "modal_cancel_prompt");
  });

  it("shows error retrieving document list", function() {
    // Open Application to the collection
    cy.visit(`?collection=${"invalid collection Id"}`);

    // Verify "Error retrieving document list" displays
    cy.get("[data-testid=modal_prompt").should(
      "contain",
      "Error retrieving document list"
    );
  });

  it("shows error retrieving document", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    cy.server();

    cy.route({
      method: "GET",
      url: `**/documents/*`,
      status: 404,
      response: {},
      headers: {
        "x-correlation-id": "867-5309"
      }
    });

    cy.get("[data-testid=document_name]")
      .last()
      .click({
        force: true
      });

    // Verify "Error Retrieving Document" displays
    cy.get("[data-testid=modal_prompt").should(
      "contain",
      "Error retrieving document"
    );
  });

  it("shows error scanning document", function() {
    // // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    cy.server();

    cy.route({
      method: "GET",
      url: `**/scan`,
      status: 404,
      response: {},
      headers: {
        "x-correlation-id": "867-5309"
      }
    });

    cy.get("[data-testid=scan_icon_button]").click();

    // Verify "Error scanning Document' displays
    cy.get("[data-testid=modal_prompt").should(
      "contain",
      "Error scanning document"
    );
  });

  it("shows error saving document", function() {
    // // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    cy.server();

    cy.route({
      method: "POST",
      url: `**/documents*`,
      status: 404,
      response: {},
      headers: {
        "x-correlation-id": "867-5309"
      }
    });

    cy.get("[data-testid=scan_icon_button]").click();

    cy.get("[data-testid=save_button]").click();

    // Verify "Error scanning Document" displays
    cy.get("[data-testid=modal_prompt").should(
      "contain",
      "Error saving document"
    );
  });

  it("shows error deleting document", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    cy.server();

    cy.route({
      method: "DELETE",
      url: `**/documents/*`,
      status: 404,
      response: {},
      headers: {
        "x-correlation-id": "867-5309"
      }
    });

    cy.get("[data-testid=document_name]")
      .last()
      .click({ force: true });

    cy.get("[data-testid=delete_button]").click();

    cy.get("[data-testid=modal_confirm_prompt]").click();

    // Verify "Error deleting Document" displays
    cy.get("[data-testid=modal_prompt").should(
      "contain",
      "Error deleting document"
    );
  });

  it("error dialog shows correlation id", function() {
    cy.server();

    cy.route({
      method: "GET",
      url: `**/collections/**`,
      status: 400,
      response: {},
      headers: {
        "x-correlation-id": "867-5309"
      }
    });

    // Open Application to the bad collection
    cy.visit(`?collection=${"invalid-collection-Id"}`);

    // Verify Correlation ID Exists
    cy.get("[data-testid=modal_prompt").should(
      "contain",
      "Log Correlation ID: 867-5309"
    );
  });
});
