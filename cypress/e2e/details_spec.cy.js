describe('view product details spec', () => {

  Cypress.Commands.add('filterBy', (category) => {
    cy.get('.category').contains(category).click()
  })

  beforeEach(() => {
    cy.intercept('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')

  })

  it('should show a product\'s details page', () => {
    cy.wait('@getProducts').then(() => {
      cy.filterBy('Lipstick')
      cy.get('.product-image').first().click()
      cy.get('.product-detail-container')
      cy.contains('h3', 'colourpop')
      cy.contains('h4', 'Blotted Lip')
    })
  })
})