/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

var serverUrl = "http://localhost:13005/api/docmanager";

function postDocumentToCollection(document, collectionId) {
  var clone = Object.assign({}, document);
  clone.documentCollectionId = collectionId;
  return cy.request("POST", serverUrl + "/documents", clone);
}

function getCollectionDocuments(collectionId) {
  return cy.request(
    "GET",
    serverUrl + "/collections/" + collectionId + "/documents"
  );
}

function postNewCollection() {
  return cy.request("POST", serverUrl + "/collections", {}).then(response => {
    cy.wrap(response.body.id).as("collectionId");
  });
}

function waitForRender() {
  return cy.wait(1000);
}

module.exports = {
  postDocumentToCollection,
  getCollectionDocuments,
  postNewCollection,
  waitForRender
};
