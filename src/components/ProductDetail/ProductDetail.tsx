import './ProductDetail.css'
import { useParams, Link } from 'react-router-dom'
import { Product } from '../../apiTypes';

interface ProductDetailProps {
  allProducts: Product[]
}

const ProductDetail = ({allProducts}: ProductDetailProps) => {
  
  const chosenProductID = useParams().id

  const findSingleProduct = (chosenProductID: any) => {
    return allProducts.find(product => {
      return product.id === parseInt(chosenProductID)
    })
  }

  const chosenProductDetails = findSingleProduct(chosenProductID)

  return (
    <div className='product-detail-card'>
      {chosenProductDetails ? (
        <div>
          <img src={chosenProductDetails.api_featured_image} className='product-image' id={chosenProductDetails.id.toString()}/>
          <h1>{chosenProductDetails.name}</h1>
          <p>Price: ${chosenProductDetails.price}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  )
}

export default ProductDetail