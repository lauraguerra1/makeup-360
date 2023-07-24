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
        <div className='product-detail-container'>

            <div className='image-container'>
              <Link to={chosenProductDetails.product_link} >
                <img src={chosenProductDetails.api_featured_image} className='product-image' id={chosenProductDetails.id.toString()} alt={chosenProductDetails.name}/>
              </Link>
            </div>
            <aside className='details-aside'>
              <h1>{chosenProductDetails.name}</h1>
              <p className='product-price'>Price: ${chosenProductDetails.price}</p><br />
              <p className='product-description'>Description: {chosenProductDetails.description}</p><br />
              <p className='product-rating'>Rating: {chosenProductDetails.rating}</p><br />
            </aside>

        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  )
}

export default ProductDetail