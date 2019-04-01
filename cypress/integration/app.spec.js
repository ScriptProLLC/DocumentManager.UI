/// <reference types="Cypress" />

describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it("starts correctly", () => {
    cy.get("#mainBody").should(
      "have.text",
      "Edit src/App.js and save to reload."
    );
  });
});
