describe('Featured Products Section', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.intercept('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')
  })

  it('Should display 4 unique product cards with ratings strictly equal to 5', () => {
      cy.wait('@getProducts').then((interception) => {
      cy.get('.product-wrapper').find('.product-card').should('have.length', 4)
      .checkRatingAndUniquity('Serum Foundation')
      .checkRatingAndUniquity('Coverage Foundation')
      .checkRatingAndUniquity('Precision Brow Pencil')
      .checkRatingAndUniquity('Sculpt & Highlight Brow Contour')
    })
  })
})