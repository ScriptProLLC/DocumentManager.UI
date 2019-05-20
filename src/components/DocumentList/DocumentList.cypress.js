/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

describe("DocumentList", () => {
  beforeEach(() => {
    cy.visit("?collection=d7a2add9-14bf-480e-9b97-96685a006431");
  });

  // https://on.cypress.io/interacting-with-elements

  it("document list header should have correct text", () => {
    cy.get("[data-testid=document_list_header]").then($selectedElement => {
      expect($selectedElement).to.be.not.null;

      var headerText = $selectedElement[0];

      expect(headerText.innerText).to.equal("Documents");
    });
  });

  it("document list scroll bar is functional", () => {
    cy.get("[class=document-list-container]").then($selectedElement => {
      expect($selectedElement).to.be.not.null;

      // right now, our test data is 5 lines, need to set the table with enough line to make this true...
      var hasScrollbars =
        $selectedElement[0].scrollHeight > $selectedElement[0].clientHeight;
      expect(hasScrollbars).to.be.false;
    });
  });
});
