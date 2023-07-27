import { useEffect, useState} from "react"
import { Product } from "../../apiTypes"
import ProductCard from "../ProductCard/ProductCard"
import './ProductContainer.css'
import { useLocation } from "react-router-dom"

interface PCProps {
  allProducts: Product[],
  filteredProducts: Product[],
  savedProducts: Product[],
  searching: boolean
}

const ProductContainer = ({allProducts, filteredProducts, savedProducts, searching}: PCProps) => {
  const location = useLocation().pathname
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const randomProducts: Product[] = []


  
  useEffect(() => {
    if(allProducts.length) {
      updateRandomProducts(allProducts)
    }
  }, [])

  const updateRandomProducts = (products: Product[]) => {
    let fiveStars = products.filter(product => product.rating === 5) 
    if(fiveStars.length === 4) {
      setFeaturedProducts(fiveStars)
    } else {
      getRandomProducts(fiveStars)
      
      setFeaturedProducts(randomProducts)
      
      if(randomProducts.length < 3) {
        updateRandomProducts(products)
      }
    }
  }

  const getRandomProducts = (products:Product[]) => {
    const newItem = products[Math.floor(Math.random()*products.length)]
    const foundItem = randomProducts.find(product => product.id === newItem.id)
    if (!foundItem) {
      randomProducts.push(newItem)
    }
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
    
  let featuredProductCards;
  if(featuredProducts.length) {
  featuredProductCards = getProductCards(featuredProducts)
  }
  
  const filteredProductCards = getProductCards(filteredProducts)
  const savedProductCards = getProductCards(savedProducts)

  return (
    <section className="product-container">
      <h2 className="featured-header">{location.includes('favorites') ? "Saved Items" : searching ? 'Showing Search Results' : "Featured Items"}</h2>
      <div className="product-wrapper" >
        {searching ? filteredProductCards : location.includes('favorites') ? savedProductCards : featuredProductCards}
        {searching && !filteredProducts.length && <p>No results for your search! Please try a different search!</p>}
      </div>
    </section>
  )
    
}

export default ProductContainer