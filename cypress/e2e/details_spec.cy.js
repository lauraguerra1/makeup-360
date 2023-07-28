describe('view product details spec', () => {

  Cypress.Commands.add('filterBy', (category) => {
    cy.get('.category').contains(category).click()
  })

  beforeEach(() => {
    cy.intercept('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.fixture('images').as('imagesData');
    cy.visit('http://localhost:3000')

  })

  it('should show a chosen product\'s detail page', () => {
    cy.wait('@getProducts').then(() => {
      cy.get('.category').contains('Lipstick').click()
      cy.get('.product-card').first().click()
        .url().should('eq', 'http://localhost:3000/product/1047')
      cy.get('.product-detail-container')
      cy.contains('h3', 'colourpop')
      cy.contains('h4', 'Blotted Lip')
      cy.get('.product-description')
        .contains('Blotted Lip Sheer matte lipstick that creates the perfect popsicle pout! Formula is lightweight, matte and buildable for light to medium coverage.')
      cy.get('.product-price')
        .contains('Price: $5.00')
      cy.get('.color-container')
        .children().should('have.length', 7)
        .first().should('have.css', 'background-color', 'rgb(183, 34, 39)')
      cy.get('.buttons-container')
      cy.get('.add-product-to-favorites').click()
      cy.get('.favorites').click()
        .url().should('eq', 'http://localhost:3000/favorites')
      cy.get('.product-container')
      cy.get('.product-card')
        .get('#1047')
      cy.get('.product-brand').contains('colourpop')
      cy.get('.product-name').contains('Blotted Lip')
        .go(-1).url().should('eq', 'http://localhost:3000/product/1047')
        .get('.website-link-button')
        
    })
  })
})

