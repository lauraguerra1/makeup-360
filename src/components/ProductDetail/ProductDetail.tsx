import './ProductDetail.css'
import { useParams, Link } from 'react-router-dom'
import { Product } from '../../apiTypes';

interface ProductDetailProps {
  allProducts: Product[]
}

const ProductDetail = ({allProducts}: ProductDetailProps) => {
  
  const chosenProductID = useParams().id

  console.log(typeof chosenProductID, 'chosen prod variable, this is a string right now')

  const findSingleProduct = (chosenProductID: any) => {
    return allProducts.find(product => {
      return product.id === parseInt(chosenProductID)
    })
  }

  const chosenProductDetails = findSingleProduct(chosenProductID)

  console.log(chosenProductDetails)

  return (
    <div className='product-detail-card'>
      <div></div>
    </div>
  )
}

export default ProductDetail