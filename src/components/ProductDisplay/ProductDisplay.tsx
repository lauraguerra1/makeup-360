import ProductCard from "../ProductCard/ProductCard"
import { Product } from "../../apiTypes"

interface ProductDisplayProps {
  featuredProducts: Product[],
  filteredProducts: Product[],
  savedProducts: Product[]
}

const ProductDisplay = ({featuredProducts, filteredProducts, savedProducts}: ProductDisplayProps) => {
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
  const savedProductCards = getProductCards(savedProducts)

  return (<></>)
}

export default ProductDisplay