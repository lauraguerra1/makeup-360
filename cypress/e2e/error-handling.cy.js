describe('error handling', () => {

  const interceptData = (status) => {
    cy.intercept('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json', {
      statusCode: status,
      fixture: 'products.json'
    })
    cy.visit('http://localhost:3000')
  };

  it('should display message for a 500 error', () => {
    interceptData(500)
    cy.get('h2').contains('Error: 500 -- Please try again!')
  })

  it('should display message for a 404 error', () => {
    interceptData(404)
    cy.get('h2').contains('Error: 404 -- Please try again!')
  })

  it('should display message when a wrong URL in inputed', () => {
    interceptData(200)
    cy.visit('http://localhost:3000/nonsense')
    cy.get('h2').contains('Nothing to see here! Please go back!')
  })
})