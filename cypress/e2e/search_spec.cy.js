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
    .get('.product-tags')[position]().contains(`tags: ${tags}`)
    //change test for tags after we change UI 
    //consider adding the product brand and product type to alt text to be something like 'colourpop Lippie Pencil lipstick' 
  })

  beforeEach(() => {
    cy.intercept('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: 200,
      fixture: 'products.json'
    }).as('getProducts')
    cy.visit('http://localhost:3000')

  })




})