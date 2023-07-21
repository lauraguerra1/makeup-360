import { useEffect } from "react"
import { Product } from "../../apiTypes"
interface PCProps {
  filteredProducts: Product[]
}

const ProductContainer = ({filteredProducts}: PCProps) => {
  useEffect(() => {
    console.log('filtered', filteredProducts)
  }, [filteredProducts])
//this will contain all the little products or the featured items
// will get a prop coming from App with all single products 
//maps over them to return a bunch of <ProductCard /> 's 

// if the array of 'filtered /all products' is empty display featured items 
//if featured items then add an H2 for FEATURED 
  return (<p>This will either be fatured products or all products </p>)
}

export default ProductContainer