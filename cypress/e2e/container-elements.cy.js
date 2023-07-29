describe('product container elements', () => {

  Cypress.Commands.add('checkIfItemFeatured', (position) => {
    cy.get('.product-wrapper')
    .find('a')[position]().should('have.class', 'featured-card')
  })

  beforeEach(() => {
    cy.intercept('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')
  })

  it('should display a header that describes the type of items within the product container', () => {
    cy.wait('@getProducts').then((interception) => {
      cy.checkIfItemFeatured('first')
      cy.checkIfItemFeatured('last')
    })
  })

})