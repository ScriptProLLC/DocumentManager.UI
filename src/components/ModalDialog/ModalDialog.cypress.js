/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

const mockData = require("../../../tools/mockData");
var serverUrl = "http://localhost:13005/api/docmanager";

function postDocumentToCollection(document, collectionId) {
  var clone = Object.assign({}, document);
  clone.documentCollectionId = collectionId;
  return cy.request("POST", serverUrl + "/documents", clone);
}

describe("ModalDialog", function() {
  beforeEach(function() {
    cy.request("POST", serverUrl + "/collections", {}).then(response => {
      cy.wrap(response.body.id).as("collectionId");
    });
  });

  it("does not close when clicking behind", function() {
    // Add new documents to collection
    postDocumentToCollection(mockData.documents[0], this.collectionId);
    postDocumentToCollection(mockData.documents[1], this.collectionId);

    // Open Application to the collection
    cy.visit(`?collection=${this.collectionId}`);

    // Click delete to delete the default selected document
    cy.get("[data-testid=delete_button]").click();

    // Verify the Modal dialog is on screen
    cy.get("[data-testid=modal_header_text]").then(elem =>
      expect(elem[0].textContent).to.equal("Alert")
    );

    // Attempt to click behind the modal dialog
    cy.get("[data-testid=delete_button]").click({
      force: true
    });

    // Verify the Modal dialog is still on screen
    cy.get("[data-testid=modal_header_text]").then(elem =>
      expect(elem[0].textContent).to.equal("Alert")
    );
  });
});
