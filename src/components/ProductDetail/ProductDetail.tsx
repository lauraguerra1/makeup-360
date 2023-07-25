import './ProductDetail.css'
import { useParams, Link } from 'react-router-dom'
import { Product } from '../../apiTypes';
import ProductColors from '../ProductColors/ProductColors';
import favorite from '../../images/favorite.png'

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

  console.log(chosenProductDetails)

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
              
            
              <h3>{chosenProductDetails.brand}</h3>
              <h4>{chosenProductDetails.name}</h4>

              <ProductColors hexColors={chosenProductDetails.product_colors}/>

              {chosenProductDetails.price !== '0.0' ? (
                <div className='product-price'>Price: ${chosenProductDetails.price}</div>
                ) : null }

              {chosenProductDetails.description ? (
                <div className='product-description'>{chosenProductDetails.description.replace(/<[^>]*>/g, '')}</div>
                ) : <p>Sorry, no product details currently available.</p>}
              
              {chosenProductDetails.rating !== null ? (
                <div className='product-rating'>Rating: {chosenProductDetails.rating}</div>
                ) : null}
              <div className='buttons-container'>
                <Link to={chosenProductDetails.product_link} > 
                  <button className='website-link-button'>View On Product Website</button>
                </Link>
                <img src={favorite} alt='add to favorites' className='add-product-to-favorites'/>
              </div>

            </aside>

        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  )
}

export default ProductDetail