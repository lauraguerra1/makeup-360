import { Product } from "./apiTypes"

const handleError = (response: Response): Promise<Product[]> => {
  if(!response.ok) {
    throw new Error(`Error: ${response.status} -- Please try again!`)
  }
  return response.json()
}

const getAllProducts = async(): Promise<Product[]> => {
  let response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
  let data = await handleError(response)
  return data
}

export {getAllProducts}
