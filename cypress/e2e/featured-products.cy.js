describe('Featured Products Section', () => {

  Cypress.Commands.add('checkRating', (name) => {
    cy.get('.product-card').find(`img[alt="${name}"]`).click()
    .get('.product-rating').contains('5')
    .get('.top-nav').find('img[alt="Makeup 360 logo"]').click()
  })

  Cypress.Commands.add('checkUniquity', (name) => {
    cy.get(`.product-name:contains(${name})`).should('have.length', 1)
  })

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
})