/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it("document list header should have correct text", () => {
    var header = cy.get("[data-testid=document_list_header]");

    expect(header).to.exist;
  });

  it("document list scroll bar is functional", () => {});

  it("built in functions of pdf viewer work", () => {});

  it("selecting a document in the list renders the pdf", () => {});

  it("clicking on a document in the list selects the document", () => {});
});
