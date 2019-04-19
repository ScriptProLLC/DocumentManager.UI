/// <reference types="Cypress" />

describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it("starts correctly", () => {
    cy.get("h1").should("have.text", "Scriptpro Document Manager");
  });
});
