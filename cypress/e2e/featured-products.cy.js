describe('Featured Products Section', () => {

  Cypress.Commands.add('checkRatingAndUniquity', (name) => {
    cy.get(`.featured-card:contains(${name})`).should('have.length', 1)
    .find('img[alt="five star rating"]')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.intercept('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')
  })

  it('Should display 4 unique product cards with ratings strictly equal to 5', () => {
    cy.get('.product-wrapper').find('.product-card').should('have.length', 4)
    .checkRatingAndUniquity('Serum Foundation')
    .checkRatingAndUniquity('Coverage Foundation')
    .checkRatingAndUniquity('Precision Brow Pencil')
    .checkRatingAndUniquity('Sculpt & Highlight Brow Contour')
  })
})