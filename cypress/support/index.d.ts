declare namespace Cypress {
    interface Chainable {
      search(brand: string): Chainable<JQuery<HTMLElement>>
      filterBy(category: string): Chainable<JQuery<HTMLElement>>
      assertProduct(position: string, name: string, brand: string, tags: string[] ) : Chainable<JQuery<HTMLElement>>
      checkRating(name: string): Chainable<JQuery<HTMLElement>>
      checkUniquity(name: string): Chainable<JQuery<HTMLElement>>
    }
  }
