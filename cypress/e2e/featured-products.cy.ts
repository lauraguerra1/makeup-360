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
    .checkRating('Serum Foundation')
    .checkRating('Coverage Foundation')
    .checkRating('Precision Brow Pencil')
    .checkRating('Sculpt & Highlight Brow Contour')
  })

  it('Should only contain unique products', () => {
    cy.checkUniquity('Serum Foundation')
    .checkUniquity('Coverage Foundation')
    .checkUniquity('Precision Brow Pencil')
    .checkUniquity('Sculpt & Highlight Brow Contour')
  })
})