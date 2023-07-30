// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('search', (brand) => {
  cy.get('input[type="search"]').type(brand)
})

Cypress.Commands.add('filterBy', (category) => {
  cy.get('.category').contains(category).click()
})

Cypress.Commands.add('assertProduct', (position, name, brand, tags) => {
  cy.get('.product-card')[position]().children().find(`img[alt="${name}"]`)
  .get('.product-name')[position]().contains(name)
  .get('.product-brand')[position]().contains(brand)
  if(tags.length) {
    cy.get('.tags-container')[position]().children().should('have.length', tags.length)
    tags.forEach((tag, i) => {
      cy.get(`.tags-container > :nth-child(${i+1})`)[position]().contains(tag)
    })
  }
})

Cypress.Commands.add('checkRating', (name) => {
  cy.get('.top-nav').find('img[alt="Makeup 360 logo"]').click()
  .get('.product-card').find(`img[alt="${name}"]`).click()
  .get('.product-rating').contains('5')
})

Cypress.Commands.add('checkUniquity', (name) => {
  cy.get(`.product-name:contains(${name})`).should('have.length', 1)
})