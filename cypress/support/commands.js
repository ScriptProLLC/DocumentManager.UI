// import "@testing-library/cypress/add-commands";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("addDocumentToCollection", function(
  document,
  collectionId
) {
  var clone = Object.assign({}, document);
  clone.documentCollectionId = collectionId;
  return cy.request("POST", Cypress.env("baseApiUrl") + "/documents", clone);
});

Cypress.Commands.add("addCollection", function() {
  return cy
    .request("POST", Cypress.env("baseApiUrl") + "/collections", {})
    .then(res => res.body.id);
});

Cypress.Commands.add("addDocumentsToCollection", function(
  document,
  collectionId,
  numberOfDocs
) {
  for (var i = 0; i < numberOfDocs; i++) {
    cy.addDocumentToCollection(document, collectionId);
  }
});

Cypress.Commands.add("getCollectionDocuments", function(collectionId) {
  return cy
    .request(
      "GET",
      Cypress.env("baseApiUrl") + "/collections/" + collectionId + "/documents"
    )
    .then(function(res) {
      return res.body;
    });
});

Cypress.Commands.add("getByLabelText", function(label) {
  return cy.get("[aria-label='" + label + "']");
});
