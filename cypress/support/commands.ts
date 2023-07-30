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

Cypress.Commands.add('checkRatingAndUniquity', (name) => {
  cy.get(`.featured-card:contains(${name})`).should('have.length', 1)
  .find('img[alt="five star rating"]')
})

Cypress.Commands.add('showDetails', (position, productId, brand, uppercaseBrand, name, description, price, length, color) => {
  cy.get('.product-card')[position]().click()
    .url().should('eq', `http://localhost:3000/product/${productId}`)
  cy.get('.product-detail-container')
  cy.contains('h3', `${uppercaseBrand}`)
  cy.contains('h4', `${name}`)
  cy.get('.product-description')
    .contains(`${description}`)
  cy.get('.product-price')
    .contains(`Price: $${price}`)
  cy.get('.color-container')
    .children().should('have.length', length)
    .first().should('have.css', 'background-color', `${color}`)
  cy.get('.buttons-container')
  cy.get('.add-product-to-favorites').click()
  cy.get('.favorites').click()
    .url().should('eq', 'http://localhost:3000/favorites')
  cy.get('.product-container')
    .get('.product-card')
    .get(`#${productId}`)
  cy.get('.product-brand').contains(`${brand}`)
  cy.get('.product-name').contains(`${name}`)
    .go(-1).url().should('eq', `http://localhost:3000/product/${productId}`)
  cy.get('.website-link-button')
});

Cypress.Commands.add('checkIfItemFeatured', (position) => {
  cy.get('.product-wrapper')
  .find('a')[position]().should('have.class', 'featured-card')
})