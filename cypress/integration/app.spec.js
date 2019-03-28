/// <reference types="Cypress" />

describe('App', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('starts correctly', () => {
        cy.get('p').should('have.text', 'Welcome to the Document Manager UI POC!')
    })
  })
  