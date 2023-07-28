describe('Featured Products Section', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.intercept('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')
  })

  it('Should display 4 product cards with rating strictly equal to 5', () => {
    cy.get('h2').contains('Featured Items')
    .get('.product-wrapper').find('.product-card').should('have.length', 4)
  })
})