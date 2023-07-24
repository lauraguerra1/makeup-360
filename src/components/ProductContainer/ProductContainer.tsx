import { useEffect } from "react"
import { Product } from "../../apiTypes"
import ProductCard from "../ProductCard/ProductCard"
interface PCProps {
  filteredProducts: Product[]
  searching: boolean
}

const ProductContainer = ({filteredProducts, searching}: PCProps) => {
  useEffect(() => {
    console.log('filtered', filteredProducts)
  }, [filteredProducts])

//this will contain all the little products or the featured items
// will get a prop coming from App with all single products 
//maps over them to return a bunch of <ProductCard /> 's 

const productCards = filteredProducts.map(product => {

  return (
    <ProductCard 
      image={product.api_featured_image}
      brand={product.brand}
      name={product.name}
      tags={product.tag_list}
      id={product.id}
    />
  )
});

// if the array of 'filtered /all products' is empty display featured items 
//if featured items then add an H2 for FEATURED 
  return (
  <p className="product-wrapper">
    This will either be fatured products or all products 
    {searching && productCards}
  </p>
  )
}

export default ProductContainer