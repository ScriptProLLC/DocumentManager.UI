/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

describe("DocumentManager", function() {
  beforeEach(function() {
    cy.visit("?collection=d7a2add9-14bf-480e-9b97-96685a006431");
  });

  // https://on.cypress.io/interacting-with-elements

  it("clicking on a document in the list selects the document", function() {
    cy.get("[data-testid=document_list_items]").then($selectedElement => {
      expect($selectedElement).to.be.not.null;

      var elemToClick = $selectedElement[0].children[1].querySelector(
        "[data-testid=collapse]"
      );

      elemToClick.click();

      cy.get("[class='document-list-item-container selected']").then(
        $selectedElement => {
          var elemToTest = $selectedElement[0];

          cy.get("[data-testid=document_action_document_name]").then(
            $selectedElement => {
              var spanName = $selectedElement[0].innerText;

              expect(elemToTest.innerText.trim()).to.equal(spanName.trim());
            }
          );
        }
      );
    });
  });
});
