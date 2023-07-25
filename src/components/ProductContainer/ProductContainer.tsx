import { useEffect } from "react"
import { Product } from "../../apiTypes"
import ProductCard from "../ProductCard/ProductCard"
interface PCProps {
  featuredProducts: Product[]
  filteredProducts: Product[]
  searching: boolean
}

const ProductContainer = ({featuredProducts, filteredProducts, searching}: PCProps) => {
  useEffect(() => {

  }, [filteredProducts])

//this will contain all the little products or the featured items
// will get a prop coming from App with all single products 
//maps over them to return a bunch of <ProductCard /> 's 

const featuredProductCards = featuredProducts.map(product => {
  if(product.rating === 5) {
    return (
      <ProductCard 
        image={product.api_featured_image}
        brand={product.brand}
        name={product.name}
        tags={product.tag_list}
        id={product.id}
        key={product.id}
      />
    )
  }
})

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
    <section className="product-wrapper">
      {featuredProductCards}
      {productCards}
    </section>
  )
}

export default ProductContainer