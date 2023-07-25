import { useEffect, useState } from "react"
import { Product } from "../../apiTypes"
import ProductCard from "../ProductCard/ProductCard"
interface PCProps {
  updateFeaturedProducts: (newProducts:Product[]) => void
  featuredProducts: Product[]
  allProducts: Product[]
  filteredProducts: Product[]
  searching: boolean
}

const ProductContainer = ({allProducts, updateFeaturedProducts, featuredProducts, filteredProducts, searching}: PCProps) => {
  useEffect(() => {
    if(allProducts.length) {
      updateRandomProducts(allProducts)
    }
  }, [allProducts])

//this will contain all the little products or the featured items
// will get a prop coming from App with all single products 
//maps over them to return a bunch of <ProductCard /> 's 

const updateRandomProducts = (products: Product[]) => {
  let fiveStars = products.filter(product => product.rating === 5) 
  updateFeaturedProducts(getRandomProducts(fiveStars))
}

const getRandomProducts = (products:Product[]) => {
  const newProducts = []
  for(let i = 0; i < 4; i++) {
    newProducts.push(products[Math.floor(Math.random()*products.length)])
  }
  return newProducts
}

const getProductCards = (products:Product[]):JSX.Element[]=> {
    return products.map(product => {
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
  })
  } 

const featuredProductCards = getProductCards(featuredProducts)
const filteredProductCards = getProductCards(filteredProducts)

// if the array of 'filtered /all products' is empty display featured items 
//if featured items then add an H2 for FEATURED 
  return (
    <section className="product-wrapper">
      {filteredProducts.length ? filteredProductCards : featuredProductCards}
    </section>
  )
}

export default ProductContainer