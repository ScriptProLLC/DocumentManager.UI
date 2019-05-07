/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

describe("DocumentManager", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it("clicking on a document in the list selects the document", () => {
    cy.get("[data-testid=documentListItems]").then($selectedElement => {
      expect($selectedElement).to.be.not.null;

      var elemToClick = $selectedElement[0].children[1].querySelector(
        "[data-testid=collapse]"
      );

      elemToClick.click();

      cy.get("[class='document-list-item-container selected']").then(
        $selectedElement => {
          var elemToTest = $selectedElement[0];

          cy.get("[data-testid=documentActionDocumentName]").then(
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
