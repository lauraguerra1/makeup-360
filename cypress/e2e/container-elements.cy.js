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
      cy.get('h2').contains('Featured Items')
      .checkIfItemFeatured('first')
      .checkIfItemFeatured('last')
      .get('.featured-card')['first']().click()
      .get('.add-product-to-favorites').click()
      .get('img[alt="view favorites link"]').click()
      .get('h2').contains('Saved Items')
    })
  })

})