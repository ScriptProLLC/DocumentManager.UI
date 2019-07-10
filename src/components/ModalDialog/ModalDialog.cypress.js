/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");
const errorTypes = require("../../api/ApiErrorTypes");

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
    cy.getByLabelText("Delete button").click();

    // Verify the Modal dialog is on screen
    cy.getByLabelText("Modal header text").should("contain", "Alert");

    // Attempt to click behind the modal dialog
    cy.getByLabelText("Document list header").click({
      force: true
    });

    // Verify the Modal dialog is still on screen
    cy.getByLabelText("Modal header text").should("contain", "Alert");
  });

  it("focuses the cancel button", function() {
    // Add new documents to collection
    cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
    cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to open the modal dialog
    cy.getByLabelText("Delete button").click();

    // Verify the cancel button has focus
    cy.focused().should("have.attr", "aria-label", "Modal cancel button");
  });

  it("error dialog shows correlation id", function() {
    // Start a server to begin routing responses
    cy.server();

    // Manage the behavior of network request
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
    cy.getByLabelText("Modal prompt").should(prompt => {
      expect(prompt).to.contain("Log Correlation ID: ");
      expect(prompt).to.contain("867-5309");
    });
  });

  describe("Error Messages", function() {
    it("Shows the correct error for failing to load documents", function() {
      // Open Application to the collection
      cy.visit(`?collection=${"invalid collection Id"}`);

      // Verify that the modal message is displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Get_Collection_Documents.message
      );

      // Verify that the modal instructions are displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Get_Collection_Documents.instructions
      );
    });

    it("shows error retrieving document", function() {
      // Add new documents to collection
      cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
      cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

      // Open Application to the collection
      cy.visit(`?collection=${this.collectionId}`);

      // Start a server to begin routing responses
      cy.server();

      // Manage the behavior of network request
      cy.route({
        method: "GET",
        url: `**/documents/*`,
        status: 404,
        response: {},
        headers: {
          "x-correlation-id": "867-5309"
        }
      });

      // Click last document in the list
      cy.getByLabelText("Document name in list")
        .last()
        .click({
          force: true
        });

      // Verify that the modal message is displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Get_Document.message
      );

      // Verify that the modal instructions are displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Get_Document.instructions
      );
    });

    it("shows error scanning document", function() {
      // Open Application to the collection
      cy.visit(`?collection=${this.collectionId}`);

      // Start a server to begin routing responses
      cy.server();

      // Manage the behavior of network request
      cy.route({
        method: "GET",
        url: `**/scan`,
        status: 404,
        response: {},
        headers: {
          "x-correlation-id": "867-5309"
        }
      });

      // Click the scan bubton
      cy.getByLabelText("Scan button").click();

      // Verify that the modal message is displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Scan_Document.message
      );

      // Verify that the modal instructions are displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Scan_Document.instructions
      );
    });

    it("shows error saving document", function() {
      // Open Application to the collection
      cy.visit(`?collection=${this.collectionId}`);

      // Start a server to begin routing responses
      cy.server();

      // Manage the behavior of network request
      cy.route({
        method: "POST",
        url: `**/documents*`,
        status: 404,
        response: {},
        headers: {
          "x-correlation-id": "867-5309"
        }
      });

      // Click the scan button
      cy.getByLabelText("Scan button").click();

      // Click the save button
      cy.getByLabelText("Save button").click();

      // Verify that the modal message is displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Save_Document.message
      );

      // Verify that the modal instructions are displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Save_Document.instructions
      );
    });

    it("shows error deleting document", function() {
      // Add new documents to collection
      cy.addDocumentToCollection(mockData.documents[1], this.collectionId);
      cy.addDocumentToCollection(mockData.documents[0], this.collectionId);

      // // Open Application to the collection
      cy.visit(`?collection=${this.collectionId}`);

      // Start a server to begin routing responses
      cy.server();

      // Manage the behavior of network request
      cy.route({
        method: "DELETE",
        url: `**/documents/*`,
        status: 404,
        response: {},
        headers: {
          "x-correlation-id": "867-5309"
        }
      });

      // Click last document in list
      cy.getByLabelText("Document name in list")
        .last()
        .click({ force: true });

      // Click delete button
      cy.getByLabelText("Delete button").click();

      // Click modal confirm button
      cy.getByLabelText("Modal confirm button").click();

      // Verify that the modal message is displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Delete_Document.message
      );

      // Verify that the modal instructions are displayed
      cy.getByLabelText("Modal prompt").should(
        "contain",
        errorTypes.Delete_Document.instructions
      );
    });
  });
});
