describe('Chat interactions', () => {
  it('Veryfies the appearance of chat elements', () => {
    cy.loginToChat();

    cy.get('button').should('be.disabled');
    cy.get('input[placeholder*="Your message..."]')
    cy.get('mat-snack-bar-container').contains('Test user has joined the chat');
  });

  it('Sends message', () => {
    cy.loginToChat();

    cy.get('input').eq(0).type('Test message');
    cy.get('button').should('be.enabled');
    cy.get('button').click();

    cy.get('button').should('be.disabled');
    cy.get('input').eq(0).should('have.value', '');
    cy.get('#message').contains('Test message');
    cy.get('#user-date').contains(/^You \(Test user\), \d{2}:\d{2}$/);
  })
})
