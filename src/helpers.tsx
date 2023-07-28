import { Product, apiData } from "./apiTypes"

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

const cleanAPIData = (product: apiData): Product => {
 const cleanedProduct:Product = {
  api_featured_image: product.api_featured_image,
  brand: product.brand,
  description: product.description,
  id: product.id,
  name: product.name,
  price: product.price,
  product_colors: product.product_colors,
  product_link: product.product_link,
  product_type: product.product_type,
  rating: product.rating,
  tag_list: product.tag_list,
 }

 return cleanedProduct
}

export {makeSnakeCase, checkPage, cleanAPIData}