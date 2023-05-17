/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginToChat(): Chainable<any>;
  }
}
