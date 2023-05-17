/// <reference types="cypress" />

Cypress.Commands.add('loginToChat' , () => {
    cy.visit('/');

    cy.get('button').should('be.disabled');
    cy.get('button').contains(`Let's chat`);

    cy.get('input[placeholder*="Nick name"]')
    cy.get('input').type('Test user');
    cy.get('input').should('have.value','Test user');

    cy.get('button').should('be.enabled');
    cy.get('button').click();
})
