declare namespace Cypress {
    interface Chainable {
      search(brand: string): Chainable<JQuery<HTMLElement>>
      filterBy(category: string): Chainable<JQuery<HTMLElement>>
      assertProduct(position: string, name: string, brand: string, tags: string[] ): Chainable<JQuery<HTMLElement>>
      checkRatingAndUniquity(name: string): Chainable<JQuery<HTMLElement>>
      showDetails(position: string, productId: number, brand: string, uppercaseBrand: string, 
        name: string, description: string, price: number, length: number, color: string): Chainable<JQuery<HTMLElement>>
      checkIfItemFeatured(position: string)
      }
  }
