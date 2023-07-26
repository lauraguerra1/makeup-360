import { useEffect, useState} from "react"
import { Product } from "../../apiTypes"
import ProductCard from "../ProductCard/ProductCard"
import './ProductContainer.css'
import { useLocation } from "react-router-dom"
import ProductDisplay from '../ProductDisplay/ProductDisplay'

interface PCProps {
  allProducts: Product[],
  filteredProducts: Product[],
  savedProducts: Product[]
}

const ProductContainer = ({allProducts, filteredProducts, savedProducts}: PCProps) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const location = useLocation().pathname

  useEffect(() => {
    if(allProducts.length) {
      updateRandomProducts(allProducts)
    }
  }, [])

  const updateRandomProducts = (products: Product[]) => {
    let fiveStars = products.filter(product => product.rating === 5) 
    setFeaturedProducts(getRandomProducts(fiveStars))
  }

  const getRandomProducts = (products:Product[]) => {
    const newProducts = []
    for(let i = 0; i < 4; i++) {
      newProducts.push(products[Math.floor(Math.random()*products.length)])
    }
    return newProducts
  }

  // const getProductCards = (products:Product[]):JSX.Element[]=> {
  //   return products.map(product => {
  //     return (
  //       <ProductCard 
  //         image={product.api_featured_image}
  //         brand={product.brand}
  //         name={product.name}
  //         tags={product.tag_list}
  //         id={product.id}
  //         key={product.id}
  //       />
  //     )
  // })
  // } 

  // const featuredProductCards = getProductCards(featuredProducts)
  // const filteredProductCards = getProductCards(filteredProducts)
  // const savedProductCards = getProductCards(savedProducts)

  return (
    <section className="product-container">
      {!filteredProducts.length && <h2 className="featured-header">Featured Items</h2>}
      <div className="product-wrapper" >
        {/* {filteredProducts.length ? filteredProductCards : featuredProductCards} */}
        <ProductDisplay featuredProducts={featuredProducts} filteredProducts={filteredProducts} savedProducts={savedProducts}/>
      </div>
    </section>
  )
}

export default ProductContainer