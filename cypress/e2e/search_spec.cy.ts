import '../support/index'

describe('search and filter spec', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')

  })

  it('should be able to search for a product by brand', () => {
    cy.wait('@getProducts').then((interception) => {
      cy.search('colourpop')
        .get('h2').contains('Showing Search Results')
        .get('.product-card').should('have.length', 4)
        .assertProduct('first', 'Lippie Pencil', 'colourpop', ['cruelty free', 'Vegan'])
        .assertProduct('last', 'No Filter Foundation', 'colourpop', ['cruelty free', 'Vegan'])
    })
  })


  it('should filter products by type', () => {
    cy.wait('@getProducts').then((interception) => {
      cy.filterBy('Foundation')
        .get('h2').contains('Showing Search Results')
        .get('.filled').should('have.length', 1).contains('Foundation')
        .get('.empty').should('have.length', 9)
        .get('.product-card').should('have.length', 3)
        .assertProduct('first', 'No Filter Foundation', 'colourpop', ['cruelty free', 'Vegan'])
        .assertProduct('last', 'Coverage Foundation', 'deciem', ['Vegan'])
    })
  })

  it('should search, then filter based on remaining results', () => {
    cy.wait('@getProducts').then((interception) => {
      cy.search('colourpop')
      .get('h2').contains('Showing Search Results')
      .get('.product-card').should('have.length', 4)
      .assertProduct('first', 'Lippie Pencil', 'colourpop', ['cruelty free', 'Vegan'])
      .filterBy('Foundation')
      .get('.product-card').should('have.length', 1)
      .assertProduct('first', 'No Filter Foundation', 'colourpop', ['cruelty free', 'Vegan'])
    })
  })

  it('should filter, then search based on remaining results, then clear search', () => {
    cy.wait('@getProducts').then((interception) => {
     cy.filterBy('Lipstick') 
       .get('h2').contains('Showing Search Results')
       .get('.product-card').should('have.length', 3)
       .assertProduct('first', 'Blotted Lip', 'colourpop', ['cruelty free', 'Vegan'])
        .assertProduct('last', 'Lipstick', 'boosh', ['Organic'])
       .get('.clear-search').click()
       .get('h2').contains('Featured Items')
    })
  })

})