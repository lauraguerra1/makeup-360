describe('search and filter spec', () => {

  Cypress.Commands.add('search', (brand) => {
    cy.get('input[type="search"]').type(brand)
  })

  Cypress.Commands.add('filterBy', (category) => {
    cy.get('.category').contains(category).click()
  })

  Cypress.Commands.add('assertProduct', (position, name, brand, tags) => {
    cy.get('.product-card')[position]().children().find(`img[alt="${name}"]`)
    .get('.product-name')[position]().contains(name)
    .get('.product-brand')[position]().contains(brand)
    if(tags.length) {
      cy.get('.tags-container')[position]().children().should('have.length', tags.length)
      tags.forEach((tag, i) => {
        cy.get(`.tags-container > :nth-child(${i+1})`)[position]().contains(tag)
      })
    }
  })

  beforeEach(() => {
    cy.intercept('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json', {
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

  it('should show additional filter options when either arrow is clicked', () => {
    cy.wait('@getProducts').then((interception) => {
      cy.get('.right-scroll-btn').click({ force: true })
      .get('button').contains('Lip liner').should('be.visible')
      .get('.left-scroll-btn').click({ force: true })
      .get('button').contains('Blush').should('be.visible')
     })
  })

})