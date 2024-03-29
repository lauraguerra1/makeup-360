describe('view product details spec', () => {

  const interceptData = (status: number) => {
    cy.intercept('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: status,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')
  };

  beforeEach(() => {
    interceptData(200)
  });

  it('should show a chosen product\'s detail page', () => {
    cy.wait('@getProducts').then((interception) => {
      cy.get('.category').contains('Lipstick').click()
      cy.showDetails('first', 1047, 'colourpop', 'COLOURPOP', 'Blotted Lip', 'Blotted Lip Sheer matte lipstick that creates the perfect popsicle pout! Formula is lightweight, matte and buildable for light to medium coverage.', 5.00, 7, 'rgb(183, 34, 39)')
      cy.get('.logo-link').click()
        .url().should('eq', 'http://localhost:3000/')
      cy.get('.category').contains('Foundation').click()
      cy.showDetails('last', 1042, 'deciem', 'DECIEM', 'Coverage Foundation', 'Coverage Foundations are full-coverage formulations available in a comprehensive shade range across 21 shades. These foundations contain higher pigment levels than our Serum Foundations but still offer a smooth finish that avoids the heavy makeup look that can make skin appear more aged. The texture is that of a lightweight, non-oily cream.', 6.00, 21, 'rgb(244, 229, 214)')
      cy.get('.product-rating')
        .contains('Rating')
      cy.get('span').should('have.length', 5)
      cy.get('.add-product-to-favorites').click()
      cy.get('.favorites').click()
        .url().should('eq', 'http://localhost:3000/favorites')
      cy.get('.product-wrapper')
        .should('have.length', 1)
    });
  });
});