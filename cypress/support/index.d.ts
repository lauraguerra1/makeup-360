declare namespace Cypress {
    interface Chainable {
      search(brand: string): void
      filterBy(category: string): void
      assertProduct(position: string, name: string, brand: string, tags: string[] )
      checkRating(name: string): void
      checkUniquity(name: string): void
    }
  }
