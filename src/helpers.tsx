const makeSnakeCase = (words: string | null) => words ? words.replaceAll(' ', '_').toLowerCase() : null

const checkPage = (location: string, searching: boolean) => {
  if (searching) {
    return 'searching'
  } else if (location.includes('product')) {
    return 'product page'
  } else if (location.includes('favorites')) {
    return 'favorites page'
  } else {
    return 'featured page'
  }
}

export {makeSnakeCase, checkPage}